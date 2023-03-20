---
title: Cut the Bug Chase with Git Bisect
status: published
tags:
  - Development
  - Git
created_at: 2022-12-22T22:51:00.000Z
last_modified_at: 2023-01-05T07:08:00.000Z
published_at: 2023-01-05T07:08:00.000Z
draft: false
lang: en-AU
slug: cut-the-bug-chase-with-git-bisect
description: ''

--- 
Manager: _"Hey, we have noticed that X doesn't compile, can you look at it?"_
Me: _"Sure, when did it stop compiling?"_
Manager: _"Sometimes in the last ... 2 months."_

!Drawing 2022-12-23 08.52.10.excalidraw

In an ideal world, you have test suites running often and covering your code base thoroughly.

This allows you to be notified of issues quickly and act upon them.
Often, you can catch them even before it gets merged your main branch.
At the very least, you know roughly when and why the issue has appeared.

However, often we do not work in the perfect code base and it's okay.
Business constraints gets in the way, and we have to skip tests, forego the refactoring phase or work with legacy code wrote by a dev who left 17 years ago.

This is real life, and we have to compose with it.
I would argue that  being able to operate with less-than-perfect code base is a very valuable skill.

!Cut the Bug Chase with Git Bisect 2022-12-23 10.38.38.excalidraw

So, when my manager came and say:
_"Eh, we have noticed that there is an issue with X, we are not sure when it got introduced, sometimes in the last 2 months. It needs to be fixed before release in two days"_

I'm like: _"Yep, let me grab my **Git Bisect**".__

# Binary search Algorithm

Before we mention how git bisect works, we need to define what is the binary search algorithm.

In french, we talk about the "dichotomy method".
Sounds fancy, but it's pretty simply.

Binary search is the same idea of playing the game "Guess what number I'm thinking of, between 0 and 100" and using the 'in the middle' strategy.

You cut the sample in half, and check in which half the target is.
Then you halve that half again (bit of a tongue-twister that one).
You repeat until you find the number.

## Visual Example

If you are more of a visual learner, you can watch binary search on this [code pen made by Raphael Pora](https://codepen.io/rpora/pen/GWqrVO) (thank you).
Otherwise, you can continue reading.

## 'In Words' Example

Coming back to the 'guess my number from 0  to 100', let's say our number is 11.
Using the binary search algorithm, we will do the following steps:

1. Is it 50 ? No, lower.

2. Is it 25 ? (middle between 0-50) No, lower.

3. Is it 12 ? (middle between 0-25) No, lower.

4. Is it 6 ? (middle between 0-12) No, higher.

5. Is it 9 ? (middle between 6-12) No. higher.

6. Is it 11 ? (middle between 9-12)? Yes.

That's binary search. Easier than it sounds.

# Git Bisect

## The Concept

Git Bisect uses the binary search algorithm to find out the commit that introduced the issue.

All you have to tell Git Bisect: "Hey, I know that commit A is good, and the current commit is bad".
That's the equivalent of our range. We know that the issue has been introduced between A and HEAD.

Git Bisect will find the 'middle' commit between A and HEAD and ask you: "Does this commit contains the issue?"
Let's call that 'middle' commit M.

You reply "Yes, all good" or "Nah, the issue is still here".
If yes, the issue has been introduced between A and M.
If no, the issue has been introduced between M and HEAD.

And we repeat the process until we find the faulty commit.

## How to

The process is very simple, all you need to do to get started is to tell git bisect a good commit, and a bad commit.
This will provide the range to search.

Git will then take you step by step through the process.

```

git bisect start // Start the bisect method
git bisect bad // HEAD (current) is bad
git bisect good 123asd // commit 123asd was good

// Bisecting: 675 revisions left to test after this (roughly 10 steps)

```

Now Git will take you to the 'middle' commit. You can check whether the issue is present or not, and let git know about it.

```

git bisect good // or `git bisect bad` if the issue is still present

```

Repeat until you find the culprit.

```
git bisect good 

// Git has found the culprit!
8e63eb34f6686b61bf4d37b37a7e06cffb220d66 is the first bad commit

commit 8e63eb34f6686b61bf4d37b37a7e06cffb220d66
Author: Guilty Bob
Date: ages ago
(commit message)
(commit summary)

```

If you want to find out more, I encourage you to [read the documentation](https://git-scm.com/docs/git-bisect)

# Bonus: Automate the Process

Here's a cool trick for the ~~lazy~~ smart developer.

You can automate the whole task and let the computer do the work for you.

Now, it won't work with every bug but if your issue is easily to 'verifiable' with a script, you can provide that script to Git using `git bisect run my-script.sh`.

It will run your script at each step on the 'middle' commit,. Depending on the outcome of your script, Git will label the commit as bad or good accordingly.

In my case, the issue we had was a package of our monorepo was not compiling.

We use `webpack` to compile our package, so it is easily testable with a script.

```
// build.sh
--
#!/usr/bin/sh
webpack --config ./webpack.prod.ts
--

// Webpack returns 0 if successful, so it is inline with Git Bisect
```

Now, all I had to do was:

```
git bisect bad
git bisect good 123asd
git bisect run ./build.sh
```

All you need to do now, is to enjoy a coffee knowing that the computer is doing the heavy lifting for you.

Find the commit and... curse because the commit is humongus!

**Time to discuss the idea of atomic commit with the team!**

See you soon,
Alo.