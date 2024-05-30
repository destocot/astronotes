---
title: Introduction & Installation
sidebar:
  order: 1
---

## Introduction

Python is a dynamic programming language created by Guido Van Rossum in the late 1980s.

A common misconception is that Python is a simple scripting language, but it’s so much more.

- Django, a Python web framework powers Instagram, one of the largest websites in the world. It also powers Reddit and is used at Netflix.

In 2014, Python was the most popular teaching language at top U.S. universities.

> “Python is now also the language of amateurs, and I mean that in the best possible way.” —Guido van Rossum

Python has an incredibly rich, fully featured [standard library](https://docs.python.org/3/library/), as well as the [PyPI Package Index](https://pypi.org/) for 3rd party packages, which as of October 2020 contains 270k+ packages.

Python is considered to be a “batteries included” language, because the standard library contains a majority of the libraries and packages you’ll need in a standard application.

If you need more, third-party packages are available for many uses.

- AI/ML
  - SciPi
  - NumPy
  - Pandas
  - PyTorch
- Hardware & Micro-controllers
  - Raspberry Pi
  - MicroPython
  - CircuitPython
- Web Development
  - Django
  - Flask
- DevOps

## Philosophy

The Zen of Python is a collection of 19 software principles written in a poem that influences the design of Python Programming Language. It was published on the Python mailing list in June 1999 by Tim Peters. \*

The Zen of Python is included as an easter egg in the Python REPL. You can read it by typing `import this` in our REPL.

```py
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

### More Easter Eggs

```
from __future__ import braces
```

```
import antigravity
```

## Installation

[Download](https://www.python.org/downloads/)

```bash title="verify installation"
python3 --version
```

### pip

`pip` is a standard package manage for python.

```bash
apt install python3-pip
```

## Virtual Environment

A virtual environment in Python is a self-container directory that contains a Python installation for a particular **version** of Python.

```bash
cd ~
mkdir pyworkshop
cd pyworkshop
python3 -m venv env
source env/bin/activate
```

> `source env/bin/activate` is how you activate your virtual environment

## First Program

```py
# in file: hello.py

greetings = ["Hello", "Bonjour", "Hola"]

for greeting in greetings:
  print(f"{greeting}, World!")
```

```bash
python hello.py
```

## REPL

**REPL** stands for Read, Evaluate, Print, Loop. It allows you to interactively type in Python programs line-by-line.

```bash
python
```

```
Python 3.12.3 (main, Apr 27 2024, 19:00:21) [GCC 11.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

> Press <kbd>CTRL</kbd>+<kbd>D</kbd> to exit the REPL

## Comments

Comments in python start with a `#`

```py
# this is a comment
```
