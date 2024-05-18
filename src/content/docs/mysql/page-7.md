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

## LIMIT

## LIKE

## Escaping Wildcards

```

```
