---
title: "Overview"
slug: "overview"
sidebar:
  order: 1
---

## What is Unix

- Linux is a **Unix-like** operating system.
- A big part of Unix software is the idea of the "_Unix philosophy_".
  - The idea is instead of having a few very specialized tools (or programs) we should have many small, composable tools that we can use to compose to solve larger problems.

## What is Linux

- Linux isn't directly Unix, just directly inspired by it, and incorporates many of its ideas and interfaces into it.

- Why Linux?
  - It's free
  - Well maintained
  - Runs just about anywhere
  - Most of the things you need already exist for it.

## How to Run Linux

- Linux can be run through a process called virtualization.
  - Virtual machines (VMs) are an operating system running within another operating system.

### Virtualization

Linux virtualization allows a Linux system to run multiple virtual machines using a virtual machine application. These VMs share system resources based on the backend hardware capacity.

#### In Cloud Computing

Linux virtualization enables virtual machines to share hardware while running independently, maximizing performance, saving power, and reducing hardware usage.

#### Advantages of Linux Virtualization

- **Better resource utilization**: Enhances system efficiency by sharing CPU and memory.
- **Reduced management costs**: Fewer physical servers mean lower cooling, energy, and management costs.
- **Flexibility**: Allows the creation of new environments using existing hardware with applications like XEN virtualization.
- **Cost savings**: Fewer hardware components result in lower licensing costs.

#### Important Software for Linux Virtualization

- **VMware Server**: Partitions a single physical server into multiple virtual machines.
- **VirtualBox**: A virtualization program similar to VMware's products.
- **QEMU**: A virtualization program and emulator that runs software on different CPU architectures.
- **XEN**: Includes three key products:
  1. **Citrix XenServer**: Delivers low overhead and near-native performance using the open-source XEN hypervisor.
  2. **Oracle VM**: Based on XEN hypervisor, featuring a web-based management console and support for Windows and Linux guests.
  3. **Sun xVM**: A product line from Sun Microsystems using XEN under Solaris for x86-64 systems, offering server and desktop virtualization solutions.
- **Parallels Virtuozzo Containers**: An OS virtualization product for large-scale servers and data centers, creating isolated partitions for efficient hardware and software usage.
