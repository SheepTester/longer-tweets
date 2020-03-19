# Longer Tweets

I usually post random thoughts on Twitter because they're usually short enough for a Tweet, but sometimes I have thoughts that I desire to express in a blog post length post, so I'll post them here as longer Tweets.

When you run

```sh
npm run build
```

it'll grab the posts in the `_posts` directory and compile them.

Posts are Markdown files in the `_posts` directory that starts with a YAML meta declaration:

```md
---
title: post title
description: A brief introduction
date: 2020-03-13
id: 0
tags:
  - tag1
  - tag2
  - tag3
---
Begin post here.
```

`title` - The title of the post. I usually make my titles all lowercase because all lowercase titles are HIP. They're displayed in the index and post pages.

`description` - A short introduction to the post. It's only displayed on the index page. More recent longer Tweets have capitalized descriptions, but older ones used a lowercase phrase.

`date` - The creation date of the post. This is used to sort the posts on the index page in reverse chronological order. It's also shown in the index and post pages.

`id` - This is optional; it's only used to properly sort two posts made on the same day. A higher ID means the post was created later in the day.

`tags` - Tags are used to categorize posts; they're lowercase and use hyphens as a word separator (eg `english-hate`, `gamepro5`). They're shown both on the index and post pages.

The rest of the post is written in Markdown. Headings should start with h2 (h1 is reserved for the post title). Headings also will get a fancy # link that can be used to link to a specific heading. Code highlighting is supported using Highlight.js; it uses the Tomorrow Night theme.

At the bottom of the post page, there's a "Last edited" link that includes the date and time when the file was last edited, and links to the commit history of the post source on Github.

Tags link to the index page, appending `#` followed by the tag name in the URL. Javascript is used to filter the posts by the tag.

`builder.js` uses a function `completeHTML` to fill in a template as defined in the `_templates` directory for the index page and each post's post page. Posts become an `index.html` file in a directory named after the source file name.

