---
layout: post
title: blogtech
description: ''
tags: []
---

Recently, I made an [RSS feed job][rss] that scrapes the RSS/Atom feeds from people in [our webring][webring] and updates us in a Discord server whenever a new blog post is detected. Because I'm expecting an actual audience now—and these people _know_ me—I've been working on some miscellaneous updates to my blog, and I'd like to give an update on the current state of my blog's tech stack after 8 years.

[rss]: https://github.com/pink10000/ringfairy/pull/18
[webring]: https://pink10000.github.io/ringfairy/

## Switching to Jekyll

In my [initial post about the blog][first-post], I described how I built my new blog with a Node.js build script. However, three years after, in 2021, I decided to switch my blog to [Jekyll]. The reasons for this switch have been lost to time, but my best guess is:

- I got too lazy to have to run a build script every time I made a change.
- The repo's file tree was getting increasingly long because every post's generated HTML was in its own folder.[^gh-pages]
- Having any Node dependencies was annoying because [I kept getting Dependabot notifications][dependabot]—I hadn't realized I could turn those off back then.
- Having a build script offered flexibility, but it was a pain to maintain over several years. In particular, every Markdown feature I wanted had to be a separate npm dependency.

[first-post]: ../creating-this-blog/
[dependabot]: https://github.com/SheepTester/longer-tweets/issues?q=is%3Apr+author%3Aapp%2Fdependabot
[jekyll]: https://jekyllrb.com/

[^gh-pages]: For whatever reason, I wasn't able to get `gh-pages` working with my build script.

Some of these issues can nowadays be mitigated by using a GitHub workflow, but [that didn't seem to have been an option][gh-actions-pages] back when I made the Jekyll switch. Back then, Jekyll was the only static site generator supported by GitHub Pages.

[Switching to Jekyll][jekyll-pr] turned out to be fairly straightforward because my build script was ultimately reimplementing Jekyll's features from scratch, such as Markdown rendering, code highlighting, and templating.

[gh-actions-pages]: https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/
[jekyll-pr]: https://github.com/SheepTester/longer-tweets/pull/4

## Jekyll features

[kramdown]: https://kramdown.gettalong.org/syntax.html

Despite the lack of arbitary scripting, Jekyll and the [plugins supported by GitHub Pages][plugins] offer far more than just basic Markdown rendering and HTML templating.

[plugins]: https://pages.github.com/versions.json

Jekyll, by default, uses [Kramdown's flavor of Markdown][kramdown]. Recently, I discovered that Kramdown introduces [several Markdown features][test-syntax], including "inline attribute lists," which allows you to syntax highlight inline code:

```md
Minifiers often convert `undefined`{:.language-js} to `void 0`{:.language-js}, even though they could just declare a valueless variable once (e.g. with `var u`{:.language-js}) and reuse it.
```

> Minifiers often convert `undefined`{:.language-js} to `void 0`{:.language-js}, even though they could just declare a valueless variable once (e.g. with `var u`{:.language-js}) and reuse it.

[test-syntax]: ../test/#kramdown-syntax-testing

I've retroactively applied this to all previous posts, which in particular adds more splashes of color to my CTF writeups ([example][ctf]).

[ctf]: ../ctf/#appendix-how-i-created-my-payload-for-symcalcjs

Jekyll also has a plugin, [Jekyll Feed][jekyll-feed], that can generate an [Atom feed][feed][^atom] for the posts in my blog. I've since dropped the plugin and [copied the template they use][feed-template] so I can have full customizability over it without needing to read their docs.

[jekyll-feed]: https://github.com/jekyll/jekyll-feed
[feed]: ../feed.xml
[feed-template]: https://github.com/SheepTester/longer-tweets/blob/master/feed.xml

[^atom]: [Atom] is like a newer version of RSS.

[atom]: https://en.wikipedia.org/wiki/Atom_(web_standard)

## Commenting

I was inspired by [Matt's Minesweeper] in his GitHub profile readme, which uses a prefilled GitHub issue link and a GitHub Actions workflow to let anyone persist their Minesweeper changes to the repo.

[minesweeper]: https://github.com/mtfn/mtfn#readme

The comments system on my website uses a similar setup:

1. "Write a comment" at the bottom of all my posts links to a pre-filled GitHub issue that stores the post ID in the issue title and body. It also selects an issue template that adds a `comment` label to the issue.

1. A [GitHub workflow][workflow] runs when an issue is created, and it checks for the `comment` label.

1. If the issue is a comment, it runs a Node script that
   1. Extracts the post ID from the issue title or body.

   1. Renders the issue body to Markdown.

      This essentially reintroduces a Markdown build script back into my blog, but because I'm injecting untrusted user input into my blog[^md-xss], I felt that it was better to store the generated HTML in my repo rather than letting Jekyll render it.

   1. Adds the comment to a [YAML file][comments-yml].

1. The workflow pushes the changes, which in turn closes the original issue and triggers a GitHub Pages deployment.

The entire comments YAML file is available in Jekyll under `site.data.comments`, so my post page template uses it to render the comments under the corresponding post.

While the comments feature hasn't seen much usage, I ended up pulling the implementation out to a separate project, my [guestbook], which did receive more usage.

[guestbook]: /guestbook/
[workflow]: github.com/SheepTester/longer-tweets/blob/master/.github/workflows/comment.yml
[comments-yml]: https://github.com/SheepTester/longer-tweets/blob/master/_data/comments.yml

[^md-xss]:
    Rendering untrusted input as Markdown is generally unsafe for two reasons:

    - Markdown is essentially a [superset of HTML][md-html]. Users can easily inject arbitary code with a `<script>`{:.language-html} tag because [`<script>`{:.language-html} tags are explicitly valid Markdown][md-script].

    - YAML frontmatter is a commonly supported Markdown extension, but parsing untrusted YAML is also generally unsafe. With some parsers, parsing YAML [can lead to remote code execution][yaml-rce].

    Both unsafe features are enabled when rendering my blog because, well, I trust my blog posts, but they should not be enabled for the untrusted comments people can post under my blog.

[md-html]: https://spec.commonmark.org/0.31.2/#html-blocks
[md-script]: https://spec.commonmark.org/0.31.2/#example-170
[yaml-rce]: https://ctf.support/web/python/yaml-deserialization/

## Writing posts

I author these posts in Markdown in VS Code, but I personally find monospace prose difficult to read. Since VS Code supports proportional fonts, I've set the following settings for this workspace:

```jsonc
{
  "[markdown]": {
    "editor.wordWrapColumn": 80,
    "editor.wordWrap": "bounded",
    // This font reminds me of early 2010s websites, like Scratch forums, so I
    // think it's the most legible sans serif font
    "editor.fontFamily": "Verdana"
  },
  "workbench.colorTheme": "Dark 2026"
}
```

- I set the text to wrap at 80 characters[^ch] because long lines of text, especially for a narrower font like Verdana, are hard to read.

  This also reduces the need for me to manually wrap text in the Markdown source. In the past, I've tried wrapping text with [Rewrap], but the diffs become messy, so then I tried [writing one phrase or sentence per line][one-sentence-line], but I found it affected my writing style.

  [VS Code's zen mode][zen-mode] could work for this, but I don't want to have to explicitly switch in and out of it, and apparently its width is not configurable anyways.

- As alluded to in the comment, I chose Verdana because it's a bland, inoffensive font that I'm used to reading on older-designed forums, like Old Reddit, Hacker News.[^scratch]

  One downside of proportional fonts is that spaces are very narrow, so nested lists are even more difficult to follow.

- Normally, I use the [Tomorrow Night theme][tomorrow-night] for code, which is also the color scheme used on this blog, because I grew up with it as the default scheme on [Codecademy][old-codecademy], where I first learned to code.

  However, VS Code's built-in Tomorrow Night theme doesn't seem to be as featureful for Markdown—it doesn't highlight bold, italic, or inline code text—and it was apparently [archived in 2024][vscode-themes]. At least for this repo, where I expect to be writing Markdown more than actual code, I've switched to VS Code's default theme, which is probably better supported.

[^ch]: The width of a "character" for a proportional font is probably based on the glyph for zero (0) because that's what CSS uses for `1ch`, and I think that's the standard for typography in general.

[^scratch]: Apparently the Scratch forums use Arial, not Verdana.

[rewrap]: https://marketplace.visualstudio.com/items?itemName=dnut.rewrap-revived
[one-sentence-line]: https://asciidoctor.org/docs/asciidoc-recommended-practices/#one-sentence-per-line
[tomorrow-night]: https://github.com/chriskempson/tomorrow-theme#tomorrow-night
[vscode-themes]: https://github.com/Microsoft/vscode-themes
[old-codecademy]: https://www.codecademy.com/forum_questions/52e6e3838c1cccca2c0025c4
[zen-mode]: https://code.visualstudio.com/docs/getstarted/userinterface#_zen-mode

## Other recent design changes

I've changed the default background image to make the brightness consistent throughout. It is a blurred photo of a flowering plant in the rain, and the white flower created a bright spot under the text that made me feel like there was something on my eye. I've regenerated the blurred background and adjusted the curves in [Photopea], so the brightness should be more consistent throughout.

I've also increased the text contrast by reducing the exposure in the background and increasing the brightness of the text.

I think in the future, I'll explore how to make the "Enable accessible theme" button more discoverable. I think the accessible theme is tolerable, but the default browser dark theme makes the text harder to read with my mild astigmatism.

[photopea]: https://www.photopea.com/

In iOS 26, the new Safari design doesn't allow websites to put anything under the browser UI, even though it shows the rest of the page content under it as you scroll. This means that there's an ugly black background at the top and bottom edges of the website. I don't think I'll bother addressing this for now until iOS Safari fixes itself, e.g. by accepting `viewport-fit=cover`, which ironically Apple themselves [invented for the iPhone X][iphone-x].

[iphone-x]: https://webkit.org/blog/7929/designing-websites-for-iphone-x/

I've also added semantic HTML to the blog pages, which allow browsers like Firefox and Safari to detect and suggest reader mode, which should also help with readability.

<!--

things i want to talk about:

- why i switched
  - https://github.com/SheepTester/longer-tweets/pull/4 "That way I don't have to build thingsmanually"
  - https://github.com/SheepTester/longer-tweets/tree/d475e39aaf46b367fdbd7ea115d9bf330507eb99
    - maybe a folder per post got messy
    - and dependabot is annoying
  - https://sheeptester.github.io/longer-tweets/creating-this-blog/
    - not sure why gh-pages didn't work
- jekyll
  - special kramdown syntax: inline highlighting, etc
  - feed
  - drafts and unlisted
- commenting
  - github issues and actions
  - jekyll data
- vscode settings
  - font
  - color theme
- other design changes
  - new blurred background, better text contrast
    - ios 26 caveat
  - reader mode support with semantic HTML

-->

<!--
IALs allow me to annotate images with a width and height while sticking to Markdown's

```md
![Screenshot of Google Maps with a red airplane icon labelled 'Airport Authority Consulting' on Treasure Island.](../images/hide-seek-review/treasure-island.png)
{:width="250"}
```

![Screenshot of Google Maps with a red airplane icon labelled 'Airport Authority Consulting' on Treasure Island.][test]

[test]: ../images/hide-seek-review/treasure-island.png

{:style="--width: 250; --height: 250"}

> test
> {:.test}

-->
