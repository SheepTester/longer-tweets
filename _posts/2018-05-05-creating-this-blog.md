---
layout: post
title: creating this blog
description: showing off
# Fake time
date: 2018-05-05 10:40
tags:
  - programming
  - html5
  - node
---

I've tried to create a blog multiple times.

1. a WordPress blog while learning web development
2. [the Box of Sean](https://boxofsean.blogspot.com/) (a Blogger blog): I actually put content on there, but I stopped mainly because of the editor:

   - it is light theme
   - it's not very easy to use for me

3. [Opinions](https://sheeptester.github.io/opinions/): I'm not sure what happened to it; I guess I didn't care much at the time or I didn't know how
4. [Blog de Sean](https://sheeptester.github.io/blog/) (made with [Jekyll Now](https://github.com/barryclark/jekyll-now)): I made it just to try it out and actually [posted something](https://sheeptester.github.io/blog/SHOWBALL-PROBLEM-JOURNAL/). I ended up not using it partially because I didn't like the design

I'm quite confident this one will fail too.

# the plan

My plan was to use Node.js to magically generate some files by converting Markdown to HTML somehow (I was quite sure a package like that would exist, and I was right).

Initially, I thought I could use some Git branch trickery so that one branch had all the Markdown files and the other `gh-pages` branch would only have the generated files. I don't think that's how it works, though.

Clearly, I'm using Github pages.

# the packages

I was going to use [`markdown-js`](https://www.npmjs.com/package/markdown), but the Internet doesn't really seem to care about its existence. They all speak of the legendary [`markdown-it`](https://www.npmjs.com/package/markdown-it), so I used that instead.

I wanted a way to include metadata in the Markdown files, so I also installed the [`markdown-it-meta`](https://www.npmjs.com/package/markdown-it-meta) extension. I might also add some other extensions that can allow me to use superscript, etc. in Markdown in the future, but for now this is enough.

And finally, [Highlight.js](https://www.npmjs.com/package/highlightjs) for some fancy syntax highlighting.

# the design

I wanted to go with dark theme, but I didn't want the design to burn my eyes with its bright text on a black background. The only app I know that does dark theme well is Discord.

I hypothesised that having a dark green background image could work. I've used such a design before on my [Morse Code Player](https://sheeptester.github.io/telegraph/player.html) and the dark theme version of my [Billy Goat theme](https://sheeptester.github.io/themes/billy-goat/index-dark.html). They didn't burn my eyes, so that's good.

I recalled finding a rather nice image that could work; I Googled [`rain nature`](https://www.google.com/#tbm=isch&q=rain+nature) and found the image I was looking for: [this image](https://lh4.googleusercontent.com/proxy/ht8Uo3fjX0AWFR1t910tQjJw1Cw4PoYaS5gfrZgletc5OqILPjKuVqCjpLfHJLXTOZKcjwBywRJ1uMk0jfWje5hvbFAvqJMmch6pcYlkoRTYm0Cu=s0-d) (going to the image URL seems to automatically download the image). The [website](https://iusisnaturhotosdea.blogspot.com/2016/01/wallpaper-nature-rain.html) it was on doesn't seem to have any license or whatever, so I'm hoping I can steal it.

I used [Gravit Designer](https://designer.gravit.io/) to blur and shrink the image.
