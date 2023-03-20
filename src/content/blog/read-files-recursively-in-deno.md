---
title: Read files recursively in Deno
status: published
draft: false
tags:
  - Deno
created_at: 2023-01-11T19:28:00.000Z
published_at: 2023-01-11T19:28:00.000Z
last_modified_at: 2023-01-11T19:28:00.000Z
lang: en-AU
slug: read-files-recursively-in-deno
description: ''

--- 
title: "Read files recursively in Deno"
status: published
draft: false
tags:
- Deno
created_at: 2023-01-12 05:28
published_at: 2023-01-12 05:28
last_modified_at: 2023-01-12 05:28
lang: en-AU
slug: read-files-recursively-in-deno
---
# Read files recursively in Deno
I love CI/CD pipelines. A lot. 

It is often the very first thing I do when starting a project.

One of the reasons I love CI/CD pipelines so much is that they lower the 'entry cost' of doing work on the project.

In Atomic Habits, one of James Clear's rules to make a habit happens is to make it easy.
Following that rule, I have created a script that scans my Obsidian vault and finds, processes, and publishes notes directly on my blog. This makes sharing on my blog a lot easier.
 
In order to retrieve my articles in subfolders, I need to be able to read files recursively in a given folder. It is very easy with Deno.

[Deno](https://deno.land/) comes with great utilities straight out of the box to work with the file system, such as `Deno.readDir`.

This is how I do it, using a recursive algorithm.  If you want to know more about [read this article](./recursion).  I explain in simple terms what recursion is as opposed to [iteration](./iteration) and measure their [performance using Deno's benchmarking tool.](./benchmarking-using-deno)

```ts
import {join} from "https://deno.land/std@0.171.0/path/mod.ts"; // path.join

const FOLDER_PATH = '/my/folder/path';

async function readFilesRecursively(folderPath:string):Promise<Deno.DirEntry[]>{
	const filesFound:Deno.DirEntry[] = []
	for await(const entry of Deno.readDir(folderPath)){
		if(entry.isFile){ // If it is a file, simply add it to my files found
			filesFound.push(entry);
		} else {
			filesFound.push(...await readFilesRecursively(join(folderPath, entry.name))) // Otherwise, it is a directory, find files into that directory
		}
	}
	return filesFound;
}

async function main():void{
	const files: Deno.DirEntry = await readFilesRecursively(FOLDER_PATH)
	for (const file of files){
		console.log(file.name); // Do something with the files. Here, we only log their name
	}
}
  
await main();
```

Note that Deno allows you to use async/await at the top level, which is a very nice touch.

That's it! It's very straightforward.

See you soon 👋,

Alo.