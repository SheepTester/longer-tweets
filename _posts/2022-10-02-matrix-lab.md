---
layout: post
title: matrix labs
description: Writeups for the two easiest Matrix Lab reverse engineering challenges from Project Sekai CTF 2022.
date: 2022-10-02
tags:
  - ctf
  - programming
hidden: true
---

A bunch of CTF enjoyers on the [ACM Cyber][acm] Discord server gathered (CS majors touching grass??) at a computer lab in the CSE basement at UCSD. Their AC was set unnecessarily cold to prevent the shower-free CS majors from sweating. We were doing the Project Sekai CTF, which had a pretty based website design. I immediately jumped to [Obligatory Calc][calc], but while stuck on it, I decided to tackle the easier reverse engineering (rev) challenges first.

[acm]: https://acmucsd.com/
[calc]: #obligatory-calc

## Matrix decryption is fun, mate!

> ### Matrix Lab 1
>
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
grid = Array.from({ length: 6 }).map(() => [])
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

First, I take the final string and split it into three 12-character chunks. For each chunk, I split them into the two original rows passed into `Sekai.getArray`, storing them in a 6 by 6 character grid, by alternating between the two rows and reversing the order as I insert them.

```js
length = 6
for (let i = 0; i <= length / 2; ++i) {
  for (let j = 0; j < length - 2 * i - 1; ++j) {
    const c = grid[i + j][length - 1 - i]
    grid[i + j][length - 1 - i] = grid[length - 1 - i][length - 1 - i - j]
    grid[length - 1 - i][length - 1 - i - j] = grid[length - 1 - i - j][i]
    grid[length - 1 - i - j][i] = grid[i][i + j]
    grid[i][i + j] = c
  }
}
```

Then, I reverse the shuffling process.

```js
grid
  .flat()
  .map(a => String.fromCodePoint(a))
  .join('')
```

Finally, I merge the array back into a string, producing the flag's contents: `m4tr1x_d3cryP710N_15_Fun_M4T3_@2D2D!`. It looked like something a human could write, so I put it in the flag format:

```
SEKAI{m4tr1x_d3cryP710N_15_Fun_M4T3_@2D2D!}
```

## MATLAB is awesome!

> ### Matrix Lab 2
>
> Welcome to the second lab. It seems that you're having some trouble with setting up the lab environment... Can you find the passcode and start the lab?
>
> **Matrix_Lab_2.exe**

The exe file has the default PyInstaller icon.

![The icon for Matrix_Lab_2.exe in the file explorer, which has a floppy disk with the Python logo overlaid on it.][pyinstaller]

[pyinstaller]: ../images/matrix-lab/pyinstaller.png

I used a random [PyInstaller extractor script][extractor] I found online, which spit out a directory of a bunch of files. It said to then use a .pyc decompiler, so I used a [poorly translated Chinese site][pyc] to do the job online. It produced fairly readable code:

[extractor]: https://github.com/extremecoders-re/pyinstxtractor
[pyc]: https://www.toolnb.com/tools-lang-en/pyc.html

```py
# uncompyle6 version 3.5.0
# Python bytecode 3.7 (3394)
# Decompiled from: Python 2.7.5 (default, Nov 16 2020, 22:23:17)
# [GCC 4.8.5 20150623 (Red Hat 4.8.5-44)]
# Embedded file name: Matrix_Lab.py
print('Welcome to Matrix Lab 2! Hope you enjoy the journey.')
print('Lab initializing...')
try:
    import matlab.engine
    engine = matlab.engine.start_matlab()
    flag = input('Enter the lab passcode: ').strip()
    outcome = False
    if len(flag) == 23:
        if flag[:6] == 'SEKAI{':
            pass
    if flag[-1:] == '}':
        A = [ord(i) ^ 42 for i in flag[6:-1]]
        B = matlab.double([A[i:i + 4] for i in range(0, len(A), 4)])
        X = [list(map(int, i)) for i in engine.magic(4)]
        Y = [list(map(int, i)) for i in engine.pascal(4)]
        C = [[None for _ in range(len(X))] for _ in range(len(X))]
        for i in range(len(X)):
            for j in range(len(X[i])):
                C[i][j] = X[i][j] + Y[i][j]

        C = matlab.double(C)
        if engine.mtimes(C, engine.rot90(engine.transpose(B), 1337)) == matlab.double([[2094, 2962, 1014, 2102], [2172, 3955, 1174, 3266], [3186, 4188, 1462, 3936], [3583, 5995, 1859, 5150]]):
            outcome = True
        if outcome:
            print('Access Granted! Your input is the flag.')
        else:
            print('Access Denied! Your flag: SADGE{aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==}')
except:
    print('Unknown error. Maybe you are running the lab in an unsupported environment...')
    print('Your flag: SADGE{ovg.yl/2M6pWQB}')
```

According to Google, `matlab.engine` seems to be from an actual MATLAB-Python library, so it's not another script written by the CTF organizers I'd have to decompile. The part between in `SEKAI{` and `}` may be 16 characters, though the if statement that suggests that doesn't actually do anything about it.

1. It starts by XOR'ing the code point values of every character within the curly braces of the flag with 42. (`A`)

   This can be reversed by XOR'ing them all again with 42, since XOR can be undone by XOR'ing with the same number again.

2. It then splits `A` into fourths and passes them into `matlab.double`, which [seems to turn them into][double1] [float arrays][double2]. (`B`)

3. `engine.methodname` just [calls the equivalent MATLAB function][equivalent], apparently. `engine.magic` [creates a magic square][magic].

   Our university provides MATLAB for free[^1], so I can see what `magic(4)` produces. It seems to be deterministic.

   ![I run `magic(4)` three times in MATLAB, and it produces the same result each time.][magic-4]

   The Python program iterates over the matrix. I wasn't sure what the iteration would produce, but MATLAB seems to go column by column, so it probably does that too in Python.

   ![A for-each loop in MATLAB looping over `magic(4)` and printing each item. It prints each column, one by one.][order]

   The Python program then casts each column to a list of ints, producing a list of list of ints. (`X`)

4. `engine.pascal` creates a [Pascal matrix][pascal], whatever that is, but it is also deterministic and casted into a list of list of ints, like for the magic square. (`Y`)

5. Instead of doing it with the MATLAB library, for some reason the program adds the matrices together in Python, then converts it back to a MATLAB double array. (`C`)

   Because `engine.magic` and `engine.pascal` are both deterministic, I can find the value of `C` by just entering `magic(4) + pascal(4)` into MATLAB.

6. `engine.mtimes` performs [matrix multiplication][mtimes]. `engine.rot90` [rotates a matrix counterclockwise][rot90] by the second argument times 90°. `engine.transpose` [transposes][transpose] the matrix.

   So, finally, the program transposes `B`, which has the XOR'd flag character values, then rotates it by 90° 1337 times, then multiplies `C` with it. It should match the given matrix of numbers.

   Let $B'$ be the rotated matrix and $X$ the given matrix of numbers. $CB^\prime = X$, so $C^{-1}CB^\prime = B^\prime = C^{-1}X$. Therefore, to undo this step, I can multiply the inverse of `C`, rotate it the other direction, then flatten it back into an array of character values.

   ```matlab
   >> X = [2094 2962 1014 2102; 2172 3955 1174 3266; 3186 4188 1462 3936; 3583 5995 1859 5150];
   >> reshape(rot90(inv(magic(4) + pascal(4)) * X, -1337), 1, [])

   ans =

     103.0000   30.0000   29.0000  102.0000   30.0000  104.0000   27.0000   31.0000   30.0000  125.0000   25.0000  121.0000   26.0000  103.0000   25.0000   11.0000
   ```

[^1]: Technically, we paid for it in our tuition.

[double1]: https://www.mathworks.com/help/matlab/matlab_external/matlab-arrays-as-python-variables.html
[double2]: https://www.mathworks.com/help/matlab/ref/double.html
[equivalent]: https://www.mathworks.com/help/matlab/apiref/matlab.engine.matlabengine-class.html#mw_b01602a2-a2f3-458e-82ca-420b69de1a98
[magic]: https://www.mathworks.com/help/matlab/ref/magic.html
[magic-4]: ../images/matrix-lab/magic-4.png
[order]: ../images/matrix-lab/iteration-order.png
[pascal]: https://www.mathworks.com/help/matlab/ref/pascal.html
[mtimes]: https://www.mathworks.com/help/matlab/ref/mtimes.html
[rot90]: https://www.mathworks.com/help/matlab/ref/rot90.html
[transpose]: https://www.mathworks.com/help/matlab/ref/transpose.html

Converting the character code values back into a string

```js
;[
  103.0, 30.0, 29.0, 102.0, 30.0, 104.0, 27.0, 31.0, 30.0, 125.0, 25.0, 121.0,
  26.0, 103.0, 25.0, 11.0
]
  .map(c => String.fromCodePoint(c ^ 42))
  .join('')
```

produces `M47L4B154W3S0M3!`, which looks like it was written by a human, so it's probably right.

## Matrix Lab 3

The remaining rev challenges seemed to be written in C or Scheme compiled to C with Chicken Scheme. Alas, I wasn't really sure how to tackle these. Am I supposed to decompile them, or do I reverse engineer the assembly directly? I think I need more practice with rev challenges written in C.

<!--

## Obligatory Calc

I first started working on this challenge because it involved JavaScript, but I wasn't able to figure it out. Here is what I did find out, though.

> ### Obligatory Calc
>
> Every CTF has one, here's your obligatory calculator web challenge!
>
> https://obligatory-calc.ctf.sekai.team
>
> Some tips to guide your way:
>
> 1. mathjs is part of the solution, but only a tiny part. there is no mathjs 0day, you won't get JS execution through mathjs!
> 2. hm, why isn't DOMPurify used by default? maybe you should look into differences between DOMPurify and Sanitizer API...
>
> the intended solution does not require you to find any 0days.
>
> **obligatory-calc.zip**

-->
