---
title: "Automation & Customization"
slug: "automation-and-customization"
sidebar:
  order: 13
---

## cron

Linux has a feature called cron that will run tasks on a schedule.

There are two ways to accomplish this

### cron folders

Any script you put in any of the following will be run on a schedule:

- /etc/cron.daily
- /etc/cron.hourly
- /etc/cron.monthly
- /etc/cron.weekly

**Note** Make sure that the scripts have executable privileges.

### crontab

If you need a more defined schedule (like every five minutes, every other Thursday, every six months, etc.) then you can use the classic way, crontab.

With crontab you can define a cron schedule to execute your scripts. Let's say we want to make a new file in `~/cronfiles` every two minutes.

_make-new-file_

```bash
#! /bin/bash

mkdir -p ~/temp-files
cd ~/temp-files
touch file-$(date +%s).txt
```

> `date +%s` gives you the epoch timestamp, or how many seconds have elapsed since Jan 1, 1970.

Running crontab `crontab -e` you can specificy a user with `crontab -u ubuntu -e`

```bash
* * * * * <the command you want to run>
```

The above five stars would run every minute. Each of those stars represents a frequency. They represent as follows:

`<minutes> <hours> <day of the month> <month> <day of the week>`

The stars mean "every", hence why five stars runs every minute, So if we wanted to command once an hour on the fifth minute, we could do this:

`5 * * * * <the command you want to run>`

If we wanted it to run every half hour on Sundays, we could do:

```
*/30 * * * 0 <the command you want to run>
0,30 * * * 0 <command>
```

**Note** Special Strings

```
@daily <command>
@reboot <command> # everytime it starts up
@weekly <command>
@yearly <command>
@monthly <command>
@annually <command>
```

**Examples**

```bash title="run make_new_file script every two minutes"
*/2 * * * * /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run Monday–Friday at 6am."
0 6 * * 1-5 /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run at 6pm every Friday."
0 18 * * 5 /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run every half hour from 9–4 on Monday, Wednesday, and Friday."
0,30 9-16 * * 1,3,5 /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run every other hour every day."
0 */2 * * * /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run on May 4th at midday."
0 12 4 5 * /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run on the 1st of every month at 6:25am."
25 6 1 * * /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run every 20 minutes every Tuesday between 10am and 2pm."
*/20 10-14 * * 2 /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run the 1st of every other month on the hour."
0 * 1 */2 * /home/ubuntu/my_bin/make_new_file
```

```bash title="Set up the script to run at 6am and 8am on Saturday and Sunday."
0 6,8 * * 6,0 /home/ubuntu/my_bin/make_new_file
```

**Reference**
[crontab guru](https://crontab.guru/)

### Scripting Commands

**awk**

- scripting language
- manipulate data and reports

**sed**

- stream editor
- update files without opening them

**tr**

- translate or replace characters

**cut**

- slice (cut) a line and extract the results

**wc**

- word count
- count the number of lines, words, and characters

```bash
# the number of connected users
who | wc -l
```

## Customize Your Shell

All engineers love to customize their tools to their absolute perfect liking. Your shell and emulator should be no different. I'm going to show you a few things you can do to make your shell your own.

### Prompts

Your prompt is the bit that shows up on every new line. By default it's something like `ubuntu@primary:~$`. You customize this by changing the environment variable `PS1`.

More easily you can install someone else's.

Run the following: `curl https://raw.githubusercontent.com/riobard/bash-powerline/master/bash-powerline.sh > ~/.bash-powerline.sh`

_.bashrc_

```bash
source ~/.bash-powerline.sh
```

```bash
`source ~/.bashrc`
```

## Colors & Awesome Bash

Multipass ships with nice colors, particularly for `ls` which is not colored by default, but sometimes you do have to set them yourself.

```bash
echo -e "This is how you make text \e[32mgreen"
```

**References**
[awesome-lists/awesome-bash](https://github.com/awesome-lists/awesome-bash)
