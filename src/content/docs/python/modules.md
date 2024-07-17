---
title: "Modules"
sidebar:
  order: 8
---

## Modules Overview

- **Modules** can:
  1. Provide extra functionalities via the Python standard library.
  2. Help organize your code via multiple files.
  3. Allow you to import external modules.

## Python Standard Library

- [Python Standard Library Documentation](https://docs.python.org/3/library/index.html)

```py
import math
from random import randint
from string import ascii_lowercase

print(math.sqrt(16))       # Square root function
print(randint(0, 10))      # Random integer between 0 and 10
print(ascii_lowercase)     # Lowercase ASCII letters
```

## Exercise: Find External Library to Print Emojis

1. Install emoji library: `pip install emoji`

```py
import emoji

print(emoji.emojize("Python is :thumbs_up:"))
```

## Multiple-Files Project: `main.py`

```py
# Importing support module elements
from support import Test, var, add_2_numbers

test = Test()
print(test.a)
test.some_method()

print(var)
print(add_2_numbers(2, 3))

# Alternative import method
# from support import *
# test = Test()
# print(test.a)
# test.some_method()
# print(var)
# print(add_2_numbers(2, 3))
```

## Multiple-Files Project: `support.py`

```py
def add_2_numbers(num_a, num_b):
    return num_a + num_b

class Test:
    a = 123

    def some_method(self):
        print("some method")

var = "something"
```

## Graph Plotting: `graph.py`

1. Install matplotlib: `pip install matplotlib`

```py
import matplotlib.pyplot as plt

# Data
x = [i for i in range(0, 11)]
y = [y**2 for y in x]

# Plotting the graph
plt.plot(x, y)
plt.xlabel("x-axis")
plt.ylabel("something else")
plt.show()
```
