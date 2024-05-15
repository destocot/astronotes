---
title: "Editors"
slug: "editors"
sidebar:
  order: 3
---

## nano

**nano** is an old open source text editor.

```bash
nano textfile.txt
```

> will create a new file called `textfile.txt` (if it does not exist)

<kbd>CTRL</kbd> + <kbd>X</kbd> - Exit  
<kbd>CTRL</kbd> + <kbd>G</kbd> - Get help  
<kbd>CTRL</kbd> + <kbd>O</kbd> - Write out (save)

## VIM: A Brief History

vim started with an editor called **ed** (said ee-dee) which itself was inspired by a previous editor called **qed**. ed was developed by Ken Thompson at Bell Labs in 1969. It is a line-oriented editor.

From ed we got **ex** (short for extended). Billy Joy made a screen-oriented mode (as opposed to a line-oriented one) for ex called **vi** (short for visual).

Tim Thompson made a vi clone for the Atari ST called Stevie that Bram Moolenaar then ported to the Amiga. Bram called this Vi IMitation but later that was changed to Vi IMproved (vim).

## VIM: Basic Commands

```bash
vim textfile.txt
```

> will create a new file called `textfile.txt` (if it does not exist)

> --COMMAND-- mode

<kbd>:q</kbd> - quit  
<kbd>:q!</kbd> - force quit  
<kbd>:qa!</kbd> - force quit across all open windows
<kbd>:d</kbd> - delete current line  
<kbd>:d100</kbd> - delete next 100 lines  
<kbd>:w</kbd> - save  
<kbd>:wq</kbd> - save and quit (also can use :x!)

> i will put you into --INSERT-- mode (<kbd>ESC</kbd> to return to command mode)

- [Vim Adventures](https://vim-adventures.com/)
- <kbd>:help tutor</kbd> - integrated tutor

## VIM: Tips and Shortcuts

```
:set number
```

> Displays line numbers (:set numbers!) to remove them.

<kbd>d</kbd><kbd>d</kbd>

> delete the entire line

```
:%d
```

> delete all the lines from your file

### Substitute Command

Use the substitute command to perform a search and replace in vi.

- Useable directly in command mode, to delete, search & replace

```
:%s/pattern/replace/g
```

- s is short for **substitute**
- pattern represents the text you want to replace
- replace represents the text that should replace the existing pattern
- g stands for global, which will replace all occurrences of the pattern

**Example**

```
:%s/Ma/NaNaNa/g
```

### Search for a pattern

- Hit the <kbd>/</kbd> key to enter vi mode
- Type of the pattern you are looking for

**example**

```
/world
```

### Copy a line of text

- Move to your line of choice, hit the <kbd>ESC</kbd> key, and press <kbd>y</kbd> twice.

> The first `y` selects the text, the second `y` copies the seelected text.

- Navigate to the end of the file and press <kbd>p</kbd> to copy the line.

### Create multiple files at once

```bash
vi -o file1 file2
```

> This will open the **vim** editor with both files in the same view. Use a capital `-O` flag to display the files side-by-side.

> You can switch between the files using <kbd>CTRL</kbd> + <kbd>w</kbd> and the up/down (or left/right) arrows.

### Visual Block Selection

Sometimes it can be useful to move an entire block of text

**example**

**testscript.sh**

```bash
#!/bin/bash
 echo hello
 echo this is a basic script
 echo using multiple echo commands!
```

- save using `:w` and leave the file open
- move to the start of line 2
- press <kbd>Ctrl</kbd> + <kbd>v</kbd>. This will put you in **visual block mode**.
- Use the arrow keys to select from line 2 to line 4.
- Press <kbd>Shift</kbd> + <kbd>i</kbd>. This will put us in insert mode, allowing us to type the character '#'.
- Press <kbd>ESC</kbd> twice,

```bash
#!/bin/bash
# echo hello
# echo this is a basic script
# echo using multiple echo commands
```
