---
title: "Refining Selections"
slug: "refining-selections"
sidebar:
  order: 7
---

## Adding Some New Books

```sql
INSERT INTO books (title, author_fname, author_lname, released_year, stock_quantity, pages)
  VALUES
    ('10% Happier', 'Dan', 'Harris', 2014, 29, 256),
    ('fake_book', 'Freida', 'Harris', 2001, 287, 428),
    ('Lincoln In The Bardo', 'George', 'Saunders', 2017, 1000, 367);
```

## DISTINCT

```sql
SELECT DISTINCT author_lname FROM books;
```

```
+----------------+
| author_lname   |
+----------------+
| Lahiri         |
| Gaiman         |
| Eggers         |
| ...            |
+----------------+
11 rows in set (0.00 sec)
```

```sql
--SELECT DISTINCT CONCAT(author_fname, " ", author_lname) FROM books;
SELECT DISTINCT author_fname, author_lname FROM books;
```

```
+----------------------+
| author               |
+----------------------+
| Jhumpa Lahiri        |
| Neil Gaiman          |
| Dave Eggers          |
| ...                  |
+----------------------+
12 rows in set (0.00 sec)
```

## ORDER BY

```sql
SELECT author_lname FROM books ORDER BY author_lname;
```

```
+----------------+
| author_lname   |
+----------------+
| Carver         |
| Carver         |
| Chabon         |
| ...            |
+----------------+
19 rows in set (0.00 sec)
```

`ORDER BY` sorts in ASCENDING (`ASC`) order by default. We can specify `DESC` to indicate we want the results in DESCENDING order.

```sql
SELECT author_lname FROM books ORDER BY author_lname DESC;
```

```
+----------------+
| author_lname   |
+----------------+
| Steinbeck      |
| Smith          |
| Saunders       |
| ...            |
+----------------+
19 rows in set (0.00 sec)
```

```sql
SELECT title, pages FROM books ORDER BY pages ASC;
```

```
+-----------------------------------------------------+-------+
| title                                               | pages |
+-----------------------------------------------------+-------+
| What We Talk About When We Talk About Love: Stories |   176 |
| Cannery Row                                         |   181 |
| Interpreter of Maladies                             |   198 |
| ...                                                         |
+-----------------------------------------------------+-------+
19 rows in set (0.00 sec)
```

> We do not have to `ORDER BY` a field that it is involved in our SELECTED fields.

```sql
SELECT book_id, author_lname
FROM books ORDER BY released_year;
```

```
+---------+----------------+
| book_id | author_lname   |
+---------+----------------+
|      14 | Steinbeck      |
|      11 | Carver         |
|      13 | DeLillo        |
|      ...                 |
+---------+----------------+
19 rows in set (0.00 sec)
```

### ORDER BY numbered column

```sql
-- order by the 4th column (i.e. pages)
SELECT book_id, author_fname, author_lname, pages
FROM books ORDER BY 4;
```

```
+---------+--------------+----------------+-------+
| book_id | author_fname | author_lname   | pages |
+---------+--------------+----------------+-------+
|      11 | Raymond      | Carver         |   176 |
|      14 | John         | Steinbeck      |   181 |
|       4 | Jhumpa       | Lahiri         |   198 |
|      ...                                        |
+---------+--------------+----------------+-------+
19 rows in set (0.00 sec)
```

### ORDER BY multiple columns

```sql
-- order author_lname (ascending) then by released_year (descending)
SELECT author_lname, released_year, title
FROM books ORDER BY author_lname, released_year DESC;
```

```
+----------------+---------------+-----------------------------------------------------+
| author_lname   | released_year | title                                               |
+----------------+---------------+-----------------------------------------------------+
| Carver         |          1989 | Where I'm Calling From: Selected Stories            |
| Carver         |          1981 | What We Talk About When We Talk About Love: Stories |
| Chabon         |          2000 | The Amazing Adventures of Kavalier & Clay           |
| ...                                                                                  |
+----------------+---------------+-----------------------------------------------------+
19 rows in set (0.00 sec)
```

### ORDER BY external information

```sql
-- alias author as author_fname concatenated with author_lname
-- sort by the author field (is not directly a column in our table)
SELECT CONCAT(author_fname, ' ', author_lname) AS author
FROM books ORDER BY author;
```

```
+----------------------+
| author               |
+----------------------+
| Dan Harris           |
| Dave Eggers          |
| Dave Eggers          |
| ...                  |
+----------------------+
19 rows in set (0.00 sec)
```

## LIMIT

`LIMIT` allows us to control the number of results we return.

```sql
SELECT book_id, title, released_year FROM books LIMIT 4;
-- SELECT book_id, title, released_year FROM books LIMIT 0, 4;
```

```
+---------+-------------------------+---------------+
| book_id | title                   | released_year |
+---------+-------------------------+---------------+
|       1 | The Namesake            |          2003 |
|       2 | Norse Mythology         |          2016 |
|       3 | American Gods           |          2001 |
|       4 | Interpreter of Maladies |          1996 |
+---------+-------------------------+---------------+
4 rows in set (0.00 sec)
```

We can create more complex queries by using `LIMIT` while sorting our data using `ORDER BY`.

```sql
 SELECT book_id, title, released_year FROM books ORDER BY released_year LIMIT 4;
```

```
+---------+-----------------------------------------------------+---------------+
| book_id | title                                               | released_year |
+---------+-----------------------------------------------------+---------------+
|      14 | Cannery Row                                         |          1945 |
|      11 | What We Talk About When We Talk About Love: Stories |          1981 |
|      13 | White Noise                                         |          1985 |
|      12 | Where I'm Calling From: Selected Stories            |          1989 |
+---------+-----------------------------------------------------+---------------+
4 rows in set (0.00 sec)
```

We can offset our `LIMIT` to not start from the first row.

**NOTE** In this case, **0** represents starting from the first row.

```sql
-- start at row 1, and limit the results to 5 (second row onwards)
SELECT book_id, title, released_year FROM books ORDER BY released_year LIMIT 1, 4;
```

```
+---------+-----------------------------------------------------+---------------+
| book_id | title                                               | released_year |
+---------+-----------------------------------------------------+---------------+
|      11 | What We Talk About When We Talk About Love: Stories |          1981 |
|      13 | White Noise                                         |          1985 |
|      12 | Where I'm Calling From: Selected Stories            |          1989 |
|       4 | Interpreter of Maladies                             |          1996 |
+---------+-----------------------------------------------------+---------------+
4 rows in set (0.00 sec)
```

**Note** If the numbers passed to `LIMIT` are out of bounds it will return all the results.

```sql
SELECT CONCAT(SUBSTR(title, 1, 10), '...') AS truncated_title
FROM books ORDER BY title LIMIT 9001;
```

```
+-----------------+
| truncated_title |
+-----------------+
| 10% Happie...   |
| A Heartbre...   |
| A Hologram...   |
| ...             |
+-----------------+
19 rows in set (0.00 sec)
```

## LIKE

The `LIKE` operator allows us to perform more dynamic searches with our data, as apposed to the `WHERE` clauses which matches exacty values;

The `LIKE` operator utilizes **wildcards** to search our data with patterns.

```sql
-- %da% search for da anywhere in the author_fname
SELECT title, author_fname, author_lname
FROM books WHERE author_fname LIKE '%da%';
```

```
+-------------------------------------------+--------------+----------------+
| title                                     | author_fname | author_lname   |
+-------------------------------------------+--------------+----------------+
| A Hologram for the King: A Novel          | Dave         | Eggers         |
| The Circle                                | Dave         | Eggers         |
| Oblivion: Stories                         | David        | Foster Wallace |
| ...                                                                       |
+-------------------------------------------+--------------+----------------+
7 rows in set (0.00 sec)
```

```sql
-- %:% searches for a `:` anywhere in the title
SELECT * FROM books WHERE title LIKE '%:%';
```

```
+---------+-----------------------------------------------------+--------------+----------------+---------------+----------------+-------+
| book_id | title                                               | author_fname | author_lname   | released_year | stock_quantity | pages |
+---------+-----------------------------------------------------+--------------+----------------+---------------+----------------+-------+
|       5 | A Hologram for the King: A Novel                    | Dave         | Eggers         |          2012 |            154 |   352 |
|      11 | What We Talk About When We Talk About Love: Stories | Raymond      | Carver         |          1981 |             23 |   176 |
|      12 | Where I'm Calling From: Selected Stories            | Raymond      | Carver         |          1989 |             12 |   526 |
|      ...                                                                                                                               |
+---------+-----------------------------------------------------+--------------+----------------+---------------+----------------+-------+
4 rows in set (0.00 sec)
```

```sql
-- find all author_fname that have exactly four characters.
SELECT * FROM books WHERE author_fname LIKE '____';
```

```
+---------+-------------------------------------------+--------------+--------------+---------------+----------------+-------+
| book_id | title                                     | author_fname | author_lname | released_year | stock_quantity | pages |
+---------+-------------------------------------------+--------------+--------------+---------------+----------------+-------+
|       2 | Norse Mythology                           | Neil         | Gaiman       |          2016 |             43 |   304 |
|       3 | American Gods                             | Neil         | Gaiman       |          2001 |             12 |   465 |
|       5 | A Hologram for the King: A Novel          | Dave         | Eggers       |          2012 |            154 |   352 |
|       6 | The Circle                                | Dave         | Eggers       |          2013 |             26 |   504 |
|       9 | A Heartbreaking Work of Staggering Genius | Dave         | Eggers       |          2001 |            104 |   437 |
|      10 | Coraline                                  | Neil         | Gaiman       |          2003 |            100 |   208 |
|      14 | Cannery Row                               | John         | Steinbeck    |          1945 |             95 |   181 |
+---------+-------------------------------------------+--------------+--------------+---------------+----------------+-------+
7 rows in set (0.00 sec)
```

```sql
-- match any author_fname whose second character is `a`
 SELECT * FROM books WHERE author_fname LIKE '_a%';
```

```
+---------+-----------------------------------------------------+--------------+----------------+---------------+----------------+-------+
| book_id | title                                               | author_fname | author_lname   | released_year | stock_quantity | pages |
+---------+-----------------------------------------------------+--------------+----------------+---------------+----------------+-------+
|       5 | A Hologram for the King: A Novel                    | Dave         | Eggers         |          2012 |            154 |   352 |
|       6 | The Circle                                          | Dave         | Eggers         |          2013 |             26 |   504 |
|       8 | Just Kids                                           | Patti        | Smith          |          2010 |             55 |   304 |
|      ...                                                                                                                               |
+---------+-----------------------------------------------------+--------------+----------------+---------------+----------------+-------+
9 rows in set (0.00 sec)
```

```sql
-- match  any author_fname whose last character is `n`;
SELECT * FROM books WHERE author_fname LIKE '%n';
```

```
+---------+-------------+--------------+--------------+---------------+----------------+-------+
| book_id | title       | author_fname | author_lname | released_year | stock_quantity | pages |
+---------+-------------+--------------+--------------+---------------+----------------+-------+
|      13 | White Noise | Don          | DeLillo      |          1985 |             49 |   320 |
|      14 | Cannery Row | John         | Steinbeck    |          1945 |             95 |   181 |
|      17 | 10% Happier | Dan          | Harris       |          2014 |             29 |   256 |
+---------+-------------+--------------+--------------+---------------+----------------+-------+
3 rows in set (0.00 sec)
```

### Summary

- `%` - matches any character
  - `%a` any character before 'a'
  - `a%` any character after 'a'
  - `%a%` - any character before and after 'a'
- `_` - matches a character for each **underscore**
  - `__` - matches two characters
  - `a` - matches the character 'a' exactly.
  - `_a` - matches two characters, where 'a' is the second character

### Escaping Wildcards

In order to match values that have the character `%` or `_` in it we have to use escapes to differentiate it from the wildcard when using `LIKE`.

```sql
-- match any title that has a `%` character in it
SELECT * FROM books WHERE title LIKE '%\%%';
```

```
+---------+-------------+--------------+--------------+---------------+----------------+-------+
| book_id | title       | author_fname | author_lname | released_year | stock_quantity | pages |
+---------+-------------+--------------+--------------+---------------+----------------+-------+
|      17 | 10% Happier | Dan          | Harris       |          2014 |             29 |   256 |
+---------+-------------+--------------+--------------+---------------+----------------+-------+
1 row in set (0.00 sec)
```

```sql
-- match any title that has a `_` character in it
SELECT * FROM books WHERE title LIKE '%\_%';
```

```
+---------+-----------+--------------+--------------+---------------+----------------+-------+
| book_id | title     | author_fname | author_lname | released_year | stock_quantity | pages |
+---------+-----------+--------------+--------------+---------------+----------------+-------+
|      18 | fake_book | Freida       | Harris       |          2001 |            287 |   428 |
+---------+-----------+--------------+--------------+---------------+----------------+-------+
1 row in set (0.00 sec)
```
