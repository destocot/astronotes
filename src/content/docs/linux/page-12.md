---
title: "Arrays & Functions"
slug: "arrays-and-functions"
siderbar:
  order: 12
---

## Arrays

Bash supports two types of arrays

**Indexed arrays**

```bash
declare -a friends #optional

friends=(Kyle Marc Jem "Brian Holt" Sarah)
```

> Creating an array, Indexed arrays are used when we want to create a set of values, but we don't need to assign labels to the values.

```bash
echo my second friend is ${friends[1]}
```

```
my second friend is Marc
```

> Accessing a member of an array

**Associative Array**

```bash
declare -A associative_array # optional - note the use of A instead of a

associative_array[eyes]=blue
associative_array[height]=average
associative_array[hair]=blond

echo ${associative_array[eyes]}  # print the value associated with 'eyes': blue
```

> An associative array is best for a collection of values where each value has a role in the collection, such as form data with names, addresses, and other contact information.

> The use of labels and values is also referred to as **key-value pairs**, where each label is a key associated with a specific value.

```bash
echo ${indexed_array[@]}
```

> print all elements of an array

**Example** Add value to the end of an indexed array

```bash
indexed_array=(blue yellow red)
indexed_array+=(green)
```

**Example** Add two values to an associative array

```bash
associative_array[eyes]=blue
associative_array[height]=average
associative_array[hair]=blond

associative_array+=([age]=30 [citizen]=Canada)  # add two more values
```

**Example** Remove an element

```bash
# removes the second element in an indexed array
unset indexed_array[1]
 # removes the value labeled as "color" in an associative array
unset associative_array[color]
```

## Looping through an array

```bash
indexed_array=(blue yellow red)

for i in ${indexed_array[@]}; do echo $i; done
```

> Looping through an array with ** `[@]`**

```bash
for friend in ${friends[*]}
do
    echo friend: $friend
done
```

```
friend: Kyle
friend: Marc
...
```

> Looping through an array with **`[*]`**

**Note**

`${array[@]}` treats each array element as a **separate argument** and **preserves spaces**.

`${array[*]}` concatenates all elements into a **single string** and **joins elements with spaces**.

```bash
echo "I have ${#friends[*]} friends"
```

```
I have 5 friends
```

> See length of an array

## Arithmetic in Bash

### let

The `let` function is a build-in function that allows us to use arithmetic to assign a value to a variable.

```bash
let a=1+1  # $a = 2
let "a = 1 + 1"  # $a = 2
let a++  # increments a by 1, so $a = 3
```

### expr

The `expr` function also uses arithmetic with integers, but it returns the answer rather than storing the result in a variable.

```bash
expr 1 + 1 # prints 2
multiply=$(expr 1 \* 3)   # $multiply = 3
```

### $(()): Double Parentheese

We can use double paranthesis as an alternative to `expr`.

```bash
total=$(( 8*3 ))  #  $total = 24 (no escape character required)
((total++))   # increment by 1: $total = 25
((total += 5))  # add five to current value: $total = 30
new_total=$(( $total / 5 )) # assign the result of a mathematical operation to a new variable; $new_total = 6
```

### For Decimal Values (Floats)

**Basic Calculator** (bc)

The `bc` keyword can be used to do both Integer and floating computation.

```bash
bc -l <<< '4/3'
bc <<< 'scale=1; 4/3'
```

```
1.333333333
1.3
```

## Defensive Coding

Using input functions like **read** can let us test input to avoid problems when running a script. This process is called **defensive coding**.

**Check number of parameters**

_script.sh_

```bash
echo "Number of arguments: $#"
```

```bash
./script.sh hello 5
```

```
Number of arguments: 2
```

**Test if a variable is empty**

```bash
if [ -z "$var" ]
then
        echo "\$var is empty"
else
        echo "\$var is NOT empty"
fi
```

**Test for an existing file or director**

```bash
if [ -f "$filename" ]
if [ -d "$directory" ]
```

## Functions

Functions are blocks of reusable code designed to perform a specific operation.

```bash
function_name() {
        commands
}
```

alternative

```bash
function function_name {
        commands
}
```

**example**

```bash
add_numbers(){
    echo $(($1 + $2))
}
result=$(add_numbers 5 10) # using $() to capture the output of add_numbers in a variable
echo $result
# prints 15
```

## Variable Scope

The term **scope** refers to the parts of a script that can access the value assigned to a variable.

A **global** variable is a variable declared outside of a function.

```bash
var1='Hello'

scope_test () {
        echo $var1
}

scope_test
```

```
Hello
```

A **local** variable can only be accessed within the function they are declared.

```bash
var1="global variable"

scope_test1 () {
  local var2="function variable"
}

scope_test2 () {
  echo $var2  # cannot access var2
}

scope_test2   # no output
```

A function variable takes precedence over a global variable when the variables have the same name.

```bash
var1='Hello'

scope_test () {
	local var1='Goodbye'
	echo $var1
}

scope_test
```

```
Goodbye
```

## Return

The keyword return is a built-in function that returns a function's **exit code**, unlike other programming languages.

```bash
function_return () {
	return 777
}

function_return

echo $?
```

```
9
```

If we want to return a value we can create a variable that can be used by the shell script.

```bash
function_good_return () {
	myvar=777
}

function_good_return

echo $myvar
```
