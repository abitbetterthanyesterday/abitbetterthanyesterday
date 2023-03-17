---
status: published
created_at: 2023-03-16T15:30:00
published_at: 2023-03-16T15:30:00
last_modified_at: 2023-03-17T14:33:00
tags:
- computer science
- linux
- til
aliases: [TIL /dev/null]
draft: false
lang: en-AU
slug: til-dev-null
title: TIL /dev/null
description: ""
---

# TIL /dev/null

`/dev/null` is a special file present on every Linux system. You can only write to `/dev/null`, not read.
Some people call it the null device.

Anything you write to `/dev/null` is discarded and disappears.
It's like a vacuum into nothingness.

Why would you need such a device?

## The purpose of the null device is to silence an output 

`/dev/null` is very handy when you want to 'silence' an output.

You can redirect `stdout` or `stderr` (or both) to the null device (`/dev/null`) to silence any output.

To do so, you need to :

- redirect `stderr` (2) to `stdout` (1): `2>&1`
- redirect both to `/dev/null`: `/dev/null 2>&1`

The whole command becomes:

`[my-command] > /dev/null 2>&1`

## Our Use case

Our case is very simple: we use [Nx](nx.dev) to manage our frontend pipeline locally - but our build server are running on FreeBSD. 
Long story short, some dependencies issues do not allow us to fully use `Nx` on our build servers.

Therefore, for our production builds we use a `Makefile` pipeline - which makes silencing `webpack` 's output … _Challenging_.

`/dev/null` allows us to easily silence the output on our build server to reduce the noise on our logs.

Coupled with environmental variables, we can easily create a 'forced silent' mode on our servers when needed.

## Conclusion

The **null device** is a tool useful when you need to silence an output, whether it is coming from the standard output or the standard error.

By the way, it is commonly used in bash scripting, so you will come across `/dev/null 2>&1` every now and then in scripts.

Remember, all it does is silencing the output.

See you soon 👋,

Alo

