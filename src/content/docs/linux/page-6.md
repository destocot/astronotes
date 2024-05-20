---
title: "Users & Permissions"
slug: "users-and-permissions"
sidebar:
  order: 6
---

## Principles of Least Power

```bash
whoami
```

```
ubuntu
```

> outputs user of the system

```bash
cat /etc/passwd
```

> prints out all of the currently registered users on the computer

Linux generally adheres to the principle of lease power: we want programs to be given the least amount of power possible to complete their tasks.

```bash
uname -a
```

> Displays details about the Linux distribution

## Superuser

Superuser and root user are interchangeable.

**sudo** - superuser do

```bash
sudo whoami
```

```
root
```

> allows you to run a command as super user

```bash
sudo su
```

> enter a session as a superuser

```bash
sudo useradd brian
```

> create a new user

```bash
sudo passwd brian
```

```
Enter new UNIX paassword:
Retype new UNIX password:
passwd: password updated successfully
```

> change password for user

```bash
sudo 'brian:academy' | sudo chpasswd
```

> Give user a default password

```bash
sudo passwd --expire brian
```

> Set the password to expire next time the user enters it

```bash
su brian
```

> change user

```bash
sudo usermod --append --groups sudo brian
sudo usermod -aG sudo brian
```

> usermod allows you to modify user accounts and -aG allows you to append new groups to the user. In this case, we made it so brian is now a sudoer.

```bash
sudo visudo
# sudo EDITOR=vim visudo
```

_/etc/sudoers.tmp_

```bash
# make user brian a sudoer
brian ALL=(ALL:ALL) NOPASSWD:ALL
```

> add the user to sudoers

## User Management

```bash
# Delete a user
sudo userdel -r 'username'
```

```bash
# Remove user from a user group
sudo deluser USER GROUPNAME
```

```bash
# Gives information on all logged in users
finger
```

```bash
# Gives information of a particular user
Finger username
```

```bash
# view all user groups
cat /etc/group
```

## Group Permissions

Run `ls -l` Let's discuss the `-rw-rw-r--` stuff you see in the first column. These are the permissions for each file and directory in that folder. Let's break it down one-by-one. It's not imperative you memorize this, just know enough to what you're looking at.

`d rwx rwx rwx`

The first `d` or `-` represents if it's a directory or a file. Anything with a hyphen here is a normal file. Anything width a `d` here is a directory.

The next three groups represent file permissions. The first groups is the file permissions for the user that owns that file. The next three are the file permissions for the group that owns that file. The last three is for everyone that is not that user or group.

For each of the three, the `r` represents read permission, the `w` represents write permission, and the `x` represents execute permission. I think is best illustrated with a bunch of examples.

**examples**

`-rw-rw-r--` is a file, it has read-and-write permission for the user and the group, and read permission for everyone else, no write. The file is not executable.

`drwx------` is a directory that can only be written and modified by the user. It's unreadable and unwritable by the group and the rest of the system.

`-rwxr-xr-x` is a file, everyone can read it, everyone can execute it, and only the user can write to it.

```bash
sudo chown ubuntu:ubuntu hello
```

> **chown** stands for change ownership. This command allows the directory to be change to the ownership of group ubuntu for user ubuntu `<group>:<user>`

```bash
sudo chmod u=rw,g=rw,o=rw hello.txt
ls -lsah | grep "hello.txt"
```

```
0 -rw-rw-rw-  1 ubuntu ubuntu    0 May  3 00:41 hello.txt
```

> **u** (user), **g** (group), **o** (other), **chmod** allows you to directly change permissions of the file rather than just changing the owners. In this case, we are saying anyone can read or write to the file

**example**

```bash
sudo chmod u=rwx,g=rwx,o=rwx hello/
sudo chmod 777 hello/
```

> change permissions for hello/ directory

## Permission Shortcuts

```bash
sudo chmod 666 hello.txt
```

> adds read and write permissions to user, group, and other

```bash
sudo chmod 777 hello/
```

> adds read, write, and execute permissions to user, group, and other

```bash
touch my-new-program
sudo chmod +x my-new-program
```

> adds executable to each of the permissions. use `-x` to remove executable permissions.

Permission Access Numbers

| Number | Access Permissions       | rwx value |
| ------ | ------------------------ | --------- |
| 7      | read, write, and execute | rwx       |
| 6      | read and write           | rw-       |
| 5      | read and execute         | r-x       |
| 4      | read only                | r--       |
| 3      | write and execute        | -wx       |
| 2      | write only               | -w-       |
| 1      | execute only             | --x       |
| 0      | none                     | ---       |
