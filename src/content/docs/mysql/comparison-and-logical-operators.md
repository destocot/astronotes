---
title: "Comparison & Logical Operators"
sidebar:
  order: 10
---

## Not Equal

```sql
-- select ... where author_lname NOT equal 'Gaiman'
SELECT title, author_lname FROM books
WHERE author_lname != 'Gaiman';
```

```
+-----------------------------------------------------+----------------+
| title                                               | author_lname   |
+-----------------------------------------------------+----------------+
| The Namesake                                        | Lahiri         |
| Interpreter of Maladies                             | Lahiri         |
| A Hologram for the King: A Novel                    | Eggers         |
| ...                                                                  |
+-----------------------------------------------------+----------------+
16 rows in set (0.00 sec)
```

## NOT LIKE

```sql
-- select ... where author_fname DOES NOT start with da
SELECT title, author_fname , author_lname
FROM books
WHERE author_fname NOT LIKE 'da%';
```

```
+-----------------------------------------------------+--------------+--------------+
| title                                               | author_fname | author_lname |
+-----------------------------------------------------+--------------+--------------+
| The Namesake                                        | Jhumpa       | Lahiri       |
| Norse Mythology                                     | Neil         | Gaiman       |
| American Gods                                       | Neil         | Gaiman       |
| ...                                                                               |
+-----------------------------------------------------+--------------+--------------+
13 rows in set (0.00 sec)
```

## Greater Than

```sql
SELECT title, released_year
FROM books
WHERE released_year > 2000;
```

```
+-------------------------------------------+---------------+
| title                                     | released_year |
+-------------------------------------------+---------------+
| The Namesake                              |          2003 |
| Norse Mythology                           |          2016 |
| American Gods                             |          2001 |
| ...                                                       |
+-------------------------------------------+---------------+
13 rows in set (0.00 sec)
```

```sql
-- 0
SELECT 25 > 100;

-- 1
SELECT 200 > 100;

-- NULL
SELECT 1 > NULL;
```

**Note** MySQL will return all results that evaluate to TRUE (`1`)

### Or Equal To

```sql
SELECT title, released_year FROM books WHERE released_year >= 2010;
```

```
+----------------------------------+---------------+
| title                            | released_year |
+----------------------------------+---------------+
| Norse Mythology                  |          2016 |
| A Hologram for the King: A Novel |          2012 |
| Just Kids                        |          2010 |
| ...                                              |
+----------------------------------+---------------+
6 rows in set (0.00 sec)
```

## Less Than

```sql
SELECT title, released_year
FROM books
WHERE released_year < 2001;
```

```
+-----------------------------------------------------+---------------+
| title                                               | released_year |
+-----------------------------------------------------+---------------+
| Interpreter of Maladies                             |          1996 |
| The Amazing Adventures of Kavalier & Clay           |          2000 |
| What We Talk About When We Talk About Love: Stories |          1981 |
| ...                                                                 |
+-----------------------------------------------------+---------------+
6 rows in set (0.00 sec)
```

### Or Equal To

```sql
SELECT title, released_year
FROM books
WHERE released_year <= 1985;
```

```
+-----------------------------------------------------+---------------+
| title                                               | released_year |
+-----------------------------------------------------+---------------+
| What We Talk About When We Talk About Love: Stories |          1981 |
| White Noise                                         |          1985 |
| Cannery Row                                         |          1945 |
+-----------------------------------------------------+---------------+
3 rows in set (0.00 sec)
```

## Logical AND

```sql
SELECT book_id, title, author_lname
FROM books
WHERE author_lname = 'Eggers' AND released_year > 2010;
```

```
---------+----------------------------------+--------------+
| book_id | title                            | author_lname |
+---------+----------------------------------+--------------+
|       5 | A Hologram for the King: A Novel | Eggers       |
|       6 | The Circle                       | Eggers       |
+---------+----------------------------------+--------------+
2 rows in set (0.00 sec)
```

**Note** We can chain as many filters as we would like.

```sql
SELECT book_id, title, author_lname
FROM books
WHERE
  author_lname = 'Eggers'
  AND released_year > 2010
  AND title LIKE '%novel%';
```

```
+---------+----------------------------------+--------------+
| book_id | title                            | author_lname |
+---------+----------------------------------+--------------+
|       5 | A Hologram for the King: A Novel | Eggers       |
+---------+----------------------------------+--------------+
1 row in set (0.00 sec)
```

**example** Find all books whose title is at least 15 characters long AND has greater than 500 pages

```sql
SELECT book_id, title, pages
FROM books
WHERE CHAR_LENGTH(title) > 30 AND pages > 500;
```

```
+---------+-------------------------------------------+-------+
| book_id | title                                     | pages |
+---------+-------------------------------------------+-------+
|       7 | The Amazing Adventures of Kavalier & Clay |   634 |
|      12 | Where I'm Calling From: Selected Stories  |   526 |
+---------+-------------------------------------------+-------+
2 rows in set (0.00 sec)
```

## Logical OR

```sql
SELECT title, author_lname
FROM books
WHERE author_lname = 'Eggers' OR released_year > 2010;
```

```
+-------------------------------------------+--------------+---------------+
| title                                     | author_lname | released_year |
+-------------------------------------------+--------------+---------------+
| Norse Mythology                           | Gaiman       |          2016 |
| A Hologram for the King: A Novel          | Eggers       |          2012 |
| The Circle                                | Eggers       |          2013 |
| ...                                                                      |
+-------------------------------------------+--------------+---------------+
6 rows in set (0.00 sec)

```

**example** Find all books that are short (less than or equal to 200 pages) or is it a collection of stories (keyword).

```sql
SELECT title, pages
FROM books
WHERE pages <= 200 OR title LIKE '%stories%';
```

```
+-----------------------------------------------------+-------+
| title                                               | pages |
+-----------------------------------------------------+-------+
| Interpreter of Maladies                             |   198 |
| What We Talk About When We Talk About Love: Stories |   176 |
| Where I'm Calling From: Selected Stories            |   526 |
| ...                                                         |
+-----------------------------------------------------+-------+
5 rows in set (0.00 sec)
```

## BETWEEN

**example** Select all books published between 2004 and 2015

```sql
 SELECT book_id, title, released_year
 FROM books
 WHERE released_year >= 2004 AND released_year <= 2015;
```

```
+---------+----------------------------------+---------------+
| book_id | title                            | released_year |
+---------+----------------------------------+---------------+
|       5 | A Hologram for the King: A Novel |          2012 |
|       6 | The Circle                       |          2013 |
|       8 | Just Kids                        |          2010 |
|      ...                                                   |
+---------+----------------------------------+---------------+
6 rows in set (0.01 sec)
```

> We can perform the same query using the `BETWEEN` operator

```sql
SELECT book_id, title, released_year
FROM books
WHERE released_year BETWEEN 2004 AND 2015;
```

```
+---------+----------------------------------+---------------+
| book_id | title                            | released_year |
+---------+----------------------------------+---------------+
|       5 | A Hologram for the King: A Novel |          2012 |
|       6 | The Circle                       |          2013 |
|       8 | Just Kids                        |          2010 |
|      ...                                                   |
+---------+----------------------------------+---------------+
6 rows in set (0.00 sec)
```

**Note** The `BETWEEN` operator is **inclusive**: begin and end values are included.

### NOT BETWEEN

```sql
SELECT book_id, title, pages
FROM books
WHERE pages NOT BETWEEN 200 AND 600;
```

```
+---------+-----------------------------------------------------+-------+
| book_id | title                                               | pages |
+---------+-----------------------------------------------------+-------+
|       4 | Interpreter of Maladies                             |   198 |
|       7 | The Amazing Adventures of Kavalier & Clay           |   634 |
|      11 | What We Talk About When We Talk About Love: Stories |   176 |
|      14 | Cannery Row                                         |   181 |
+---------+-----------------------------------------------------+-------+
4 rows in set (0.00 sec)
```

## Comparing Dates

Most of the time `MySQL` will be able to properly compare an actual date to a string that represetns a date.

```sql
SELECT * FROM profiles WHERE birthdate < '2005-01-01';
```

```
+-------+------------+-----------+---------------------+
| name  | birthdate  | birthtime | birthdt             |
+-------+------------+-----------+---------------------+
| Elton | 2000-12-25 | 11:00:00  | 2000-12-25 11:00:00 |
| Lulu  | 1985-04-11 | 09:45:10  | 1985-04-11 09:45:10 |
+-------+------------+-----------+---------------------+
2 rows in set (0.00 sec)
```

However, using date functions we can make our query more explicit and safe.

**example**

```sql
SELECT * FROM profiles WHERE YEAR(birthdate) < 2005;
```

```
+-------+------------+-----------+---------------------+
| name  | birthdate  | birthtime | birthdt             |
+-------+------------+-----------+---------------------+
| Elton | 2000-12-25 | 11:00:00  | 2000-12-25 11:00:00 |
| Lulu  | 1985-04-11 | 09:45:10  | 1985-04-11 09:45:10 |
+-------+------------+-----------+---------------------+
2 rows in set (0.00 sec)
```

**example**

```sql
SELECT * FROM profiles WHERE HOUR(birthtime) > 12;
```

```
+-------+------------+-----------+---------------------+
| name  | birthdate  | birthtime | birthdt             |
+-------+------------+-----------+---------------------+
| Juan  | 2020-08-15 | 23:59:00  | 2020-08-15 23:59:00 |
| Hazel | 2024-05-21 | 18:30:25  | 2024-05-21 18:30:25 |
+-------+------------+-----------+---------------------+
2 rows in set (0.00 sec)
```

### CAST

`CAST(value AS datatype)` function converts a value (of any type) into the specified datatype.

```sql
-- cast a string to time
SELECT CAST('9:00:00' AS TIME);
```

```
+--------------------------+
| CAST('9:00:00' AS TIME) |
+--------------------------+
| 09:00:00                 |
+--------------------------+
1 row in set (0.01 sec)
```

**Note** Casting values is recommended when using the `BETWEEN` operator.

```sql
SELECT *
FROM profiles
WHERE birthtime
  BETWEEN CAST('14:00:00' AS TIME) AND CAST('20:00:00' AS TIME);
-- SELECT * FROM profiles WHERE HOUR(birthtime) BETWEEN 14 AND 20;
```

```
+-------+------------+-----------+---------------------+
| name  | birthdate  | birthtime | birthdt             |
+-------+------------+-----------+---------------------+
| Hazel | 2024-05-21 | 18:30:25  | 2024-05-21 18:30:25 |
+-------+------------+-----------+---------------------+
1 row in set (0.00 sec)
```

## The IN Operator

```sql
SELECT title, author_lname
FROM books
WHERE
  author_lname = 'Carver'
  OR author_lname = 'Lahiri'
  OR author_lname = 'Smith';
```

```
+-----------------------------------------------------+--------------+
| title                                               | author_lname |
+-----------------------------------------------------+--------------+
| The Namesake                                        | Lahiri       |
| Interpreter of Maladies                             | Lahiri       |
| Just Kids                                           | Smith        |
| ...                                                                |
+-----------------------------------------------------+--------------+
5 rows in set (0.00 sec)
```

> We can perform the same query using the `IN` operator

```sql
SELECT title, author_lname
FROM books
WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');
```

```
+-----------------------------------------------------+--------------+
| title                                               | author_lname |
+-----------------------------------------------------+--------------+
| The Namesake                                        | Lahiri       |
| Interpreter of Maladies                             | Lahiri       |
| Just Kids                                           | Smith        |
| ...                                                                |
+-----------------------------------------------------+--------------+
5 rows in set (0.00 sec)
```

### NOT IN

```sql
SELECT title, author_lname
FROM books
WHERE author_lname NOT IN ('Carver', 'Lahiri', 'Smith');
```

```
+-------------------------------------------+----------------+
| title                                     | author_lname   |
+-------------------------------------------+----------------+
| Norse Mythology                           | Gaiman         |
| American Gods                             | Gaiman         |
| A Hologram for the King: A Novel          | Eggers         |
| ...                                                        |
+-------------------------------------------+----------------+
14 rows in set (0.00 sec)
```

### Modulo Operator

The `MOD()` function returns the remainder of a number divided by another number.

**example** Select all books not published in an even year (i.e. 2000, 2002, etc.) and after the year 2000.

```sql
SELECT title, released_year
FROM books
WHERE
  released_year >= 2000
  AND released_year % 2 != 0
```

```
+-------------------------------------------+---------------+
| title                                     | released_year |
+-------------------------------------------+---------------+
| The Namesake                              |          2003 |
| American Gods                             |          2001 |
| The Circle                                |          2013 |
| ...                                                       |
+-------------------------------------------+---------------+
8 rows in set (0.01 sec)
```

**Note** We can also use the `MOD(x, y)` syntax instead of the `%` symbol.

## CASE

The `CASE` statment goes through conditions and returns a value when the first condition is met (**like an if-then-else statement**).

- If no conditions are true, it returns the value in the ELSE clause.
- If there is no ELSE part and no conditions are true, it returns NULL.

```sql
SELECT
  title,
  released_year,
  CASE
    WHEN released_year >= 2000 THEN 'Modern Lit'
    ELSE '20th Century Lit'
  END AS genre
FROM books;
```

```
+-----------------------------------------------------+---------------+------------------+
| title                                               | released_year | genre            |
+-----------------------------------------------------+---------------+------------------+
| American Gods                                       |          2001 | Modern Lit       |
| Interpreter of Maladies                             |          1996 | 20th Century Lit |
| A Hologram for the King: A Novel                    |          2012 | Modern Lit       |
| ...                                                                                    |
+-----------------------------------------------------+---------------+------------------+
19 rows in set (0.01 sec)
```

> In our books table, we do not have a column called `genre` we use an alias and the `CASE` statement to create a new column based on the condition of if the `released_year` column was greater than 2000.

**example** Display `*` to represent the stock quantity of each book.

```sql
SELECT
  title,
  stock_quantity,
  CASE
    WHEN stock_quantity BETWEEN 0 and 30 THEN '*'
    WHEN stock_quantity BETWEEN 31 and 60 THEN '**'
    WHEN stock_quantity BETWEEN 61 and 90 THEN '***'
    WHEN stock_quantity BETWEEN 91 and 120 THEN '****'
    ELSE '*****'
  END AS stock
FROM books;
```

```
+-----------------------------------------------------+----------------+-------+
| title                                               | stock_quantity | stock |
+-----------------------------------------------------+----------------+-------+
| Norse Mythology                                     |             43 | **    |
| American Gods                                       |             12 | *     |
| Interpreter of Maladies                             |             97 | ****  |
| ...                                                                          |
+-----------------------------------------------------+----------------+-------+
19 rows in set (0.00 sec)
```

**Note** We can take advantage of the fact that the `CASE` statment will stop reading once a condition is met to write a cleaner query.

```sql
SELECT
  title,
  stock_quantity,
  CASE
    WHEN stock_quantity <= 30 THEN '*'
    WHEN stock_quantity <= 60 THEN '**'
    WHEN stock_quantity <= 90 THEN '***'
    WHEN stock_quantity <= 120 THEN '****'
    ELSE '*****'
  END AS stock
FROM books;
```

```
+-----------------------------------------------------+----------------+-------+
| title                                               | stock_quantity | stock |
+-----------------------------------------------------+----------------+-------+
| Norse Mythology                                     |             43 | **    |
| American Gods                                       |             12 | *     |
| Interpreter of Maladies                             |             97 | ****  |
| ...                                                                          |
+-----------------------------------------------------+----------------+-------+
19 rows in set (0.00 sec)
```

## IS NULL

```sql
SELECT * FROM books WHERE author_lname = NULL;
```

```
Empty set (0.00 sec)
```

> We cannot use the `WHERE` clause to match `NULL` values.

The `IS NULL` operator can be used to determine where our values are `NULL`.

```sql
SELECT book_id, title, author_lname, pages
FROM books
WHERE author_lname IS NULL;
```

```
+---------+------------------+--------------+-------+
| book_id | title            | author_lname | pages |
+---------+------------------+--------------+-------+
|      20 | my life in words | NULL         |   634 |
+---------+------------------+--------------+-------+
1 row in set (0.00 sec)
```

### IS NOT NULL

Similar, we can use the `IS NOT NULL` operator to match rows to match values that are not null.

```sql
SELECT book_id, title, author_lname, pages
FROM books
WHERE author_lname IS NOT NULL;
```

```
+---------+-----------------------------------------------------+----------------+-------+
| book_id | title                                               | author_lname   | pages |
+---------+-----------------------------------------------------+----------------+-------+
|       1 | The Namesake                                        | Lahiri         |   291 |
|       2 | Norse Mythology                                     | Gaiman         |   304 |
|       3 | American Gods                                       | Gaiman         |   465 |
|       ...                                                                              |
+---------+-----------------------------------------------------+----------------+-------+
19 rows in set (0.00 sec)
```

## Worked Examples

1. Select all books where `author_lname` starts with a `'C'` or an `'S'`.

```sql
SELECT book_id, title, author_fname, author_lname
FROM books
WHERE
  SUBSTR(author_lname, 1, 1) IN ('C', 'S');

-- SELECT * FROM books
-- WHERE
--   author_lname LIKE 'C%'
--   OR author_lname LIKE 'S%';
```

```
+---------+-----------------------------------------------------+--------------+--------------+
| book_id | title                                               | author_fname | author_lname |
+---------+-----------------------------------------------------+--------------+--------------+
|       7 | The Amazing Adventures of Kavalier & Clay           | Michael      | Chabon       |
|       8 | Just Kids                                           | Patti        | Smith        |
|      11 | What We Talk About When We Talk About Love: Stories | Raymond      | Carver       |
|      ...                                                                                    |
+---------+-----------------------------------------------------+--------------+--------------+
6 rows in set (0.01 sec)
```

2. Select `author_fname`, `author_lname`, and a count of books each author wrote as `COUNT` in the format `# book(s)`.

```sql
SELECT
  author_fname,
  author_lname,
  CASE
    WHEN COUNT(*) = 1 THEN CONCAT(COUNT(*), ' ', 'book')
    ELSE CONCAT(COUNT(*), ' ', 'books')
  END AS COUNT
FROM books
GROUP BY author_fname, author_lname;
```

```
+--------------+----------------+---------+
| author_fname | author_lname   | COUNT   |
+--------------+----------------+---------+
| Jhumpa       | Lahiri         | 2 books |
| Neil         | Gaiman         | 3 books |
| Dave         | Eggers         | 3 books |
| Michael      | Chabon         | 1 book  |
| ...                                     |
+--------------+----------------+---------+
12 rows in set (0.00 sec)
```
