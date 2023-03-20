---
title: Recursion
status: published
draft: false
tags:
  - Computer Science
created_at: 2023-01-12T00:11:00.000Z
published_at: 2023-01-12T00:11:00.000Z
last_modified_at: 2023-01-12T00:11:00.000Z
lang: en-AU
slug: recursion
description: ''

--- 
title: "Recursion"
status: published
draft: false
tags:
- Computer Science
created_at: 2023-01-12 10:11
published_at: 2023-01-12 10:11
last_modified_at: 2023-01-12 10:11
lang: en-AU
slug: recursion
---
# Recursion

Recursion is a programming technique where a function calls itself multiple times in order to solve a problem.

The idea is that the problem can be broken down into multiple subproblems that are resolved the same way.

To do so, we create a function that breaks down the problem into smaller chunks and call itself with new 'chunk' until it reaches the base case. 
The base case is the point where the function returns a value rather than calling itself. 

As you can imagine, the function can't call itself indefinitely, otherwise, it would overflow the stack!

A simple example is how to calculate the factorial of a number.

The factorial of `n` is the sum of the product of the integers from 1 to `n` and is written `n!`.
For example, the factorial of 5 is written `5!` and calculated like so `5!=5×4×3×2×1=120`

To calculate a factorial this recursively, we would do the following;

```ts
function factorial (n:number){
 if(n < 0 || !Number.isInteger(number) ){
	 throw new Error('Number must be a positive integer')
 }
 if(n === 0){
   return 1 // This is our base case
 }
 return n * factorial(n -1) // The function calls itself
}

/* In the example of 5, the steps would be:
factorial(5)
5 * factorial (4)
5 * 4 * factorial(3)
5 * 4 * 3 * factorial(2)
5 * 4 * 3 * 2 * factorial(1)
5 * 4 * 3 * 2 * 1 * factorial(0)
5 * 4 * 3 * 2 * 1 * 1 = 120
*/
```

## Performance: Iteration vs. Recursion

Recursive solutions tend to be a lot less performant than [their iterative counter part.](./iteration)
On that simple factorial calculation, the iterative counterpart is [up to **15 times faster** on my laptop](./benchmarking-using-deno).

So why would you use a recursive solution?
- Some problems are inherently recursive by nature, like navigating through data tree structure such a reading files of a folder and subfolders,
- The recursive solutions are arguably easier to understand and shorter,

See you soon 👋,

Alo.