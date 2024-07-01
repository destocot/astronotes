---
title: "Arithmetic Operations"
sidebar:
  order: 4
---

## Most Common Arithmetic Operators

`+`
Purpose: Addition
Example: `2 + 4`
Result: `6`

`-`
Purpose: Subtraction
Example: `10 - 2.5`
Result: `7.5`

`*`
Purpose: Multiplication
Example: `-2 * 123`
Result: `-246`

`/`
Purpose: Division (floating point result)
Example: `9 / 2`
Result: `4.5`

`//`
Purpose: Division (integer result)
Example: `9 // 2`
Result: `4`

`%`
Purpose: Modulus (remainder)
Example: `9 % 2`
Result: `1`

`**`
Purpose: Exponentiation
Example: `2 ** 3`
Result: `8`

## Order of Operations

The order of operations is familiar from mathematics

```py
print(2 + 3 * 3)
print((2 + 3)  * 3)
```

```
11
15
```

The data type of an `operand` usually determines the data type of the result.

- If two integers are added, the result is an integer.

- If a floating point number is subtracted from an integer, the result is a floating point number.

- In fact, if a single one of the operands is a floating point number, the result will be a floating point number.

- Division `/` is an exception to the rule, it's result is always a floating point number.

**Example**

```py
height = 172.5
weight = 68.55

# the Body Mass Index, or BMI, is calculated by dividing body mass with the square of height
# height is converted into meters in the formula
bmi = weight / (height / 100) ** 2

print(f"The BMI is {bmi})
```

```
The BMI is 23.037177063642087
```

Notice Python also has an integer division operator `//`. If the operands are integers, it will produce an integer. The result is rounded down to the nearest integer.

**Example**

```py
x = 3
y = 2

print(f"/ operator {x / y}")
print(f"// operator {x // y}")
```

```
/ operator 1.5
// operator 1
```

## Numbers as input

We can use the `input` command to read in strings from the user. The string must then be converted to a numeric type. We can cast a string to an integer with the `int()` function.

```py
input_str = input("Which year were you born? ")
year = int(input_str)
print(f"Your age at the end of the year 2024: {2024 - year}")
```

```
Which year were you born? [1996]
Your age at the end of the year 2024: 28
```

Usually you do not need to create two separate variables.

```py
year = int(input("Which year were you born? "))
```

Similarly, a string can be converted into a floating point number using the `float()` function.

```py
height = float(input("What is your height? "))
weight = float(input("What is your weight? "))

height = height / 100
bmi = weight / height ** 2

print(f"The BMI is {bmi}")
```

## Using variables

**Example** Adding three numbers

```py
sum = 0

number = int(input("First number: "))
sum = sum + number

number = int(input("Second number: "))
sum = sum + number

number = int(input("Third number: "))
sum = sum + number

print(f"The sum of the numbers is {sum}")
```

Here we are repeating the command `sum = sum + number`. This is a common operation, so Python has a shorthand for it: `+=`.

```py
sum = 0

sum += int(input("First number: "))
sum += int(input("Second number: "))
sum += int(input("Third number: "))

print(f"The sum of the numbers: {sum}")
```

## Exercise

Please write a program which asks for the number of students on a course and the desired group size. The program will then print out the number of groups formed from the students on the course. If the division is not even, one of the groups may have fewer members than specified.

Solution without using conditional statements:

```py
students = int(input("How many students on the course? "))
group_sz = int(input("Desired group size? "))

groups = (students + group_sz - 1) // group_sz
print(f"Number of groups: {groups}")
```
