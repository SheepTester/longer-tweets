---
layout: post
title: licenses as protestware
description: The MIT license requires your consumers to reproduce your copyright notice verbatim, so you can make them say whatever you want.
date: 2026-07-25T14:17
tags:
  - programming
image: auto
---

This is the [MIT license][mit]:

[mit]: https://choosealicense.com/licenses/mit/

> MIT License
>
> Copyright (c) \[year] \[fullname]
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

The MIT license is nice partly because its short,[^permissive] which is why I'm quoting it here.[^mit] It simply requires that you keep the copyright notice and the MIT license verbatim somewhere.

[^permissive]: Some people would disagree that the MIT license is "nice" because it and other permissive licenses don't require corporations keep their forks of the software open source, so they reap the benefits of free software without giving back. But that's outside the scope of this article.

[^mit]: I also exclusively use the MIT license for code, so I don't know enough about other licenses to speak of them.

Most apps that use open source libraries usually list these licenses in a dedicated "Licenses" tab. For example, Android lists them in Settings > About phone > Legal information > Third-party licenses. Discord has a [Licenses page][discord-licenses], accessible from the desktop app via Settings > More (in legal footer) > Acknowledgements > View licenses.

[discord-licenses]: https://discord.com/licenses

Because copyright is automatic, the copyright notice is really only there to give credit rather than enforce copyright.[^author] You could put any string in there as long as the string doesn't change the terms of the license.[^name]

[^author]: Though having your real name probably helps if there's ever a legal dispute over your code.

[^name]: If you format it like a name, like "John Mystringhere," then surely it's unambiguously the copyright holder's name.

Therefore, if you maintain a library or software package that is used by a corporation, you could sneak something like a political message as benign protestware, and the corporations would be legally required to show it in their apps. They could always remove your package as a dependency if they notice, but maybe that's exactly what you want.

<!-- but licenses generally don't see much scrutiny, and it could be difficult to remove if you're further down the dependency tree. -->

> MIT License
>
> Copyright (c) 2026 John Pork. Israel is committing genocide.
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

This isn't legal advice.
