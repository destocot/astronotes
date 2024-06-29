---
title: "Getting Started"
sidebar:
  order: 1
---

## print

The `print` command is used to display text on the screen.

```py
print("Hi there!")
```

```
Hi there!
```

Text must all be encased in quotation marks or Python will not interpret it correctly.

## Multiple commands

Multiple commands written in succession will be execured in order from first to last.

```py
print("Welcome to Introduction to Programming!")
print("First we will practice using the print command.")
print("This program prints three lines of text on the screen.")
```

```
Welcome to Introduction to Programming!
First we will practice using the print command.
This program prints three lines of text on the screen.
```

## Arithmetic operations

You can also put arithmetic operations inside a `print` command.

```py
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```

```
7
9
22
```

Notice the lack of quotation marks around the arithmetic operations above. Quotation marks are used to signify _strings_.

```py
print(2 + 2 * 10)
print("2 + 2 * 10")
```

```
22
2 + 2 * 10
```

strings are printed out just as tehy are written, without any reference to their contents.

## Commenting

Any line beginning with the point sign `#`, als known as a hash or a number sign, is a commnet.

This means that any text on the line following the `#` symbol will not in any way affect how the program functions.

```py
print("Hours in a year:")
# there are 365 days in a year and 24 hours in each day
print(365 * 24)
```

```
Hours in a year:
8760
```

Shorter comments can be added to the end of a line:

```py
print("Hours in a year:")
print(365 * 24) # 365 days, 24 hours in each day
```

## Quotation marks

In addition to the double quotation marks, Python also accepts single quotation marks `'`.

This comes in handly if you ever want to print out the actual quotation marks themselves.

```py
print('"Come right back!", shouted the police officer.')
```

```
"Come right back!", shouted the police officer.
```
