---
title: How to test reading files in Deno
status: draft
draft: false
tags:
  - Deno
  - Testing
created_at: 2023-01-23T22:03:00.000Z
last_modified_at: 2023-01-23T22:42:00.000Z
publish_at: '2023-01-24 08:03'
slug: how-to-test-reading-files-in-deno
lang: en-AU
published_at: 2023-03-20T06:07:44.816Z
description: ''

--- 
# How to Test Reading Files in Deno

As described in Atomic Habits, to create an habit you should try to make it as obvious and easy as possible.

In the context of this blog, I am currently taking the time to create a publishing pipeline that makes creating content a breeze.

After toying about the idea of using Rust or Go, I chose **Deno** to write the program that transform my Obsidian notes into markdown files.

To transform files, I need to read them first. With **Deno** it's very easy. Deno ships with core functionnality to interact with the file system.

In this case, I'm using [readDir](https://deno.land/api@v1.29.1?s=Deno.readDir) to recursively traverse my vault directory, collect notes and transform them as needed.

How can I test this?

My first thought was to keep my repo clean by generating files during the test and removing them at the end.
However, it added complexity without really adding much value.

In an effort to remain KISS, I created a `_testFolder` that contains markdown files.

The simplicity of this allow me to test different scenarios very easily.
The content of each notes is designed to test different scenarios, such `noteWithoutFrontmatter.md` or `subfolder/noteInSubfolder.md`.

Now I can write tests such as:

```ts
describe("Note", () => {
 it("should let me obtain the frontmatter", () => {
    const expected = {
      title: "hello world",
      created_at: new Date("2023-01-01 12:00"),
      last_modified_at: new Date("2023-01-01 18:00"),
      slug: "hello-world",
      status: "publish",
      tags: [
        "hello",
        "world",
      ],
    };
    assertEquals(expected, note.frontmatter);
  });

  // ...more test
})
```

On top of this, I keep a snapshot of each note in my test notes.

This might be over-the-top, but it protects the notes from being inadvertently changed and help debug failing test: is the logic broken, or has the test file changed?

To keep snapshots of my notes, I'm doing the brute force. I recursively read the notes in the `_testFolder` and take a snapshot of their content:

```ts
import { assertSnapshot } from "https://deno.land/std@0.168.0/testing/snapshot.ts";
import {readDirRecursively} from "./utils";

// This is utility function that return all notes within a folder, including subfolders.
const notes = readDirRecursively('../_testFolder');

for (const note of notes){
	Deno.test(`${note} content has not changed`, async function (t): Promise<void> {
	  const content = Deno.readTextFileSync(note.filePath);
	  await assertSnapshot(t, content);
	});
}
```

If you are curious about `readDirRecursively`, I have written [an article about it](./read-files-recursively-in-deno).

If you want to know more about Deno testing, [Deno's documentation is outstanding, and highly encourage you to check it out](https://deno.land/manual@v1.29.4/basics/testing)

See you soon 👋
Alo