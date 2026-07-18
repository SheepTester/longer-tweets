---
layout: post
# learnings from the hells of ucsd schedule of classes
title: TODO
description: ''
tags: []
---

notes:

- many examples from 2005 because that's year when i started testing my scraper and finding issues
- should explain normal format

# funny

exam wrong year:

// almost always the term year, except when there's a typo, like FA06 page
// 164, CSE 290, F00 MU, which is scheduled in 2009

weird course catalog links:

// SA10 page 46 HIEU 106GS links to SP18.html and idk if that's intentional
// idk why they only misspell "EXCLUDE" but SP19 page 500 RMAS 199 links to 'EXCULDE' and one before did 'EXLUDE'
// WI11 page 366 is the one with EXLUDE

section ID overflow:

// oh ok that's because their section IDs overflowed
// yeah this is section 1: https://courses.ucsd.edu/coursemain.aspx?section=1 (WI20 page 232, CSE 299)

weird section codes:

// two-digit second codes are usually typos i think
// SP06 page 274 IRGN section '23 ', which follows 022, 024, 025
// or FA08 page 65 BISP 190 cancelled section 'A0 '
// FA08 page 332 MAE 299 '50 ' (it is a bit more frequent than once in a blue moon)
// there's also FA08 page 359 MED 296 where they used O instead of 0
// ^ same with CSE 197 WI14 page 172 'GOO'
// FA14 page 397 NANO 299 has ' 10' which puts it before '001'
// FA16 page 295 HIUS 183, 'BOO' was cancelled and presumably replaced with 'B00'
// guess it's also not super rare
// SP19 page 412 NEU 296 has '00?' (cancelled), i guess they held shift or something ??
// SA01 page 32 PSYC 199 has ' 6 and ' 7'
// WI02 page 11 ANPR 195 has 'AA0'
// SP02 page 31 BGGN 271 has 'AAA'
// SP02 page 115 COGS 190C has 'XXX'
// SP20 page 228 DSC 500 and 599 have '0AC'
// WI25 page 182 COGS 190B has :00 (cancelled)

professor named error:

// instructor named 'Error, 243' in FA06 page 235 ERTH 40

# shocking

exam day is inconsistent:

// Can be inconsistent with date, see LIIT 1BX, WI97 page 257

accidental enrollable discussion:

// or in between, see FA05 page 68, BIBC 102, where they seemed to have accidentally made a discussion enrollable

incomplete conversion:

// there must be at least one enrollable
// nvm, see CSE 12, SA04 page 8. they converted CSE 12 from a DI-based A01
// to LE-based A02, resulting in a crazy situation:
// - 12: LE A00 (enrollable)
// - 12: DI A01
// LA A50 (cancelleed)

switching from 001 to A00

// there may be a numeric course where it has no enrollable meetings (and
// thus there are courses with both numeric and letter sections): SP00
// page 421 PHYS 1A accidentally created an 001 then switched to A00

skipping numbers:

// WI95 page 188 ECE 121B skips A50
// WI95 page 276 HUM 4 skips A06

A50 means nothing

// SP95 page 447 PEDS 232 has A51 DI
// WI10 page 529 TDPR 1 has A50 LE

annoying SOMI heading:

// new department with no repeated subject header seems to only happen
// with 'Sch of Med Interdisciplinary Crses', e.g. FA07 page 518

mojibake:

// 'What=Algebra, What=Analysis' SP09 page 340 MATH 87
// 'MoliÛre et les conflits' WI11 page 318 LTFR 122
// - pretty sure this is mojibake. but looking at the untrimmed HTML, the
// full string is still 30 chars even with the mojibake. so ig they're
// stored as 30 bytes not chars, which makes sense
// - because they send their HTML with 'Content-Type: text/html;charset=UTF-8'
// 'El cine de Pedro Almodìvar' WI11 page 322 LTSP 129
// - should be Almodóvar
// 'Poes¥a reciente' WI11 page 322 LTSP 141
// '_LA_' SP11 page 322 LTSP 174
// 'God,Satan,& the Desert *$95fee' FA12 page 238 ERC 87
// - yes they put the dollar fee into the topic. it is for an anza borrego trip
// 'Du Moyen-Age ë 1789' FA12 page 316 LTFR 115
// 'La Litt©rature fantastique' WI13 page 317 LTFR 141
// 'Hyperk\"ahler manifolds' MATH 206A, FA18 page 363
// 'Machine Learning forÿRobotics' SP22 page 204 CSE 291

no instructors, not even staff:

// instructors may or may not be mentioned for unenrollable sections
// or enrollable, see PHYS 1AL, SA04 page 31

# boring

meetings are not sorted by either section id or code:

// apparently neither sectionCode nor section ID are sorted, see PEDS 232, FA95 page 360

// section IDs are not necessarily sorted (FA95 page 360 PEDS 232)

summer quarters only showed up in 2024, and inconsistently:

// even in SA24 page 1 some are missing this like AIP 197

course with only cancelled exams:

// if restrictions id is 0, then there should be no enrollable sections
// e.g. WI05 page 432 PHYS 239, which only has cancelled exams

duplicate extra meeting:

// - SPPS 201, FA05 page 124 has two extra times for its lecture, but it's got
// to be a mistake because why do they have two friday sessions ??
// whatever..

// - SP13 page 100 CAT 124 has three extra meetings, though it seems to be a
// duplicate pair

detached:

// - WI06 page 422 PHYS 2A has two extra C00 lectures attached to.. nothing
// ... followed by a regular unenrollable meeting

extra meeting location TBA:

// assume location of extra meeting will never be TBA
// nvm they apparently can be, SA05 page 46, MGT 111.

duplicate enrollable with same section code:

// Note: there can be two enrollable sections with the same section code
// (SA09 page 3 BENG 199)

lab can be A00 or A01:

// WI95 page 41 BGGN 271 has lab a00
// WI95 page 1 AMES 5 has lab A01
