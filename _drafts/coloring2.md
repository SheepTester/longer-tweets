---
layout: post
title: colored functions, 2
description: ''
tags: []
unlisted: true
---

this discussion: <https://news.ycombinator.com/item?id=48281515>

- says many functions are colored beside async, e.g. Java checked exceptions, or infallible vs fallible
  - haskell's type system lets you abstract over color
  - are Java checked exceptions colored?
    - consensus based on votes seem to be yes
    - whether a function fails irrecoverably is a color, but checked exceptions?
  - people generally like JS async/await
- says golang making async implicit makes code at risk of being blocked by e.g. channel
  - but goroutines can freely block CPU, while single threaded async cannot
    - golang doesn't catch race conditions
      - had long lasting issues with blocking code, "1.2 added preemption, and 1.14 fixed other issues with preemption"
- would rather all calls be await by default
- golang error and context are like colored
  - context.Background is like using blocking in other languages
- other examples: haskell pure vs non pure, rust unsafe
  - but rust safe can call unsafe by wrapping with unsafe
  - arguments about java vs rust errors
- algebraic effects solve this, recommends reading <https://overreacted.io/algebraic-effects-for-the-rest-of-us/>
  - caveat: different libraries can have different colors
  - article notes:
    - example of resuming effect with value seems to just be a generator

this post should be more focused (because i apparently already wrote one here before, though it's hidden):

- why i dont like golang-style everything looks sync / non-JS multithreaded languages in general
- why throws, unsafe, or async in other languages are not colored
- where javascript coloring becomes a problem
  - example: zod parse vs parseAsync
  - example: prettier is always async
  - example: react requires sync

write an outline here first BEFORE reading the existing post i made on colored functions

wait but don't callbacks solve this?

```ts
function mapGeneric<A, B> (
  input: A,
  mapFn: (value: A, cb: (mapped: B) => void) => void,
  cb: (result: B) => void
): void {
  mapFn(input, value => cb(value))
}

function mapSync<A, B> (input: A, mapFn: (value: A) => B): B {
  let result!: B
  // ^ this is probably why; the language can't guarantee this?
  mapGeneric(
    input,
    (value, cb) => cb(mapFn(value)),
    res => (result = res)
  )
  return result
}

function mapAsync<A, B> (
  input: A,
  mapFn: (value: A) => Promise<B>
): Promise<B> {
  return new Promise(resolve =>
    mapGeneric(input, (value, cb) => mapFn(value).then(cb), resolve)
  )
}
```

or generators

should I abandon this post or adjust it (maybe allow rust/python async)?
