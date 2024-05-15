---
title: "Package Management"
slug: "package-management"
sidebar:
  order: 9
---

## Package Management & APT Basics

Each Linux Distro has its own package management:

- Debian has dpkg. Because Ubuntu is based on Debian it also has dpkg installed and available to use.
- APT (advanced packaging tool) is based on dpkg and available to all in the Debian family of distros
- Red Hat had RPM, Red Hat Package Manager
- Similar to how APT is on top of dpkg, YUM is on top of RPM to make it easier to use. DNF is the next generation of YUM
- Arch has Pacman
- Alpine has APK
- Even macOS has one with Homebrew and Windows with its new winget system. Again, we'll be focusing on APT and Snap today.

**APT** (advanced packing tool)

apt-get is older than apt, but they both can accomplish the same things.

apt is a tool that allows you to downlaod new packages via `apt install`.

```bash
sudo apt insall lolcat
```

> this will fetch the package lolcat from the apt registry and install

```bash
node -e "console.log('hello from node')" | lolcat
```

> will execute `console.log('hello from node')` and pipe the output into lolcat

[Create Terminal Aliases](https://www.netlify.com/blog/2020/04/12/speed-up-productivity-with-terminal-aliases/?utm_source=twitter&utm_medium=terminalalias-sd&utm_campaign=devex)

```bash
sudo apt autoremove
```

> will remove unsued dependencies

```bash
sudo apt update
```

> updates the list of available packages apt uses

```bash
apt list
apt list --upgradeable
```

> lists everything installed (can add `--upgradeable` flag to show packages with updates available)

```bash
sudo apt upgrade
```

> updates all the packages to their latest available versions

```bash
sudo apt full-upgrade
```

> basically `sudo apt autoremove && sudo apt upgrade`

That's pretty much it! While there's no official web browser experience for apt, [check out this open source once](https://www.apt-browse.org).

## APT Q&A

apt is a higher tool built upon several lower level tools

**Most used commands**

- list: list packages based on package name
- search: search in package description
- show: show package details
- install: install packages
- remove: remove package
- autoremove: remove automatically unused packages
- update: update list of available packages
- upgrade: upgrade teh system by installing/upgrading packages
- full-upgrade: upgrade the system by remove/installing/upgrading packages
- edit-sources: edit the source information file

## Snaps

Canonical a few years announced a new way of packaging app called snaps. Snaps are advantageous over what was there before (apt typically deals with debs) for a few reasons:

- They're totally self contained. They package all their dependencies with them
- They're sandboxed. They can't mess with your system
- They can update by just downloading the difference between their versions

### What is a Snap

As stated above, it's just another way of packaging an app up and for the most part you don't really have to care. There's a few things that you do need to keep in mind however:

- Snaps update automatically and you actually can't stop that from happening really. Debs update whenever you choose to do so
- Snaps are safer. They're sandboxed and cannot break out of their home folders. Debs really can do whatever they want
- Snaps are also how Ubuntu lets publish GUI apps like Visual Studio Code, Spotify, Firefox, etc. There's more than just command line tools.
- Debs are reviewed before they're allowed onto the registry. They have to be or else renegade devs could publish anything they want. Snaps, due to their sandboxing, don't have to be.

Which should you prefer? Often things like like node and lolcat are available on both. I think you're fine with either. When I use a Linux desktop I 100% prefer snaps for desktop apps like Visual Studio Code, Spotify, and Firefox, but for commandline tools I tend to just follow whatever the instructions suggestion. You're good either way.

```bash
sudo snap install lolcat
ls -lsah lolcat
```

> lolcat package will now be attached to the stable channel of lolcat so if they dev ever updates the stable channel you'll get that update for free.

```bash
snap info node
sudo snap install --channel=14/stable --classic node
```

> nodejs package we attach to the 14/stable channel. We'll get all Node.js 14 stable updates automatically. That works well for me locally but it can be a bit scary to do that on a web server. In this case I'd want to have more control over the updates.
>
> We also specify --classic. This is basically saying "it's okay if this app isn't sandboxed." Node.js won't install otherwise. In these cases make sure you trust the provider of the snap. [NodeSource](https://nodesource.com/) (who maintain the snap) are indeed worthy of your trust. Also you have to restart the shell so it can properly initialize itself.
