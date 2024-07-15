---
title: "Functions & Methods"
sidebar:
  order: 2
---

### Functions

```py
print('a value')
print(input('ask for a value '))
```

### Methods (Functions of Data Types)

```py
print('value'.upper())        # Converts to uppercase
print('VALUE'.lower())        # Converts to lowercase
print('value'.replace('e', '3')) # Replaces 'e' with '3'
```

### New Functions

```py
print(abs(-1))                # Absolute value
print(max(10, 5))             # Maximum value
print(min(0, 1))              # Minimum value
print(len('test'))            # Length of the string
```

### Exercise: Create a Pythagoras Theorem Calculator

1. Ask the user for 2 numbers (width and height of a triangle).
2. It should output the length of the hypotenuse.

```py
side_a = int(input("The width of the triangle: "))
side_b = int(input("The height of the triangle: "))

hypothenuse = (pow(side_a, 2) + pow(side_b, 2)) ** 0.5

print("The hypothenuse is:", round(hypothenuse, 2))
```
