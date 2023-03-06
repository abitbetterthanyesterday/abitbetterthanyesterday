---
status: published
created_at: 2023-03-06T12:34:52
last_modified_at: 2023-03-07T08:43:53
published_at: 2023-01-31T10:47:02.736
tags:
  - css
description: ''
draft: true
lang: en-AU
slug: css-counter
title: CSS Counter
---

# CSS Counter

Counter are another of these obscur CSS property that you don't know about until you come across it.

They're quite cool though.

I use them here on this blog on code blocks to add the line number.

The `counter-reset` reset my `line` counter at the start of my `<code>` tag, effictively giving it a 0 value.

So our css counter `line` = 0.

Then, for each `.line` of code (I'm using [Shiki](https://github.com/shikijs/shiki) to parse and highlight my code blocks) we increment the counter by 1.

Now, my CSS Counter counts my lines inside each code block!

Using a pseudo-element `::before` to my line, I can append the line number and do some styling on it.

```
code {
  counter-reset: line;
}

code .line::before {
  counter-increment: line;
  content: counter(line);
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  color: rgba(115,138,148,.4)
}
```

Really cool stuff, thanks to [Alex Peattie](https://github.com/alexpeattie) for the tip!

See you soon 👋,

Alo.
