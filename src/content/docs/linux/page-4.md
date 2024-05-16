---
title: "Files & Streams"
slug: "files-and-streams"
sidebar:
  order: 4
---

# Files & Streams

## Reading Files

```bash
less textfile.txt
```

> Program for reading files. Good for reading long files.

```bash
man less
```

> Manual for a program

```bash
more textfile.txt
```

> More command is similar to the less command, except that it also provides a prompt at the bottom of the screen and a percentage of how much of the file has been seen.

```bash
cat textfile.txt
```

> Prints content of files.

_cat comes from concatenate_

```bash
tail textfile.txt
```

> last ten lines from a file

```bash
tail -n 3 textfile.txt
```

> last three lines from a file

```bash
tail -f textfile.txt
```

> real time as lines are added to file

```bash
head textfile.txt
```

> first ten lines from a file

```bash
mkdir my-new-folder
```

> create a new directory

```bash
mkdir -p hi/my/name/is/brian
```

> creates multiple nested folders

## Creating & Moving Files

```bash
touch my-new-file.txt
```

> Creates a new file if it does not exist (otherwise updates motified time).

```bash
rm my-new-file.txt
```

> remove file

```bash
rm -r my-new-folder
```

> remove folder resursively (if contents are empty)

```bash
rm -rf my-new-folder
```

> remove folder even if contents are not empty

```bash
rmdir testdir
```

> remove a directory. cannot delete a directory that has files in it

```bash
cp textfile.txt destination-file.txt
```

> copy file

```bash
cp -R original new-directory
```

> copy directory

```bash
mv original renamed-directory
```

> move (rename) files / folder

## Disk Space

```bash
tar -cf archive.tar textfile.txt folder1
```

> creates a single uncompressed tar file (similar to zip file)

```bash
tar -zcf archive.tar.gz textfile.txt folder1
```

> creates a single compressed tar file

```bash
tar -xzf archive.tar.gz -C destination-folder
```

> extracts contents to folder (folder must exist)

### gzip

The `gzip` command compresses a file to use less disk space, the resulting file uses the extension `.gz`

### gunzip

The `gunzip` command uncompresses a `.gz` file

## Wildcards & Replacements

```bash
touch file-1.txt file-2.txt file-3.txt file-4.txt
touch file-{1,2,3,4}.txt
```

> create multiple files (file-1.txt, file-2.txt, ...) (expansion)

```bash
ls file-*
```

> list files started with file- (wildcard)

```bash
ls file?.txt
```

> matches exactly one character (file1.txt, file2.txt, etc.)

```bash
touch file{1..30}.txt
```

> creates 30 files (file1.txt, file2.txt, ..., file30.txt)

**examples**

```bash
echo {z..a}
```

```
z y x w v u t s r q p o n m l k j i h g f e d c b a
```

```bash
echo {a..c}{1..3}
```

```
a1 a2 a3 b1 b2 b3 c1 c2 c3
```

## Output Streams

**standard**

- 1> redirects standard out
- 2> redirects standard error

```bash
echo 'this is my text'
```

```
this is my text
```

> outputs to standard out stream to user if no where else

```bash
echo 'this is my text' 1>new-file.txt
```

> redirects stream into a new file

```bash
cat new-file.txt 1> another-file.txt
ls -lsah 1> ls.txt
```

> copies (replaces) contents into file

```bash
cat new-file.txt 1>> another-file.txt
```

> appends to the file (instead of replacing)

```bash
cat non-existent-file.txt
```

```
cat: non-existent-file.txt: No such file or directory
```

```bash
cat non-existent-file.txt 2> error.txt
```

> outputs standard error (2>)

```bash
cat some-file.txt 1> /dev/null
cat some-file.txt 2> /dev/null
```

> /dev/null special directory, if you want to ignore output (or error) you can stream it into /dev/null

**Example** Printing with cat

```bash
cat << EOF
	Cat can print multi lines.
	The << \EOF defines the delimiter to use to end the stream.
 	When \EOF is found and not escaped, cat will end.
EOF
```

```bash
cat << EOF >&2
	You can also redirect to standard error
	Will only print on error exit code
EOF
exit 1
```

## Input Streams

```bash
cat < ls.txt
```

```
total 8.0K
4.0K drwxrwxr-x 2 ubuntu ubuntu 4.0K May  2 01:22 .
4.0K drwxrwxr-x 3 ubuntu ubuntu 4.0K May  2 01:10 ..
   0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls-error.txt
   0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls.txt
total 12K
4.0K drwxrwxr-x 2 ubuntu ubuntu 4.0K May  2 01:22 .
4.0K drwxrwxr-x 3 ubuntu ubuntu 4.0K May  2 01:10 ..
   0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls-error.txt
4.0K -rw-rw-r-- 1 ubuntu ubuntu  252 May  2 01:22 ls.txt
```

> read out of file and input into cat

```bash
while read line; do echo $line; done < namelist.txt
```

> This command reads each line from the file `namelist.txt` and echoes it to the terminal.

```bash
bc <<< 4*5
```

> This command sedns the string "4\*5" as input to the bc command, which is a calculator.
