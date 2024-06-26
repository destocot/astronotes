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

### Setup New Database

```sql
CREATE DATABASE employees_db;

CREATE TABLE employees (
  emp_no INT PRIMARY KEY AUTO_INCREMENT,
  department VARCHAR(20),
  salary INT
);

INSERT INTO employees (department, salary) VALUES
  ('engineering', 80000),
  ('engineering', 69000),
  ('engineering', 70000),
  ('engineering', 103000),
  ('engineering', 67000),
  ('engineering', 89000),
  ('engineering', 91000),
  ('sales', 59000),
  ('sales', 70000),
  ('sales', 159000),
  ('sales', 72000),
  ('sales', 60000),
  ('sales', 61000),
  ('sales', 61000),
  ('customer service', 38000),
  ('customer service', 45000),
  ('customer service', 61000),
  ('customer service', 40000),
  ('customer service', 31000),
  ('customer service', 56000),
  ('customer service', 55000);
```

## Using OVER()

The `OVER()` clause constructs a window. When it's empty, the window will inclide all records.

```sql
SELECT AVG(salary) FROM employees;
```

```
+-------------+
| AVG(salary) |
+-------------+
|  68428.5714 |
+-------------+
1 row in set (0.00 sec)
```

```sql
SELECT AVG(salary) OVER() FROM employees;
```

```
+--------------------+
| AVG(salary) OVER() |
+--------------------+
|         68428.5714 |
|         68428.5714 |
|         68428.5714 |
|         ...        |
+--------------------+
21 rows in set (0.00 sec)
```

**Note** Passing no arguments to `OVER()` will create a window that will include all the rows.

```sql
SELECT emp_no, department, salary, AVG(SALARY) OVER() FROM employees;
```

```
+--------+------------------+--------+--------------------+
| emp_no | department       | salary | AVG(SALARY) OVER() |
+--------+------------------+--------+--------------------+
|      1 | engineering      |  80000 |         68428.5714 |
|      2 | engineering      |  69000 |         68428.5714 |
|     ...| ...              |  ...   |         68428.5714 |
|     15 | customer service |  38000 |         68428.5714 |
|     ...| ...              |  ...   |         68428.5714 |
+--------+------------------+--------+--------------------+
21 rows in set (0.00 sec)
```

We can combine `OVER()` with most of the aggregate functions we've been introduced to so far (e.g. `AVG`, `SUM`, `MIN`, `MAX`, etc.)

```sql
SELECT emp_no, department, salary, MIN(salary) OVER() FROM employees;
```

```
+--------+------------------+--------+--------------------+
| emp_no | department       | salary | MIN(salary) OVER() |
+--------+------------------+--------+--------------------+
|      1 | engineering      |  80000 |              31000 |
|      2 | engineering      |  69000 |              31000 |
|     ...| ...              |  ...   |              31000 |
|     15 | customer service |  38000 |              31000 |
|     ...| ...              |  ...   |              31000 |
+--------+------------------+--------+--------------------+
21 rows in set (0.00 sec)
```

## PARTITION BY

Inside of the `OVER()` clause, we can use `PARTION BY` to form rows into groups of rows.

```sql
SELECT
  emp_no,
  department,
  salary,
  AVG(salary) OVER(PARTITION BY department) AS dept_avg
FROM employees;
```

```
+--------+------------------+--------+-------------+
| emp_no | department       | salary | dept_avg    |
+--------+------------------+--------+-------------+
|     21 | customer service |  55000 |  46571.4286 |
|     20 | customer service |  56000 |  46571.4286 |
|     ...| ...              |  ...   |  77428.5714 |
|     10 | sales            | 159000 |  77428.5714 |
|     ...| ...              |  ...   |  77428.5714 |
+--------+------------------+--------+-------------+
21 rows in set (0.00 sec)
```

Here using `PARTITION BY department` we query the average of the department as a column for each department specifically

e.g. for all rows where department = 'sales',
the dept_avg = `SELECT AVG(salary) FROM employees WHERE department = 'sales'`

**Example** For each row also query the payroll for the entire company (total_payroll) as well as the payroll for the respective department (dept_payroll).

```sql
SELECT
  *,
  SUM(salary) OVER(PARTITION BY department) AS dept_payroll,
  SUM(salary) OVER() AS total_payroll
FROM employees;
```

```
+--------+------------------+--------+--------------+---------------+
| emp_no | department       | salary | dept_payroll | total_payroll |
+--------+------------------+--------+--------------+---------------+
|     21 | customer service |  55000 |       326000 |       1437000 |
|     20 | customer service |  56000 |       326000 |       1437000 |
|     ...| ...              |  ...   |       326000 |       1437000 |
|      9 | sales            |  70000 |       542000 |       1437000 |
|     ...| ...              |  ...   |       542000 |       1437000 |
+--------+------------------+--------+--------------+---------------+
21 rows in set (0.00 sec)
```

## ORDER BY with Windows

We can use `ORDER BY` inside of the `OVER()` clause to re-order rows within each window.

```sql
SELECT
  emp_no,
  department,
  salary,
  SUM(salary) OVER(PARTITION BY department ORDER BY salary DESC) AS rolling_dept_salary,
  SUM(salary) OVER(PARTITION BY department) AS total_dept_salary
FROM employees;
```

```
+--------+------------------+--------+---------------------+-------------------+
| emp_no | department       | salary | rolling_dept_salary | total_dept_salary |
+--------+------------------+--------+---------------------+-------------------+
|     20 | customer service |  56000 |              117000 |            326000 |
|     21 | customer service |  55000 |              172000 |            326000 |
|     16 | customer service |  45000 |              217000 |            326000 |
|     18 | customer service |  40000 |              257000 |            326000 |
|     15 | customer service |  38000 |              295000 |            326000 |
|     19 | customer service |  31000 |              326000 |            326000 |
|     17 | customer service |  61000 |               61000 |            326000 |
|    ... | ...              |  ...   |              ...    |            ...    |
|     10 | sales            | 159000 |              159000 |            542000 |
|     11 | sales            |  72000 |              231000 |            542000 |
|    ... | ...              |  ...   |              ...    |            542000 |
+--------+------------------+--------+---------------------+-------------------+
21 rows in set (0.00 sec)
```

Here the `rolling_dept_salary` calculated the current sum for each row.

e.g. for row where `emp_no = 21`,
the `rolling_dept_salary` = `rolling_dept_salary` (`emp_no = 20`) + `salary` (`emp_no = 21`)
=> `rolling_dept_salary` = 117000 + 55000
=> `rolling_dept_salary` = 172000 ✔️

## RANK()

## DENSE_RANK, & ROW_NUMBER()

## NTILE()

## FIRST_VALUE

## LEAD AND LAG

```

```
