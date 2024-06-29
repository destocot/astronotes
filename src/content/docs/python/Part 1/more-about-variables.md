---
title: "More About Variables"
sidebar:
  order: 3
---

## Introduction

Variables are needed for various purposes in programming.

You can use variables to store any information that will be needed later in the program's execution.

```py
name = input("What is your name? ")
print("Hi", name)
```

```
What is your name? [Ghosty]
Hi Ghosty
```

The value stored in a variable can also be defined using other variables.

```py
given_name = "Paul"
family_name = "Python"

name = given_name + " " + family_name
print(name)
```

```
Paul Python
```

## Changing the value of a variable

As implied by the name _variable_, the value stored in a variable can change.

```py
word = input("Please type in a word: ")
print(word)

word = input("And another word: ")
print(word)

word = "third"
print(word)
```

```
Please type in a word: [first]
first
And another word: [second]
second
third
```

The new value of a variable can be derived from its old value.

```py
word = input("Please type in a word: ")
print(word)

word = word + "!!!"
print(word)
```

```
Please type in a word: [test]
test
test!!!
```

## Choosing a good name for a variable

- It is often useful to name variables according to what they are used for.

e.g. If the variable contains a word, the name `word` is a better choice than, say, `a`.

- There is no set limit to the length of a variable name.

- A variable name should begin with a letter, and it can only contain letters, numbers, and underscores '\_'.

- Lowercase and uppercase letters are different characters.

e.g. `name`, `Name`, and `NAME` are three different variable names.

- It is a common practice in Python to use only lowercase characters in variable names.

- If a variable name consists of multiple words, it is common to separate them with underscores.

## Integers

Integers are numbers that do not have a fractional part.

```py
age = 24
print(age)
```

```
24
```

Notice the lack of quotation marks here. In fact, if we were to use quotation marks around the number, this would mean our variable would no longer be an integer, but a string isntead.

```py
number1 = 100
number2 = "100"

print(number1)
print(number2)
```

```
100
100
```

Som why does it matter that variables have a type, when the above program still prints out the same thing twice?

Variable types **matter** because different operations affect differnt types of variables in different ways.

```py
number1 = 100
number2 = "100"

print(number1 + number1)
print(number2 + number2)
```

```
200
100100
```

For integer values the `+` operation means addition.

For string values the `+` operation means concatenation.

Not all operators are available for all types of variables.

```py
number = "100"
print(number / 2)
```

```
TypeError: unsupported operand type(s) for /: 'str' and 'int'
```

## Combining values when printing

Similarly, the following program will not work, because `"The result is "` and `result` are of two different types:

```py
result = 10 * 25
# the following line produces an error
print("The result is " + result)
```

```
TypeError: unsupported operand type(s) for +: 'str' and 'int'
```

If we want to print out a string and an integer in a single command, the integer can be case as a string with the `str` function.

```py
result = 10 * 25
print("The result is " + str(result))
```

```
The result is 250
```

The `print` command also has built-in functionalities that support combining differnt types of values.

The simplest way is to add a comma between the values.

```py
result = 10 * 25
print("The result is", result)
```

```
The result is 250
```

**Note** There is an automatically added whitespace character between the values separated by a comma here.

## Printing with f-strings

If we wanted to have more flexibility and control over waht we print out, we can use _f-strings_.

_f-strings_ are a way to format strings in Python.

```py
result = 10 * 25
print(f"The result is {result}")
```

```
The result is 250
```

A single f-string can contain multiple variables.

```py
name = "Mark"
age = 37
city = "Palo Alto"
print(f"Hi {name}, you are {age} years old and. You live in {city}.")
```

```
Hi Mark, you are 37 years old and. You live in Palo Alto.
```

> _f-strings_ were introduced in Python version 3.6

## Floating point numbers

`Floating point numbers` or _float_ is a term you will come across often in programming. It refers to numbers with a decimal point.

```py
number1 = 2.5
number2 = -1.25
number3 = 3.62

mean = (number1 + number2 + number3) / 3
print(f"Mean: {mean}")
```

```
Mean: 1.6233333333333333
```

## end argument

The `print` command has an optional `end` argument that can be used to specify what should be printed after the values.

```py
print("Hi ", end="")
print("there!")
```

```
Hi there!
```
