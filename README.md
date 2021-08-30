# Longer Tweets

A blog made with [Jekyll](https://jekyllrb.com/).

I usually post random thoughts on Twitter because they're usually short enough
for a Tweet, but sometimes I have thoughts that I desire to express in a blog
post length post, so I'll post them here as longer Tweets.

## Development

This starts a local server at http://localhost:4000/.

```sh
$ bundle exec jekyll serve
```

## Writing new posts

Posts are Markdown files in the `_posts` directory that starts with a YAML
header. For Jekyll reasons, the name of the file must be
`YYYY-MM-DD-post-id.md`, where `post-id` is the ID used for the URL.

```md
---
layout: post
title: post title
description: A brief introduction
date: 2020-03-13
tags:
  - tag1
  - tag2
  - tag3
---

Begin post here.
```

`title` - The title of the post. I usually make my titles all lowercase because
all lowercase titles are HIP and MODERN ✨😎✨. They're displayed in the index and
post pages.

`description` - A short introduction to the post. It's only displayed on the
index page. More recent longer Tweets have capitalized descriptions, but older
ones used a lowercase phrase.

`date` - The creation date of the post. This is used to sort the posts on the
index page in reverse chronological order. It's also shown in the index and post
pages.

`tags` - Tags are used to categorize posts; they're lowercase and use hyphens as
a word separator (eg `english-hate`, `gamepro5`). They're shown both on the
index and post pages.
