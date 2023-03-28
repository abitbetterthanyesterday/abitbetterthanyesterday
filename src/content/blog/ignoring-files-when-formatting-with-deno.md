---
title: Ignoring Files when formatting with Deno
status: published
draft: false
tags:
  - deno
created_at: 2023-01-24T00:25:00.000Z
last_modified_at: 2023-01-24T00:25:00.000Z
published_at: 2023-01-24T00:25:00.000Z
lang: en-AU
slug: ignoring-files-when-formatting-with-deno
description: ''

--- 
# Ignoring Files when Formatting with Deno

In [How to test reading files in Deno](./how-to-test-reading-files-in-deno), I explained how I created a dummy folder structure with notes inside to test the script that allows me to publish my Obsidian vault.

There is one gotcha though: when running [`deno fmt`](https://deno.land/manual@v1.29.4/tools/formatter)  which is the formatter included with Deno (thank you!), my dummy notes where formatted, which would change their shape and my tests would fails.

To start with, I added a `<!-- deno-fmt-ignore-file -->` at the top of my notes.
It worked, but it meant that I had to do it to all my notes, and it just looked out place.

There is an easier and better way to fix this issue: [Deno configuration file](https://deno.land/manual@v1.29.4/getting_started/configuration_file).

By including a `deno.json` or `deno.jsonc` at the base of your directory, you can configure how `deno` behaves.

In the case of the formatter, all I had to do was to add these lines to my configuration file.

```json
// deno.json
{
	"fmt":{
		"files":{
			"exclude":["_testFolder/"]
		}
	}
	// ... more configuration
}
```

There is a bunch of things that can be configured, the whole list available [here](https://deno.land/x/deno@v1.29.3/cli/schemas/config-file.v1.json?source=).

See you soon 👋
Alo