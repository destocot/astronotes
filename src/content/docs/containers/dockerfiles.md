---
title: "Dockerfiles"
sidebar:
  order: 4
---

## Intro to Dockerfiles

_Most_ developers really only ever need to know how to run containers. But learning how to write them is an extra superpower.

Docker has a special file called a `Dockerfile` which allows you to ourline how a container will be built.

Each line in a `Dockerfile` is a new directive of how to change your Docker container.

**Note** A big key with Docker container is that they're supposed to be disposable.

> Adopt a mindset of making everything short-lived.

### The most basic Dockerfile-based Container

```Dockerfile
FROM node:20

CMD ["node", "-e", "console.log(\"hi lol\")"]
```

`FROM` and `CMD` are called _instructions_. It is convention to have these in caps.

`FROM` is the base image that you're going to build on top of. In this case, we're using the `node:20` image.

`CMD` is the command that will be run when the container starts. In this case, we're running a simple Node.js script that logs "hi lol".

Let's build this container:

```bash
# in the same directory as the Dockerfile
docker build .
```

```
=> exporting to image                                                                                    0.1s
=> => exporting layers                                                                                   0.0s
=> => writing image sha256:bbc9f3799fb6...      0.0s
```

This will print out a bunch of stuff and leave you with a hash of an image.

After each instruction, you'll see a hash similar to the ones we've been using for the IDs for the containers. This is because easy layer is in-and-of-itself a container image.

Out container only has two instructions, but `FROM node:20` means _start_ with the `node` container. The container itself comes from another `Dockerfile` which builds its own container, whcih itself comes from another `Dockerfile`, which ultimately comes from the `Debian` image.

Let's run the container:

```bash
# docker run <hash>
docker run bbc9f3799fb6
```

```
hi lol
```

### Adding a name

It's a little inconvenient to always have to refer to it by ID, so let's give it a name:

```bash
# in the same directory as the Dockerfile
docker build . --tag my-node-app ## or -t instead of --tag
docker run my-node-app
```

By default, the tag is `latest`. If we want to version our container, we can add a tag:

```bash
# docker build . --t my-node-app:1
# docker build . --t my-node-app:2
# docker build . --t my-node-app:alpha
```

## Build a Node.js App

Make a file called `index.js`:

```js
const http = require("http");

http
  .createServer(function (request, response) {
    console.log("request received");
    response.end("omg hi", "utf-8");
  })
  .listen(3000);
console.log("server started");
```

We will write a new instruction `COPY`

```Dockerfile
FROM node:20

COPY index.js index.js

CMD ["node", "index.js"]
```

This will `COPY` your `index.js` file from your file system into the Docker file system.

We then modify the `CMD` instruction to run `node index.js`.

```bash
docker build . -t my-node-app:3 .
docker run--name my-app --rm my-node-app:3
```

Now our `Node.js` app is running inside of a container managed by Docker. However, if we try to access `localhost:3000` in our browser, it doesn't work.

We have to tell Docker to expose the port.

Stop your server if it is running.

> You might need to open another terminal and type `docker kill my-app`

### Handling SIGINT

The normal <kbd>CTRL</kbd> + <kbd>C</kbd> won't work because `Node.js` itself doesn't handle SIGINT in and of itself.

Instead you either have to handle it yourself either by

- A. Inside of your `Node.js` code (preferable for real apps)

```js
process.on("SIGINT", function () {
  console.log("shutting down");
  process.exit();
});
```

- B. Tell Docker to handle it with the `--init` flag. This uses a package called `tini` to handle the signal.

```bash
# docker run --init -p 3000:3000 --rm my-node-app:3
docker run --init --publish 3000:3000 --rm my-node-app:3
```

### Exposing Ports

```bash
docker run --init -p <host-port>:<container-port> --rm <image>
```

The `publish` part allows you to forward a port out of a container to the host computer.

In this case we're forwarding the port `3000` (which is what the `Node.js` server is running on) to the host computer's port `3000`.

If you did `docker run --init -p 8000:3000 --rm my-node-app:3`, you would be forwarding the port `3000` to the host computer's port `8000`.

### About EXPOSE Instruction

The `EXPOSE` instruction is a way to document what ports your container is listening on. It doesn't actually do anything.

Ports are exposed through command line arguments, not through the `Dockerfile`.

### Organization

Right now we are putting our app into the root directory of our container and running it as the root user.

This is both messy and unsafe.

To fix this, we'll put the directory inside our home directory under a different user.

```Dockerfile
FROM node:20

USER node

COPY index.js /home/node/code/index.js

CMD ["node", "/home/node/code/index.js"]
```

The `USER` instruction let's us switch from being the root user to a different user, one called "node" which the `node:20` image has already made for us.

We could make our own user too using bash commands

> Not every container image will have a user already made for you.

```bash
useradd -ms /bin/bash <username>
```

**Example**

```Dockerfile
FROM node:20

RUN useradd -ms /bin/bash lolcat

USER lolcat

COPY index.js /home/lolcat/code/index.js

CMD ["node", "/home/lolcat/code/index.js"]
```

We're now copying the files inside of the user's home directory. This is because they'll have proper permissions to interact with those files whereas they may not if we were outside of their home directory.

You'll save yourself a lot of permission wrangling if you put it in a home directory.

But we'll have to add a flag to the `COPY` command to make sure the user owns those files.

We can do this with the `--chown=node:node` flag. Where the first `node` is the user and the second `node` is the group.

> It is no big deal that the "code" directory doesn't exist. Docker will create it for us.

```Dockerfile
FROM node:20

USER node

WORKDIR /home/node/code

# ensures that the user node owns the files
COPY --chown=node:node index.js .

CMD ["node", "index.js"]
```

### Quick Note on COPY vs ADD

`COPY` and `ADD` do very similar things.

`ADD` can also accept, in addition to local files, URLs to download things off the Internet and it will also automatically unzip any tar files it downloads or adds.

`COPY` will just copy local files.

Use `COPY` unless you need to unzip something or are downloading something.

### WORKDIR

`WORKDIR` works as if you had `cd`'d into a directory.

So now all paths are relative to that.

## Build a More Complicated Node.js App

## A Note on Expose

## Layers
