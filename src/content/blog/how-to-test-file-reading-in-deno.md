---
status: published
created_at: 2023-03-07T08:28:48
last_modified_at: 2023-03-07T08:44:54
published_at: 2023-03-07T10:00:10Z
tags:
  - Deno
  - Testing
description: ''
draft: false
lang: en-AU
publish_at: 2023-01-24 08:03
title: How to Test File Reading in Deno
---

# How to Test File Reading in Deno

In [[Atomic Habits]], James Clear argue that to create an habit you should try to make it as obvious and easy as possible.

In the context of this blog, I am currently taking the time to create a CLI that makes publishing content a breeze straight from my Obsidian vault a breeze.

After toying about the idea of using **Rust** or **Go**, I chose **Deno** to write that program.

To transform files, I need to read them first. With **Deno** it's very easy. Deno comes with core functionalities to interact with the file system out of the box. If that is not enough, the standard library is very capabale and provides tons of tools to deal with I/O.

In this case, I'm using [readDir](https://deno.land/api@v1.29.1?s=Deno.readDir) to recursively traverse my vault directory, collect notes and transform them if needed.

But how can I test this?

My first thought was to keep my repo clean by generating tests files during the test and removing them at the end. However, it added complexity without really adding much value - and we would be getting 'away' from the real world situation.

In an effort to remain _KISS_, I created a `_testFolder` that contains markdown files, similar to my notes.

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

  // ...more tests
})
```

On top of this, I keep a snapshot of each of my test note.

This might be over-the-top, but it protects the notes from being inadvertently changed and help debug failing test: is the logic broken, or has the test file changed?

To keep snapshots, I recursively read the notes in the `_testFolder` and take a snapshot of their content:

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

If you are curious about `readDirRecursively`, I have written [[Read files recursively in Deno|an article about it]].

If you want to know more about Deno testing, [Deno's documentation is outstanding, and highly encourage you to check it out](https://deno.land/manual@v1.29.4/basics/testing)

See you soon 👋

Alo
