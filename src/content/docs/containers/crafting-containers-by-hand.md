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

## Namespaces

## cgroups
