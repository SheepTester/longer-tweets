---
layout: post
title: web server deprecation notice
description: Landing page for archived pages that previously relied on my web server.
date: 2026-06-14T16:04
tags:
  - programming
image: auto
---

I like making many small, independent projects that continue to work indefinitely, and projects involving a backend are the antithesis of this.

I currently have a [7-year-old express.js server][repo] running on a Windows mini PC at my parents' house. Originally made for [Elimination], its scope has expanded as I reused the infrastructure for various other projects that needed a backend, and now it uses 3–4 different databases and is a pain to debug whenever the server doesn't start.

[repo]: https://github.com/SheepTester/web-server
[elimination]: https://orbiit.github.io/elimination/

I plan on winding down this server to rewrite it and switch the mini PC to Linux, and I'm only planning on migrating a fraction of the original's functionality. Therefore, this serves as a landing page for any features on my websites that rely on this web server. Fortunately, the list is small, and these projects probably aren't being used by anyone anymore.

## UGWA

[UGWA] was already deprecated in the fall of 2021. It has three features that use my web server.

- **Interstudent communication.** The chatroom will be turned into a public, static archive.

- **Assync.** The feature will be disabled, and you will not be able to export your data.

- **Usage tracking.** It seems like I disabled this feature a while ago, but I may publish the data (users per hour) in the future.

[ugwa]: https://orbiit.github.io/gunn-web-app/

## Elimination

[Elimination] was only used for a few months before Covid began in March 2020. It was designed to support other user-created games as a full replacement for the assassination website that predated it, but I suspect it hasn't seen much usage outside of the Gunn 2020 game it was made for.

- Login/signup will be disabled and will link to this page.
- I will restore the home page button that linked directly to the Gunn game, which remains in a frozen state after it was paused indefinitely during Covid.
- The entire website will reflect a static archive of already-public user and game data.

## Yearbook signing

[Yearbook signing][yearbook] was a virtual replacement for me drawing sheep in yearbooks. Before Covid, I'd draw a sheep and assign them a number based on the number of sheep I've drawn for yearbooks so far.

The number will be fixed to the last value of the counter.[^counter]

[^counter]: I believe someone spammed the endpoint a few years ago, so now it's in the ten thousands.

[yearbook]: https://sheeptester.github.io/yearbook-signing/

<!-- ## Schoology dislikes

[Schoology dislikes][dislikes] is a userscript that adds a dislike button to Schoology.

At this point, the userscript is unlikely to work.

[dislikes]: https://www.youtube.com/watch?v=TkNoMWBd3Xg -->

## Unaffected pages

I plan on migrating the following services to the new web server, so these won't be affected:

- [**AS Finance Calendar**][as-finance] is a stateless wrapper around [A.S. Finance's "List Funded" website][list-funded], and it seems to still recieve human usage.

- [**free food events at ucsd**][free-food] is a proxy for the MongoDB Atlas database that stores the scraped free food events. Even if I decide to stop scraping Instagram for free food events (since I personally no longer need them), the website will remain up as an archive of past events.

- **notes** will remain since I still use it.

[as-finance]: https://sheep.thingkingland.app/as-finance/
[list-funded]: https://finance.ucsd.edu/Home/ListFunded
[free-food]: https://sheeptester.github.io/ucsd-free-food/

<!--

- link to github
- explain why
  - web-server sucks
  - rewrite with linux + sqlite + typescript, still express
- complain about backend projects
- hence why projects are few and with no users

affected projects:
- ugwa
  - disable interstudent comm, assync, link here
  - interstudent comm public archive
  - assync data will not be available
  - may publish ugwa usage data
- elimination
  - disable login/sign up, link here
  - link to gunn page from home page
  - static archive of already-public user and game data
- yearbook signing: manually input current count
- schoology dislikes
  - data not available
  - probably doesnt work anyways

will be removed:
- colour
- errors

unaffected:
- as-finance
  - still sees users
  - analytics will be in sqlite, remain publicly available
- note
  - i still use it
- free food


 -->
