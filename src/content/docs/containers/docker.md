---
title: "Docker"
sidebar:
  order: 3
---

## Docker Images

Pre-made docker containers are called _images_.

They basically dump out the state of the container, package that up, and store it so you can use it later.

### Docker Images without Docker

```bash
# start docker container with docker running in it connected to host docker daemon

# -ti = interactive terminal
# -v mounts a volume

docker run -ti -v /var/run/docker.sock:/var/run/docker.sock --privileged --rm --name docker-host docker:26.0.1-cli
```

```bash
# run stock alpine container
docker run --rm -dit --name my-alpine alpine:3.19.1 sh

# export running container's file system
docker export -o dockercontainer.tar my-alpine

# make container-root directory, export contents of container into it
mkdir container-root
tar xf dockercontainer.tar -C container-root/

# make a contained user, mount in name spaces
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot $PWD/container-root ash # this also does chroot for us
mount -t proc none /proc
mount -t sysfs none /sys
mount -t tmpfs none /tmp

# here's where you'd do all the cgroup rules making with the settings you wanted to
# we're not going to since we did it all in the last lesson
```

Docker does a lot more for you than just this like networking, volumes, and other things but suffice to say this core of what Docker is doing for you: **creating a new environment that's isolated by namespace and limited by cgroups and chroot'ing you into it.**

```bash
#cleanup
docker kill my-alpine
```

## Docker Images with Docker

It is so much easier to do what we did with Docker.

```bash
# or, to be shorter: docker run -it alpine:3.19.1
docker run --interactive --tty alpine:3.19.1
```

This will drop you into a Alpine ash shell inside of a container as a root user of the container. To exit just run `exit` or hit <kbd>CTRL</kbd> + <kbd>D</kbd>.

`run` - tells Docker to execute the container (as opposed to building it)
`-it` - tell Docker to be dropped into the container interactively so you can run commands and inspect the container

### Executing a command

```bash
docker run alpine:3.19.1 ls
```

```bash
docker run ubuntu:jammy ls
```

The `ls` part at the end is what you pass into the container to be run. As you can see here, it executes the command, outputs the results, and shuts down the container. This is great for running a Node.js server. Since it doesn't exit, it'll keep running until the server crashes or the server exits itself.

### Detach the container from the foreground

```bash
# or, to be shorter: docker run -dit ubuntu:jammy
docker run --detach -it ubuntu:jammy
```

```
2b272a2085c1ce723646d4afd0ebc8d5fa790981153e40b599e9c2fb25be78e0
```

This will return a long hash. We can list all the running containers with the following command:

```bash
docker ps
```

```
CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS         PORTS     NAMES
2b272a2085c1   ubuntu:jammy   "/bin/bash"   4 minutes ago   Up 4 minutes             bold_cartwright
```

### Attach a shell to a running container

```bash
# docker attach 2b272a2085c1
docker attach <ID or name>
```

### Kill a running container

```bash
docker run -dit ubuntu:jammy

docker ps

docker kill <ID or name>
```

### --name

```bash
docker run -dit --name my-ubuntu ubuntu:jammy

docker kill my-ubuntu
```

```bash
# list all containers including stopped ones
docker ps --all
```

Docker keeps a lot of metadata around about the containers you've run. We can free up space by removing the containers using the following commands:

```bash
# free up space for specific container
docker rm my-ubuntu
```

```bash
# free up space for all containers
docker container prune
```

### -rm

If you want to remove the container after it's done running, you can use the `-rm` flag. This avoids having to run `docker rm <ID or name>` after the container is done running.

```bash
docker run -rm -dit --name my-ubuntu ubuntu:jammy

docker kill my-ubuntu
```

This will automatically clean up the container after it's done running.

## Context

Docker Desktop is a GUI for Docker. If your images are stored in a different location, you can change the context in Docker Desktop.

```bash
# list docker context
docker context ls
```

```bash
# use a different context
docker context use <context-name>
```

## Javascript on Docker

Let's run a container that has Node.js in it. (The default Ubunutu image doesn't have Node.js installed.)

```bash
docker run -it --rm node:20
```

This will drop you into a Node.js shell. You can run JavaScript code here.

Let's check which version of Linux our Node.js image is running on.

```bash
docker run -it --rm node:20 cat /etc/issue
# Debian GNU/Linux 12 \n \l
```

We can enter the bash shell of the container by running the following command:

```bash
docker run -it --rm node:20 bash
```

Anything we put after identifying the container (`node:20` in this case) will be evaluated instead of teh default command. In this instacne we execute the `bash` command.

We can use other Linux distros to run Node.js. For example, we can use Alpine Linux.

```bash
docker run -it --rm node:20-alpine cat /etc/issue
```

### Deno

```bash
docker run -it --rm denoland/deno:centos-1.42.4
```

This will allow you to run the alternative JavaScript runtime, Deno. This command should log out "Welcome to Deno!" and then exit.

> centos is a Linux distribution that is a bit more like Red Hat Enterprise Linux (RHEL) than Ubuntu is.

```bash
docker run -it --rm denoland/deno:centos-1.42.4 deno
```

This will drop you into the Deno shell. You can run JavaScript code here.

**Note** Why is our image called `denoland/deno` instead of just `deno` like `node`?

The `denoland` part is the organization that created the image. The `deno` part is the name of the image. This is a common pattern in Docker images that are created by organizations that are not maintained by Docker.

### Bun

### A few other runtimes

## Tags

## Docker CLI
