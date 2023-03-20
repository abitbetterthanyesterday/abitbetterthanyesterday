---
title: Iteration
status: published
draft: false
tags:
  - Computer Science
created_at: 2023-01-12T00:11:00.000Z
published_at: 2023-01-12T00:11:00.000Z
last_modified_at: 2023-01-12T00:11:00.000Z
lang: en-AU
slug: iteration
description: ''

--- 
# Iteration
Iteration is a programming technique where a solution is found by repeatedly executing a block of code, typically as part of a loop, until we reach the solution.

A simple example is how to calculate the factorial of a number.

The factorial of `n` is the sum of the product of the integers from 1 to `n` and is written `n!`.
For example, the factorial of 5 is written `5!` and calculated like so `5!=5×4×3×2×1=120`

To calculate a factorial this iteratively, we would do the following;

```ts
function factorial (n:number){
 if(n < 0 || !Number.isInteger(number) ){
	 throw new Error('Number must be a positive integer')
 }

 let result = 1
 for(i = n; i>0; i++) {
	result *=  
 }
	
 return result;
}

/* In the example of 5, the steps would be:
factorial(5)
result = 1 * 5 = 5;
result = 5 * 4 = 20;
result = 20 * 3 = 60;
result = 60 * 2 = 120;
result = 120 * 1 = 120;
*/
```

## Performance: Iteration vs. Recursion

Iterative solutions tend to be a lot less performant than their recursive counter part.
On that simple factorial calculation, the iterative counterpart is up to [**15 times faster** on my laptop.](./benchmarking-using-deno)

So why would you use a recursive?
- Some problems are inherently recursive by nature, like navigating through tree data structure such a reading files of a folder and subfolders,
- The recursive solutions are arguably easier to understand and shorter,

See you soon,
Alo.