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

### unshare

`unshare` creates a new isolated namespace from its parent

```bash
# install debootstrap
apt-get update -y
apt-get install debootstrap -y
debootstrap --variant=minbase jammy /better-root

# head into the new namespace'd, chroot'd environment

# create a new process and in that process create a new namespace for (uts, net, pid, etc.)
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash # this also chroot's for us
mount -t proc none /proc # process namespace
mount -t sysfs none /sys # filsystem
mount -t tmpfs none /tmp # filesystem
```

This will create a new environment that's isolated on the system with its own PIDs, mounts (like storage and volumes), and network stack. Now we can't see any of the processes!

## cgroups

We still have a problem.

Every isolated environment has access to all _physical_ resources of the server. There's no isolation of physical components from these environments.

control groups (cgroups) allow an isolated enviroment to only get so much CPU, so much memory, etc. and once it's out of those it's out-of-luck.

cgroup v2 is the standard

```bash
grep -c cgroup /proc/mounts
```

If the number outputted is **greater than** one, the system you're on is using cgroups v1.

cgroups as we have said allow you to move processes and their children into groups which then allow you to limit various aspect of them.

You interact with cgroups by a pseudo-file system.

```bash
cd /sys/fs/cgroup
ls
```

```
cgroup.controllers      cpu.max.burst          hugetlb.1GB.events        ...
cgroup.events           cpu.pressure           hugetlb.1GB.events.local  ...
cgroup.freeze           cpu.stat               hugetlb.1GB.max           ...
cgroup.kill             cpuset.cpus            io.max                    ...
...                     ...                    ...                       ...
```

These "files" (`cpu.max`. `cgroup.procs`, `memory.high`, etc.) represents a setting that you can play with regard to this cgroup.

In this case we are looking at the root cgroup: all cgroups will be children of this root cgroup.

To make your own cgroup is by creating a folder inside of the cgroup.

```bash
# creates the cgroup
mkdir /sys/fs/cgroup/sandbox

# look at all the files created automatically
ls /sys/fs/cgroup/sandbox
```

```
cgroup.controllers  cgroup.kill             cgroup.procs            cgroup.threads  ...cgroup.events       cgroup.max.depth        cgroup.stat             cgroup.type     ...
cgroup.freeze       cgroup.max.descendants  cgroup.subtree_control  cpu.pressure    ...
```

By creating a new directory in `/sys/fs/cgroup` we create a new cgroup. We can put limits on this new cgroup.

We can move our unshared environment into the cgroup. Every process belongs to exactly one cgroup.

```bash
# find your isolated bash PID
ps aux

# should (currently) see the process in the root cgroup
cat /sys/fs/cgroup/cgroup.procs

# put the unshared bash process into the cgroup called sandbox
echo <PID> > /sys/fs/cgroup/sandbox/cgroup.procs

# should see hte process in the sandbox cgroup
cat /sys/fs/cgroup/sandbox/cgroup.procs

# should NO LONGER see the process in the root cgroup
cat /sys/fs/cgroup/cgroup.procs
```

We have now moved our unshared bash process into a cgroup. We haven't placed any limits on it yet but it's there, ready to be managed.

**Problem**

```bash
# should see all the available controllers
cat /sys/fs/cgroup/cgroup.controllers

# there's no controllers
cat /sys/fs/cgroup/sandbox/cgroup.controllers

# there's no controllers enabled its children
cat /sys/fs/cgroup/cgroup.subtree_control
```

In order for our sandbox cgroup to have controllers we need to enable them for the children of our root cgroup.

We need to add them to our root's `cgroup.subtree_control`. **HOWEVER**, we cannot add new subtree_control configs while the cgroup itself has proceses in it.

**Solution**

We're going to create another cgroup, add the rest of the processes to that one, and then enable the subtree_control configs for the root cgroup.

```bash
# make new cgroup for the rest of the processes, you can't modify cgroups that have processes and by default Docker doesn't include any subtree_controllers
mkdir /sys/fs/cgroup/other-procs

# see all the processes you need to move, rerun each time after you add as it may move multiple processes at once due to some being parent / child
cat /sys/fs/cgroup/cgroupecho .procs

# you have to do this one at a time for each process
echo <PID> > /sys/fs/cgroup/other-procs/cgroup.procs

# add the controllers
echo "+cpuset +cpu +io +memory +hugetlb +pids +rdma" > /sys/fs/cgroup/cgroup.subtree_control

# all the controllers now available
cat /sys/fs/cgroup/sandbox/cgroup.controllers

# notice how many more files there are now
ls /sys/fs/cgroup/sandbox
```

We did it! We went ahead and added all the possible controllers but normally you should just add just the ones you need.

**Exercises**

### Setup

```bash
# start a third terminal
docker exec -it docker-host bash

# terminal 1 - will be our sunahred environment
# terminal 2 - will run out commands


# terminal 3 - will be a visual display of whats going on with `htop`
apt-get install htop

htop
```

### Exercise 1

Make it so the unshared environment only has access to 80MB of memory.

```bash
# run this from #1 terminal and watch it in htop to see it consume about a gig of RAM and 100% of CPU core
yes | tr \\n x | head -c 1048576000 | grep n
```

```bash
# from #2, (you can get the PID from htop) to stop the CPU from being pegged and memory from being consumed
kill -9 <PID of yes>

# should see max, so the memory is unlimited
cat /sys/fs/cgroup/sandbox/memory.max

# set the limit to 80MB of RAM (the number is 80MB in bytes)
echo 83886080 > /sys/fs/cgroup/sandbox/memory.max
```

```bash
# from inside #1, see it limit the RAM taken up; because the RAM is limited, the CPU usage is limited
yes | tr \\n x | head -c 1048576000 | grep n
```

```bash
# from #2, (you can get the PID from htop) to stop the CPU from being pegged and memory from being consumed
kill -9 <PID of yes>
```

### Exercise 2

Make it so the unshared environment only has access to 5% of a CPU core.

```bash
# inside #1 / the cgroup/unshare – this will peg one core of a CPU at 100% of the resources available, see it peg 1 CPU
yes > /dev/null
```

```bash
# from #2, (you can get the PID from htop) to stop the CPU from being pegged
kill -9 <PID of yes>

# from #2 this allows the cgroup to only use 5% of a CPU
echo '5000 100000' > /sys/fs/cgroup/sandbox/cpu.max
```

```bash
# inside #1 / the cgroup/unshare – this will peg one core of a CPU at 5% since we limited it
yes > /dev/null
```

```bash
# from #2, to stop the CPU from being pegged, get the PID from htop
kill -9 <PID of yes>
```

### Exercise 3

The dreaded **fork bomb**. A fork bomb is a script that forks itself into multiple processes, which then fork themselves, which then fork themselves, etc. untill all resources are consumed and it crashes the computer.

```bash
# DO NOT RUN THIS ON YOUR COMPUTER. This is a fork bomb.
# fork() {
#     fork | fork &
# }
# fork
```

but you'll see it written as `:(){ :|:& };:` where `:` is the name of the function instead of `fork`.

What we can do to more fully prevent a fork bomb is limit how many PIDs can be active at once. Let's try that.

```bash
# See how many processes the cgroup has at the moment
cat /sys/fs/cgroup/sandbox/pids.current

# See how many processes the cgroup can create before being limited (max)
cat /sys/fs/cgroup/sandbox/pids.max

# set a limit that the cgroup can only run 3 processes at a time
echo 3 > /sys/fs/cgroup/sandbox/pids.max

# this runs 5 15 second processes that run and then stop. run this from within #2 and watch it work. now run it in #1 and watch it not be able to. it will have to retry several times
for a in $(seq 1 5); do sleep 15 & done

# DO NOT RUN THIS ON YOUR COMPUTER. This is a fork bomb. If not accounted for, this would bring down your computer. However we can safely run inside our #1 because we've limited the amount of PIDs available. It will end up spawning about 100 processes total but eventually will run out of forks to fork.
:(){ :|:& };:
```

Attack prevented! 3 processes is way too few for anyone to do anything meaningful but by limiting the max PIDs available it allows you to limit what damage could be done. .

And now we can call this a container. You have handcrafted a container. A container is literally nothing more than we did together. There's other sorts of technologies that will accompany containers like runtimes and daeomons, but the containers themselves are just a combination of chroot, namespaces, and cgroups!

So while this is a container at its most basic sense, we haven't broached more advance topics like networking, deploying, bundling, or anything else that something like Docker takes care of for us. But now you know at its most base level what a container is, what it does, and how you could do this yourself but you'll be grateful that Docker does it for you.
