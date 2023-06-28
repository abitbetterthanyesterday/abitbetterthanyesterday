---
title: Rebase vs. Merge
status: published
draft: false
tags:
  - Git
created_at: 2023-06-29T06:00:00.000Z
last_modified_at: 2023-06-29T06:00:00.000Z
published_at: 2023-06-20T06:00:00.000Z
lang: en-AU
slug: rebase-vs-merge
description: ''
--- 

In the past, I have always merged master into my feature branch before a pull request.
Should I have used rebase all this time?

The first thing to remember is that both of these commands allow to integrate changes from one branch into another branch.
They just do it differently.

## Merge

Merging is the easiest option.

To merge `master` or `main` into your `feature` branch, you would do the following:
`git merge feature master`

This creates a new commit into your feature branch that 'regroups' the branches together.

Your history will now have a 'merge' commit as the latest commit.

Merge is safe as it is a non-destructive option.

The only disadvantage is that it shows an extra commitment in your branch.
If you were to merge `main` often in your feature branch, it could pollute your commit history and making harder to follow.

It sounds like a minor inconvenience but having a single atomic commit makes reviewing easier.

Also, when you go down the rabbit hole of the git history to understand a piece of code, those merge commits tend to muddy the water since they are often quite sizeable.

## Rebase

Rebasing moves the entire branch to be based on another commit.

Let's take an example. 
You started working on your `feature` when the `main` last commit was 'A'. Your `feature` branch is __base__ on `A`.
While you working on your feature, PRs are getting approved and merge into `main`. The `main` branch is now at commit `C`.
Rebasing `feature` onto `main` will move the base of `feature` to `C`. 
In other words, it will look as if you created your branch when master was at `C`.

This has the advantage of creating a linear commit history. 
It makes it easier in the future to work with `git log`, `git bisect` or `gitk`

The drawback is that rebasing can be destructive if not applied properly.

## When to use rebase vs. merge

I tend to use git quite a lot to go back in time and try to understand the why behind the code.
Whether we like it or not, we all work in legacy codebase. The code that we write today is the legacy code of tomorrow.

Unfortunately, some developers don't like to leave comments for diverse reasons that I do not understand - but that's another debate.

Having a nice commit history is great to inspect why a certain piece of code has been written in a certain way.
Especially when something looks hacky, it is probably because it was meant to be hacky.

Therefore, moving forward I will be using `rebase` as much as possible.

### When you should not rebase

There is one important rule: __do not rebase public branches.__ 

A public branch is a branch that your colleagues might use.

Without going into details, when you want to push a rebased branch you often need to force push.
If you were to rebase a public branch, such as `main` and force push it, you might overwrite code.

### In case of doubt, merge

While I like rebase, in case of doubt a `merge` is always the safest option. 
Take it from a man that spent hours yesterday finding a bug introduced during a careless rebase...
