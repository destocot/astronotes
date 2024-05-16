---
title: "Environments, Path, & Variables"
slug: "environments-path-and-variables"
sidebar:
  order: 7
---

## Environments

Your current session of your shell has a bunch of variables set.

```bash
printenv
```

> prints out what variables have been set

```bash
echo hello my name is $USER
```

```
hello my name is ubuntu
```

**example**

```bash
echo "export MY_VARIABLE=\"something\"" >> ~/.bashrc
source ~/.bashrc
echo $MY_VARIABLE
```

```
something
```

> creates and exports a variable named MY_VARIABLE with the value of something in the `.bashrc` file. We then reload the `.bashrc` file to sync any changes. We then print out our variable to stdout

### .bashrc and .bash_profile

`.bash_profile` is only run once for each time you log into your computer. `.bashrc` is is run on every nonlogin shell (every tab of bash you start up).

> every user has their own **.bashrc**

**Note**: Entering the following in your `.bash_profile` will make sure your `.bashrc` is always ran. This way you only need to modify your `.bashrc` file.

```bash
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

## Path & Variables

```bash
echo $PATH
```

```
/home/ubuntu/.local/share/pnpm:/home/ubuntu/.nvm/versions/node/v20.12.2/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin
```

> Locations on your computer where your programs are.

When we run `node` it goes through each of these locations and checks for anything called `node`.

```bash
cd ~
mkdir my_bin
mv gen_files.sh my_bin/gen_files
PATH=~/my_bin:$PATH
echo $PATH
gen_files
```

> Here we create a directory called `my_bin` and place our executable files. We then se a PATH variable to `my_bin:$PATH` (for this session only) now when we run `gen_files` it will execute without a direct path (i.e. `./gen_files`) since it now lives in our PATH variables set.

**Note**
Adding executables to our path variables also gives us autocomplete.

```bash
# this is a comment
touch file{1...10}.txt
```

> We can create comments in our script files by using the `#` symbol.

```bash
#! /bin/bash

DESTINATION=~/temp
FILE_PREFIX=file

mkdir -p $DESTINATION
cd $DESTINATION

touch ${FILE_PREFIX}{1..10}.txt
echo done
```

> Here we create variables called `DESTINATION` and `FILE_PREFIX` that we use throughout our code. We need to use `{}` around our variable when it is ambigious to what the curly braces `{1..10}` refers to.

**Note**
We can always wrap our variables with `{}` if desired.

**Useful Shell Variables**

- $0 is always the program name
- $# is the number of arguments
- $@ is the list of all arguments that can be iterated
- $1 is the first argument, $2 is the second argument, and so on
- $? is the status of the previous command
- ?? is the PID of the current process

### printenv

We can use the `printenv` command to print all the env variables in our system.

```bash
printenv
```

```
SHELL=/bin/bash
HISTCONTROL=ignoredups
SYSTEMD_COLORS=false
...
```

## Variables

### Create a variable

```bash
name=Brian
echo "My name is $name"
```

```
My name is Brian
```

**Note** These variables will be deleted when the user logs out and logs in again.

### Persist variables

We can persist variables by adding them our `.bashrc` or `.bash_profile` file in our home directory.

```bash
echo 'export envname=Brian' >> ~/.bash_profile
```

**Note** When we edit our `.bash_profile` or `.bashrc` we must either log out and log in again to sync changes or execute the command `source ~/.bash_profile`

```bash
echo $envname
```

```
Brian
```

### unsert

We can remove variables using the `unset` command.

```bash
unset name
```

### substitution

We can use either the backticks (\`\`) or `$()` syntax to perfeorm command in a subshell (substitution).

```bash
echo "today's date is $(date)"
echo "today's data is `data`"
```

## Shell Parameter Expansion

Shell parameter expansion is a feature of the Linux shell that allows you to manipulate the values of shell variables and perform operations on them automatically.

**Examples**

```bash
myvar="Hello World"
echo ${myvar} # Hello World
echo ${myvar/Hello/Goodbye} # Goodbye World
echo ${myvar^^} # HELLO WORLD
echo ${myvar,,} # hello world
echo ${myvar:0:3} # hel
echo ${#myvar} # 5
echo ${myvar/h/b} # bello
```

## Subcommands

**examples**

```bash
echo I think $(whoami) is a really cool user
```

```
I think ubuntu is a really cool user
```

```bash
echo $(date +%x) - $(uptime) >> log.txt
cat log.txt
```

```
05/03/2024 - 04:27:05 up 3:02, 1 user, load average: 0.93, 0.74, 0.60
```
