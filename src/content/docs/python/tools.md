---
title: "Tools"
sidebar:
  order: 6
---

## F Strings

```py
user_name = 'Anna'
user_age = 10
user_information = f'{user_name} is {user_age} years old'

bad_approach = user_name + " is " + str(user_age) + " years old" # Bad approach

print(user_information)
```

## Single Line If Statements

```py
user_name = 'Anna'
user_age = 10

user_status = 'adult' if user_age >= 18 else 'child'

# if user_age < 18:
#   user_status = 'Child'
# else:
#   user_status = 'Adult'

print(f'{user_name} is {user_age} years old. The person is a {"adult" if user_age >= 18 else "child"}.')
```

## List Comprehension

```py
simple_list = [f'{j}{i}' for i in range(0, 11, 1) for j in ('a', 'b', 'c') if j == 'a']

# for i in range(0, 11, 1):
#   simple_list.append(i)

print(simple_list)
```

## Lambda Functions

```py
# def double_value(num):
#   return num * 2

double_value = lambda num: num * 2

print(double_value(10))
```

## Functions as Arguments

```py
random_list = [("Anna", 25), ("Paul", 40), ("Lisa", 10)]

sorted_list = sorted(random_list, key=lambda user_tuple: user_tuple[1])
print(sorted_list)
```

## Exercise: Create a List Comprehension for a Battleship Board

- Example: [A1, A2, ..., B1, B2, ..., E5]
- Remove the value 'C3'

```py
battleship_board = [
    f"{letter}{num}"
    for letter in ("A", "B", "C", "D", "E")
    for num in range(1, 6)
    if f"{letter}{num}" != "C3"
]
print(battleship_board)
```
