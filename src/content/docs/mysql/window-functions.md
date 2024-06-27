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

Returns the rank of the current row within its partition, with gaps.

```sql
SELECT *, RANK() OVER(ORDER BY salary DESC) AS overall_salary_rank
FROM employees;
```

```
+--------+------------------+--------+---------------------+
| emp_no | department       | salary | overall_salary_rank |
+--------+------------------+--------+---------------------+
|     10 | sales            | 159000 |                   1 |
|      4 | engineering      | 103000 |                   2 |
|      7 | engineering      |  91000 |                   3 |
|    ... | ...              |  ...   |                 ... |
|      3 | engineering      |  70000 |                   7 |*
|      9 | sales            |  70000 |                   7 |*
|      2 | engineering      |  69000 |                   9 |*
|    ... | ...              |  ...   |                 ... |
+--------+------------------+--------+---------------------+
21 rows in set (0.00 sec)
```

**Note** We are not just counting the row number. See that two rows have a salary ranked at 7, followed by the next row skipping to rank 9.

### With PARTITION BY

```sql
SELECT
  *,
  RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_salary_rank,
  RANK() OVER(ORDER BY salary DESC) AS overall_salary_rank
FROM employees;
```

```
+--------+------------------+--------+------------------+---------------------+
| emp_no | department       | salary | dept_salary_rank | overall_salary_rank |
+--------+------------------+--------+------------------+---------------------+
|     10 | sales            | 159000 |                1 |                   1 |
|      4 | engineering      | 103000 |                1 |                   2 |
|      7 | engineering      |  91000 |                2 |                   3 |*
|      6 | engineering      |  89000 |                3 |                   4 |*
|    ... | ...              |  ...   |              ... |                 ... |
+--------+------------------+--------+------------------+---------------------+
21 rows in set (0.00 sec)
```

### With ORDER BY

```sql
SELECT
  *,
  RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_salary_rank,
  RANK() OVER(ORDER BY salary DESC) AS overall_salary_rank
FROM employees
ORDER BY department;
```

```
21 rows in set (0.00 sec)
```

## DENSE_RANK

`DENSE_RANK()` returns the rank of the current row in its partition, **without** gaps.

```sql
SELECT
  *,
  RANK() OVER(ORDER BY salary DESC) AS overall_rank,
  DENSE_RANK() OVER(ORDER BY salary DESC) AS overall_dense_rank
FROM employees
ORDER BY overall_rank;
```

```
+--------+------------------+--------+--------------+--------------------+
| emp_no | department       | salary | overall_rank | overall_dense_rank |
+--------+------------------+--------+--------------+--------------------+
|    ... | ...              |  ...   |          ... |                ... |
|     11 | sales            |  72000 |            6 |                  6 |
|      3 | engineering      |  70000 |            7 |                  7 |*
|      9 | sales            |  70000 |            7 |                  7 |*
|      2 | engineering      |  69000 |            9 |                  8 |*
|      5 | engineering      |  67000 |           10 |                  9 |*
|     13 | sales            |  61000 |           11 |                 10 |
|    ... | ...              |  ...   |          ... |                ... |
+--------+------------------+--------+--------------+--------------------+
21 rows in set (0.00 sec)
```

**Note** After the rows that are both have an overall_rank of 7, the next row has an overall_rank of 9 and an overall_dense_rank of 8. This is because `RANK` considers gaps, whereas `DENSE_RANK` does not.

## ROW_NUMBER

`ROW_NUMBER()` returns the number of the current row within its partition. Row numbers range from 1 to the number of partition rows.

```sql
SELECT
  *,
  ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_row_num,
  RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dept_salary_rank
FROM employees
ORDER BY department, dept_row_num;
```

```
+--------+------------------+--------+--------------+------------------+
| emp_no | department       | salary | dept_row_num | dept_salary_rank |
+--------+------------------+--------+--------------+------------------+
|     17 | customer service |  61000 |            1 |                1 |
|     20 | customer service |  56000 |            2 |                2 |
|     21 | customer service |  55000 |            3 |                3 |
|    ... | ...              |  ...   |          ... |              ... |
|     10 | sales            | 159000 |            1 |                1 |
|     11 | sales            |  72000 |            2 |                2 |
|      9 | sales            |  70000 |            3 |                3 |
|     14 | sales            |  61000 |            4 |                4 |*
|     13 | sales            |  61000 |            5 |                4 |*
|     12 | sales            |  60000 |            6 |                6 |
|      8 | sales            |  59000 |            7 |                7 |
+--------+------------------+--------+--------------+------------------+
21 rows in set (0.00 sec)
```

## NTILE()

`NTILE` Divides a partition into **N** groups (buckets), assigns each row in the partition its bucket number, and returns the bucket number of the current row;

```sql
SELECT
  *,
  NTILE(4) OVER(ORDER BY salary DESC) AS salary_quartile
FROM employees;
```

```
+--------+------------------+--------+-----------------+
| emp_no | department       | salary | salary_quartile |
+--------+------------------+--------+-----------------+
|     10 | sales            | 159000 |               1 |
|      4 | engineering      | 103000 |               1 |
|    ... | ...              |  ...   |             ... |
|      3 | engineering      |  70000 |               2 |
|      9 | sales            |  70000 |               2 |
|    ... | ...              |  ...   |             ... |
|     14 | sales            |  61000 |               3 |
|     17 | customer service |  61000 |               3 |
|    ... | ...              |  ...   |             ... |
|     21 | customer service |  55000 |               4 |
|     16 | customer service |  45000 |               4 |
|    ... | ...              |  ...   |             ... |
+--------+------------------+--------+-----------------+
21 rows in set (0.00 sec)
```

```sql
SELECT
  *,
  NTILE(4) OVER(PARTITION BY department ORDER BY salary DESC) as dept_salary_quartile,
  NTILE(4) OVER(ORDER BY salary DESC) AS salary_quartile
FROM employees;
```

```
+--------+------------------+--------+----------------------+
| emp_no | department       | salary | dept_salary_quartile |
+--------+------------------+--------+----------------------+
|     17 | customer service |  61000 |                    1 |
|     20 | customer service |  56000 |                    1 |
|     21 | customer service |  55000 |                    2 |
|     16 | customer service |  45000 |                    2 |
|     18 | customer service |  40000 |                    3 |
|     15 | customer service |  38000 |                    3 |
|     19 | customer service |  31000 |                    4 |
|      4 | engineering      | 103000 |                    1 |
|      7 | engineering      |  91000 |                    1 |
|      6 | engineering      |  89000 |                    2 |
|      1 | engineering      |  80000 |                    2 |
|    ... | ...              |  ...   |                  ... |
+--------+------------------+--------+----------------------+
21 rows in set (0.00 sec)
```

## FIRST_VALUE

`FIRST_VALUE(expression)` returns the value of the **expression** from the first row of the window frame.

```sql
SELECT
  *,
  FIRST_VALUE(emp_no) OVER(ORDER BY salary DESC) AS emp_no_highest_salary
FROM employees;
```

```
+--------+------------------+--------+-----------------------+
| emp_no | department       | salary | emp_no_highest_salary |
+--------+------------------+--------+-----------------------+
|     10 | sales            | 159000 |                    10 |
|      4 | engineering      | 103000 |                    10 |
|      7 | engineering      |  91000 |                    10 |
|     ...| ...              |  ...   |                   ... |
+--------+------------------+--------+-----------------------+
21 rows in set (0.00 sec)
```

```sql
SELECT
  *,
  FIRST_VALUE(emp_no) OVER(PARTITION BY department ORDER BY salary DESC) AS emp_no_highest_dept_salary,
  FIRST_VALUE(emp_no) OVER(ORDER BY salary DESC) AS emp_no_highest_salary
FROM employees;
```

```
+--------+------------------+--------+----------------------------+-----------------------+
| emp_no | department       | salary | emp_no_highest_dept_salary | emp_no_highest_salary |
+--------+------------------+--------+----------------------------+-----------------------+
|     10 | sales            | 159000 |                         10 |                    10 |
|      4 | engineering      | 103000 |                          4 |                    10 |
|      7 | engineering      |  91000 |                          4 |                    10 |
|     ...| ...              |  ...   |                        ... |                   ... |
+--------+------------------+--------+----------------------------+-----------------------+
21 rows in set (0.00 sec)
```

See also `LAST_VALUE(expresssion)` and `NTH_VALUE(expression, n)`

[MySQL Window Functions](https://dev.mysql.com/doc/refman/8.4/en/window-function-descriptions.html)

## LEAD AND LAG

```

```
