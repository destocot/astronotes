---
title: "Grep, Sed, Awk, & Pipes"
slug: "grep-sed-awk-and-pipes"
sidebar:
  order: 5
---

## Grep

The **grep** command allows us to find content in a file using a pattern

```bash
grep "ma" namelist.txt
grep -i "ma" namelist.txt
```

> Searches the file `namelist.txt` for all lines with the text "ma". Adding the `-i` flag performs a case insenstive search.

```bash
grep -ci "ma" namelist.txt
```

> The `-c` flag returns the number of lines (count) where the text is matched.

```bash
grep "ls-error.txt" < ls.txt
```

```
0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls-error.txt
0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls-error.txt
```

> reads from ls.txt, and fed contents into standard in. through the grep program, we looked for the text" ls-error.txt"

```bash
grep "ls-error.txt" < ls.txt 1> grep.txt 2> /dev/null
```

> same as above, except this time we output into grep.txt and ignore all errors from the standard error

## Sed

**sed** is a powerful command commonly used to perform **search and replace** in a file or any output.

**Example** Search and replace on the entire file

```bash
sed 's/world/sed/g' myfile2.txt
```

> The file itself is not changed, however.

**Example** Only search and replace the second line of a file

```bash
sed '2s/world/sed' myfile2.txt
```

We can redirect the output to a new file

```bash
sed 's/world/sed/g' myfile2.txt > mynewfile.txt
```

If we want to alter the original file we can use the option `-i`.

```bash
sed -i 's/world/sed/g' myfile2.txt
```

**Example** Delete empty lines from a file

```bash
sed '/^$/d' myfile2.txt
```

**Example** Delete a specific line number

```bash
sed '1d' myfile2.txt
```

**Example** Print a range of lines from a file

```bash
sed -n '1,2p' myfile.txt
```

## Awk

**awk** is a scripting language that is very useful for manipulating data.

It is generally used to extract data nad prepare reporting, making it particularly useful for manipulating text files like logs.

**awk** reads a file or other input line by line and execute specific commands as it processes the input.

**Example** using awk to display a file

```bash
awk '{print$0}' myfile.txt
```

**Example** Display specific columns

```bash
awk '{print$1,$2}' myfile.txt
```

> By default each column is separated by a space

**Example** Allow us to choose a custom field separator

```bash
awk -F',' '{print$1,$2}' myfile.txt
```

**Example** Using awk with a conditional statement, filtering the output on line 2, to 4

```bash
awk 'NR==2, NR==4 {print NR,$0}' myfile.txt
```

**Example** Print only the line that matches the pattern

```bash
awk '/great/ {print}' myfile.txt
```

**Example** Checks if the value in `$1` is world; print the line if found

```bash
awk '{ if($1 == "world") print $0 }' myfile.txt
```

**Example** If the string "world" exists in the line; print the line if found (similar to matching pattern)

```bash
awk '$0 ~ /world/ {print$0}' myfile.txt
```

**Example** Using the build-in variable NR to print the line number

```bash
awk '{print NR,$0}' myfile.txt
```

**Example** Using awk to do a sum (aggregation of value in second column of each row)

```bash
awk -F',' '{sum+=$2;} END{print sum;}' myfile.txt
```

## Pipes

Going from program to program.

```bash
cat ls.txt | grep "ls-error.txt"
```

```
0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls-error.txt
0 -rw-rw-r-- 1 ubuntu ubuntu    0 May  2 01:22 ls-error.txt
```

> pipes output from cat into grep

```bash
yes n | rm -i file*
```

> pipes the yes program (with answer n) to the remove files interactive mode

```bash
ps aux
```

> finds all processes and outputs that to standard out

**example**

```bash
ps aux | grep "ps aux"
```

```
ubuntu   72498  0.0  0.0  12672  3552 pts/0    R+   00:08   0:00 ps aux
ubuntu   82499  0.0  0.0   9080  2416 pts/0    S+   00:08   0:00 grep --color=auto ps aux
```

> we take the stdout from ps aux, and run that as the stdin to grep. grep finds the lines it needs and outputs that to the stdout.

**Example**

```bash
# list IP addresses from the access log
sudo cat /var/log/httpd/access_log | awk '{print $1}'
```

```bash
# list 404 GET requests with the page and IP address
sudo cat /var/log/httpd/access_log | awk '/404/{$(NF+1)=$1;print}' | awk -FGET '{print $2}' | awk '{print $1, $NF}' > 404.txt
```

- first `awk` matches `/404/` pattern and defines a new column with the value set to the first column (ip address).

- second `awk` declares a custom separate `GET` and takes the data in the second column (everything after the word `GET`)

- third `awk` prints the first column (page) and the last column, $NF (ip address) and redirects it to `404.txt`

```bash
awk '{count[$1" "$2]++} END {for (key in count) print key, count[key]}' 404.txt | sort -k3,3nr >  aggregated_404.txt
```

- `count[$1" "$2]++ creates a variable named count that uses the line as the key and the number of occurrences in the file as the value.

- We then loop over each key in count and print the line with its number of occurrences

- Then use the `sort` command with `-k3,3` to specify the third column (the count) as the sorting key. `-nr` stands for numeric and reverse order.
