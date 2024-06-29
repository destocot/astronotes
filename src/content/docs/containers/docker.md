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

```bash
docker run -it --rm oven/bun:1.1.3 bun repl
```

This will drop you into the Bun shell. You can run JavaScript code here.

```bash
docker run -it --rm oven/bun:1.1.3 cat /etc/issue
# Debian GNU/Linux 11 \n \l
```

This will output the version of Linux that the Bun image is running on. Which by default is Debian 11.

### A few other runtimes

```bash
docker run -it --rm ruby:3.3
# This will drop you into the Ruby shell. You can run Ruby code here.

docker run -it --rm golang:1.22.2
# This will drop you into the Go shell. You can run Go code here.

docker run -it --rm rust:1.77.2
# This will drop you into the Rust shell. You can run Rust code here.

docker run -it --rm php:8.2
# This will drop you into the PHP shell. You can run PHP code here.

docker run -it --rm python:3.12.3
# This will drop you into the Python shell. You can run Python code here.
```

## Tags

When we run `docker run -it --rm node` the tag implicitly uses the `latest` lag.

This is the same as running `docker run -it --rm node:latest`.

Sometimes, we do not want to run the latest version of a container. We can specify a different tag.

**Example** We want to run Node.js version 20

```bash
docker run -it --rm node:20 bash
```

In the shell if we run `node --version` we will see the Node.js version is 20.x.x.

Let's run a different version of Node.js.

```bash
docker run -it --rm node:20-alpine cat /etc/issue
# Welcome to Alpine Linux 3.20
# Kernel \r on an \m (\l)
```

This will run an entirely differnt OS all together: Alpine! **Alpine Linux** is a very, very tine distro of Linux made for containers and specifically because it it is tiny.

**Pro-tip**: Have a development container which has all the bells, whistles, debugging tools, etc. that you need. Then have a production container that's minimalist as possibly can be. You'll get the best of both worlds.

## Docker CLI

### pull / push

`pull` - allows you to pre-fetch a container to run

```bash
# this just downloads and caches the image, it doesn't do anything else with it
docker pull bcbcarl/hollywood
```

```bash
# it is already loaded and cached here; it doensn't re-download it
docker run -it --rm bcbcarl/hollywood
```

This will pull the hollywood container from the user's bcbcarl's user account.

`push` - allows you to push containers to whatever registry you're connected to (e.g. Docker Hub, Azure Contaienr Registry, GitHub Container Registry)

### inspect

```bash
docker inspect node:20
```

This will dump out a lot of information about the container. Helpful when figuring out what's going on with a container.

### pause / unpause

`pause` and `unpause` will pause and unpause all the processes in a container.

```bash
docker run -dit --name hw --rm bcbcarl/hollywood

docker ps
```

```
CONTAINER ID   IMAGE               COMMAND       CREATED        STATUS        PORTS     NAMES
e5c3c9bde1e7   bcbcarl/hollywood   "hollywood"   1 second ago   Up 1 second             hw
```

```bash
docker pause hw

docker ps
```

```
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS                   PORTS     NAMES
e5c3c9bde1e7   bcbcarl/hollywood   "hollywood"   55 seconds ago   Up 54 seconds (Paused)             hw
```

```bash
docker unpause hw

docker ps
```

```
CONTAINER ID   IMAGE               COMMAND       CREATED              STATUS              PORTS     NAMES
e5c3c9bde1e7   bcbcarl/hollywood   "hollywood"   About a minute ago   Up About a minute             hw
```

```bash
docker kill hw
```

### exec

The `exec` command will allow you execute a command against a running container.

This is different from `docker run` because `docker run` will start a new container _whereas_ `docker exec` runs the command in an already-running container.

```bash
docker run -dit --name hw --rm bcbcarl/hollywood

# see it output all the running processes in the container
docker exec hw ps aux
```

### import / export

`export` allows you to dump out your container to a tar ball.

`import` allows you to import a tar ball into a container.

### history

`history` allows you to see how this Docker image's layer composition has changed over time and how recently.

```bash
docker history node:20
```

```
IMAGE          CREATED       CREATED BY                                      SIZE      COMMENT
3d3ad458c4de   5 days ago    CMD ["node"]                                    0B        buildkit.dockerfile.v0
<missing>      5 days ago    ENTRYPOINT ["docker-entrypoint.sh"]             0B        buildkit.dockerfile.v0
<missing>      5 days ago    COPY docker-entrypoint.sh /usr/local/bin/ # …   388B      buildkit.dockerfile.v0
<missing>      5 days ago    RUN /bin/sh -c set -ex   && export GNUPGHOME…   5.34MB    buildkit.dockerfile.v0
...
```

### info

`info` dumps a bunch of info about the host system.

This is useful if you're on a **VM** somewhere and not sure what the environment is.

```bash
docker info
```

### top

`top` allows you to see processes running on a container

```bash
docker run -dit --name my-mongo --rm mongo

docker ps
```

```
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS       NAMES
da02c649c986   mongo     "docker-entrypoint.s…"   7 seconds ago   Up 6 seconds   27017/tcp   my-mongo
```

```bash
# similar to, docker exec my-mongo ps aux
docker top my-mongo
```

```
UID         PID         PPID        C           STIME       TTY         TIME        CMD
999         36652       36635       2           21:23       ?           00:00:00    mongod --bind_ip_all
```

```bash
docker kill my-mongo
```

### rm / rmi

```bash
# shows all containers you've stopped running in addition to the ones that are running
docker ps --all
```

```
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS                      PORTS     NAMES
7e2ca75184b7   bcbcarl/hollywood   "hollywood"   28 seconds ago   Exited (1) 27 seconds ago             hw
```

You can remove something from the list by running `docker rm <ID or name>`

```bash
# docker rm hw
docker rm 7e2ca75184b7
```

You can run `docker container prune` to remove all stopped containers.

If you want to remove an image from your computer (to save space for example), you can run `docker rmi <ID or name>`.

```bash
docker image ls
```

```
REPOSITORY          TAG             IMAGE ID       CREATED        SIZE
denoland/deno       centos-1.42.4   cc067188d734   2 months ago   364MB
```

```bash
# docker rmi denoland/deno:centos-1.42.4
docker rmi cc067188d734
```

### logs

`logs` are useful to see the output of one of your running containers.

```bash
docker run --name my-mongo --rm -dit mongo
```

```bash
docker logs my-mongo # see all the logs
docker kill my-mongo
```

### restart

`restart` allows you to restart a container.

### search

`search` will allow you to see if a container exists on Docker Hub (or another registry).

```bash
# see all the various falvors of Python containers you can run
docker search python
```

```bash
# see all the various flavors of Node.js containers you can run
docker search node
```
