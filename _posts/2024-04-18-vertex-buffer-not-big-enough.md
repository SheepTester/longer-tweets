---
layout: post
title: Vertex buffer is not big enough on Mac only
description: A weird bug that only occurred on Mac computers.
date: 2024-04-18
tags:
  - programming
  - bug
---

I'm working on a glTF parser for a game engine I'm making as part of a [class at my university](https://cse125.ucsd.edu/), and while it worked on my Windows laptop and later my Android phone, it crashed whenever it was opened on a Macbook, regardless of browser, with an `INVALID_OPERATION` error. In the console, it said,

```
[.WebGL-0x128007a3800] GL_INVALID_OPERATION: Vertex buffer is not big enough for the draw call
```

_**TL;DR**: For me, it was because the offset parameter for `gl.vertexAttribPointer` was too big._

[I don't seem to be the only one that experienced this issue](https://discourse.threejs.org/t/vertex-buffer-is-not-big-enough-for-the-draw-call-only-on-mac-computers/43628), but Googling around, there wasn't much else. People tended to experience this issue when updating vertices, but I was just drawing a static model. In fact, I was drawing two glTF models, but only the one I exported from Blender worked.

In glTF, vertex attribute data (e.g. the positions of vertices) are packed in one binary file. The glTF file defines various buffer views---sections of bytes in the binary file:

```json
{
  "buffer": 0,
  "byteLength": 16224,
  "byteOffset": 31680,
  "byteStride": 12,
  "name": "floatBufferViews",
  "target": 34962
}
```

These in turn are referenced by "accessors," which define how to interpret the bytes in the buffer.

```json
{
  "bufferView": 2,
  "byteOffset": 8112,
  "componentType": 5126,
  "count": 676,
  "max": [0.9999581575393677, 0.999707818031311, 0.9990392327308655],
  "min": [-0.9999986886978149, -1.0, -0.9999558925628662],
  "type": "VEC3"
}
```

Notice how both of these have their own `byteOffset`! This is because accessors themselves can define a range of bytes within a buffer view. In other words, accessors are a range of bytes in a range of bytes.

In my glTF parser, I used these ranges to create a `TypedArray` view into the binary file's `ArrayBuffer`:

```ts
const data = new Uint8Array(
  arrayBuffer,
  (bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0),
  accessor.count *
    componentTypes[accessor.componentType].BYTES_PER_ELEMENT *
    componentSizes[accessor.type]
)
const glBuffer = gl.createBuffer() ?? expect('Failed to create buffer')
gl.bindBuffer(bufferView.target, glBuffer)
gl.bufferData(bufferView.target, data, gl.STATIC_DRAW)
gl.vertexAttribPointer(
  material.attrib(vbo.attribName),
  componentSizes[accessor.type],
  accessor.componentType,
  accessor.normalized ?? false,
  bufferView.byteStride ?? 0,
  accessor.byteOffset ?? 0
)
```

There were various tricks I did here that I thought were a bit suspicious, so I tried changing them first:

- I wanted to slice into an `ArrayBuffer` without copying the data (so I couldn't use `slice`), so I needed to use a `TypedArray`. I used a `Uint8Array` for all data types, even if the data was actually composed of other data types, like floats.
- I wasn't sure if "stride" meant the number of bytes between the last byte of one value and the first byte of the next value, or between the first bytes of both values. Usually I see `0` passed to `vertexAttribPointer`'s stride parameter, so I thought it was the former, but the few resources online suggested it was the latter. It was hard to get clarification whether, for example, 0 and 12 were equivalent for a `vec3`.

So I tried using the appropriate `TypedArray` and passing

After some more 3 am Googling, I managed to find where the error came from. In [Chromium's cross-platform WebGL implementation](https://chromium.googlesource.com/angle/angle/+/0844f2db017f42f50105e85fb7e7acfdc62ddca9/src/libANGLE/validationES.cpp#136), it throws the error after checking the size of the attribute data.

```cpp
// [OpenGL ES 3.0.2] section 2.9.4 page 40:
// We can return INVALID_OPERATION if our vertex attribute does not have
// enough backing data.
if (attribDataSizeWithOffset > static_cast<uint64_t>(buffer->getSize()))
{
    context->handleError(Error(GL_INVALID_OPERATION,
                               "Vertex buffer is not big enough for the draw call"));
    return false;
}
```

This is weird, though, because this code is supposed to work across platforms (nothing in the file path suggested it was MacOS-specific), yet it somehow only throws an error on Macs.

Still, though, the code gave a hint. Maybe on Macs, there's an issue with how they compute `attribDataSizeWithOffset`, which is defined in the previous line:

```cpp
// An overflow can happen when adding the offset, check for it.
uint64_t attribOffset = attrib.offset;
...
uint64_t attribDataSizeWithOffset = attribDataSizeNoOffset + attribOffset;
```

I printed out the arguments I passed to `gl.vertexAttribPointer`, and compared the output from the two models. My Blender model, which worked on all devices, had 0 for both the stride and offset. Meanwhile, the stride and offset for [the model I found online](https://sketchfab.com/3d-models/red-finned-fish-caba782285704b339dcc552b5455d2f6) were both nonzero. I already knew that making the stride 0 didn't change anything.

Look again at my code above. When constructing my `Uint8Array` view, I set the `byteOffset` to `(bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0)`. And when calling `gl.vertexAttribPointer`, I pass `accessor.byteOffset ?? 0` as the offset.

??

I accidentally applied `accessor.byteOffset` twice. Replacing the second value with 0 fixed it. 🎉

But what's very curious is that applying `accessor.byteOffset` twice _didn't_ break on other devices. On Windows and Android, the models rendered fine. I guess it's because they're more lenient about it and modulo or ignore the parameter if the offset is out of bounds, while MacOS doesn't do this.
