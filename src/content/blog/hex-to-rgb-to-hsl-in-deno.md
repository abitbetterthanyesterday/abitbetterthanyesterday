---
title: Hex to HSL
status: published
draft: false
tags:
  - CSS
created_at: 2023-01-12T09:37:00.000Z
last_modified_at: 2023-01-12T09:37:00.000Z
published_at: 2023-01-12T09:37:00.000Z
lang: en-AU
slug: hex-to-rgb-to-hsl-in-deno
description: ''

--- 
# Hex to RGB to HSL in Deno

Lately, I've been working a lot with HSL, especially after reading Refactoring UI.

While there is nothing wrong with Hex, HSL allows me to refine my colors easily. 

## How to Turn Hex into HSL?

In order to turn Hex into HSL, we need to do a two step process:
1. Transform Hex into RGB
2. Transform RGB into HSL

Hex is based on the hexadecimal number system, hence the name.

### Hexadecimal Number System

Most of us will be familiar with the decimal system. 
It is 10-based. In order words, it only has 10 numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9.
That's the way we interact with numbers in our daily life. 

The hexadecimal number system is a bit different. It's based on a 16 numbers system (_hexa_decimal).

The numbers 0 to 9 are represented by the numbers 0 to 9, like in the decimal system.
But the numbers 10 to 15 are represented by letters:

A - 10
B - 11
C - 12
D - 13
E - 14
F - 15

Note that 16 doesn't exist, since we count from 0, there are only 16 numbers.

## Describing Colors with Numbers: RGB

Any color can be broken down into three parts RGB: **Red,** **Green**, and **Blue**.
The values of each color can range from 0 (black)  to 255 (white).
By combining these three colors, we have access to over 16 million colors.

A hex code is simply a notation to define the levels of **Red**, **Green**, and **Blue** in the RGB color notation.

The first two characters after the `#` sign represent the level of **Red**, the following two pairs represent respectively the levels of **Green** and **Blue.**

So in `#AA223F`, we have:
- Red: `11`
- Green: `AA`
- Blue: `3F`

There is a catch: `11` in hexadecimal is not equal to `11` in decimal!

## From Hexadecimals to Decimals: a Bit of Maths

To calculate a number, we sum each number, multiplied by its position to the power of the base number. 

Phew, that sounds complex - but it's not. When using decimals, we don't really think about it, we just do it.

To read `11` in decimals, the way real way to calculate it would be:
1\*10^1+1\*10^0 = 1 * 10 + 1 = 11

Well, in hexadecimal we can do the same thing, except the base will be 16, not 10.
So 11 becomes: 1\*1^16 + 1\*16^0 = 16 + 1 = 17!

In the same way, AA would be FF:  15\*1^16 + 16\*16^0 = 240 + 15 = 255!

## Hex2RGB

Knowing what we know now, we can write the first part of the problem, going from Hex to RGB notation for our colors.

```ts
function hexToHSL(hex:string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const [r,g,b] = result;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  var HSL = new Object();
  HSL['h']=h;
  HSL['s']=s;
  HSL['l']=l;
  return `${Math.floor(h*360)}, ${Math.floor(s*100)}%,${Math.floor(l*100)}%`;
}
```