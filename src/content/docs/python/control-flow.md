---
title: "Control Flow"
sidebar:
  order: 4
---

## If Statements

```py
if 3 > 4:
    print("Correct result")
elif 0 > 1:
    print("Other result")
elif 0 == 0 and 5 > 1:
    print("Another result")
    if len([1, 2, 3]) > 2:
        print("list is long enough")
else:
    print("Incorrect result")
```

## While Loop

```py
counter = 0

while counter <= 10:
    print(counter)
    counter += 1
    if counter == 5:
        print("counter is 5")

print("while loop has finished")
```

## For Loop

```py
test_dictionary = {1: 2, 3: 4, 5: 6}

for k, v in test_dictionary.items():
    print("k -> v", k, "->", v)
```

## Truthy and Falsy

```py
if 0:
    print("truthy")
else:
    print("falsy")
```

## Exercise: Create a List from Values 1 to 5

1. If the value is 2, print "the value is 2".
2. If the value is not 2, print "the value is not 2".
3. If the value is 5, run a while loop to print "last item" 6 times.

```py
exercise_list = [1, 2, 3, 4, 5]
exercise_counter = 0

for x in exercise_list:
    if x == 2:
        print("the value is 2")
    else:
        print("the value is not 2")

while exercise_counter <= 5:
    print("last item")
    exercise_counter += 1
```
