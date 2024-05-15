---
title: "Environments & Processes"
slug: "environments-and-processes"
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

## Processes

Everything running in Linux is a process

```bash
ps
```

```
PID TTY          TIME CMD
41737 pts/1    00:00:00 bash
42412 pts/1    00:00:00 ps
```

> processes the current user are currently running (as opposed to **ps aux**)

```bash
sleep 10
```

> waits for 10 seconds

**example**

```bash
sleep 1000
```

<kbd>CTRL</kbd> + <kbd>Z</kbd>

```
^Z
```

> this will stop the process

```bash
jobs
```

```
[1]+  Stopped                 sleep 1000
```

```bash
bg 1
```

> this will resume the stopped process [1] in the background (can also use **fg** for foreground)

**Note**: this is a useful for having process switch between running in the background and foreground

```bash
jobs -l
```

> lists jobs with PID

## Exit Codes & Process Operators

```bash
date
```

```
Fri May  3 04:09:54 AM EDT 2024
```

> prints the current date

```bash
echo $?
```

> prints exit code for the last command

**Exit codes**: 0 means it finished successfully, otherwise it did not finish successfully

**Common exit codes**

- 0: means it was successful. Anything other than 0 means it failed
- 1: a good general catch-all "there was an error"
- 2: a bash internal error, meaning you or the program tried to use bash in an incorrect way
- 126: Either you don't have permission or the file isn't executable
- 127: Command not found
- 128: The exit command itself had a problem, usually that you provided a non-integer exit code to it
- 130: You ended the program with <kbd>CTRL</kbd> + <kbd>C</kbd>
- 137: You ended the program with SIGKILL
- 255: Out-of-bounds, you tried to exit with a code larger than 255

**Example**: Operators

```bash
touch status.txt && date >> status.txt && uptime >> status.txt
```

> if `touch status.txt` returns an exit code of 0 then `date >> status.txt` will run, ...

```bash
false || echo hi
```

```
hi
```

> right side of the or (||) operator will run if the left side fails.

```bash
true ; false ; echo hi
```

```
hi
```

> the semicolon (;) allows to run commands sequentially regarless of if the previous command fails or not.

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
