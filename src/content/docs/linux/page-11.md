---
title: "Conditionals & Loops"
slug: "conditionals-and-loops"
sidebar:
  order: 11
---

## Conditionals: If Statements & Tests

A conditional is a statement that only runs if a condition is true.

_gen_files_

```bash
#! /bin/bash

DESTINATION=$1
read -p "enter a file prefix: " FILE_PREFIX

if [ -z $DESTINATION ]; then
        echo "no path provided, defaulting to ~temp"
        DESTINATION=temp
fi

mkdir -p $DESTINATION
cd $DESTINATION
```

> We can create a conditional (if statement) with the `if ... fi` syntax. The `-z` flag checks if the string is empty.

**Note**
`[]` is a special notation which actually translates to `test` commands. So in our example, our condition evaluates to `test -z $DESTINATION`.

Few Examples

```bash
test 15 -eq 15 # 0
test brian = brian # 0
test brian != brian # 1
test 15 -gt 10 # 0 gt
test 15 -le 10 # 1 le
# tests to see if a file exists
test -e ~/some-file.txt
# tests to see if a file exists and you can write to it
test -w ~/some-file.txt
```

See `man test` for more conditional flags.

## Conditionals: Else, Else If & Case Statement

**Example** Else, Else If

_check_number_

```bash
#! /bin/bash

if [ $1 -gt 10 ]; then
        echo "greater than ten"
elif [ $1 -lt 10 ]; then
        echo "less than ten"
else
        echo "equals 10"
fi
```

```bash
check_number 5
```

```
less than ten
```

Shortcut to use both the **test** commands and **if else** statements. We can chain statements with `&&`.

```bash
num=15
[ $num -eq 15 ] && echo "num is 15" || echo "num is not 15"

[ $num -eq 15 ] && { echo "num is 15"; num=$((num+1)); echo $num; } || echo "num not 15";

[ $num -ne 15 ] && echo "again num not 15" && [ $num -le 100 ] && echo "less than 100" || echo "was 15 or less than 100"
```

> The use of the **Test Operator [ `<condition>` ]** is equivalent to the test command.

**Note** You can use `[[ ]]`, which is an extended version of test that is less POSIX compliant.
You can even run multiple statements with `{}` and terminate each statement with `;`.

## Case Statement (Switch Statement)

_smiley_

```bash
#! /bin/bash

case $1 in
        "smile")
                echo ":)"
                ;;
        "sad")
                echo ":("
                ;;
        "laugh")
                echo ":D"
                ;;
        *)
                echo "I don't know that one yet!"
                ;;
esac
```

```bash
smiley laugh
```

```
:D
```

**Note**
Using `*)` is an optional default that will catch any pattern that doesn't match.

## Seq Function

We can use the `seq` function to iterate through a specific number of times.

```bash
for i in $(seq 5)
do
echo $var
done
```

**Example** Increment or decrement the iterator by specific amounts.

```bash
for i in {0..5};do echo $i;done  # counts up from 0 to 5
for i in {10..0..2};do echo $i;done  # counts down from 10 to 0 by twos
for i in {0..100..10};do echo $i;done  # counts up from 0 to 100 by tens
```

## While Loops

```bash
# let "NUM_TO_GUESS = ${RANDOM} % 10 + 1"
NUM_TO_GUESS=$(( $RANDOM % 10 + 1 ))
GUESSED_NUM=0

echo "guess a number between 1 and 10"

while [ $NUM_TO_GUESS -ne $GUESSED_NUM ]
do
  read -p "your guess: " GUESSED_NUM
done

echo "you got it!"
```

```
guess a number between 1 and 10
your guess: 5
your guess: 4
your guess: 6
you got it!
```

> The `$(( ))` paranthesis notation is a special notation that translates to `let` commands. So in our example, our condition evaluates to `let "NUM_TO_GUESS = ${RANDOM} % 10 + 1"`.

let command in Bash is a built-in command that allows you to perform arithmetic operations on shell variables.

## Loop Control

We can use the keywords `break` and `continue` to control loops

**example**

```bash
while true;
do
read -p 'Would you like to continue? (yes or no)' answer
if [ $answer == 'no' ]
then
break
fi
done
```

```
Would you like to continue? (yes or no)yes
Would you like to continue? (yes or no)yes
Would you like to continue? (yes or no)no
```
