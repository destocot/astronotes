---
title: "The CLI"
slug: "the-cli"
sidebar:
  order: 2
---

## Anatomy of the Command Line Interface

- REPL, **R**ead **E**valuate **P**rint **L**oop.
  - It's basically an interactive way of programming where you're writing one life of code at a time.
- Linux is file system oriented (everything is a file in Linux).

```bash
pwd
```

```
/home/ubuntu
```

> present working directory

- You are using a **shell** right now, and that shell is most certainly **bash**. The **B**ourne **A**gain **Sh**ell.

- Your shell is running inside some sort of emulator. This is the window that's containing the shell, and you can use the emulator to switch out what shell is running inside of it.

```bash
cd /home
```

> change into directory

```bash
cd ..
```

> change back directory

## CLI Directories & Arguments

```bash
ls
```

```
ubuntu
```

> list files

```bash
echo hi
```

```
hi
```

> displaying lines of text or string which are passed as arguments on the command line

```bash
which ls
```

```
/bin/ls
```

> locating the paths of executable files.

**Common shortcuts for paths**

- / : the root directory
- ~ : the user's home directory
- . (dot) : the current directory
- .. (two dots) : the parent of the current directory

### disk free (df)

the disk free command `df` displays the ammount of disk space available on the file system

```bash
df
```

-h - This provides the disk space usage in a more readable format with size suffixes.

-T - This shows the disk space usage along with the type of file system.

-i - This provides information about the number of inodes (index nodes).

### disk usage (du)

the disk usage command `du` estimates file space usage

```bash
du
```

-h - This provides the disk space usage

-sh - This shows a summary of the total disk usage of the current directory in a human-readable format.

-ah - This lists the disk usage of all files and directories in a human-readable format.

-ch - This gives a total disk usage for the listed directories/files in a human-readable format.

```bash
# restricts du to show disk usage up to one level of subdirectories
du -h --max-depth=1
```

### ulimit

`ulimit` is a command used to set or display user-level resource limits for the shell.

```bash
ulimit -a
```

> display all current limits

### script

makes a typescript of everything on your terminal session. the terminal data are stored in raw form to the log file and information about timing to another (optional) structured log file.

```bash
script session.log
```

> start recording terminal session, default file will be `typescript`. To
> end recording type `exit` or press <kbd>CTRL</kbd> + <kbd>D</kbd>

### lpr

The `lpr` command in Linux is used to send files to the printer. It stands for "line printer"

```bash
lpr filename
```

> This sends the file named filename to the default printer.

### stty

The `stty` command in Linux is used to change and print terminal line settings. It stands for "set terminal type" and allows you to control various terminal I/O settings.

```bash
stty -a

```

> This displays all current terminal settings.

## Flags

```bash
pwd --help
```

```
pwd: pwd [-LP]
    Print the name of the current working directory.

    Options:
      -L        print the value of $PWD if it names the current working
                directory
      -P        print the physical directory, without any symbolic links

    By default, `pwd' behaves as if `-L' were specified.

    Exit Status:
    Returns 0 unless an invalid option is given or the current directory
    cannot be read.
```

> help page called with --help flag

```bash
ls -l
```

```
total 8
drwxrwxr-x 2 ubuntu ubuntu 4096 Mar 11 09:18 img
-rw-rw-r-- 1 ubuntu ubuntu 1497 Mar 11 09:18 vite.svg
```

> use a long listing format

```bash
ls -l -a
ls -la
```

```
total 16
drwxrwxr-x 3 ubuntu ubuntu 4096 Mar 12 00:06 .
drwxrwxr-x 6 ubuntu ubuntu 4096 Apr  1 00:41 ..
drwxrwxr-x 2 ubuntu ubuntu 4096 Mar 11 09:18 img
-rw-rw-r-- 1 ubuntu ubuntu 1497 Mar 11 09:18 vite.svg
```

> use a long listing format without ignoring entries starting with .

```bash
ls --ignore=img
ls --ignore img
ls -I snap
```

```
vite.svg
```

> ignore in listing

```bash
ls -lsah
```

```
total 16K
4.0K drwxrwxr-x 3 ubuntu ubuntu 4.0K Mar 12 00:06 .
4.0K drwxrwxr-x 6 ubuntu ubuntu 4.0K Apr  1 00:41 ..
4.0K drwxrwxr-x 2 ubuntu ubuntu 4.0K Mar 11 09:18 img
4.0K -rw-rw-r-- 1 ubuntu ubuntu 1.5K Mar 11 09:18 vite.svg
```

> list all with size of each file in human readable format

## CLI Search

```bash
cd ~
pwd
```

```
/home/ubuntu
```

> home directory

```bash
cd ~/.docker
pwd
```

```
/home/ubuntu/.docker
```

> .docker directory

```bash
cd /
pwd
```

```
/
```

> root directory

- <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys to navigate through your history of commands.
- <kbd>Tab</kbd> to find tab completions your command.
- <kbd>CTRL</kbd> + <kbd>R</kbd> to search in bash history.

### Locate

The **locate** command in Linux is a command line utility that allows you to quickly search for files on your system.

```bash
locate myfile1
```

```
/home/ec2-user/mydir/myfile1
```

**Example** Locate with wildcards

```bash
locate *my*
```

```
/home/ec2-user/mydir
/home/ec2-user/mydir/myfile1
```

### Find

The **find** command is a powerful command line utility that allows you to search for files on your system based on a variety of criteria, such as their name, size, and permissions.

- Use the -iname option instead of the -name option to perform a case-insensitive search for the specified name.

**Example** Searches for all files named "your_filename" in the current directory and its subdirectories

```bash
find . -iname "your_filename" -print
```

- Use the -size option to search for files or directories with a specific size.

  - For example, find -size +1G will search for files or directories larger than 1GB, and find -size -1M will search for files or directories smaller than 1MB.

**Example** Searches for all files larger than 1 Gigabyte (1G) in the current directory and its subdirectories

```bash
find . -size +1G -print
```

- Use the -perm option to search for files or directories with specific permissions.

  - For example, find -perm 644 will search for files or directories with permissions set to 644.

**Example** Searches for all files with permissions set to 644 in the current directory and its subdirectories.

```bash
find . -perm 644 -print
```

- Use the -exec option to execute a command on the files or directories that are found.
  - For example, find -exec ls -l {} \; will list the detailed information for all the files or directories that are found.

**Example** Search for all files named `log.txt` (-name) that are regular files (-type f) in the current directory and its subdirectores. The `-exec` option allows executiong a command (gzip) on each found file ({}). The `\;` terminates the command execution for `find`.

```bash
find . -name "log.txt" -type f -exec gzip {} \;
```

## Bash History

```bash
history
history -10
```

> Displays a list of previous commands executed on the system. The `-10` flag shows the last 10 commands.

```bash
tail ~/.bash_history
```

```
pwd
cd ~
clear
ls -lsah .docker
clear
cd /
cd home /
cd ..
ls
```

> last ten lines from a file

```bash
!!
```

```
pwd
cd ~
clear
ls -lsah .docker
clear
cd /
cd home /
cd ..
ls
```

> re-runs last command

```bash
clear
```

> clear's emulator, you can also use <kbd>Ctrl</kbd> + <kbd>L</kbd>

## CLI Shortcuts

<kbd>CTRL</kbd> + <kbd>A</kbd> - takes you to the beginning of the line  
<kbd>CTRL</kbd> + <kbd>E</kbd> - takes you to the end of the line  
<kbd>CTRL</kbd> + <kbd>K</kbd> - "yank" everything after the cursor  
<kbd>CTRL</kbd> + <kbd>U</kbd> - "yank" everything before the cursor  
<kbd>CTRL</kbd> + <kbd>Y</kbd> - "paste" (paste in quotes because it doesn't actually go into your system clipboard) everything you yanked  
<kbd>CTRL</kbd> + <kbd>L</kbd> - clear the screen  
<kbd>CTRL</kbd> + <kbd>R</kbd> - reverse search through history

## Signals

A signal is a notification that you send to a program.

- <kbd>CTRL</kbd> + <kbd>C</kbd> - SIGINT
  - you're telling it to **int**errupt what it's doing and stop.
- <kbd>CTRL</kbd> + <kbd>D</kbd> - SIGQUIT
  - many programs won't respond to SIGQUIT but bash itself will. You can also type `exit`.
- SIGTERM - there is no shortcut for SIGTERM
  - if you use the `kill` program to kll another program, the way it does that is by sending a SIFTERM to the program.
- SIGKILL - if you want a program to stop and stop **now**, you can do `kill -9` or (`kill -SIGKILL`)
  - it will send a the SIGKILL, which means to the program "don't clean up, just stop as soon as possible.

**example**

```bash
sleep 100 &
```

```
[1] 42383
```

```bash
kill -SIGKILL 42838
```

> creates a sleep process running in the background for 100 seconds, to end the process earily we grab its **PID** and kill it with the signal **-SIGKILL**

### Key Mappings

You can view the key mapping that sends specific signals using the "stty -a" command

```bash
stty -a
stty -a | grep intr
```
