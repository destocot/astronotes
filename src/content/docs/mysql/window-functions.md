---
title: "Window Functions"
sidebar:
  order: 15
---

## Introducing Views

```sql
SELECT title, released_year, genre, rating, first_name, last_name
FROM reviews
JOIN series ON series.id = reviews.series_id
JOIN reviewers ON reviewers.id = reviews.reviewer_id;
```

## Introducing Window Functions

Window functions perform aggregate operations on groups of rows, but they **produce a result FOR EACH ROW**

```sql
SELECT department, AVG(salary)
FROM emps
GROUP BY department;
```

```
+------------------+---------------+
| department       | AVG(salary)   |
+------------------+---------------+
| sales            |    59500.0000 |
| customer service |    55500.0000 |
+------------------+---------------+
2 rows in set (0.00 sec)
```

```sql
SELECT
  emp_no,
  department,
  salary,
  AVG(salary) OVER(PARTITION BY department) AS dept_avg
from emps;
```

```
+--------+------------------+--------+------------+
| emp_no | department       | salary | dept_avg   |
+--------+------------------+--------+------------+
| 20     | customer service |  56000 | 55500.0000 |
| 21     | customer service |  55000 | 55500.0000 |
| 8      | sales            |  59000 | 59500.0000 |
| 12     | sales            |  60000 | 59500.0000 |
+--------+------------------+--------+------------+
4 rows in set (0.00 sec)
```

## Using OVER()

## PARTITION BY

## ORDER BY with Windows

## RANK()

## DENSE_RANK, & ROW_NUMBER()

## NTILE()

## FIRST_VALUE

## LEAD AND LAG
