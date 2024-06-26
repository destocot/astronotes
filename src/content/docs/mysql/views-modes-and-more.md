---
title: "Views, Modes, & More"
sidebar:
  order: 14
---

## Introducing Views

Views are stored queries that when invoked produce a result set. A view acts a virtual table.

**Example** We may commonly want to always query the reviews table only when joined with the series and/or reviewers tables.

```sql
SELECT title, released_year, genre, rating, first_name, last_name
FROM reviews
JOIN series ON series.id = reviews.series_id
JOIN reviewers ON reviewers.id = reviews.reviewer_id;
```

> We can store this query as a view which will allow us to treat the query itself as a real table.

```sql
CREATE VIEW full_reviews AS
SELECT title, released_year, genre, rating, first_name, last_name
FROM reviews
JOIN series ON series.id = reviews.series_id
JOIN reviewers ON reviewers.id = reviews.reviewer_id;

SHOW TABLES;
```

```
+-----------------+
| Tables_in_tv_db |
+-----------------+
| full_reviews    |
| reviewers       |
| reviews         |
| series          |
+-----------------+
4 rows in set (0.00 sec)
```

> We can now perform queries* on the `full_reviews` table as needed (e.g. `SELECT * FROM full_reviews`)

```sql
 SELECT genre, AVG(rating) as avg_rating
 FROM full_reviews
 GROUP BY genre;
```

```
+-----------+------------+
| genre     | avg_rating |
+-----------+------------+
| Animation |    7.86000 |
| Comedy    |    8.16250 |
| Drama     |    8.04375 |
+-----------+------------+
3 rows in set (0.00 sec)
```

## Updatable Views

**Note** Views may act like a table but they are not true tables behidn the scenes, so we cannot not perform **all** table operations with a given view.

```sql
DELETE FROM full_reviews
WHERE released_year = 2010;
```

```
ERROR 1395 (HY000): Can not delete from join view 'tv_db.full_reviews'
```

[Updatable and Insertable Views](https://dev.mysql.com/doc/refman/8.4/en/view-updatability.html#:~:text=Some%20views%20are%20updatable%20and,contents%20of%20the%20underlying%20table.)

```sql
CREATE VIEW ordered_series AS
SELECT * FROM series
ORDER BY released_year;

INSERT INTO ordered_series (title, released_year, genre)
VALUES ('The Great', 2020, 'Comedy');
-- Query OK, 1 row affected (0.00 sec)
```

**Note** The INSERT query above will insert a new row into view `ordered_series` table as well the table `series` where our view was created from.

## Replacing/Altering Views

### CREATE OR REPLACE VIEW

```sql
CREATE OR REPLACE VIEW ordered_series AS
SELECT * FROM series
ORDER BY released_year DESC:
-- Query OK, 0 rows affected (0.00 sec)
```

### ALTER VIEW

```sql
ALTER VIEW ordered_series AS
SELECT * FROM series
ORDER BY released_year;
-- Query OK, 0 rows affected (0.00 sec)
```

### DROP VIEW

```sql
DROP VIEW ordered_series;
-- Query OK, 0 rows affected (0.00 sec)
```

## HAVING clause

The `HAVING` clauses is used to aggregate functions used with the `GROUP BY` clause.

```sql
SELECT title, AVG(RATING) AS avg_rating, COUNT(rating) AS count_rating
FROM full_reviews
GROUP BY title
HAVING count_rating > 1;
```

```
+----------------------+------------+--------------+
| title                | avg_rating | count_rating |
+----------------------+------------+--------------+
| Archer               |    8.12000 |            5 |
| Arrested Development |    8.08000 |            5 |
| Bob's Burgers        |    7.52000 |            5 |
| ...                  |    ...     |          ... |
+----------------------+------------+--------------+
11 rows in set (0.00 sec)
```

## WITH ROLLUP

In MySQL, the `ROLLUP` modifier is used with the GROUP BY clause to generate subtotal and total rows for one or more columns in a result set.

It facilitates the creation of **summary rows** that represent aggregate values (such as totals or subtotals) across groups of data.

```sql
SELECT title, AVG(rating)
FROM full_reviews
GROUP BY title
WITH ROLLUP;
```

```
+----------------------+-------------+
| title                | AVG(rating) |
+----------------------+-------------+
| Archer               |     8.12000 |
| Arrested Development |     8.08000 |
| Bob's Burgers        |     7.52000 |
| Bojack Horseman      |     7.94000 |
| Breaking Bad         |     9.36000 |
| Curb Your Enthusiasm |     8.12000 |
| Fargo                |     9.40000 |
| Freaks and Geeks     |     8.60000 |
| General Hospital     |     5.38000 |
| Halt and Catch Fire  |     9.90000 |
| Seinfeld             |     7.60000 |
| Stranger Things      |     8.76667 |
| NULL                 |     8.02553 |
+----------------------+-------------+
13 rows in set (0.00 sec)
```

> Here the last row represents a summary (the average of all ratings) for our table, this is the same result produced by the query `SELECT AVG(rating) FROM full_reviews;`

**Example** With multiple `GROUP BY` clauses we will get summaries at different levels of hierarchy

```sql
SELECT released_year, genre, AVG(rating) AS avg_rating
FROM full_reviews
GROUP BY released_year, genre;
```

```
+---------------+-----------+------------+
| released_year | genre     | avg_rating |
+---------------+-----------+------------+
|          ...  | ...       |    ...     |
|          2011 | Animation |    7.52000 |
|          2014 | Animation |    7.94000 |
|          2014 | Drama     |    9.56667 |
|          2016 | Drama     |    8.76667 |
+---------------+-----------+------------+
11 rows in set (0.00 sec)
```

```sql
SELECT released_year, genre, AVG(rating) AS avg_rating
FROM full_reviews
GROUP BY released_year, genre;
```

```
+---------------+-----------+------------+
| released_year | genre     | avg_rating |
+---------------+-----------+------------+
|          ...  | ...       |    ...     |
|          2011 | Animation |    7.52000 |
|          2011 | NULL      |    7.52000 |
|          2014 | Animation |    7.94000 | (1)
|          2014 | Drama     |    9.56667 | (2)
|          2014 | NULL      |    8.55000 | (3)
|          2016 | Drama     |    8.76667 |
|          2016 | NULL      |    8.76667 |
|          NULL | NULL      |    8.02553 | (4)
+---------------+-----------+------------+
22 rows in set (0.00 sec)
```

> Here we have multiple summary rows (1) is the average rating for the genre Animation in 2014, (2) is the average rating for the genre Drama in 2014, (3) is the average rating for all genres in 2014, and (4) is the average rating for all genres for all released_years.

## SQL Modes Basics

Modes affter the SQL syntax MySQL supports and the data validation checks it performs.

```sql
-- sql mode for the global scope
SELECT @@GLOBAL.sql_mode;
```

```
+-----------------------------------------------------------------------------------------------------------------------+
| @@GLOBAL.sql_mode                                                                                                     |
+-----------------------------------------------------------------------------------------------------------------------+
| ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION |
+-----------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

```sql
-- sql mode for the session scope
SELECT @@SESSION.sql_mode;
```

```
+-----------------------------------------------------------------------------------------------------------------------+
| @@SESSION.sql_mode                                                                                                     |
+-----------------------------------------------------------------------------------------------------------------------+
| ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION |
+-----------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

> The sql mode for the GLOBAL and SESSION scope should be the same if you haven't changed anything in our current session

### SETTING Modes

```sql
SET SESSION sql_mode = 'modes';
```

**Example** Removing `ERROR_FOR_DIVISION_BY_ZERO`

```sql
SELECT 3 / 0;
SHOW WARNINGS;
```

```
+-------+
| 3 / 0 |
+-------+
|  NULL |
+-------+
1 row in set, 1 warning (0.00 sec)

+---------+------+---------------+
| Level   | Code | Message       |
+---------+------+---------------+
| Warning | 1365 | Division by 0 |
+---------+------+---------------+
1 row in set (0.00 sec)
```

```sql
-- Query OK, 0 rows affected, 1 warning (0.00 sec)
SET SESSION sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
```

```sql
SELECT 3 / 0;
SHOW WARNINGS;
```

```
+-------+
| 3 / 0 |
+-------+
|  NULL |
+-------+
1 row in set (0.00 sec)

Empty set (0.00 sec)
```

## STRICT_TRANS_TABLES

Strict Transactional Tables

Strice mode controls how MySQL handles invalid or missing values in data-change statements sucha s INSERT OR UPDATE.

```sql
--ERROR 1366 (HY000): Incorrect decimal value: 'hi' for column 'rating' at row 1
INSERT INTO reviews (rating, series_id, reviewer_id) VALUES ('hi', 1, 1);
```

```sql
-- Query OK, 0 rows affected (0.00 sec)
SET SESSION sql_mode = '';
```

```sql
INSERT INTO reviews (rating, series_id, reviewer_id) VALUES ('hi', 1, 1);
SHOW WARNINGS;
SELECT * FROM reviews WHERE series_id = 1 AND reviewer_id = 1;
```

```
Query OK, 1 row affected, 1 warning (0.00 sec)

+---------+------+------------------------------------------------------------+
| Level   | Code | Message                                                    |
+---------+------+------------------------------------------------------------+
| Warning | 1366 | Incorrect decimal value: 'hi' for column 'rating' at row 1 |
+---------+------+------------------------------------------------------------+
1 row in set (0.00 sec)

+----+--------+-----------+-------------+
| id | rating | series_id | reviewer_id |
+----+--------+-----------+-------------+
|  1 |    8.0 |         1 |           1 |
| 51 |    0.0 |         1 |           1 |
+----+--------+-----------+-------------+
2 rows in set (0.00 sec)
```

## More Modes

### ONLY_FULL_GROUP_BY

Reject queries for which the select list, `HAVING` condition, or `ORDER BY` list refer to nonaggregated columns;

> By default when using `GROUP BY` we can only select columns that are aggregate function columns or columns that are named in the `GROUP BY` clause

```sql
SELECT title, AVG(rating)
FROM series
JOIN reviews ON reviews.series_id = series.id
GROUP BY title;
```

```
+----------------------+-------------+
| title                | AVG(rating) |
+----------------------+-------------+
| Archer               |     6.76667 |
| Arrested Development |     8.08000 |
| Bob's Burgers        |     7.52000 |
| ...                  |     ...     |
+----------------------+-------------+
12 rows in set (0.01 sec)
```

```sql
-- ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'tv_db.reviews.rating' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
SELECT title, rating
FROM series
JOIN reviews ON reviews.series_id = series.id
GROUP BY title;
```

```sql
SET SESSION sql_mode = "";
```

```sql
SELECT title, rating
FROM series
JOIN reviews ON reviews.series_id = series.id
GROUP BY title;
```

```
+----------------------+--------+
| title                | rating |
+----------------------+--------+
| Archer               |    8.0 |
| Arrested Development |    8.1 |
| Bob's Burgers        |    7.0 |
| ...                  |    ... |
+----------------------+--------+
12 rows in set (0.00 sec)
```

> Note in this case we are now getting the first rating for each group and not the average rating for each which is not obvious based on the query results

### NO_ZERO_IN_DATE, NO_ZERO_DATE

```sql
SELECT DATE('2010-01-00');
SHOW WARNINGS;
```

```
+--------------------+
| DATE('2010-01-00') |
+--------------------+
| NULL               |
+--------------------+
1 row in set, 1 warning (0.00 sec)

+---------+------+----------------------------------------+
| Level   | Code | Message                                |
+---------+------+----------------------------------------+
| Warning | 1292 | Incorrect datetime value: '2010-01-00' |
+---------+------+----------------------------------------+
1 row in set (0.00 sec)
```

```sql
SET SESSION sql_mode = "";
```

```sql
SELECT DATE('2010-01-00');
```

```
+--------------------+
| DATE('2010-01-00') |
+--------------------+
| 2010-01-00         |
+--------------------+
1 row in set (0.00 sec)
```
