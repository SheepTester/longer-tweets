---
layout: post
title: TODO
description: TODO
date: 2026-06-06T11:59
tags:
  - html5
  - programming
# image: auto
---

By now, in JavaScript, all major browsers[^major] have supported [`JSON.parse`{:.language-js}'s `context.source`{:.language-js} parameter][parse-context] and [raw JSON][raw-json] for more than a year. This means that JavaScript can easily and losslessly stringify and parse 64-bit integers in JSON:

```js
JSON.parse(json, (_key, value, { source }) =>
  /^-?\d+$/.test(source) ? BigInt(source) : value
)
```

```js
JSON.stringify(object, (_key, value) =>
  typeof value === 'bigint' ? JSON.rawJSON(value.toString()) : value
)
```

[^major]: "All major browsers" conventionally refers to Chrome (and other Chromium browsers), Firefox, and Safari.

[parse-context]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#browser_compatibility
[raw-json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/rawJSON#browser_compatibility

## 64-bit integers

Both raw JSON and parse source were largely motivated by the need to serialize and deserialize 64-bit integers in JavaScript.

For example, Discord IDs (i.e. snowflakes) are 64-bit integers, so if you naively parse an object like

```json
{ "id": 775792479844696084 }
```

with JavaScript's `JSON.parse`{:.language-js}, the ID gets rounded:

```js
const json = '{ "id": 775792479844696084 }'
console.log(JSON.parse(json)) // -> { id: 775792479844696000 }
```

This is because JavaScript numbers are double-precision floating point numbers, which can't exactly represent every 64-bit integer.

You can get around this by specifying a [reviver] to convert integer-like numbers to [bigints][bigint].

[reviver]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#the_reviver_parameter
[bigint]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

```js
const json = '{ "id": 775792479844696084 }'
console.log(
  JSON.parse(json, (_key, value, { source }) =>
    /^-?\d+$/.test(source) ? BigInt(source) : value
  )
) // -> { id: 775792479844696084n }
```

But what if you try stringifying the bigint?

```js
const object = { id: 775792479844696084n }
console.log(JSON.stringify(object)) // Uncaught TypeError: BigInt value can't be serialized in JSON
```

This is because JavaScript forces you to decide whether to serialize a bigint as a string or a number in JSON. You can use a [replacer] to opt for a number:

```js
const object = { id: 775792479844696084n }
console.log(
  JSON.stringify(object, (_key, value) =>
    typeof value === 'bigint' ? JSON.rawJSON(value.toString()) : value
  )
) // -> '{"id":775792479844696084}'
```

[replacer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter

### Preserving integer floats

One caveat of our current stringify/parse setup is that normal numbers that are integers do not survive the round trip as numbers:

```js
const object = { number: 1, bigint: 1n }
console.log(
  JSON.parse(
    JSON.stringify(object, (_key, value) =>
      typeof value === 'bigint' ? JSON.rawJSON(value.toString()) : value
    ),
    (_key, value, { source }) =>
      /^-?\d+$/.test(source) ? BigInt(source) : value
  )
) // -> { number: 1n, bigint: 1n }
```

Other programming languages usually serialize whole floats with a trailing decimal:

```py
>>> json.dumps(0.5 * 2)
'1.0'
```

So we can do the same thing in our stringify replacer:

```js
const object = { number: 1, bigint: 1n }
const json = JSON.stringify(object, (_key, value) => {
  if (typeof value === 'bigint') {
    return JSON.rawJSON(value.toString())
  } else if (typeof value === 'number') {
    const string = value.toString()
    return JSON.rawJSON(/^-?\d+$/.test(string) ? `${string}.0` : string)
  } else {
    return value
  }
})
console.log(json) // -> '{"number":1.0,"bigint":1}'
console.log(
  JSON.parse(json, (_key, value, { source }) =>
    /^-?\d+$/.test(source) ? BigInt(source) : value
  )
) // -> { number: 1, bigint: 1n }
```

## Infinities

Currently, `JSON.stringify`{:.language-js} replaces `Infinity`{:.language-js} and `-Infinity`{:.language-js} with `null`{:.language-js}. However, it is already possible to represent infinities in JSON:

```js
const json = '{ "positive": 2e308, "negative": -2e308 }'
console.log(JSON.parse(json)) // -> { positive: Infinity, negative: -Infinity }
```

Therefore, we can use the replacer to use this representation when stringifying:

```js
const object = { positive: Infinity, negative: -Infinity }
const json = JSON.stringify(object, (_key, value) =>
  value === Infinity
    ? JSON.rawJSON('2e308')
    : value === -Infinity
      ? JSON.rawJSON('-2e308')
      : value
)
console.log(json) // -> '{"positive":2e308,"negative":-2e308}'
console.log(JSON.parse(json)) // -> { positive: Infinity, negative: -Infinity }
```

I'm not sure if anything in JSON naturally deserializes to `NaN`{:.language-js}, but if not, you could still represent `NaN` using a similar technique to dates that I'm about to show below.

## Dates

YAML, among [more cursed data types][yaml-tags], has first-class support for timestamps.

```yaml
canonical: 2001-12-15T02:59:43.1Z
iso8601: 2001-12-14t21:59:43.10-05:00
spaced: 2001-12-14 21:59:43.10 -5
date: 2002-12-14
```

[yaml-tags]: https://yaml.org/spec/1.2.2/#24-tags

The realm of allowed primitives in JSON allows us to represent more data types. For example, [JSON's definition of a number][json-number] allows for any number of digits in the exponent, even if no reasonable serializer would produce this number.

```js
JSON.parse('0e1234') // 0
```

[json-number]: https://www.json.org/json-en.html

We can take advantage of this. In practice, zero will always be serialized as either `0`{:.language-json} or `0.0`{:.language-json}[^negative-zero], so we'll never see something like `0e1234`{:.language-json} in the wild. This is free real estate!

[^negative-zero]: Or `-0`{:.language-json}/`-0.0`{:.language-json} to represent negative zero, but at least in JavaScript, `JSON.stringify(-0)`{:.language-js} still produces `0`{:.language-json}.

We can serialize YAML's timestamp example into JSON like this:[^tz]

[^tz]: One caveat of this representation is that time zone information is lost. However, in JavaScript, people generally use `Date`{:.language-js} objects to represent timestamps, which only represent instants and don't track time zones, so the time zone would've been lost when deserialized regardless.

```json
{
  "canonical": 0e200112150259431,
  "iso8601": 0e2001121502594310,
  "spaced": 0e2001121502594310,
  "date": 0e20021214
}
```

Then, we can make a replacer and reviver that are aware of this format.

```js
const object = {
  canonical: new Date('2001-12-15T02:59:43.1Z'),
  iso8601: new Date('2001-12-14T21:59:43.10-05:00'),
  spaced: new Date('2001-12-14 21:59:43.10 -5'),
  date: new Date('2002-12-14')
}
// `value` represents the value after calling `toJSON`, so need to get original value from `this`
const json = JSON.stringify(object, function (key, value) {
  return this[key] instanceof Date
    ? JSON.rawJSON(`0e${this[key].toISOString().replace(/\D/g, '')}`)
    : value
})
console.log(json) // -> '{"canonical":0e20011215025943100,"iso8601":0e20011215025943100,"spaced":0e20011215025943100,"date":0e20021214000000000}'
console.log(
  JSON.parse(json, (_key, value, { source }) => {
    if (source?.startsWith('0e')) {
      return new Date(
        source
          .slice(2)
          .padEnd('0', 14)
          .replace(
            /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d*)$/,
            '$1-$2-$3T$4:$5:$6.$7Z'
          )
      )
    } else {
      return value
    }
  })
) // -> { canonical: Date Fri Dec 14 2001 18:59:43 GMT-0800 (Pacific Standard Time), ... }
```

## Is this a good idea?

No. In general, you shouldn't need to encode data types in an interchange format. If both parties know that the data is in JSON, then they should also already know what data types to expect for each key and how they should be interpreted in order to make any meaningful use out of it. If you really want to encode data type, you should use YAML, which is expressive enough to let you perform [remote code execution][yaml-rce].

[yaml-rce]: https://ctf.support/web/python/yaml-deserialization/

However, if you're dealing with an existing service that serializes or expects 64-bit integers as JSON numbers, then of course you'll have to use the reviver and replacer—that's why the feature exists.

<!--
outline:
- bigints
  - preserving integer floats
  - another way: mixed float/bigint integers based on safe integer range or V8 smi https://v8.dev/blog/pointer-compression#value-tagging-in-v8
- infinities
- dates
- this isn't necessary because both ends need to agree and know about the format anyways
 -->
