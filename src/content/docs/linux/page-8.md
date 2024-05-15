---
title: "Networking & the Internet"
slug: "networking-and-the-internet"
sidebar:
  order: 8
---

# Networking & the Internet

## SSH & Secondary Machine

SSH - Secure Shell

```bash
sudo useradd -s /bin/bash -m -g ubuntu brian
sudo passwd brian
```

```
Enter new UNIX password:
Retype new UNIX password:
```

> Creates a new user with bash at their default shell `-s` with a premade home directory `-m` and they'll be apart of the ubuntu group `-g-`.

## Linking two Machines with SSH

When you generate a new ssh key, you get two files, a public key and a private key. The public key is what you give to everyone else and is not a secret.

You're basically giving them a key hole and telling them to install it on a door for you. The private key is just that, your private key. You will _never_ reveal this key to anyone.

```bash
ssh-keygen -t rsa
```

```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/ubuntu/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/ubuntu/.ssh/id_rsa.
Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub.
The key fingerprint is:
...
```

```bash
cat ~/.ssh/id_rsa.pub
```

> prints out ssh public key to give to others

```bash
ifconfig
```

> utility that is used to manage the network interfaces assigned to the machine it is running in.

```bash
ssh brian@<the ip address you just got from ifconfig on the other machine>
```

> connecting to a remote desktop

## SFTP

Sometimes you need to transfer files between two cx omputers. SFTP (secure file transfer protocol).

```bash
sftp brian@<the ip address you just got from ifconfig on the other machine>
```

> connects to secondary machine via sftp

```bash
lpwd
pwd
```

> ubuntu's local home directory
>
> brian's remote home directory

```bash
lls
ls
```

> list of files in ubuntu's home directory
>
> list of files in brian's home directory

```bash
help
```

> see all commands you can do

```bash
put giraffe.jpeg putted-giraffe.jpeg
```

```
Uploading giraffe.jpeg to /home/brian/Pictures/putted-giraffe.jpeg
giraffe.jpeg                             100% 5960 527.3KB/s 00:00
```

> transfers files (second argument renames files to destination machine, is optional)

**example**

```bash
sftp> !echo "hello this is brian" >> file-to-put.xt
sftp> !cat file-to-put.txt
sftp> put file-to-put.xt
```

```
hello this is brian
Uploading file-to-put.txt to /home/brian/file-to-put.txt
file-to-put.txt                  100% 90 157.0KB/s 00:00
```

> In this example, we use the **!** operator to create a file locally. We then use the put command to transfer that file to our secondary machine.

```bash
get logic.jpeg getting-logic.jpeg
```

```
Fetching /home/brian/Pictures/logic.jpeg to getting-logic.jpeg
logic.jpeg                             100% 24KB 4.6MB/s 00:00
```

> get files from secondary machine (second argument renames files to destination machine, is optional)

**Note:**
This is where we can utilize **tar** to bundle files together before transfering between machines.

## SCP

Securely copy a file between two servers

````bash
scp logic.jpeg brian@<the ip address you just got from ifconfig on the other machine>:destination-logic.jpeg
```

> transfer files from local machine to remote machine

```bash
scp brian@<the ip address you just got from ifconfig on the other machine>:brians-logic.jpeg getting-logic.jpeg
```

> transfer files from remote machine to local machine

## Wget

wget works like cp but instead of copying a local file you're copying something off the net. So you'll identify a remote file (usually a URL) that you want to fetch and save to your local file system.

```bash
wget https://raw.githubusercontent.com/btholt/bash2048/master/bash2048.sh
chmod 700 bash2048.sh
. bash2048.sh
````

> We download `bash2048.sh` remotely and then allow it permissions to be run as executable

**Note:**
One things that wget can do that curl cannot, is that wget can download recursive files.

## curl Basics

```bash
curl https://raw.githubusercontent.com/btholt/bash2048/master/bash2048.sh > game.sh
```

> We download `bash2048.sh` remotely and store it in a file called `game.sh`

```bash
python3 -m http.server 8000 -bind 0.0.0.0
```

> Runs an HTTP server locally

```bash
curl http://localhost:8000
```

> Creates a GET request to `http://localhost:8080`

```bash
curl http://localhost:8000` > res.txt
curl -o res.txt http://localhost:8000
```

> Return the response of `http://localhost:8000` to `res.txt`

```bash
curl -O http://localhost:8000/output.txt
```

> Capital `O` will keep the file name as is when requested

## curl & HTTP Verbs

Sometimes you'll want to make sure an endpoint is working with `curl -I` (or `curl --head`). This will send a **HEAD** request instead of a **GET** request. **HEAD** requests just get the endpoint metadata and don't actually do a full request.

Often you'll want to do other HTTP verbs as well like POST, PUT, DELETE, and PATCH.

```bash
curl -X GET http://localhost:8000
curl -X POST http://localhost:8000
curl -X PUT http://localhost:8000
curl -X PATCH http://localhost:8000
curl -X DELETE http://localhost:8000
curl -X OPTIONS http://localhost:8000
```

> The `-X` allows us to specify what verb we want to use.

**example**

```bash
curl  -d "this is the body being sent with the HTTP request" http://localhost:8000
```

> This `-d` sends a body without HTTP request, it will implicitly set the verb to **POST** if not set.

### Cookies

```bash
curl -b "name=brian" http://localhost:8000
```

> Will attach a cookie with then name of `name` and value of `brian` along with your request.

**Note:**
Cookie jar files can be useful too. If you're making a lot of requests and need to send a lot of cookies, you can put all of those into a file and use `-c <file name>` to use those as your cookies.

### Redirects

```bash
curl http://bit.ly/linux-cli
curl -L http://bit.ly/linux-cli
```

> By default the curl won't follow redirects, by adding `-L` flag you will tell curl to follow the redirect

### Headers

```bahs
curl -H "'accept-language: en-US" -H "Authorization: Bearer 12345" http://localhost:8000
```

> The `-H` flag will allow you to send headers with your requests, you will need to add multiple `-H` flags to attach multiple headers.

### Edge / Chrome / Firefox curls

One very cool feature of modern browsers is the ability to copy requests out of your network panel in your dev tools as curl requests and then be able to replay them from the command line. I do this all the time to properly formulate requests and get all the auth headers right.

### curl | bash

**Note:**
A lot of tutorials or installation of tools will have you do a request of `curl <url> | bash`. This will nab the contents of the URL off the network and pipe that directly into bash which will execute what's in the contents of the network request. This should make you uncomfortable.

- always read the script you're about to invoke
- only do it from domains you trust
- When in doubt just `curl url > file.sh` and then read the file. From there, `chmod 700 file.sh` and `. file.sh`. It's not that many more steps.
