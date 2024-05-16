---
title: "Shell Scripts"
slug: "shell-scripts"
sidebar:
  order: 10
---

## Writing Scripts

```bash title="gen_files.sh"
mkdir -p ~/temp
cd ~/temp
touch file{1..10}.txt
echo done
```

> We can run the follow script file with either `bash gen_files.sh`, `source gen_files.sh`, or `. gen_files.sh`. The `-p` flag indicates that if the directory already exists do not error out.

When running our script with `bash ...` we run the script as a sub process (if the script involves changing a directory, we will not change directories post script).

## Hashbang

```bash
#! /bin/bash
```

This line (called a shebang, hashbang, or many other things; often ! is called a bang in computing) lets bash know how to execute this file. It must be on the first line and it must start with `#!`. It's then always followed by the absolute path (meaning it starts with `/` and gives you the full path; you cannot give it a relative e.g. `./bash`).

_gen_files_

```bash
#! /bin/bash

mkdir -p ~/temp
cd ~/temp
touch file{1..10}.txt
echo done
```

```bash
chmod +x gen_files
./gen_files
```

```
done
```

> Running `chmod +x` will allow us to run `gen_files` as an executable. The hashband `!# /bin/bash` lets bash know how to execute the file.

**Example**

_gen_node_

```
#! /usr/bin/node

console.log('this is running from node.js');
```

```bash
chmod +x ./gen_node
./gen_node
```

```
this is running from node.js
```

## Arguments

There's a program called `read` that will get user input and define a variable based on it.

```bash
read name && echo hello $name
```

```
Naruto Uzumaki
hello Naruto Uzumaki
```

**Example**
Interactive prompt

```bash
#! /bin/bash

DESTINATION=~/temp
read -p "enter a file prefix: " FILE_PREFIX

mkdir -p $DESTINATION
cd $DESTINATION
touch ${FILE_PREFIX}{1..10}.txt
echo done
```

> The `-p` flag allows us to **p**rompt the user with a string, letting them know what we're expecting.

We can use `$1`, `$2`, etc. to pass in arguments (sometimes called parameters) to our scripts.

**Note**

```bash
echo $0
```

```
/bin/bash
```

`$0` refers to the command we invoked to run the specific script

**Example**

_gen_files_

```bash
#! /bin/bash

DESTINATION=$1
FILE_PREFIX=file

mkdir -p $DESTINATION
cd $DESTINATION

touch ${FILE_PREFIX}{1..10}.txt
echo done
```

```bash
gen_files ~/different-temp-folder
```

## Getopts

Have you noticed that most built-in shell tools allow you to use options, and those options may or may not be attached to the argument?

```bash
# read in args
while getopts q:d: o; do
  case $o in
    q) quotient=$OPTARG;;
    d) denominator=$OPTARG;;
    *) echo "Invalid option:"; exit 1;
  esac
done
shift "$((OPTIND - 1))"
# shift removes the arguments parsed by getopts
# If any args are left, they will start at $1

echo $((quotient / denominator))
```

- The while loop processes the getopts options.
- Here we have two options, q and d. Because they are followed by the :, they are required.
- The o is a placeholder that we put in a case code block.
- The $OPTARG variable contains the value of the arg from getopts, and is stored in a variable for later use. The shift command below removes that current argument so the loop can move on to the next one.

Below demonstrates the different ways this divide.sh file can be executed.

```bash
./divide.sh -q 40 -d 10
./divide.sh -q40 -d10
./divide.sh -d 10 -q 40
./divide.sh -q 40 -d10
./divide.sh -d10 -q 40
```
