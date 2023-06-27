---
title: React 16.X and JSX runtime error
status: published
draft: false
tags:
  - React
  - Storybook
  - Vite
  - Webpack
  - TIL
created_at: 2023-06-28T06:00:00.000Z
last_modified_at: 2023-06-28T06:00:00.000Z
published_at: 2023-06-28T06:00:00.000Z
lang: en-AU
slug: react-jsx-runtime-error
description: ''
--- 
Storybook has an amazing initialisation command: `storybook init`.
It allows you to add Storybook easily to an exisiting project in a heartbeat.

However, if you are using a version of React anterior to 17, you might run into a JSX runtime issue 

`Module not found: Error: Can't resolve 'react/jsx-runtime'`

# TL;DR

There are two ways to fix this:
1. Revert to the classic runtime 
2. Upgrade to the new runtime

## Revert: When using webpack + babel

Add the option `"runtime":"classic"` to your react preset:

```js
// babel.config.json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "classic"
      }
    ]
  ]
}
```

If you are not using the preset (you should!), then you are probably relying on the `@babel/plugin-transform-react-jsx`.

In this case, set the runtime to classic in the plugin. I assume that is what is happening with the preset anyway.

```js
// babel.config.json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "classic"
      }
    ]
  ]
}
```

## Revert: When using Vite

With vite, you need to set the runtime on the `react` plugin

```js
//  vite.config.js

export default defineConfig({
  plugins: [
    react({ 
      jsxRuntime: 'classic'
    })
  ]
})
```

## Upgrade

Another option, is to upgrade to the new runtime.
This consists in adding manually the runtime (more details below) and removing all 'react' imports.

[Thankfully, the react team has written a codemode for us. Click this link and follow the instructions.](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports)

## What is react/jsx-runtime?

Before we can discusse the `react/jsx-runtime`, we need to talk about transform.
With React 17, came a new JSX transform.

So what is a transform?

### Transform

The browser can't interpret JSX code.

A transform is simply a tool to transform JSX into plain JS, so the browser can read it.

It's very similar to let's say, using babel to transform ESNext syntax into ES5 to make it compatible with older browsers.
Or compiling Sass into CSS.

It simply takes code (JSX) and transform it into another format (vanilla JS).

#### Transform React < 17

For example, this.

```jsx
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}
```

Will be transformed into this.

```js
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

#### Transform React 17 and higher

The new transform look like this.

From this.

```jsx
function App() {
  return <h1>Hello World</h1>;
}
```

To this.

```js
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

As you can see, the new transform import automatically `react/jsx-runtime` and that's is the cause of the error.

## What is react/jsx-runtime? pt.2

Now we understand where the issue is coming from, what is `react/jsx-runtime`?

It is simply the new transform bundled with React 17.
So if you are using React 17, then it is automatically added as part of the react 17.

As mentioned above, you can simply 'force' react to use the 'classic' runtime, or you can upgrade to the new runtime.

Using the new runtime has several benefits.

1. Firstly, you don't need to import `react` anymore. Sounds silly but hey, any DX improvement is welcome.

2. Secondly, it has a bunch of minor performance improvements that you can see in details [here](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation).

Note that the new runtime is compatible with older versions of react, including 16.4.
They even provide a codemod to do [the heavy lifting for you](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports).

So... I guess it's time for me to go and update our runtime!
