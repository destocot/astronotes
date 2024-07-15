---
title: "Containers"
sidebar:
  order: 3
---

## Container Setup

```py
a_tuple = (1, 2, 3, "a string")
a_list = [1, 2, 3, "a string", 2]
a_set = {1, 2, 3, 4}
a_dictionary = {"key": "value", 123: [1, 2, 3]}
```

## How to Get Values from a Container

```py
user_list = ("Lisa", "Bob", "Alex", "Anna", "John")
print(user_list[0:3:2])  # Slicing with a step
```

## Exercise: Create a List from Values 1 to 10

1. Use slicing to create a new list with values 8, 6, 4, 2.

```py
exercise_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(exercise_list[7::-2])  # Slicing to get 8, 6, 4, 2
```
