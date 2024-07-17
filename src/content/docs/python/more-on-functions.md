---
title: "More on Functiosn"
sidebar:
  order: 5
---

## Create a Function

```py
def print_x_times(parameter="loop", loop_amount=5):
    counter = 0
    print(global_var)
    while counter < loop_amount:
        print(counter, parameter)
        counter += 1
    return "something else"

def hypothenuse_calculator(side_a=1, side_b=1):
    hypothenuse = (side_a ** 2 + side_b ** 2) ** 0.5
    return round(hypothenuse, 2)
```

## Call Functions

```py
print("print")
global_var = "global variable"
test = print_x_times("something", 4)
print(test)

print(hypothenuse_calculator(side_a=5, side_b=4))
```

## Exercise: Create a "Shouter" Function

1. Takes in 2 arguments: a string and a number.
2. Function prints the string uppercased multiple times.
3. If the number is greater than 10, don't print anything. Instead, print `you are too loud` once.
4. The function should also return the string 'done' and have default values.

```py
def shout(output_string="hello", repetition_amount=2):
    if repetition_amount > 10:
        print('you are too loud')
    else:
        for i in range(repetition_amount):
            print(output_string.upper())

    return 'done'

status = shout()
print(status)
```
