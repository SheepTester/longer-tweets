---
layout: post
title: hypercomplex UGWA
description: How UGWA deals with alternate schedules
date: 2019-08-10
tags:
  - programming
  - school
  - html5
---

The [Unofficial Gunn Web App (UGWA)](https://orbiit.github.io/gunn-web-app/) is an unofficial progressive web app that shows the schedule for [Henry M. Gunn High School](https://gunn.pausd.org). Gunn’s weekly schedule is already complex, with seemingly arbitrary permutations of periods, but when a single day goes missing from a week or an assembly is required for all grades, the arrangement of the periods shift rather unpredictably. These new arrangements are mostly why students use UGWA; Google search analytics show that searches for UGWA spike slightly higher during weeks with alternate schedules. However, UGWA was not built with these alternate schedules in mind, resulting in an extremely complicated relationship between them.

## Origins: Gunn Schedule

UGWA is the successor to my first attempt at creating a web version of the [TheGunnApp](https://apps.apple.com/us/app/thegunnapp/id1141159201). Dubbed [Gunn Schedule](https://orbiit.github.io/gunn-web-app/schedule/), it was built using [Materialize](https://materializecss.com/), a CSS framework implementing [material design](https://material.io).

There were several problems with it. It wasn’t very lightweight, as it had to include Materialize and jQuery to function. It also didn’t work very well on iOS Safari; the [Application Cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache), which was used to make the app work offline, only was able to cache some files and thought it was enough, so the app broke in iOS. However, most importantly, the app wasn’t made for alternate schedules.

The school published a PDF containing all the alternate schedules, but I struggled with converting it to a better format; it always ended up being a mess of badly formatted plain text, so I had to [tediously clean up the text](https://orbiit.github.io/gunn-web-app/json/alt-schedules-2017-18.txt) in order to make it easier to parse and turn it into a usable JSON file.

By then, I realized that Gunn Schedule was not made for alternate schedules, so I rewrote the app from scratch, making what is now known as UGWA.

## `scheduleApp`

The entire schedule-displaying part of UGWA had been built as a component; its wrapper, the period styles, the normal 5-day schedule, and the JSON file with alternate schedules were passed into a function that took care of rendering it all.

For some reason, the normal schedule was stored in a different format than the alternate schedules, so UGWA had [two separate scripts that were essentially the same](https://github.com/Orbiit/gunn-web-app/blob/0d9b440082ba043bbb70ffd7f57dc9e4fd392ab4/schedule/app.js#L45-L99), rendering a given schedule, but each was made specifically for their unique format. It wasn’t until [I added SELF support](https://github.com/Orbiit/gunn-web-app/commit/4a0f390ca1798bab5b63d26f69dcb9829a61470f#diff-aa734357f6890895acc756d30f295067) when I finally made the normal schedule format the same as the alternate schedule format, rendering the code duplication redundant.

However, the JSON file of alternate schedules quickly proved to be problematic. The school’s PDF was merely a set of _planned_ schedules, and they did not hesitate to announce last-minute changes to the schedule. I had to manually update the JSON file whenever I discovered changes to the schedules, and in lieu of these rapid changes, I did not cache the file offline, meaning that alternate schedules wouldn’t work offline.

## `altScheduleGenerator.js`

It was time to make the app parse schedules on its own. The school happened to also display alternate schedules on their Google Calendar, embedded on the school website. Using the [Google Calendar API](https://developers.google.com/calendar/), I could make my app fetch and parse all the alternate schedules. The Android version of the Gunn App also does something similar but [uses a primitive parsing technique](https://github.com/RiceCakess/TheGunnApp/blob/d12570803e678f17ccb0f688f5dc2dae2fee294b/app/src/main/java/xyz/dchen/thegunnapp/GunnCalendar.java#L121-L162).

Parsing the alternate schedules turned out to be rather difficult, as demonstrated in this expanding brain meme.

[![expanding brain meme with alternate schedules getting more and more complicated](https://sheeptester.github.io/alt-schedule-parser-tester/expanding_brain_meme.png)](https://sheeptester.github.io/alt-schedule-parser-tester/expanding_brain_meme.png)

My first approach: split the periods by newline characters, and for each line, get the time information from between the parentheses; whatever is before the parentheses will be the period name. The times are in 12-hour format, but don’t specify am/pm, so if the hour is less than 6, I assumed it was in the afternoon.

However, for some reason, the school started using a Google Calendar client that supported HTML formatting, and because of this, a “new line” to the school was just a paragraph element to me; my parser would have to find all the HTML paragraphs and turn them into plain text line. In addition, sometimes the school omitted parentheses around the time range, so I had to prepare for that.

Still, more HTML started popping up, so the parser had to get rid of the tags first and then convert the HTML entities to plain text characters. For some reason, some periods got put in the same line, separated by a comma, so these had to be split apart as well. There were also periods who had the same starting times, so those periods had to get merged.

My method of getting rid of HTML tags was too primitive, and soon the school introduced `style` tags, so I had to update my parser.

At some point, when pasting in alternate schedules, the school got rid of all the newline characters, so the parser now had to intelligently insert new ones after the time range parentheses.

Then I had to make it treat `<div>` and `<br>` tags like it did for the paragraph tags.

My previous methods for getting the period name had to be redone when the school added text _after_ the time range; now it would find and remove the time range, and make the rest of the line the period name. Back to school night also introduced the school’s usage of `pm` for hours after 6 pm, so I had to implement support for that as well.

When identifying the type of periods, the parser also had to consider the word `turkey` as an alias for lunch, and similarly `development` was made a keyword for a no-school day. Using `assembly` as a search string didn’t work for `assemblies`, so I made it look for `assembl` instead. However, using `holiday` to detect holidays became problematic when two innocent events named “Freshman Parents’ Holiday Social” and “Staff Holiday Luncheon” appeared, so for now it only uses events to declare a no-school day when the calendar event’s description is empty. Also, there was a day with an extended lunch, but the event summary only included `lunch` without `extended`, so I made it detect that.

During CAASPP testing week, they listed periods that took place during other periods; how I made the parser deal with it is beyond the scope of this article (because I don’t remember how). Also, the parser had to compensate for the school misspelling lunch as `unch`.

The most recent change I made at the time of writing is when a newline unexpectedly appeared before the time range parentheses, which broke UGWA; the parser simply finds and removes those newlines.

## Ugwita

After writing the first version of the parser, I didn’t immediately use it in UGWA. I instead created an entirely new app: [UGWA Lite (Ugwita)](https://orbiit.github.io/gunn-web-app/lite/), aiming to be even more lightweight than UGWA, with minimalist features. It would fetch, parse, and store the alternate schedules, making it possible for alternate schedules to display while offline.

To update the alternate schedules, I added a “Refresh alternate schedules” button; this ended up being one of the worst UGWA features, in my opinion.

Eventually, I ditched UGWA’s reliance on a JSON file and made it dependent on the stored alternate schedules on Ugwita. New users would be briefly redirected to Ugwita, where it would fetch and store the alternate schedules, before being redirected back to UGWA. UGWA still operates on the old alternate schedule format, but instead of updating it, I made a converter that converts Ugwita’s alternate schedule format to UGWA’s legacy format.

I reminded the UGWA users to regularly visit Ugwita to refresh their alternate schedules, but no one seemed to listen. The way Ugwita stored alternate schedules allowed me to make it update every number of days, but I ended up never implementing that.

Eventually, I copied over the schedule parsing code from Ugwita and made an extremely complicated system where when the user fetched the events for a day, it would also try to parse an alternate schedule out of the events. This worked quite well and is likely a better alternative than having users press a refresh button.

Ugwita doesn’t store the name of a schedule, but UGWA does (because the formidable PDF had names for each schedule), so this discrepancy is why a user may see “good luck with our schedule lol” when viewing an alternate schedule offline.

It wasn’t until quite recently when I finally copied over the rest of Ugwita’s schedule fetching code, and now UGWA no longer briefly redirects new users to Ugwita, which from what I saw had confused them.

## SELF

Some people requested that I added SELF support, so I did. It only complicated UGWA’s relationship with Ugwita because although Ugwita wasn’t made to display SELF, it still had to fetch the days on which there was SELF.

Even today, UGWA’s SELF support is rather flawed. It fetches all the dates of SELF events from the school calendar, and on those days, it replaces instances of flex with SELF. However, there are days, such as those with assemblies, when there are both flex and SELF periods; UGWA intelligently detects those cases by seeing if SELF is explicitly listed, as it usually isn’t, and if so, it won’t replace all instances of flex with SELF.

Ugwisha, a rewritten version of UGWA, deals with SELF in a more sophisticated manner, and even properly detects SELF grades to the point where normal Thursdays without SELF are considered to be alternate schedules. However, that’s beyond the scope of this article, mostly because I don’t find Ugwisha as interesting of an app to make fun of.

## Conclusion

UGWA’s alternate schedule system is a mess of hacky solutions and bodges piled on each other; if you don’t want your Gunn app to compute the mass of the universe just for some alternate schedules, you should use the better-optimized Ugwisha.

Edit: Added something about `unch`.
