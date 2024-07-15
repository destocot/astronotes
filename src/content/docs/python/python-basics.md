---
title: "Python Basics"
sidebar:
  order: 1
---

## Execution Order

```py
from os import system
system('clear')

# execution order
print('line 4') # this will be ignored
print('line 5')
print('line 6')
```

- **Note**: Code is executed line by line. Lines of code that are commented out (preceded by `#`) are ignored.

## Data Types

### Strings

```py
# data types
print('words') # strings
print("words")
```

- **Strings**: Used to represent text. Can be defined using single (`'`) or double (`"`) quotes.

### Integers and Floats

```py
print(123) # integers / ints
print(-10)
print(1.5) # floating point value / float
```

- **Integers**: Whole numbers, positive or negative.
- **Floats**: Numbers with decimal points.

## Operations

```py
# operations
print(3 + 3)           # Addition
print(3 - 3)           # Subtraction
print(3 * 3)           # Multiplication
print(3 / 3)           # Division
print(10 + 0.12341234123412341234) # Addition with float
print(10 * 'hello')    # Repeats the string
print(13 - 3 * (4 + 2)) # Order of operations: Parentheses first
```

- **Operators**: Python supports arithmetic operations like addition, subtraction, multiplication, and division.
- **Order of Operations**: Parentheses `()`, Exponents `**`, Multiplication/Division `* /`, Addition/Subtraction `+ -`.

## Variables

```py
# variables
test_value = 123
test_value += 50
print(test_value)
```

- **Variables**: Used to store values. You can change the value of a variable using `+=` for addition.

## User Input

```py
# input
user_input = input("Please write something ")
print(user_input)
```

- **Input**: The `input()` function allows the user to provide data. This data is always returned as a string.

## Exercise: Create a Greeter App

```py
# exercise - create a greeter app
# 1. ask a user for their name
# 2. print "Hello {name}, have a nice day"
user_name = input("What is your name? ")
print("Hello", user_name, "Have a nice day :)")
```

- **String Concatenation**: The `print()` function can take multiple arguments, separated by commas, to concatenate strings.

## Additional Tips

- **Comments**: Use `#` for single-line comments to improve code readability.
