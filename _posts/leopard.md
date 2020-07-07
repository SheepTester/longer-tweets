---
title: leopard
description: A random rant about the new Scratch to JavaScript converter
date: 2020-07-06
tags:
  - scratch
  - thoughts
  - html5
---

[PullJosh](https://scratch.mit.edu/users/PullJosh/) recently released what is now known as [Leopard](https://leopardjs.now.sh/) (which I keep misspelling as "Leapord"), which translates Scratch projects to JavaScript. It seems quite promising, although currently many projects don't work when translated, which to me seems reasonable. Leopard's intended use is to extend the capabilities of Scratch by opening access to all of JavaScript's Web APIs, not necessarily to teach JavaScript. However, having made the [HTMLifier](https://sheeptester.github.io/htmlifier/), I believe that Scratchers will nonetheless see this as a way to step from Scratch to JavaScript.

## Not all projects will work in Leopard

Perhaps the converters of Scratch to HTML/JS could be plotted on a spectrum, with accuracy on one end and editability on the other. My HTMLifier, for example, sacrifices editability for accuracy; it directly uses (roughly) the same Scratch VM that Scratchers use on the Scratch website, meaning that their project should work exactly the same when HTMLified. However, this is not ideal if the Scratcher wants to see what their project might look like in HTML/JS since all they would see is the large, minified Scratch VM JavaScript and their .sb3 project file as a data URL, neither of which are meant for editing.

I'm not very familiar with [Forkphorus](https://forkphorus.github.io/), but I believe it compiles Scratch blocks to JavaScript for better performance rather than having JavaScript interpret each block one-by-one. This means that Forkphorus uses a completely rewritten engine for executing Scratch projects, so there are slight differences that could lead to slightly different behaviours in Forkphorus. Regardless, the generated JavaScript isn't meant to be easily read and edited by a JavaScript learner.

```js
(function() {
S.isPenDown = true;
S.dotPen();
VISUAL = true;
S.moveTo(S.scratchX + 4, S.scratchY);
if (S.visible || S.isPenDown) VISUAL = true;
S.isPenDown = false;
queue(24); })
```

You can see some resemblance to Scratch blocks, but it's not exactly intuitive how everything works. For example, setting `VISUAL` to `true` twice seems pointless, but there's probably some internal reason why it's done (maybe it's just to make the JavaScript equivalent of a block regular). Thus, I'd say it'd be somewhere in the middle of the spectrum.

Leopard satisfies the niche of sacrificing accuracy for the usability of the generated JavaScript code. The generated JavaScript is all accessible, neat, and legible, and all the special methods from the library are intuitively named; all the internal details are hidden away by the library.

Yet in some cases, Leopard seems to prefer native JavaScript APIs, probably to introduce some basic JavaScript to the Scratcher. However, in these cases, the projects often break. For example, at the time of writing, the `<[] contains []?>` block becomes JavaScript's `.include`, but it didn't explicitly cast the value to a string. Thus, it would throw an error when the value of a variable was a number. Indeed, it seems many errors are because while Scratch automatically casts numbers to strings for string-related blocks, JavaScript doesn't. [PullJosh notes](https://scratch.mit.edu/discuss/post/4194496/) that he could simply add `.toString()` everywhere, though it isn't very elegant. All in all, I wouldn't expect all projects to work exactly the same in Leopard, even when all the more common issues are fixed.

Leopard also recommends that the [`<[] = []>` block become JavaScript's `==` operator](https://leopardjs.now.sh/translations/operators). Scratch's `<[] = []>` block, in reality, has some niche differences, which fortunately do not occur often and are instead used to detect Scratch vs. Forkphorus/Leopard. In addition, however, Leopard's recommended sandbox's automatic linter has been noted to [complain about the usage of `==`](https://scratch.mit.edu/discuss/post/4194073/), which raises an excellent point: `==` isn't a recommended practice in JavaScript.

## Using Leopard to learn JavaScript

Leopard only boasts that it can be used for extending capabilities that aren't offered in Scratch; it does not explicitly state that it is for learning JS. I feel, however, that Scratchers will naturally see Leopard as a starting point for learning JavaScript.

There's nothing wrong with starting with Leopard. Indeed, it uses new(ish) features such as the obscure generators and ES modules. However, except for the repeat block, common features of JavaScript like `let` (analogous to script variables in Snap!) aren't used for variables; Leopard uses a `this.vars` object instead because they behave more like Scratch variables.

However, I don't see it being a problem that all the "real JavaScript" is being hidden behind all of Leopard's methods. A common criticism of [Code.org](EEEEEEE) is that the code it generates is all pseudocode---when run on its own, it throws a ReferenceError. However, I'd argue that these days, in most programming languages, people don't use native functions and methods on their own. The functions generated by Code.org and Leopard could be from a *library*---a foreign concept to Scratch. (Code.org probably has no import statements because, on the web, modules had to be loaded in a separate script tag; also it seems Code.org's "Show code" button is now more verbose, probably in response to this criticism.) Perhaps one could write a project completely from scratch in Leopard ([which is possible, but not recommended](https://scratch.mit.edu/discuss/post/4196264/)), using it like one would with p5.js.

As a final note, when Scratchers use Leopard to move on from Scratch, they'll still face the same problems they would when moving on to any other programming language. Scratch isn't merely a programming language; contrary to the claims of certain Scratchers, Scratch is social media. Departing Scratch means departing a world of safety: the community for the Scratch programming language all resides on the website, away from the toxicity of edgy teens (not really) and adults and heavily moderated under the hand of stern but forgiving Scratch Team, allowing parents and schools to allow students access to what on the surface seems to merely be another piece of educational software. Despite claims otherwise, the attractiveness of becoming popular on Scratch is what drives many to Scratch regularly and pursue computer science. Yet moving beyond Scratch proves to be a filter of whether one truly enjoys programming and desires to trek deeper into it, or if they're only there as a substitute for the other social media and entertainment that their parents have blocked. Leopard seems to aim to overcome this by advertising that converting projects to JavaScript increases "publishing options," with the ability to post your project as an easily shareable website. This indeed is one of HTML5's upsides as being the next step beyond Scratch, but without a centralized community like Scratch, there's nowhere for these websites to be shared, and the Scratch website's ever-present warmth may draw the beginner JavaScript programmers back.
