---
layout: post
title: TODO
description: TODO
tags: []
---

Em dashes are one of the most prevalent hallmarks and obvious giveaways of LLMs, which is pretty unfortunate for anyone who used em dashes before LLMs. But people vary in how they use em dashes—some use a hyphen `-` or two `--`, for example—and they definitely don't use them to the same degree as LLMs. Meanwhile, I've noticed that LLMs seem to have settled on one, pervasive style:

- LLMs always use the actual Unicode em dash character, `—` (U+2014).

  Many people didn't have ready access to the em dash character, or didn't know or care. On Android and iOS, you have to long press the hyphen key, which can be a hassle. Word processors like Google Docs and Microsoft Word substitute two hyphens with an em dash, but that won't happen outside the app.

  MacOS has had a convenient shortcut, ⇧ ⌥ - (shift + option + hyphen), and suspiciously recently, [this shortcut was ported to Windows][windows-em] as shift + windows + hyphen. Perhaps Microsoft wanted to encourage human use of em dashes to make LLM text less obvious.

- LLMs always put spaces around the em dash.[^test]

  > _I'd describe my default writing style as conversational but precise — I aim for clarity over flourish._
  >
  > — Claude, in response to "Describe your writing style."

[windows-em]: https://support.microsoft.com/en-us/topic/september-29-2025-kb5065789-os-builds-26200-6725-and-26100-6725-preview-fa03ce47-cec5-4d1c-87d0-cac4195b4b4e

[^test]: Though, when I did a quick test just now with Gemini, ChatGPT, and Claude, Gemini seemed to avoid em dashes, ChatGPT didn't use spaces, and it was only Claude that put spaces around its em dashes. I'll pretend that didn't happen. Though, most LLM slop I read day-to-day is probably written by Claude these days, so my point isn't yet moot.

Among human text, I feel like people who do use the Unicode em dash don't usually put spaces around it, and I swear that in books, em dashes don't get spaces either. So why are LLMs so insistent on it?

My hypothesis is that while most traditional style guides prescribe spaceless em dashes, [Wikipedia's Manual of Style][mos] does put spaces around its em dashes. Because LLMs are trained mostly on internet content, spaced em dashes are more heavily weighted.

[mos]: https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style
[mos-dashes]: https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Dashes

<!-- But let's see if that's true. Firstly, I'm already wrong: the Manual of Style [dictates *no* spaces around em dashes][mos-dashes]:

>  -->

<!-- actually Wikipedia allows en dashes, which is interesting -->
