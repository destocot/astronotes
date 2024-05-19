---
title: "Aggregate Functions"
slug: "aggregate-functions"
sidebar:
  order: 8
---

## COUNT

```sql
SELECT COUNT(*) FROM books;
```

```
+----------+
| count(*) |
+----------+
|       19 |
+----------+
1 row in set (0.00 sec)
```

```sql
-- count all values author_fname present
SELECT COUNT(author_fname) FROM books;
```

```
+---------------------+
| count(author_fname) |
+---------------------+
|                  19 |
+---------------------+
1 row in set (0.00 sec)
```

```sql
-- count all unique values for author_fname are present
SELECT COUNT(DISTINCT author_fname) FROM books;
```

```
+------------------------------+
| count(distinct author_fname) |
+------------------------------+
|                           12 |
+------------------------------+
1 row in set (0.00 sec)
```

```sql
-- count all rows who have a title value with `the` within them
SELECT COUNT(*) FROM books WHERE title LIKE '%the%';
```

```
+----------+
| COUNT(*) |
+----------+
|        6 |
+----------+
1 row in set (0.00 sec)
```

## GROUP BY

`GROUP BY` summarizes or aggregates identical data into single rows.

```sql
-- group rows in books table by the author_lname
SELECT author_lname FROM books GROUP BY author_lname;
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

> Behind the scenes, MySQL groups each row with the author_lname

```sql
-- group rows by the author_lname
-- select author_lname, count of each group (grouped by author_lname)
-- alias count of each group as books_written
-- order by books_written in descending order
SELECT author_lname, COUNT(*) AS books_written
FROM books GROUP BY author_lname
ORDER BY books_written DESC;
```

```
+----------------+---------------+
| author_lname   | books_written |
+----------------+---------------+
| Gaiman         |             3 |
| Eggers         |             3 |
| Lahiri         |             2 |
| ...                            |
+----------------+---------------+
11 rows in set (0.00 sec)
```

## MIN & MAX

```sql
SELECT MIN(released_year) FROM books;
```

```
+--------------------+
| MIN(released_year) |
+--------------------+
|               1945 |
+--------------------+
1 row in set (0.00 sec)
```

```sql
SELECT MAX(pages) FROM books;
```

```
+------------+
| MAX(pages) |
+------------+
|        634 |
+------------+
1 row in set (0.00 sec)

```

```sql
SELECT MIN(author_lname), MAX(author_lname) FROM books;
```

```
+-------------------+-------------------+
| MIN(author_lname) | MAX(author_lname) |
+-------------------+-------------------+
| Carver            | Steinbeck         |
+-------------------+-------------------+
1 row in set (0.00 sec)
```

## Subqueries

We can run queries inside out query. These are called subqueries and will allow us to utilize the result that they return in our outermost query.

**Note** Subqueries should be wrapped with parentheses `( <query> )`.

**example** Find the title of the book with the most pages

```sql
SELECT title, pages FROM books
WHERE pages = (SELECT MAX(pages) FROM books);
```

```
+-------------------------------------------+-------+
| title                                     | pages |
+-------------------------------------------+-------+
| The Amazing Adventures of Kavalier & Clay |   634 |
+-------------------------------------------+-------+
1 row in set (0.00 sec)
```

**Note** The query above is identical to

```sql
SELECT title, pages FROM books ORDER BY pages DESC LIMIT 1;
```

only if there is one book who has `634` pages.

If there are more books with a page count of `634` then the query above will return **every** row with a page count of `634`;

In this case, the query above would be identical to

```sql
SELECT title, pages FROM books WHERE pages = 634;
```

## GROUP BY (Multiple Columns)

```sql
-- group rows by the author_lname, author_fname
-- select author_lname, author_fname, count of each group (grouped by author_lname, author_fname)
SELECT author_fname, author_lname, COUNT(*)
FROM books
GROUP BY author_lname, author_fname;
```

```
+--------------+----------------+----------+
| author_fname | author_lname   | COUNT(*) |
+--------------+----------------+----------+
| Jhumpa       | Lahiri         |        2 |
| Neil         | Gaiman         |        3 |
| Dan          | Harris         |        1 |
| Freida       | Harris         |        1 |
| ...                                      |
+--------------+----------------+----------+
12 rows in set (0.00 sec)
```

**Note** We can create a new value (i.e. using a string function) that can be used in an aggregation.

```sql
-- concatenate author_fname, author_lname with a space in between
-- alias the concatenation as author
-- group rows by author (aliased)
-- select author, count of each group (grouped by author)
SELECT CONCAT(author_fname, ' ', author_lname) AS author, COUNT(*)  FROM books
GROUP BY author;
```

```
+----------------------+----------+
| author               | COUNT(*) |
+----------------------+----------+
| Jhumpa Lahiri        |        2 |
| Neil Gaiman          |        3 |
| Dan Harris           |        1 |
| Freida Harris        |        1 |
| ...                             |
+----------------------+----------+
12 rows in set (0.00 sec)
```

## MIN & MAX (GROUP BY)

```sql
-- group rows by the author_fname, author_lname
-- select author_lname, author_fname, minimum release year of each group (grouped by author_lname, author_fname)
SELECT author_fname, author_lname, MIN(released_year)
FROM books
GROUP BY author_lname, author_fname;
```

```
+--------------+----------------+--------------------+
| author_fname | author_lname   | MIN(released_year) |
+--------------+----------------+--------------------+
| Jhumpa       | Lahiri         |               1996 |
| Neil         | Gaiman         |               2001 |
| Dave         | Eggers         |               2001 |
| ...                                                |
+--------------+----------------+--------------------+
12 rows in set (0.00 sec)

```

```sql
SELECT
  author_lname,
  author_fname,
  COUNT(*) AS books_written,
  MIN(released_year) AS earliest_year,
  MAX(released_year) AS latest_year
FROM books
GROUP BY author_lname, author_fname;
```

```
+----------------+--------------+---------------+---------------+-------------+
| author_lname   | author_fname | books_written | earliest_year | latest_year |
+----------------+--------------+---------------+---------------+-------------+
| Lahiri         | Jhumpa       |             2 |          1996 |        2003 |
| Gaiman         | Neil         |             3 |          2001 |        2016 |
| Eggers         | Dave         |             3 |          2001 |        2013 |
| ...                                                                         |
+----------------+--------------+---------------+---------------+-------------+
12 rows in set (0.00 sec)
```

## SUM

```sql
SELECT SUM(pages) FROM books;
```

```
+------------+
| SUM(pages) |
+------------+
|       6623 |
+------------+
1 row in set (0.00 sec)
```

```sql
SELECT author_lname, author_fname, SUM(pages)
FROM books
GROUP BY author_lname, author_fname;
```

```
+----------------+--------------+------------+
| author_lname   | author_fname | SUM(pages) |
+----------------+--------------+------------+
| Lahiri         | Jhumpa       |        489 |
| Gaiman         | Neil         |        977 |
| Eggers         | Dave         |       1293 |
| ...                                        |
+----------------+--------------+------------+
12 rows in set (0.00 sec)
```

## AVG

```sql
SELECT AVG(released_year) FROM books;
```

```
+--------------------+
| AVG(released_year) |
+--------------------+
|          1999.7895 |
+--------------------+
1 row in set (0.00 sec)
```

```sql
SELECT released_year, AVG(stock_quantity), COUNT(*)
FROM books
GROUP BY released_year;
```

```
+---------------+---------------------+----------+
| released_year | AVG(stock_quantity) | COUNT(*) |
+---------------+---------------------+----------+
|          2003 |             66.0000 |        2 |
|          2016 |             43.0000 |        1 |
|          2001 |            134.3333 |        3 |
|          ...                                   |
+---------------+---------------------+----------+
16 rows in set (0.00 sec)
```

**Reference** [Aggregate Function Descriptions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)

### Summary Exercise

Obtain the count of books and the average page count per book, grouped by release year. The results should be ordered in ascending order by release year.

```sql
SELECT
  released_year AS year,
  COUNT(*) AS "#_books",
  AVG(pages) AS "avg_pages"
FROM books
GROUP BY year
ORDER BY year;
```

```
+------+---------+-----------+
| year | #_books | avg_pages |
+------+---------+-----------+
| ...                        |
| 1996 |       1 |  198.0000 |
| 2000 |       1 |  634.0000 |
| 2001 |       3 |  443.3333 |
| 2003 |       2 |  249.5000 |
| 2004 |       1 |  329.0000 |
| 2013 |       1 |  504.0000 |
| ...                        |
+------+---------+-----------+
16 rows in set (0.00 sec)
```
