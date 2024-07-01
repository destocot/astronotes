---
title: "Conditional Statements"
sidebar:
  order: 5
---

## Introduction

It is often useful to create sections of the program which are only executed in certain situations.

```py
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

This program contains a _conditional statement_ with a block of code which is executed only if the condition in the statement is true.

In a conditional statement the keyword `if` is followed by a _condition_, such as a comparison between two values.

The code block following this header line is only executed if the condition is true.

**Note** The colon character ':' is required at the end of the `if` line.

## Comparison Operators

`==`
Purpose: Equal to
Example: `a == b`

`!=`
Purpose: Not equal to
Example: `a != b`

`>`
Purpose: Greater than
Example: `a > b`

`>=`
Purpose: Greater than or equal to
Example: `a >= b`

`<`
Purpose: Less than
Example: `a < b`

`<=`
Purpose: Less than or equal to
Example: `a <= b`

**Example**

```py
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative.")

if number > 0:
    print("The number is positive.")

if number == 0:
    print("The number is zero.")
```

```
Please type in a number: [15]
The number is positive.
```

```
Please type in a number: [-18]
The number is negative.
```

```
Please type in a number: [0]
The number is zero.
```

## Indentation

Python recognises that a block of code is part of a conditional statement if each line of code in the block is _indented_ the same.

**Example**

```py
password = input("Please type in a password: ")

if password == "kittycat":
    print("You knew the password!")
    print("You must be either the intended user...")
    print("...or quite an accomplished hacker.")

print("The program has finished its execution. Thanks and bye!")
```

## Boolean values and Boolean expressions

Any condition used in a conditional statement will result in a truth value, that is, either true or false.

These types of values are often called _Boolean_ values, named after the English mathematician George Boole.

In Python they are handled by the `bool` data type. Variables of type `bool` can only have two values: `True` or `False`.

Any bit of code that results in a Boolean value is called a _Boolean expression_.

**Example**

```py
a = 3
condition = a < 5
print(condition) # True
if condition:
    print("a is less than 5") # a is less than 5
```

## Example - Quadratic Formula

```py
from math import sqrt

a = int(input("Value of a: "))
b = int(input("Value of b: "))
c = int(input("Value of c: "))

discriminant = (b ** 2) - (4 * a * c)

x1 = ((-1 * b) + sqrt(discriminant)) / (2 * a)
x2 = ((-1 * b) - sqrt(discriminant)) / (2 * a)

print(f"The roots are {x1} and {x2}")
```
