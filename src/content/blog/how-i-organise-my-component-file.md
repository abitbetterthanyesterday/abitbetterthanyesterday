---
status: published
created_at: 2023-03-06T03:49:00.000Z
last_modified_at: 2023-03-06T22:40:00.000Z
published_at: 2023-03-06T00:47:00.000Z
tags:
  - react
description: ''
draft: false
lang: en-AU
slug: how-i-organise-my-component-file
title: How I Organise My Components in React

--- 
# How I Organise My Components in React

What is great (and sometimes dreadful!) about React projects, is that there are as many project structures out there as there are developers.

We all come up with our own 'standards', which is a mix of what we have experimented with and scavenged from other developers.

After trying out many different solutions, I have finally settled on a way to organise my components that has proven to be quite robust so far.

> _Note: this applies to any frontend framework. I have successfully used a similar structure for Svelte and Vue components and I'm confident other frameworks would benefit from a similar component architecture. Well.. except you, Angular, you're already organized enough as it is!_

## A Typical Example

My components are nested inside a folder with the same name.

Let's say I'm building a button.

I will create the folder `Button` with the following files inside:

- `Button.tsx` , which contains my component definition,
- `index.tsx`, a barrel file re-exporting what needs to be re-exported from my component file (more on this later),
- `Button.test.tsx`, the unit tests for `Button.tsx`,
- `Button.stories.tsx` if I'm using Storybook (optional),
- `reducers`, `providers`, `utils` … As required on a case per case basis (optional)

If we peek inside our files, they look like this:

> _Note: I have deliberately kept the component **very basic** so we can focus on the folder structure_

```tsx
// index.tsx
export {Button} from './Button'
```

```tsx
// Button.tsx
export interface Props {
	onClick: () => void | Promise<void>;
	label: string;
}

export const Button = ({onClick, label} : Props)  => 
	<button onClick={onClick}>
		{label}
	</button>
}
```

```tsx
// Button.test.tsx
import {Button, Props} from './Button'
import {render, screen, cleanup} from "@testing-library/react"

const onClickSpy = jest.fn();
const defaultProps:Props = {
	onClick: onClickSpy,
	label: 'Click me!'
}

describe('<Button />', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("displays the right label", () => {
		// Arrange
		render(<Button {...defaultProps}/>)

		// Assert
		expect(screen.getByRole('button')).toHaveTextContent(label)

		// Arrange
		cleanup()
		const newLabel = 'Hello world!'
		render(<Button {...{...defaultProps, label: newLabel }}/>)

		// Assert
		expect(screen.getByRole('button')).toHaveTextContent(newLabel)

		// Don't shoot me for writing TWO tests cases in one test, I think they do test the same behavior.
	}
	it("calls the click handler when clicked", async () => {
		// Arrange
		const user = userEvent.setup()
		render(<Button {...defaultProps}/>)

		// Act
		await user.click(screen.getByRole('button'))

		// Assert
		await waitFor(() => {
			expect(onClickSpy).toHaveBeenCalledTimes(1) 
		})
	})
	
})
```

## Advantages

### Encapsulation

We only **expose what needs to be exposed**: the `Props` interface is accessible within the component folder (in the test file, for example) but not to the outside world.

This reduces name-clashing issues but still allows to leverage of TypeScript interfaces.

If the `Props` signature changes, we will be aware of it as our test will complain.

This encapsulation shines when we use reducers: we can expose our reducer to our test to be unit tested, but we don't need to expose it outside the component.

The encapsulation is not bulletproof, but it is a good starting point.

Hiding what does not need to be exposed is **always** a good practice when programming.

### Colocation

All our files related to the component are in the same folder. Here, it's a basic component with only three files, but you can imagine we can quickly add storybook, utilities, type definitions or reducers files.

Everything fits nicely together, much like a 'mini-package'.

When editing our component, the test file is just next to it. This encourages the developer to not forget to write tests.

### Convention

It's easy to use a code generator such as `Nx` generators or `Plop` to create templates for our files.

We create a convention.

We know where to expect to find our test and code related to our component - there is no digging around folders to find related code.

### Scalable

Thanks to the colocation and encapsulation, this is very scalable. It is easy to add files as needed. We can add reducers if our state logic becomes complex, stories for story-driven development, utilityutilities function, type definitions, etc.

It does not matter how many files we end with, the outside world will often only need access only to our component and therefore, we do not pollute the namespace.

## Inconvenient

The inconveniences, as far as I have experienced are minimal compared to the benefits above.

### Nesting

More folder nesting, which is not ideal.

But since our barrel file is named `index`, we don't need to specify the name.

So we can easily do `import {Button} from '@components/Button'`

### No Default Export

This solution does not allow to use of default exports. I don't see that as a real inconvenience since I believe default export is an **anti-pattern**.

I might write more about this in another post.

### More Files

Again, not something that bothers me. An hour invested in some `Plop` templates and you generate these files in a few seconds.

I also think that it is much easier to absorb smaller files than larger ones when revisiting a project many months later - but this comes down to personal preference.

Some developers are perfectly fine keeping 8000+ lines of code in a file structured, I tend to appreciate byte-sized files a lot more.

## What about You?

I'm always curious to discover more. How do **you** organise your [INSERT FRAMEWORK NAME HERE] components?

The next big topic is 'how do I organise my **front end projects as a whole**?'.

Hint: I am still searching for the silver bullet solution 😄

See you soon 👋,

Alo.