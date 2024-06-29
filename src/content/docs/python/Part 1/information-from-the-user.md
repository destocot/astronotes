---
title: "Information From the User"
sidebar:
  order: 2
---

## Introduction

_Input_ refers to any information a user gives to the program.

In Python the `input` command reads in a line of input typed in by the user.

```py
# reads in the name of the user with the `input` command
name = input("What is your name? ")

# prints it out with the `print` command
print("Hi there, " + name)
```

```
What is your name? [Paul Python]
Hi there, Paul Python
```

The word `name` in this program is a _variable_. In the context of programming, a variable is a location for storing some _value_.

## Naming variables

In principle, variables can be named quire freely, within certain limits specified in the Python language.

It is common international programming practice to name variables in English.

The name of the variable has no direct effect on its content.

However, it can often be helpful in understanding how code functions if variables are named logically and in English.

## Referencing a variable

A single variable can be referred to many times in a program:

```py
name = input("What is your name? ")

print("Hi, " + name + "!")
print(name + " is quite a nice name.")
```

```
What is your name? [Paul Python]
Hi, Paul Python!
Paul Python is quite a nice name.
```

## Concatenation

The `+` operator using in the `print` command is used to _concatenate_ strings.

Strings and variables can be combined quite freely.

```py
name = input("What is your name? ")
print("Hi " + name + "! Let me make sure: your name is " + name + "?")
```

# More than one input

A program can ask for more than one input.

```py
name = input("What is your name? ")
email = input("What is your email address? ")
nickname = input("What is your nickname? ")

print("Let's make sure we got this right")
print("Your name: " + name)
print("Your email address: " + email)
print("Your nickname: " + nickname)
```

```
What is your name? [Frances Fictitious]
What is your email address? [frances99@example.com]
What is your nickname? [Fran]
Let's make sure we got this right
Your name: Frances Fictitious
Your email address: frances99@example.com
Your nickname: Fran
```

If the same varialbe is used to store more than one input, each new value will replace the previous one.

```py
address = input("What is your address? ")
print("So you live at address " + address)

address = input("Please type in a new address: ")
print("Your address is now " + address)
```

```
What is your address? [Python Path 101, Flat 3D]
So you live at address Python Path 101, Flat 3D
Please type in a new address: [New Road 999]
Your address is now New Road 999
```
