---
layout: post
title: Why JSON is a hard programming language
description: Everyone knows what JSON is, but we can all attest to it being a difficult programming language.
date: 2020-07-06
tags:
  - programming
  - ovinus-linkedin
---

_Originally posted on [LinkedIn](https://www.linkedin.com/pulse/why-json-hard-programming-language-ovinus-real/) under my friends' joint account Ovinus Real._

As everyone knows, Java Serializable Object-oriented Notation (JSON for short) is a commonly used programming language for data storage. However, its syntax is notoriously strict and difficult.

For example, many languages allow the usage of either single or double quotes. However, JSON requires that all quotes are double quotes.

```
[
  'bad example ❌',
  "good example ✔"
]
```

In addition, most JSON programmers do not write JSON directly. Instead, they use common clients and tools such as Scratch 3.0 to generate zipped JSON files with extra needful assets, which leads me to my final point.

JSON is a poor language for including external files. For example, in order to include an image, you cannot simply upload an image into your JSON. That will not work. Instead, you have to include it alongside the JSON script or use a data:// URL.

_Ovinus Real is an authorized JSON programmer. You can see her/his credentials on his LinkedIn profile._
