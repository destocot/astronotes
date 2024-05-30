---
title: Data Types
sidebar:
  order: 2
---

## Variables & Types

Variable conventions leans towards **snake case**, lower case letters separated by underscores (i.e. `number_of_points`)

```py
x = 5
print(x) # 5
```

In python we do not have to declare a type for a variable, it is important to be **mindful** of this and provide descriptive variables names throughout your program.

Futhermore, this means we can change the type of a variable throughout the program.

```py
x = "five"
print(x) # five
```

## None

We can use the `None` keyword to present a **null** value.

```py
goodbye = None
type(goodbye) # => <class 'NoneType'>
```

## Helpful REPL Methods:

### help

`help()` to instantly see available documentation about the method, the parameters it expects, and what it returns.

```py
help(str) # ... Create a new string object from the given object ...
```

We can be more precise when looking for documentation by providing a specific method. (methods can be accessed with the `.`, which is referred to as dot-notation)

```py
help(str.isalpha) # ... True if the string is an alphabetic string ...
```

### type

The `type()` method helps us find the type of an object.

```py
num = 42
type(num) # <class 'int'>
```

### dir

`dir()` stands for directory. Show me the directory for all the methods that are available for this type.

```py
dir(str) # ['__add__', '__class__', '__contains__', ..., ]
```

## Numbers

### Integers

Integers in python are of type `<class 'int'>`

```py
x = 4 # type(x) => <class 'int'>
y = -131332 # type(y) => <class 'int'>
z = 0 # type(z) => <class 'int'>
```

### Floats

Floats in python are of type `<class 'float'>`

```py
x = 5.0 # type(x) => <class 'float'>
y = -3133.001 # type(y) => <class 'float'>
z = 0. # type(z) => <class 'float'>
```

### Complex Numbers

Complex numbers in python end in the letter `j` are of type `<class 'complex'>`

```py
x = 42j # type(x) => <class 'complex'>
```

> Since types are just objects under the hood, we can declare types with their respective constructors

```py
x = int(5) # type(x) => <class 'int'>
y = int('4') # type(y) => <class 'int'>
z = float(3) # type(z) => <class 'float'>
```

> Generally, you do not want to use constructors to declare types unless you are converting between types (with modern string formatting features this is less common)

### Mathematical Operations

```py
5 + 4 # => 9
10 - 7 # => 3

a = 3
b = 2
a * b  # => 6
a ** b  # => 9

5.0 / 2.0 # => 2.5
(2 + 2) * (3 + 5) # => (4) * (8) => (32)
```

If you divide two **int**s then the resulting value will be of type **float**, unless you use the special integer division operator `//`.

```py
5/2 # => 2.5
5//2 # => 2
```

### Built-in Methods

```py
min(3, 1, 2) # => 1
max(100, 0, 5) # => 100
round(3.1) # => 3
round(5.9) # => 6
```

> If you need more advanced methods, Python also offers a `math` module in the standard library.

## Boolean

```py
True
False
```

**Note** Under the hood boolean's are subclasses of integers

> True has a value of `1` and False has a value of `0`

## Strings

Python accepts both single quotes `'` and double quotes `"` when working with strings.

```py
name = "Nina"
color = 'blue'
venue = "Toad's Place"
```

Longer strings can be made with a triple double quuet `"""`

```py
a_long_string = """
my very
long
string
"""
```

When using the `print()` function we will preserve white space however, under the hood the variable is stored as `'\nmy very\nlong\nstring\n'`

### Concatenation

```py
"hi" + "bye" # => 'hibye'
```

### F-Strings

F-strings allows you to format selected parts of a string

```py
a = 5
f"hi {a}" # => 'hi 5'
```

### Replacing Characters

```py
name = "Nina"
name.replace("N", "Z") # => 'Zina'
name # => 'Nina'
```

**Note** In python strings cannot be changed, if we want to work with altered strings, we have to store them in a new variable.

```py
z_name = name.replace("N", "Z") # => 'Zina'
z_name # => 'Zina'
```

## Print

The `print()` function prints the specified message to the screen.

```py
print("hi") # => hi

a = 5
print(a) # => 5

print("hi", a) # => hi 5
```

## Lists

### Cheat Sheet

use

- Used for storing similar items, and in cases where items need to be added or removed.

creation

- `[]` or `list()` for empty list, or `[1, 2, 3]` for a list with items.

search methods

- `my_list.index(item)` or `item in my_list`

search speed

- Searching for an item in a large list is slow brcause each item must be checked.

common methods

- `len(my_list)`, `append(item)` to add, `insert(index, item)` to insert at index, `pop()` to remove.

order preserved?

- Yes. Items can be accessed by index.

mutable?

- Yes

in-place sortable?

- Yes. `my_list.sort()` will sort the list in-place. `my_list.sort(reverse=True)` will sort the list in-place in descending order. `my_list.reverse()` will reverse the items in `my_list` in-place.

**Note** Lists are of type `<class 'list'>`

Adding, removing, changing, and find items in `list`s

check length (returns `int`)

- `len(my_list)`

**add**: to the end

- `my_list.append(item)`

**insert**: at position

. `my_list.insert(pos, item)`

**update**: at position (`IndexError` if `pos` is >= `len(my_list)`)

- `my_list[pos] = item`

**extend**: add items from another list

- `my_list.extend(other_list)`

is item in list? (returns `True` or `False`)

- `item in my_list`

**index** of item (returns `int`) (`ValueError` if `item` is not in `my_list`)

- `my_list.index(item)`

**count** of item (returns `int`)

- `my_list.count(item)`

**remove** an item (`ValueError` if `item` not in `my_list`)

- `my_list.remove(item)`

**remove** the last item, or an item at an index (returns `item`) (`IndexError` if `pos` is >= `len(my_list)`)

- `my_list.pop()` or `my_list.pop(pos)`
