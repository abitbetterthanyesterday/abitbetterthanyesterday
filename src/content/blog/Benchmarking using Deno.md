---
title: Benchmarking using Deno
status: publish
tags:
  - Development
  - Deno
created_at: 2023-01-12T02:50:00.000Z
last_modified_at: 2023-01-12T02:50:00.000Z
publish_at: '2023-01-12 12:50'
lang: en-AU
description: 
---

  We are on page `= this`


  Deno is great
   
  I absolutely love it, and I love the fact that it will push `node` to become
  better



  Deno comes with some really cool out of the box tools, such as a benchmarking
  tool



  Benchmarking is important if you want to measure the impact of a code change
  on the performance of your code base



  I always advocate to avoid performance optimisation unless performance 
slug: benchmarking-using-deno
---

We are on page `= this`.
Deno is great. 
I absolutely love it, and I love the fact that it will push `node` to become better.

Deno comes with some really cool out of the box tools, such as a benchmarking tool.

Benchmarking is important if you want to measure the impact of a code change on the performance of your code base.

I always advocate to avoid performance optimisation unless performance becomes an issue when developping an application.
However, when developping libraries, performance is very important and could be a question of life and death for a package.

[`Deno bench`](https://deno.land/manual@v1.29.1/tools/benchmarker) is the utility ship with `deno` to run benchmarks. 
It is very easy to setup and run benchmarking.

Let's benchmark our recursive and iterative solutions to compute a factorial.

```typescript
// factorial.ts

const isPositiveInteger = (n:number):Boolean => Number.isInteger(n) && n>0

function validateArgument(n):void{
	if(!isPositiveInteger(n)){
		throw new Error('Invalid argument: provide a positive integer.')
	}
	return
}

export function recursive(n:number): number {
   validateArgument(n)
   if(n === 0){
      return 1;
   } else {
      return n * recursive(n-1)
   }
}

export function iterative(n:number):number {
   validateArgument(n)
   let result = 1;
   for (let i = 1; i<=n; i++){
       result *= i; 
   }
   return result;
}
```

As a standard, the benchmarking files are suffixed of `_bench`, for example `main_bench.ts`.

```typescript
// factorial_bench.ts
import { iterative, recursive } from "./main.ts";

/* We use group to tell deno that these two function are part of the same benchmark group.
The `baseline` argument allow us to ask deno to do a comparaison, such as bar() is 10x faster than foo(). 
See documentation for more information.
*/

Deno.bench("iterative", {group:'factorial', baseline:true}, () =>{
  iterative(10_000);
});

Deno.bench("recursive", {group:'factorial'}, () => {
   recursive(10_000);
});
```

Now, we simply run the benchmark runner using `deno bench`

```sh
# > deno bench
cpu: 11th Gen Intel(R) Core(TM) i7-11370H @ 3.30GHz
runtime: deno 1.29.2 (x86_64-unknown-linux-gnu)

file:///home/abr/temp/refactor/main_bench.ts
benchmark      time (avg)             (min … max)       p75       p99      p995
