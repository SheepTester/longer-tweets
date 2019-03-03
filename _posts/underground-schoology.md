---
title: underground schoology difficulties
description: I made a secret social medium.
date: 2019-02-23
tags:
  - programming
  - html5
  - userscripts
  - school
---
Schoology is a dumb wannabe Facebook for schools where teachers and staff can post resources, events, updates, and places for students to upload assignments. When I found out that one could still comment on courses (apparently disabling commenting only hides the comment box) and obstructed a course update page with an embed (apparently Schoology posts can use some HTML and can also use Schoology’s CSS classes), we lost faith in Schoology and sought other ways to break it.

The school had recently shut down our FLEX10 course, which was a useful means for me to shamelessly self-promote my own creations, so we were now also looking for a way to publicly post elsewhere.

## Portfolios

I decided to experiment with portfolios to see if they could be automatically created. By watching the network tab in developer tools and following the execution of their minified JavaScript in the sources tab, I deduced a few URLs they used to create, edit, and access portfolios, which was sufficient for me.

For example, to read a portfolio, one sends a GET request to `https://pausd.schoology.com/portfolios/users/{UID}/portfolios/{portfolio ID}/items/{page ID}` with the `X-Csrf-Token` and `X-Public-Hash` headers set. The UID can be easily obtained from many places, such as the link to the user’s profile. Schoology has defined `siteNavigationUiProps.props.user.uid`, which holds the UID, so I used that instead. The portfolio ID, page ID, and public hash are obtained from creating each one. The CSRF token is obtained from making a GET request to `https://pausd.schoology.com/portfolios/init` and doesn’t have to be the token of the owner of the portfolio. Interestingly, anyone can read a portfolio page given these values, even if the portfolio isn’t published.

## Underground Schoology

I started working on using this for an idea I had: a second social media platform added to Schoology by means of an extension or a userscript; the school probably wouldn’t have it installed, so it would be hidden from them, or “underground.”

The first version only worked in the console. It could load and create posts, comments, and likes. It was hard to use, so it was hard to get other people to use and test it. So, I moved on. The code proved to work; most of it still remains up to the current version at the time of writing (pre-1.1.18). You can see some of the history of the userscript I wrote [here](https://gist.github.com/SheepTester/d51c3a60b5ff2c3391b68dc6ca39342a/revisions).

## The Design

I was rather hyped about the idea of only being able to write to your own data; it posed interesting limitations that would force its features to be unique. For example, if you wanted to send a message to your friend, you’d have to put your message in your own data and wait for your friend to read your data to receive it.

My idea relied heavily on the concept of “following.” You had to follow users in order to receive data from them. Every time the Underground was loaded, you would fetch the data from the people you follow, and then you could piece together the posts, comments, and likes. To comment on a post, rather than attaching the comment to the post’s data, you simply add the comment to a list of your own comments, specifying the post it belongs to. When people fetch the user data from the poster and you, they can attach your comment to their post on their end. A similar system could be used for liking. In order to grow a network, one could have access to everyone the people they follow are following; that way, they could recursively follow the people followed by the people they’re currenting following to follow everyone in the network. This is the current system used in the Underground.

I talked with my friends about this concept, and many of them suggested a centralized server—either a Firebase server or someone’s portfolio—who would receive everything, organize the data, then everyone could just fetch the data from the central server once. I wasn’t a fan of either idea; when I created [F Word](https://sheeptester.github.io/words-go-here/f-word/), Firebase went down frequently when people liked posts too much, and relying on a central portfolio requires someone to stay online the entire time, but eventually they will go offline and the network will die.

I preferred a decentralized system instead; if the teachers ever wanted to hunt down the network, they’d have to go through everyone’s portfolios rather than simply demanding a single person to hand over their user data. It also allowed separate networks to coexist without ever acknowledging each other’s existence.

I predicted a few problems with my system, but I decided they were fine in the end. Sometimes comment sections can be larger than you think simply because you aren’t following everyone. Following can be one-way, so someone could follow the entire network without them noticing, allowing them to stalk the network.

I did consider a different version that would have separate live “chatrooms” with different “hosts” that would act as a local central server, but I decided to save that for another time.

## Problems

When one spam-clicks a link too often, it’ll return a notice saying that they have a limit of 15 requests per five seconds. I thought that perhaps this restriction only applied to web pages, not the API requests for portfolios. When I spam clicked the like button, all of the requests worked, so I thought I was right.

Then one of my friends introduced a bunch of people to Underground Schoology, and following them all ended up resulting in many “[user not loaded]” accounts, which was a placeholder for when a user failed to load (if, for example, the account was deleted). We suspected that it was the 15 request per five second restriction making a comeback.

I tried a bunch of different ways to slow the requests down, but even when only fifteen requests were made in a five second period, the last few would consistently fail. I tried different timings, spacing the requests out or sending them in batches every few seconds, but they all still resulted in errors.

In addition, Schoology would first return a 500 error when too many requests were made, then 404 errors for subsequent requests; however, a 500 error with the same response body would also be returned if the portfolio was deleted, so there was no easy way to detect a deleted account without trying a bunch of times until giving up.

In the end, I gave up and simply used a brute force method: send and resend a bunch of requests as fast as possible until they all work, or they fail too often, in which case the program assumes the portfolio was deleted. My friend still resulted in many “[user not loaded]” accounts, and I suspected that his internet was so fast that the requests failed too often too quickly, so I told him to increase the tolerance in the meantime.

## Other features

I made the Underground from the start to be able to coexist with other “flavours” of the Underground after we came up with many different systems that we could use instead. [UnsignedByte](https://github.com/UnsignedByte) created a mod of the Underground called Mantle, which you can download [here](https://github.com/UnsignedByte/underground/raw/master/mantle.user.js).

I wanted to add formatting to posts. Schoology simply allowed direct HTML (albeit with a whitelist of tags, attributes, and styles), but I didn’t feel like having to parse the HTML, though those vulnerabilities did make posts interesting. I instead hastily made a new markup language, [Underground Markup](https://sheeptester.github.io/hello-world/underground-markup.html).

I decided not to allow name changing because it would cause confusion; the user ID system was too complex to be able to be used to identify people who changed their name. I also decided to not allow deleting posts and comments; rather, people could just edit their posts and comments away. Of course, both of these could still be done by directly modifying the user data in the portfolio.

Also by modifying the user data, one could also set the date to a very late date, which could be used to pin a post to the top. There isn’t really a good way to fix this other than using the honour system.

I feel like the current method of installing Underground Schoology is too complex; it requires getting a browser extension like [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) to run a userscript, then also installing the [userscript](https://github.com/SheepTester/hello-world/raw/master/underground-schoology.user.js) and occasionally keeping it up to date. Hopefully one day it’ll become a Chrome extension.
