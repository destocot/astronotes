---
title: "Comparison & Logical Operators"
slug: "comparison-and-logical-operators"
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

## Between

## Comparing Dates

## The IN Operator

## CASE

## IS NULL
