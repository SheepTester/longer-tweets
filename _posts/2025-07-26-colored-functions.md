---
layout: post
title: thinking about colored functions
description: Brainstorming solutions to colored functions.
date: 2025-07-26
tags:
  - programming
hidden: true
---

"Colored functions" refers to ["What Color is Your Function?"](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/), which describes an allegory for async functions in programming languages. The blog post was written with Node.js callbacks in mind, before promises were commonplace in JavaScript, but `async`/`await` was already a feature in other programming languages like C#.

Essentially, in a programming language with colored functions,

1. Red functions can only call other red functions. Blue functions can call either red or blue functions.
2. Red functions have some downside, so you wouldn't want to make all your functions red.
3. Some library functions are red, so you can't make all your functions blue.

In this allegory, red functions are asynchronous, and blue functions are synchronous. But the situation can apply to other language features too, like Rust `const` functions, Haskell `IO`, and functions that throw errors.

In this post, I'm just going to brainstorm some programming language design ideas with colored functions in mind, with a bias towards JavaScript.

# Why async?

Not all languages have an async/sync split. Go, for example, proudly has its own "goroutines," which are like threads but managed by the Go runtime, so they're more lightweight and can be used for benign tasks that you'd use async functions for in other languages, like reading two files in parallel.

I think Go syntax is clunky and verbose in general, but even with syntax-level support for goroutines (you can spawn one with a special keyword `go`), the code for reading two files in parallel is not as elegant as JavaScript's `Promise.all`.
Also, since all functions are synchronous, it's hard to tell at a glance which function calls may block the thread and should, for example, be a candidate for being called a goroutine if called in a loop.

See, in JavaScript---at least, main-thread browser JavaScript---you can generally assume that if a function is synchronous, it is probably "fast." All library functions that would block the thread in other programming languages, like sleeping or performing IO, are asynchronous in JavaScript,[^1] and they have to be, lest they make the web page freeze. In JavaScript, async function calls look syntactically very different from regular function calls---they either involve a callback function or the `await` keyword. Synchronous functions of course can be slower than asynchronous functions, e.g. if they're computationally intensive, and in frontend JavaScript these functions are less common because they noticeably make the page lag. But virtual threads wouldn't save you from this either.

[^1]: In frontend JavaScript, notable exceptions include the `localStorage` APIs, the `alert` family, and synchronous `XMLHttpRequest`, and their use is now discouraged. Web Workers do enjoy a few more blocking library functions, like [`Atomics.wait`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait).

Also, at least with JavaScript's implementation of asynchronous functions, IO-bound programs can be kept in a single OS thread, and along with explicit syntax for async function calls, synchronization becomes free: you don't need to worry about a context switch happening in the middle of a synchronous expression, so sharing data between async threads can be done naively without worrying about race conditions.

```js
const sessions = {}
let nextId = 0

function handleRequest (req) {
  sessions[nextId] = { id: nextId, user: req.user }
  nextId++
  return nextId
}
```

_In the example above, `handleRequest` would be full of synchronization red flags in a multithreaded program if written in another language. But in JavaScript, this is perfectly safe._

```js
async function handleRequest (req) {
  const id = nextId
  sessions[id] = await createSession(req, id)
  nextId++
}
```

_In the example above, there is a race condition that allows for multiple sessions to use the same ID. While possible to miss, it's made clearer thanks to the `await` keyword._

In short, I believe the benefits of explicit asynchronous functions are that:

1. There's a clear distinction whether a function involves IO and is "slow"/could run in parallel.
2. IO-bound programs can be kept single-threaded, so
3. It's easier to avoid race conditions.

# Why are colored functions a problem?

The blog implies some pitfalls you'd encounter with colored functions, but I want to reiterate some here, because they're the specific problems I want to address with my language design ideas:

- A higher-order function might want to allow its input function to be asynchronous, but doing so would require the entire function to be asynchronous too.

  For example, `JSON.parse` is a synchronous function takes a replacer function, which must also be synchronous. If you want to read a file

- In a library, making a synchronous function async would be a breaking change, but this prevents you from adding async calls in future versions.

  Maybe this is a good thing; a consumer of a library probably does not want the library to unexpectedly perform IO in future versions. But maybe the library authors want add an option that reads data from a file; this would not be possible without creating a duplicate function with an almost-identical implementation, except that it is async.

- Both of these reasons lead to sync and async APIs, which have the same implementation except one is async and the other is not. This results in duplicate code and violates [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

- Plus, it might be nice to have a language that tracks whether a function is pure or impure, or whether it can throw an error. Adding more axes of function colors only makes the problem exponentially worse.

Ultimately, the main problem is that restrictions on what a function can call results in multiple functions with duplicate code.

# Idea 1: Maybe some functions don't care

Maybe the language can infer whether a function is async based on what functions it calls. If you don't care whether your function is async or not, you can leave its synchronicity unspecified. If one of your dependency functions becomes async in the future, so does your function, but you don't need to modify your code. If one of your function arguments is async, so is your function.

This might be more relevant for keeping track of errors. This could allow bubbling up error types from dependency functions as new error types are introduced, so you can leave the decision of whether to handle the error up to the consumer of your function.
