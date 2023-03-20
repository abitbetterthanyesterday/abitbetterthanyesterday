---
alias: null
status: published
created_at: 2023-02-28T21:53:00.000Z
last_modified_at: 2023-02-28T22:28:00.000Z
draft: false
tags:
  - js
  - ts
  - short
  - deno
title: Using tests to find a sneaky bug
published_at: 2022-12-23T02:10:00.000Z
slug: using-unit-tests-in-deno-to-find-a-sneaky-bug
lang: en-AU
description: ''

--- 
As part of the CI/CD of [ABitBetterThanYesterday](https://abitbetterthanyester.day) I'm working on an autopublish command line utility in Deno. 

Long story short, I created a function to read the git root of a certain directory. 

But it was not working as planned. I was hitting a sneaky bug due to a newline characters sneaking into my string. I thought I'd share how I solve the issue by doing what I should have done to start with: writing a good unit test.

The function looked like this:
```ts
/**
 * Given a directory, return the git root of the directory if there is one
 */
async function getGitRootDirectory(dirPath: string): Promise<string> {
   const gitRootCmd = Deno.run({
      cwd: dirPath,
      cmd: ["git", "rev-parse", "--show-toplevel"],
      stdout: "piped",
      stderr: "piped",
   });

	// handleCommandResult handle the piped result stdout, stderr and eventual errors.
   return (await handleCommandResult(gitRootCmd));
}
```

The issue is that when using in a different script, such as to create a new branch, it would throw an error.

```ts
/**
* Create and checkout a new branch inside a git directory
*/
async function checkoutNewGitBranch(
   dirPath: string,
   branchName: string
): Promise<string> {
   const gitRoot = await getGitRootDirectory(dirPath);
   const gitBranchCmd = await Deno.run({
      cwd: gitRoot,
      cmd: ["git", "checkout", "-b", branchName],
      stdout: "piped",
      stderr: "piped",
   });

   return await handleCommandResult(gitBranchCmd);
}

// ERROR: The directory does not exist!
```

I was confused.  

I tried printing out the result of `getGitRootDirectory` and I knew the directory existed.

My tests were mocking the result of that function, so I couldn't really rely on it. 
That's a good example of why mocking can be dangerous. Mocks must be handled carefully. **A faulty mock you loose crucial visibility**.

I didn't have a unit test on the function itself.
It's a simple function, I dont need a test for this? *Wrong*
So I took a step back and wrote a unit test for `getGitRootDirectory`. It was a very simple unit test that I should have written to start with. Using the current directory, I knew the root git directory: it was the same directory!

```ts
describe("Git autopublishing", () => {
   it("can retrieve the git root directory", async () => {
      const result = await getGitRootDirectory(Deno.cwd());
      const expectedResult = Deno.cwd();
      assertEquals(result, expectedResult);
   });
});

// Result of the test
/*
 Git autopublishing ...
  can retrieve the git root directory ... FAILED (15ms)
    error: AssertionError: Values are not equal:
    
    
        [Diff] Actual / Expected
    
    
    -   /home/abr/gh/vault2blog
    -   
    +   /home/abr/gh/vault2blog\n
*/
```

Damn it! There is a new line character `\n` at the end!
It didn't show up in the console.

That's a quick fix: simply remove that newline character.

```ts
/**
 * Given a directory, return the git root of the directory if there is one
 */
async function getGitRootDirectory(dirPath: string): Promise<string> {
   const gitRootCmd = Deno.run({
      cwd: dirPath,
      cmd: ["git", "rev-parse", "--show-toplevel"],
      stdout: "piped",
      stderr: "piped",
   });

	// handleCommandResult handle the piped result stdout, stderr and eventual errors.
   return (await handleCommandResult(gitRootCmd)).replace("\n", "");
}

//deno test -A ./test/utils.test.ts

/*
... more tests
Git autopublishing ...
  can retrieve the git root directory ... ok (12ms)
Git autopublishing ... ok (23ms)
... more tests
*/

// All good to go!
```

So it lead me to the question: **How do you special characters in the console?**

It's actually very easy: just `JSON.stringify` the string

```ts
JSON.stringigify(await getGitRootDirectory(Deno.cwd()));
// "/home/abr/gh/vault2blog\n"
```

The takeaway here are:
- Use `JSON.stringify` to compare strings or decel special characters,
- When searching for a bug, don't hesitate to take a step back and write a test,
- Mocking is great, but every mock is potentially hiding bugs. Be mindful about your mocks,

See you soon 👋,

Alo.
