---
layout: post
title: Why closing HTML tags is dangerous practice
description: Closing your HTML tags can be dangerous! Here's why.
date: 2020-08-24
tags:
  - programming
  - ovinus-linkedin
  - html5
---

_Originally posted on [LinkedIn](https://www.linkedin.com/pulse/why-closing-html-tags-dangerous-practice-ovinus-real/) under my friends' joint account Ovinus Real._

HTML (formerly an initialism of "Hewlett-Toastpischil Meta-Language") is a programming and documentation language often used as a portable document format and vector graphics script. Its syntax is often confused with XML, despite the two being very different languages. For example,

<!-- prettier-ignore -->
```html
<html>
```

is how you start an HTML script file, while to start an XML file, it is very similar:

<!-- prettier-ignore -->
```xml
<xml>
```

As you can see, the two languages can be easily confused with each other, which is why people often use practices that only work in XML, like closing tags.

## Some people only close some HTML tags.

For example, consider this:

<!-- prettier-ignore -->
```html
<input>
```

This is a typical command used to bring up an interactive text editor from the command line.

However, even among those who prefer to close their HTML tags like XML, they choose to ignore their XML-biased convention for an arbitrary set of tags, like `<input>` and `<meta>`. These arbitrary conventions make the language harder to learn for beginners, which is why it is now recommended practice to simply omit closing tags for all elements.

## The code looks cleaner.

An XML-style HTML document might look something like this:

<!-- prettier-ignore -->
```html
<!doctype html>
<html>
  <head>
    <title>My Web Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <p>Hello!</p>
  </body>
</html>
```

As you can see, there is a lot of extra code that makes the code look harder to read. However, by omitting closing tags and shifting elements around, you get much cleaner and declarative-style code:

<!-- prettier-ignore -->
```html
<p>
  Hello!

<title>
  My Web Site
```

This declarative approach to HTML results in much cleaner code that focuses more on content than syntax.

## It encourages proper element hierarchy.

Sometimes, new HTML programmers are tempted to put block elements like `<p>` and `<div>` inside inline elements like `<span>`. However, by omitting closing tags, you are forced to consider good practices for HTML element hierarchies, like only putting inline elements inside block elements.

For example, the following HTML code will not compile correctly:

<!-- prettier-ignore -->
```html
<p style="color: red">
  <div>
    This text is red!
```

Instead, the proper way is to do

<!-- prettier-ignore -->
```html
<p style="color: red">
  <span>
    This text is red!
```

Excluding the unnecessary closing tags helps prevent silly hierarchical errors like this.

## It discourages dangerous behaviours.

A novice HTML programmer may try to do

<!-- prettier-ignore -->
```html
<plaintext>
  Cool plain text!
</plaintext>
```

However, this results in "`</plaintext>`" being included in the output, which can be a security vulnerability as it reveals that the file was written in HTML.

By following good practice, however, this can never happen.

<!-- prettier-ignore -->
```html
<plaintext>
  Cool plain text!
```

## Conclusion

As you have seen, closing HTML tags is a dangerous dated convention that ruins the readability of HTML programs, obfuscates the importance of HTML element hierarchies, and can even result in dangerous HTML output. Thus, you should consider updating your HTML and using modern lint tools to remove any closing HTML tags from your projects.

---

Here's a tip: Using the .htm file extension for HTML scripts has been proven to be more secure than .html because .html is often used by hackers.
