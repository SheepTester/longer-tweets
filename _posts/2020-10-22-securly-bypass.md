---
layout: post
title: bypassing securly
description: A little mistake by the student right robbers
date: 2020-10-22
tags:
  - school
  - programming
---

If your school uses [Securly for Chromebooks](https://chrome.google.com/webstore/detail/securly-for-chromebooks/iheobagjkfklnlikgihanlhcddjoihkg), there's a pretty easy way to bypass some blocked websites like Discord.

**TL;DR**: Add `?suicidepreventionlifeline.org` to the end of the URL.

## Inspecting the code

Chrome extensions are "open source" (as are websites and apps) because Chrome needs to know what to execute. So, looking at [Securly's code](https://robwu.nl/crxviewer/?crx=https%3A%2F%2Fclients2.google.com%2Fservice%2Fupdate2%2Fcrx%3Fresponse%3Dredirect%26os%3Dwin%26arch%3Dx86-64%26os_arch%3Dx86-64%26nacl_arch%3Dx86-64%26prod%3Dchromiumcrx%26prodchannel%3Dunknown%26prodversion%3D86.0.4240.111%26acceptformat%3Dcrx2%2Ccrx3%26x%3Did%253Diheobagjkfklnlikgihanlhcddjoihkg%2526uc), in `securly.min.js`, most of the code responsibly checks for domain names in `url.hostname`.

However, on line 913,

```js
910 if (e.requestHeaders.forEach(function(e) {
911         "Purpose" == e.name && "prefetch" == e.value && (t = !0)
912     }), !t) {
913     if (-1 != e.url.indexOf("suicidepreventionlifeline.org")) return onBeforeRequestListener(e);
914     var o = e.url;
915     if (1 == interceptOrNot(e)) {
```

Here, if it finds `suicidepreventionlifeline.org` in the user's URL, it'll short circuit and allow the web page request through. Interestingly, although it's checking for a domain name here, it's checking it in `e.url`. Indeed, adding `?suicidepreventionlifeline.org` to the end of the URL includes it in `e.url`, so `-1 != e.url.indexOf("suicidepreventionlifeline.org")` evaluates to true, allowing any site to be let through.

Why might this be the case? Perhaps it is to allow redirect links like `https://l.facebook.com/l.php` to suicide prevention material from being blocked even if the parent site is blocked, which could happen if someone copies a URL from the site without visiting it first.

For some reason, however, some sites like [JSFuck](http://www.jsfuck.com/) can't be bypassed using this technique.
