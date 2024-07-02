---
title: "Programming Terminology"
sidebar:
  order: 1
---

## Statement

A _statement_ is a part of the program which executed something.

**Example**

```py
if name == "Anna":
    print("Hi")
    number = 2
```

In the above case there are two statements within a conditional statement.

## Block

A _block_ is a group of consecurtive statements that are at the same level in the structure of the program.

In Python blocks are expressed by indenting all code in the block by the same amount of whitespace.

**Note** The main block of a Python program must always be at the left most edge of the file, without indentation:

```py
#this program will not work because it is written at the leftmost edge of the file
  print("hello")
  print("this program is not very good...")
```

## Expression

An _expression_ is a bit of code that results in a determined data type.

- Becasue all expressions have a type, they can be assigned to variables.

- Simple expresions can be assembled together to form more complicated expressions.

```py
# the variable y is assigned the variable of the expression '3 times x plus x squared'
y = 3 * x + x ** 2
```

## Function

A _function_ executes some functionality.

A _function_ is executed when it is _called_. That is, when the _function_ (and its _arguments_, if any) is mentioned in the code.

```py
name = input("Please type in your name: ")
```

The `input` _function_ takes in the _argument_ a message that is shown to the user.

In this case, the function also _returns_ a value.

## Data type

_Data type_ refers to the characteristics of any value present in the program.

You can use the function `type` to find out the data type of any expression.

```py
print(type("Anna"))
print(type(100))
```

```
<class 'str'>
<class 'int'>
```

## Syntax

The _syntax_ of a programming language determines how the code of a program should be written.

If the syntactic rules of the programming language are not followed, there will be an error:

```py
# `if` statement should end in a colon ':'
if name == "Anna"
  print("Hi!")
```

```
  File "test.py", line 1
    if name == "Anna"
                    ^
SyntaxError: invalid syntax
```

## Debugging

If the syntax of the program is correct but the program still doesn't function as intended there is a _bug_ in the program.

Programming jargon refers to discovering the cause of bugs as _debugging_.

Techniques for _debugging_.

- "hard-code" problematic input

- adding _debugging print statements_

### len

The function `len` can be used to find out the length of a string

```py
print(len("hi there"))
```

```
8
```
