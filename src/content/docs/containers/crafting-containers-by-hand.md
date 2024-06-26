---
title: "Crafting Containers by Hand"
sidebar:
  order: 2
---

## What Are Containers

### Bare Metal

Historically, if you wanted to run a web server, you either set up your own or you rented a literal server somewhere. We often call this "bare metal" because, well, your code is literally executing on the processor with no abstraction.

### Virtual Machines

Virtual machines (VMs) are the next step. This is adding a layer of abstraction between you and metal. Now instead of having one instance of Linux running on your computer, you'll have multiple guest instances of Linux running inside of a host instance of Linux (it doesn't have to be Linux but I'm using it to be illustrative).

VMs are individual instances of operating systems that as far as the OSes know, are running on bare metal themselves. The host operating system offers the VM a certain amount of resources and if that VM runs out they don't affect other guest operating systems running on the server.

### Public Cloud

You can nab a VM from a public cloud provider like Microsoft Azure or Amazon Web Services. It will come a pre-allocated amount of memory and computing power (often called virtual cores or vCores because their dedicated cores to your virtual machine).

We're still paying the cost of running a while operating system in the cloud inside of a host operating system. It'd be nice if we could just run the code inside the host OS without the additional expenditure of guest OSes.

### Containers

Containers give us many of the security and resource-management features of VMs but without the cost of having to run a while other operating system.

It instead uses **chroot**, **namespaces**, and **cgroups**, to separate a group of processes from each other.

<!-- CONTINUATION CODE -->

```bash
mkdir /my-new-root
echo "my super secret thing" >> /my-new-root/secret.txt
chroot /my-new-root bash
mkdir /my-new-root/lib{,64}
cp /lib/x86_64-linux-gnu/libtinfo.so.6 /my-new-root/lib
cp /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib
cp /lib64/ld-linux-x86-64.so.2  /my-new-root/lib64
cp /lib/x86_64-linux-gnu/libselinux.so.1 /my-new-root/lib
cp /lib/x86_64-linux-gnu/libpcre2-8.so.0 /my-new-root/lib
cp /lib64/ld-linux-x86-64.so.2 /my-new-root/lib64
mkdir /my-new-root/bin
cp /bin/bash /bin/ls /my-new-root/bin
chroot /my-new-root bash
```

<!-- CONTINUATION CODE -->

## chroot

`chroot` or "change root" is a Linux command that allows you to set the root directory of a new process.

```bash
# will download the official ubuntu container from Docker Hub
# with the version marked with the jammy tag

# docker run means we're going to run some commands in the container
# -it means we want to make the shell interactive
docker run -it --name docker-host --rm --privileged ubuntu:jammy
```

```bash
# see which version of Ubuntu you're using

# cat reads a file and dumps it into the output
# / etc/issue is a file that will tell us what distro we're uisng
cat /etc/issue # Ubuntu 22.04.4 LTS \n \l
```

**exercise** attempt to use `chroot`

```bash
# make a new folder in your root directory
mkdir /my-new-root

# create a new file in our new folder
echo "my super secret thing" >> /my-new-root/secret.txt

# try to run chroot
chroot /my-new-root bash
# chroot: failed to run command 'bash': No such file or directory
```

`bash` is a program and your new root wouldn't have `bash` to run (because it can't reach outside of its new root)

**exercise** giving our new root access to bash

we not only have to bring `bash` to our new root but all of the libraries that `bash` relies on as well

```bash
# will list all libraries that `bash` relies on to run
ldd /bin/bash
```

```
linux-vdso.so.1 (0x00007ffcb71e1000)
libtinfo.so.6 => /lib/x86_64-linux-gnu/libtinfo.so.6 (0x00007f253f324000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f253f0fb000)
/lib64/ld-linux-x86-64.so.2 (0x00007f253f4bb000)
```

```bash
# will list all libraries that `ls` relies on to run
ldd /bin/ls
```

```
linux-vdso.so.1 (0x00007ffed55a6000)
libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007ff2f55ff000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007ff2f53d6000)
libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x00007ff2f533f000)
/lib64/ld-linux-x86-64.so.2 (0x00007ff2f5653000)
```

```bash
# create folder lib and lib64 in my-new-root
mkdir /my-new-root/lib{,64}

# copy libraries into in my-new-root/lib, my-new-root/lib64
## /bin/bash libraries
cp /lib/x86_64-linux-gnu/libtinfo.so.6 /my-new-root/lib
cp /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib
cp /lib64/ld-linux-x86-64.so.2  /my-new-root/lib64
## /bin/ls libraries
cp /lib/x86_64-linux-gnu/libselinux.so.1 /my-new-root/lib
cp /lib/x86_64-linux-gnu/libpcre2-8.so.0 /my-new-root/lib
cp /lib64/ld-linux-x86-64.so.2 /my-new-root/lib64
```

```bash
# create folder bin in my-new-root
mkdir /my-new-root/bin

# copy bash into my-new-root/bin
cp /bin/bash /bin/ls /my-new-root/bin

# try to run chroot
chroot /my-new-root bash
```

```
bash-5.1# ls
bin  lib  lib64  secret.txt
```

> we can now run the ls command inside of our container, we would have to repeat this process to run other commands such as `cat`

**Note** Running `pwd` (present working directory) inside our container will output `/`, because the container think it's in its root directory (when it's actually in _my-new-root_)

This process we could call being **jailed**, the container cannot see outside the directory that it is in.

## Namespaces

Namespaces are anoter factor when considering security and resource management in containers.

When one is in a `chroot`'d environment they cannot see other files outside the enviroment **HOWEVER** they can still see all the processes going on in the computer. They can also kill processes, unmount filesystems, and even hijack processes.

Namespaces allow you to hide processess from other processes.

There's a lot more depth to namespaces beyond what I've outlined here. The above is describing just the UTS (or UNIX Timesharing) namespace.

```bash
# connect to same container with name docker-host
docker exec -it docker-host bash

# list all processes on the system
# including those not associated with the current terminals ession
ps aux
```

```
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.0   4628  3864 pts/0    Ss   05:15   0:00 /bin/bash
root          22  0.0  0.0   4496  3636 pts/0    S+   05:16   0:00 bash
root          25  0.0  0.0   4628  3828 pts/1    Ss   05:17   0:00 bash
root          34  0.0  0.0   7064  1556 pts/1    R+   05:19   0:00 ps aux
```

CONTINUE FROM

- CRAFTING CONTAINERS BY HAND > NAMESPEACES > Safety with namespaces
- video Part 2 > 12:00 (remaining)

## cgroups
