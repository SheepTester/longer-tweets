---
layout: post
title: matrix labs
description: Writeups for the two easiest Matrix Lab reverse engineering challenges from Project Sekai CTF 2022.
date: 2022-10-02
tags:
  - ctf
  - programming
---

A bunch of CTF enjoyers on the [ACM Cyber][acm] Discord server gathered (CS majors touching grass??) at a computer lab in the CSE basement at UCSD. Their AC was set unnecessarily cold to prevent the shower-free CS majors from sweating. We were doing the Project Sekai CTF, which had a pretty based website design. I immediately jumped to [Obligatory Calc][calc], but while stuck on it, I decided to tackle the easier reverse engineering (rev) challenges first.

[acm]: https://acmucsd.com/
[calc]: a

## Matrix Lab 1

> Welcome to the first lab of Course ML10001 from Sekai University! The Lab 1 assignment should be pretty easy...
>
> Author: sahuang
>
> **Matrix_Lab_1.class**

I used a random [Java decompiler](http://www.javadecompilers.com/) I found online, producing the Java file below.

```java
/*
 * Decompiled with CFR 0.150.
 *
 * Could not load the following classes:
 *  Sekai
 */
import java.util.Scanner;

/*
 * Exception performing whole class analysis ignored.
 */
public class Sekai {
    private static int length = (int)Math.pow(2.0, 3.0) - 2;

    public static void main(String[] arrstring) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the flag: ");
        String string = scanner.next();
        if (string.length() != 43) {
            System.out.println("Oops, wrong flag!");
            return;
        }
        String string2 = string.substring(0, length);
        String string3 = string.substring(length, string.length() - 1);
        String string4 = string.substring(string.length() - 1);
        if (string2.equals("SEKAI{") && string4.equals("}")) {
            assert (string3.length() == length * length);
            if (Sekai.solve((String)string3)) {
                System.out.println("Congratulations, you got the flag!");
            } else {
                System.out.println("Oops, wrong flag!");
            }
        } else {
            System.out.println("Oops, wrong flag!");
        }
    }

    public static String encrypt(char[] arrc, int n) {
        int n2;
        char[] arrc2 = new char[length * 2];
        int n3 = length - 1;
        int n4 = length;
        for (n2 = 0; n2 < length * 2; ++n2) {
            arrc2[n2] = arrc[n3--];
            arrc2[n2 + 1] = arrc[n4++];
            ++n2;
        }
        n2 = 0;
        while (n2 < length * 2) {
            int n5 = n2++;
            arrc2[n5] = (char)(arrc2[n5] ^ (char)n);
        }
        return String.valueOf(arrc2);
    }

    public static char[] getArray(char[][] arrc, int n, int n2) {
        int n3;
        char[] arrc2 = new char[length * 2];
        int n4 = 0;
        for (n3 = 0; n3 < length; ++n3) {
            arrc2[n4] = arrc[n][n3];
            ++n4;
        }
        for (n3 = 0; n3 < length; ++n3) {
            arrc2[n4] = arrc[n2][length - 1 - n3];
            ++n4;
        }
        return arrc2;
    }

    public static char[][] transform(char[] arrc, int n) {
        char[][] arrc2 = new char[n][n];
        for (int i = 0; i < n * n; ++i) {
            arrc2[i / n][i % n] = arrc[i];
        }
        return arrc2;
    }

    public static boolean solve(String string) {
        char[][] arrc = Sekai.transform((char[])string.toCharArray(), (int)length);
        for (int i = 0; i <= length / 2; ++i) {
            for (int j = 0; j < length - 2 * i - 1; ++j) {
                char c = arrc[i][i + j];
                arrc[i][i + j] = arrc[length - 1 - i - j][i];
                arrc[Sekai.length - 1 - i - j][i] = arrc[length - 1 - i][length - 1 - i - j];
                arrc[Sekai.length - 1 - i][Sekai.length - 1 - i - j] = arrc[i + j][length - 1 - i];
                arrc[i + j][Sekai.length - 1 - i] = c;
            }
        }
        return "oz]{R]3l]]B#50es6O4tL23Etr3c10_F4TD2".equals(Sekai.encrypt((char[])Sekai.getArray((char[][])arrc, (int)0, (int)5), (int)2) + Sekai.encrypt((char[])Sekai.getArray((char[][])arrc, (int)1, (int)4), (int)1) + Sekai.encrypt((char[])Sekai.getArray((char[][])arrc, (int)2, (int)3), (int)0));
    }
}
```

According to the body of `Sekai.main`, the part between `SEKAI{` and `}` should be 36 characters long, and it's given to `Sekai.solve`. It calls `Sekai.transform`, which puts the string in a 6 by 6 array, row by row. Then, it seems to shuffle the characters around in the array, which isn't too bad because it seems to be reversible: there are nine 4-character groups of cells that get cycled, so to reverse the shuffle, they just need to be cycled in the other direction. Then, `Sekai.getArray` returns an array combining the `n`th row as is and the `n2`th row reversed.

These combined arrays are passed to the main course, `Sekai.encrypt`, which returns a 12-character string. Together, three chunks must combine to form the 36-character `oz]{R]3l]]B#50es6O4tL23Etr3c10_F4TD2`. `Sekai.encrypt` fills a new array that alternates between the left and right halves; the left half is inserted backwards, so in the end, all rows are reversed. Then, each character is XOR'd with `n`.

I wrote a script to reverse the process in JavaScript since I'm most familiar with it.

```js
unxor = (str, n, left, right) => {
  arr = Array.from(str).map(c => c.codePointAt() ^ n)
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      grid[left][5 - i / 2] = arr[i]
    } else {
      grid[right][5 - (i - 1) / 2] = arr[i]
    }
  }
}
unxor('oz]{R]3l]]B#', 2, 0, 5)
unxor('50es6O4tL23E', 1, 1, 4)
unxor('tr3c10_F4TD2', 0, 2, 3)
```

## Matrix Lab 2

## Matrix Lab 3

The remaining rev challenges seemed to be written in C or Scheme compiled to C with Chicken Scheme. Alas, I wasn't really sure how to tackle these. Am I supposed to decompile them, or do I reverse engineer the assembly directly? I think I need more practice with rev challenges written in C.
