---
title: "String Functions"
slug: "string-functions"
sidebar:
  order: 6
---

## Setup Book Shop

### Database

```sql
CREATE DATABASE book_shop;
```

### Table

```sql
CREATE TABLE books (
		book_id INT NOT NULL AUTO_INCREMENT,
		title VARCHAR(100),
		author_fname VARCHAR(100),
		author_lname VARCHAR(100),
		released_year INT,
		stock_quantity INT,
		pages INT,
		PRIMARY KEY(book_id)
);

DESC books;
```

```
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| book_id        | int          | NO   | PRI | NULL    | auto_increment |
| title          | varchar(100) | YES  |     | NULL    |                |
| author_fname   | varchar(100) | YES  |     | NULL    |                |
| author_lname   | varchar(100) | YES  |     | NULL    |                |
| released_year  | int          | YES  |     | NULL    |                |
| stock_quantity | int          | YES  |     | NULL    |                |
| pages          | int          | YES  |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+
7 rows in set (0.00 sec)
```

### Initial Data

```sql
INSERT INTO books (title, author_fname, author_lname, released_year, stock_quantity, pages)
VALUES
  ('The Namesake', 'Jhumpa', 'Lahiri', 2003, 32, 291),
  ('Norse Mythology', 'Neil', 'Gaiman',2016, 43, 304),
  ('American Gods', 'Neil', 'Gaiman', 2001, 12, 465),
  ('Interpreter of Maladies', 'Jhumpa', 'Lahiri', 1996, 97, 198),
  ('A Hologram for the King: A Novel', 'Dave', 'Eggers', 2012, 154, 352),
  ('The Circle', 'Dave', 'Eggers', 2013, 26, 504),
  ('The Amazing Adventures of Kavalier & Clay', 'Michael', 'Chabon', 2000, 68, 634),
  ('Just Kids', 'Patti', 'Smith', 2010, 55, 304),
  ('A Heartbreaking Work of Staggering Genius', 'Dave', 'Eggers', 2001, 104, 437),
  ('Coraline', 'Neil', 'Gaiman', 2003, 100, 208),
  ('What We Talk About When We Talk About Love: Stories', 'Raymond', 'Carver', 1981, 23, 176),
  ("Where I'm Calling From: Selected Stories", 'Raymond', 'Carver', 1989, 12, 526),
  ('White Noise', 'Don', 'DeLillo', 1985, 49, 320),
  ('Cannery Row', 'John', 'Steinbeck', 1945, 95, 181),
  ('Oblivion: Stories', 'David', 'Foster Wallace', 2004, 172, 329),
  ('Consider the Lobster', 'David', 'Foster Wallace', 2005, 92, 343);
```

## Run SQL file from command line

We can run a `.sql` file from the command line.

```sql
USE database <database_name>;
source <file_name>.sql;
```

**example**

```sql
USE database book_shop;
source book_data.sql;
```

```
Query OK, 0 rows affected (0.00 sec)

Query OK, 16 rows affected (0.00 sec)
Records: 16  Duplicates: 0  Warnings: 0
```

## CONCAT

The `CONCAT()` function adds two or more expressions together.

```sql
-- hello
SELECT CONCAT('h', 'e', 'l', 'l', 'o');
```

```sql
SELECT
  CONCAT(author_fname, ' ', author_lname) AS author_name
FROM books;
```

```
+----------------------+
| author_name          |
+----------------------+
| Jhumpa Lahiri        |
| Neil Gaiman          |
| Neil Gaiman          |
| ...                  |
+----------------------+
16 rows in set (0.00 sec)
```

### CONCAT_WS

The `CONCAT_WS()` function adds two or more expressions together with a separator.

The first argument passed into `CONCAT_WS` will be used as a separator.

```sql
SELECT
  CONCAT_WS('-', title, author_fname, author_lname)
FROM books;
```

```
+--------------------------------------------------------------------+
| CONCAT_WS('-', title, author_fname, author_lname)                  |
+--------------------------------------------------------------------+
| The Namesake-Jhumpa-Lahiri                                         |
| Norse Mythology-Neil-Gaiman                                        |
| American Gods-Neil-Gaiman                                          |
| ...                                                                |
+--------------------------------------------------------------------+
16 rows in set (0.00 sec)
```

## SUBSTRING

The `SUBSTRING()` function extracts a substring from a string (starting at any position).

- first argument is the string to be extracted from.
- second argument is the starting position, the first character is in the string is `1` and the last character is `-1`.
- third argument (optional) is the number of characters to extract, if omitted, it will return the rest of the string from start position given.

**Note** We can use the `SUBSTR()` function as a shorthand for `SUBSTRING()`

```sql
-- Hell (FROM position 1, FOR length 4)
SELECT SUBSTRING('Hello World', 1, 4);

-- World (FROM position 7 to end of string)
SELECT SUBSTRING('Hello World', 7);

-- rld (FROM position -3 to end of string)
SELECT SUBSTRING('Hello World', -3);
```

```sql
SELECT
  SUBSTRING(title, 1, 15)
FROM books;
```

```
+-------------------------+
| SUBSTRING(title, 1, 15) |
+-------------------------+
| The Namesake            |
| Norse Mythology         |
| American Gods           |
| ...                     |
+-------------------------+
16 rows in set (0.00 sec)
```

```sql
SELECT
  SUBSTR(author_lname, 1, 1) AS linitial, author_lname
FROM books;
```

```
+----------+----------------+
| linitial | author_lname   |
+----------+----------------+
| L        | Lahiri         |
| G        | Gaiman         |
| G        | Gaiman         |
| ...                       |
+----------+----------------+
16 rows in set (0.00 sec)
```

## Combining String Functions

**examples** Combine the `SUBSTRING()` and `CONCAT()` functions.

```sql
SELECT CONCAT(
    SUBSTR(title, 1, 10),
    '...'
  ) AS short_title
FROM books;
```

```
+---------------+
| short_title   |
+---------------+
| The Namesa... |
| Norse Myth... |
| American G... |
| ...           |
+---------------+
16 rows in set (0.00 sec)
```

```sql
SELECT CONCAT(
    SUBSTR(author_fname, 1, 1),
    '.',
    SUBSTR(author_lname, 1, 1),
    '.'
  ) AS author_initials
FROM books;
```

```
+-----------------+
| author_initials |
+-----------------+
| J.L.            |
| N.G.            |
| N.G.            |
| ...             |
+-----------------+
16 rows in set (0.00 sec)
```

## REPLACE

The `REPLACE()` function replaces all occurrences of a substring within a string, with a new substring.

- first argument is the original string
- second argument is the substring to be replaced
- third argument is the new replacement substring

**Note** `REPLACE` is case sensitive.

```sql
-- %$#@o, World
SELECT REPLACE('Hello, World', 'Hell', '%$#@');

-- cheese and bread and coffee and milk
SELECT REPLACE ('cheese bread coffee milk', ' ', ' and ');
```

```sql
SELECT REPLACE(title, ' ', '-') FROM books;
```

```
+-----------------------------------------------------+
| REPLACE(title, ' ', '-')                            |
+-----------------------------------------------------+
| The-Namesake                                        |
| Norse-Mythology                                     |
| American-Gods                                       |
| ...                                                 |
+-----------------------------------------------------+
16 rows in set (0.00 sec)
```

## REVERSE

The `REVERSE()` function reverses a string and returns the result.

```sql
-- steggun nekcihc
SELECT REVERSE("chicken nuggets");

-- NULL (represents an unknown value)
SELECT REVERSE(NULL);
```

```sql
SELECT REVERSE(author_fname) FROM books;
```

```
+-----------------------+
| REVERSE(author_fname) |
+-----------------------+
| apmuhJ                |
| lieN                  |
| lieN                  |
| ...                   |
+-----------------------+
16 rows in set (0.00 sec)
```

**example** Combine `CONCAT` and `REVERSE`

```sql
SELECT CONCAT(
  author_fname,
  REVERSE(author_fname)
) FROM books;
```

```
+---------------------------------------------+
| CONCAT(author_fname, REVERSE(author_fname)) |
+---------------------------------------------+
| JhumpaapmuhJ                                |
| NeillieN                                    |
| NeillieN                                    |
| ...                                         |
+---------------------------------------------+
16 rows in set (0.00 sec)
```

## CHAR_LENGTH

The `CHAR_LENGTH()` function return the length of a string (in characters).

```sql
-- 11
SELECT CHAR_LENGTH('Hello World');
```

```sql
SELECT
  CHAR_LENGTH(title) as title_len, title
FROM books;
```

```
+-----------+-----------------+
| title_len | title           |
+-----------+-----------------+
|        12 | The Namesake    |
|        15 | Norse Mythology |
|        13 | American Gods   |
|        ...                  |
+-----------+-----------------+
16 rows in set (0.00 sec)
```

### Length

The `LENGTH()` function returns the length of a string (**in bytes**).

**Note** `CHAR_LENGTH` function is different from the `LENGTH` function

**example**

```sql
-- 2
SELECT CHAR_LENGTH('漢字');

-- 6
SELECT LENGTH('漢字');
```

```sql
SELECT
  CHAR_LENGTH(title) as title_len, title
FROM books;
```

```
+-----------+-------------------------+
| title_len | title                   |
+-----------+-------------------------+
|        12 | The Namesake            |
|        15 | Norse Mythology         |
|        13 | American Gods           |
|        23 | Interpreter of Maladies |
+-----------+-------------------------+
16 rows in set (0.00 sec)
```

## UPPER & LOWER

The `UPPER()` function converts a string to upper-case.

**Note** We can use the `UCASE()` function as a shorthand for `UPPER()`

The `LOWER()` function converts a string to lower-case.

**Note** We can use the `LCASE()` function as a shorthand for `LOWER()`

```sql
-- HELLO WORLD
SELECT UPPER('Hello World');

-- hello world
SELECT LOWER('Hello World');
```

```sql
SELECT UPPER(title) FROM books;
```

```
+-----------------+
| UPPER(title)    |
+-----------------+
| THE NAMESAKE    |
| NORSE MYTHOLOGY |
| AMERICAN GODS   |
| ...             |
+-----------------+
16 rows in set (0.00 sec)
```

**example** Combine **CONCAT** and **UPPER**

```sql
SELECT CONCAT('I LOVE ', UPPER(title), ' !!!') FROM books;
```

```
+-----------------------------------------+
| CONCAT('I LOVE ', UPPER(title), ' !!!') |
+-----------------------------------------+
| I LOVE THE NAMESAKE !!!                 |
| I LOVE NORSE MYTHOLOGY !!!              |
| I LOVE AMERICAN GODS !!!                |
| ...                                     |
+-----------------------------------------+
16 rows in set (0.00 sec)
```

## Other String Functions

### INSERT

The `INSERT()` function inserts a string within a string at the specified position and for a certain number of characters.

- first argument is the original string
- second argument is position to insert new string
- third argument is number of characters to replace
- fourth argument is new string to be inserted

```sql
-- Hello Za World
SELECT INSERT('Hello World', 6, 0, ' Za');

-- Hell Zarld
SELECT INSERT('Hello World', 6, 3, ' Za');
```

### LEFT & RIGHT

The `LEFT() `function extracts a number of characters from a string (starting from left).

The `RIGHT()` function extracts a number of characters from a string (starting from right).

```sql
-- Hell
SELECT LEFT('Hello World', 4);

-- orld
SELECT RIGHT('Hello World', 4);
```

**example** Combine `CONCAT` and `LEFT`

```sql
SELECT CONCAT(
    LEFT(author_fname, 1),
    '.',
    LEFT(author_lname, 1),
    '.'
  ) AS initials
FROM books;
```

```
+----------+
| initials |
+----------+
| J.L.     |
| N.G.     |
| N.G.     |
| ...      |
+----------+
16 rows in set (0.00 sec)
```

### REPEAT

The `REPEAT()` function repeats a string as many times as specified.

```sql
-- HAHAHAHA
SELECT REPEAT('HA', 4);
```

### TRIM

The `TRIM()` function removes **leading** and **trailing** spaces from a string.

```sql
-- Boston
SELECT TRIM('  Boston  ');

-- San Antonio
SELECT TRIM('  San Antonio ');
```

**Note** We can trim other characters, as well as specify if we want to trim just the leading or trailing parts of a string.

```sql
-- DragonSlayerxXx
SELECT TRIM(LEADING 'xXx' FROM 'xXxDragonSlayerxXx');

-- xXxDragonSlayer
SELECT TRIM(TRAILING 'xXx' FROM 'xXxDragonSlayerxXx');

-- DragonSlayer
SELECT TRIM(BOTH 'xXx' FROM 'xXxDragonSlayerxXx');
```

**Note** Also, see `LTRIM()` and `RTRIM()` functions.

## Example

```sql
SELECT
	CONCAT(SUBSTR(title, 1, 10), '...') AS short_title,
	CONCAT_WS(',', author_fname, author_lname) AS author,
  CONCAT(stock_quantity, ' in stock') AS quantity
FROM books;
```

```
+---------------+---------------+--------------+
| short_title   | author        | quantity     |
+---------------+---------------+--------------+
| The Namesa... | Jhumpa,Lahiri | 32 in stock  |
| Norse Myth... | Neil,Gaiman   | 43 in stock  |
| American G... | Neil,Gaiman   | 12 in stock  |
| ...                                          |
+---------------+---------------+--------------+
16 rows in set (0.00 sec)
```
