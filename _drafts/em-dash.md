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

<!--

use the list of style guides in the sidebar of this:
https://en.wikipedia.org/wiki/List_of_style_guides
 -->

## Style guides

English is unique among the world's most spoken languages for having no regulatory body for the language. The closest to one are the style guides of major publications, of which there are many.

I'm using the list of style guides in the infobox on Wikipedia's [list of style guides][wikilist].

[wikilist]: https://en.wikipedia.org/wiki/List_of_style_guides

| Style Guide                          | Em dash formatting                                                    |
| ------------------------------------ | --------------------------------------------------------------------- |
| ACS style                            | no spaces[^acs]                                                       |
| AIP style                            | unknown[^aip]                                                         |
| AMA manual of style                  | no spaces[^ama]                                                       |
| AP Stylebook                         | yes spaces[^ap]                                                       |
| APA style                            | no spaces[^apa]                                                       |
| Australian Guide to Legal Citation   | yes spaces[^aus]                                                      |
| The Bluebook                         | unknown[^blue]                                                        |
| The Business Style Handbook          | yes spaces, using en dash[^business]                                  |
| California Style Manual              | unknown[^cali]                                                        |
| The Cambridge Guide to English Usage | either no spaces with em dash, or yes spaces with en dash[^cambridge] |
| The Chicago Manual of Style          | no spaces[^chicago]                                                   |
| Citing Medicine                      | out of scope[^cite-med]                                               |
| CSE Manual                           | no spaces[^cse]                                                       |

[^acs]: Based on examples from [_The ACS Style Guide_](https://people.clarkson.edu/~skrishna/ACS_style_guide.pdf), PDF page 176.

[^aip]: [_AIP Style Manual_](https://publishing.aip.org/wp-content/uploads/2021/03/AIP_Style_4thed.pdf) refers to them as dashes and only mentions them for tabular data, so I assume they don't know or care about the difference.

[^ama]: [_AMA Manual of Style_](https://libgen.com.im/book.php?md5=430a1760b73738f4b6c981d9c2ac154a) also recommends against the em dash if a comma or colon could replace it (8.3.2.1, PDF page 471).

[^ap]: The [_AP Stylebook 55th Ed._](https://libgen.com.im/book.php?md5=78756e8fd792a1ff55ce1e932153afe7) for 2020–2022 has an exception for "the start of sports agate summaries." Curiously, AP never uses en dashes, so it uses hyphens for ranges (PDF page 423).

[^apa]: The [_Publication Manual of the American Psychological Association, Seventh Edition_](https://libgen.com.im/book.php?md5=be26866571c2ab02cf7fd5ce708da432) explicitly states not to use spaces and warns that its overuse can "weaken the flow" (162).

[^aus]: The [_Australian Guide to Legal Citation_](https://law.unimelb.edu.au/__data/assets/pdf_file/0005/3181325/AGLC4-with-Bookmarks-1.pdf) surrounds em dashes with spaces in its examples (23).

[^blue]: [_The Bluebook_](https://libgen.com.im/book.php?md5=a95055b17e490c0b7614946a52e0be0b) does not concern itself with punctuation.

[^business]: [_The Business Style Handbook_](https://libgen.com.im/book.php?md5=1f36e17a4b10449941b53a46c43c7f5b), besides giving generic writing advice, also uses the en dash everywhere instead of the em dash, and has spaces around the en dash even for time ranges. As an aside, its inclusion on Wikipedia feels suspect, like the authors planted it there to advertise their book.

[^cali]: The [_California Style Manual_](https://www.sdap.org/wp-content/uploads/downloads/Style-Manual.pdf) only mentions the en dash for time ranges (PDF page 168).

[^cambridge]:
    This isn't a prescription! [_The Cambridge Guide to English Usage_](https://baptistinternationalseminary.org/rhode-island-baptist-seminary/docs/CLASS%20224H%20THE%20CAMBRIDGE%20GUIDE%20TO%20ENGLISH%20USAGE.pdf) is a descriptive take on the overall English language, very similar to this longer tweet, and cites the _Chicago Manual_ and _Oxford Guide to Style_ as unspaced em dash users, and "Butcher" and _Editing Canadian English_ as spaced en dash enjoyers (PDF page 152). The book itself uses the latter convention because it likes how the spaces separate the parenthetical better.

    Curiously, it also notes that em dashes have an informal reputation because it gets overused in "unstructured writing," which maybe is where LLMs got their em dash overuse from.

[^chicago]: [_The Chicago Manual of Style_ (18th ed.)](https://z-library.im/book/L5w0w0A0kp/the-chicago-manual-of-style-18-edn.html) says dashes are "normally unspaced," but this can be overridden by the particular publication since consistency is more important.

[^cite-med]: [_Citing Medicine_](https://www.sdms.org/docs/default-source/JDMS/citing-medicine-2007.pdf?sfvrsn=4), unsurprisingly, as the title suggests, focuses more on citations than punctuation in prose.

[^cse]:
    [_Scientific Style and Format_](https://z-library.im/book/DJ0pzWvnJo/scientific-style-and-format-the-cse-manual-for-authors-editors-and-publishers.html) doesn't explicitly state the spacing rules, but its examples don't use spaces, even when using the em dash to name the author of the quote (69).

    > The opportunity of defeating the enemy is provided by the enemy himself.—Sun Tzu
