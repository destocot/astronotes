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

## Javascript on Docker

## Tags

## Docker CLI
