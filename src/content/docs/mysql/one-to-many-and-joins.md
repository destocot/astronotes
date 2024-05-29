---
title: "One to Many & Joins"
sidebar:
  order: 12
---

## One to Many Relationship

### Setup CUSTOMERS & ORDERS

```sql
CREATE DATABASE shop;
USE shop;
```

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_date DATE,
  amount DECIMAL(8, 2),
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers (id)
);
```

> The naive approach would be to create the `orders` table without a `FOREIGN KEY` constraint. This would cause issues down the line such as being able to add `orders` with a `customer_id` that does not reference a row in `customers`.

```sql
INSERT INTO customers (first_name, last_name, email)
VALUES
  ('Boy', 'George', 'george@gmail.com'),
  ('George', 'Michael', 'gm@gmail.com'),
  ('David', 'Bowie', 'david@gmail.com'),
  ('Blue', 'Steele', 'blue@gmail.com'),
  ('Bette', 'Davis', 'bette@aol.com');

INSERT INTO orders (order_date, amount, customer_id)
VALUES
  ('2016-02-10', 99.99, 1),
  ('2017-11-11', 35.50, 1),
  ('2014-12-12', 800.67, 2),
  ('2015-01-03', 12.50, 2),
  ('1999-04-11', 450.25, 5);
```

```sql
SELECT * FROM customers;
```

```
+----+------------+-----------+------------------+
| id | first_name | last_name | email            |
+----+------------+-----------+------------------+
|  1 | Boy        | George    | george@gmail.com |
|  2 | George     | Michael   | gm@gmail.com     |
|  3 | David      | Bowie     | david@gmail.com  |
|  4 | Blue       | Steele    | blue@gmail.com   |
|  5 | Bette      | Davis     | bette@aol.com    |
+----+------------+-----------+------------------+
5 rows in set (0.00 sec)
```

```sql
SELECT * FROM orders;
```

```
+----+------------+--------+-------------+
| id | order_date | amount | customer_id |
+----+------------+--------+-------------+
|  1 | 2016-02-10 |  99.99 |           1 |
|  2 | 2017-11-11 |  35.50 |           1 |
|  3 | 2014-12-12 | 800.67 |           2 |
|  4 | 2015-01-03 |  12.50 |           2 |
|  5 | 1999-04-11 | 450.25 |           5 |
+----+------------+--------+-------------+
5 rows in set (0.00 sec)
```

```sql
-- Query OK, 1 row affected (0.00 sec)
INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2022-11-11', 78.99, 3);
```

## Working with FOREIGN KEY

**Note** Our `FOREIGN KEY` constraint prevents us from inserting `orders` with a `customer_id` that does not reference a row in `customers`.

```sql
-- Cannot add or update a child row: a foreign key constraint fails (`shop`.`orders`, CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`))
INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2022-11-11', 78.99, 54);
```

## Cross Joins

`CROSS JOIN` keyword returns all records from both tables.

```sql
SELECT * FROM customers CROSS JOIN orders;
```

```
+----+------------+-----------+------------------+----+------------+--------+-------------+
| id | first_name | last_name | email            | id | order_date | amount | customer_id |
+----+------------+-----------+------------------+----+------------+--------+-------------+
|  5 | Bette      | Davis     | bette@aol.com    |  1 | 2016-02-10 |  99.99 |           1 |
|  4 | Blue       | Steele    | blue@gmail.com   |  1 | 2016-02-10 |  99.99 |           1 |
|  3 | David      | Bowie     | david@gmail.com  |  1 | 2016-02-10 |  99.99 |           1 |
|  ...                                                                                    |
+----+------------+-----------+------------------+----+------------+--------+-------------+
30 rows in set (0.00 sec)
```

**Note** This will return every single combination of our tables regardless of any foreign keys (regardless of any foreign key associations).

## Inner Joins

`INNER JOIN` keyword selects records that have matching values in both tables.

**Inner Joins** are the most common join that one would perform in `MySQL`.

```sql
SELECT * FROM <table_name1>
JOIN <table_name2>
ON <table_name1>.<column_name> = <table_name2>.<column_name>;
```

![inner join](https://static.javatpoint.com/mysql/images/mysql-inner-join.png)

```sql
SELECT * FROM customers JOIN orders ON customers.id = orders.customer_id;
```

```
+----+------------+-----------+------------------+----+------------+--------+-------------+
| id | first_name | last_name | email            | id | order_date | amount | customer_id |
+----+------------+-----------+------------------+----+------------+--------+-------------+
|  1 | Boy        | George    | george@gmail.com |  1 | 2016-02-10 |  99.99 |           1 |
|  1 | Boy        | George    | george@gmail.com |  2 | 2017-11-11 |  35.50 |           1 |
|  2 | George     | Michael   | gm@gmail.com     |  3 | 2014-12-12 | 800.67 |           2 |
|  2 | George     | Michael   | gm@gmail.com     |  4 | 2015-01-03 |  12.50 |           2 |
|  5 | Bette      | Davis     | bette@aol.com    |  5 | 1999-04-11 | 450.25 |           5 |
|  3 | David      | Bowie     | david@gmail.com  |  7 | 2022-11-11 |  78.99 |           3 |
+----+------------+-----------+------------------+----+------------+--------+-------------+
6 rows in set (0.00 sec)
```

> Here we can see the `id` column in `customers` matches the `customer_id` in `orders`

**Note** The order of the columns will be based on the columns from the table we select on first, followed by the columns of the tables we join on.

## Inner Joins With Group By

**example** Find the total amount that each customer spent.

```sql
SELECT first_name, last_name, SUM(amount) as total
FROM customers
JOIN orders ON orders.customer_id = customers.id
GROUP BY first_name, last_name
ORDER BY total;
```

```
+------------+-----------+--------+
| first_name | last_name | total  |
+------------+-----------+--------+
| David      | Bowie     |  78.99 |
| Boy        | George    | 135.49 |
| Bette      | Davis     | 450.25 |
| George     | Michael   | 813.17 |
+------------+-----------+--------+
4 rows in set (0.00 sec)
```

## Left Join

`LEFT JOIN` keyword returns all records from the left table (table1), and the matching records (if any) from the right table (table2).

```sql
SELECT * FROM <table_name1>
LEFT JOIN <table_name2>
ON <table_name1>.<column_name> = <table_name2>.<column_name>;
```

![inner join](https://static.javatpoint.com/mysql/images/mysql-left-join.png)

```sql
SELECT first_name, last_name, order_date, amount
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id;
```

```
+------------+-----------+------------+--------+
| first_name | last_name | order_date | amount |
+------------+-----------+------------+--------+
| Boy        | George    | 2017-11-11 |  35.50 |
| Boy        | George    | 2016-02-10 |  99.99 |
| George     | Michael   | 2015-01-03 |  12.50 |
| George     | Michael   | 2014-12-12 | 800.67 |
| David      | Bowie     | 2022-11-11 |  78.99 |
| Blue       | Steele    | NULL       |   NULL |
| Bette      | Davis     | 1999-04-11 | 450.25 |
+------------+-----------+------------+--------+
7 rows in set (0.00 sec)
```

> With `LEFT JOIN` we get all the rows in the left table, `customers`, regardless of if they have any rows in the `orders` table to reference. In those cases, they will just have the value of `NULL` for the columns selected in the right table, `orders`.

**Motivation** Sometimes performing a left join can give us valuable information. For example, we can find out which customers have never placed an order.

## IFNULL

`IFNULL(expression, alt_value)`

`IFNULL()` function returns a specified value if the expression is NULL.

If the expression is NOT NULL, this function returns the expression.

## Left Join With Group By

```sql
SELECT first_name, last_name, IFNULL(SUM(amount), 0) AS money_spent
FROM customers
LEFT JOIN orders on customers.id = orders.customer_id
GROUP BY first_name, last_name;
```

```
+------------+-----------+-------------+
| first_name | last_name | money_spent |
+------------+-----------+-------------+
| Boy        | George    |      135.49 |
| George     | Michael   |      813.17 |
| David      | Bowie     |       78.99 |
| Blue       | Steele    |        0.00 |
| Bette      | Davis     |      450.25 |
+------------+-----------+-------------+
5 rows in set (0.01 sec)
```

## Right Join

`RIGHT JOIN` keyword returns all records from the right table (table2), and the matching records (if any) from the left table (table1).

````sql
SELECT * FROM <table_name1>
RIGHT JOIN <table_name2>
ON <table_name1>.<column_name> = <table_name2>.<column_name>;

![inner join](https://static.javatpoint.com/mysql/images/mysql-right-join.png)

```sql
INSERT INTO orders (amount, order_date) VALUES (100, CURDATE());

SELECT first_name, last_name, order_date, amount
FROM customers
RIGHT JOIN orders ON customers.id = orders.customer_id;
````

```
+------------+-----------+------------+--------+
| first_name | last_name | order_date | amount |
+------------+-----------+------------+--------+
| Boy        | George    | 2016-02-10 |  99.99 |
| Boy        | George    | 2017-11-11 |  35.50 |
| George     | Michael   | 2014-12-12 | 800.67 |
| George     | Michael   | 2015-01-03 |  12.50 |
| Bette      | Davis     | 1999-04-11 | 450.25 |
| David      | Bowie     | 2022-11-11 |  78.99 |
| NULL       | NULL      | 2024-05-27 | 100.00 |
+------------+-----------+------------+--------+
7 rows in set (0.00 sec)
```

## ON DELETE CASCADE

`ON DELETE CASCADE` constraint is used in MySQL to delete the rows from the child table automatically, when the rows from the parent table are deleted.

```sql
DROP TABLE orders;
DROP TABLE customers;
```

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_date DATE,
  amount DECIMAL(8, 2),
  customer_id INT,
  FOREIGN KEY (customer_id)
    REFERENCES customers (id)
    ON DELETE CASCADE
);
```

> With the `ON DELETE CASCADE` constraint, if we delete a row in the `customers` table, all the rows in the `orders` table that reference that row will also be deleted.

```sql
INSERT INTO customers (first_name, last_name, email)
VALUES
  ('Boy', 'George', 'george@gmail.com'),
  ('George', 'Michael', 'gm@gmail.com'),
  ('David', 'Bowie', 'david@gmail.com'),
  ('Blue', 'Steele', 'blue@gmail.com'),
  ('Bette', 'Davis', 'bette@aol.com');

INSERT INTO orders (order_date, amount, customer_id)
VALUES
  ('2016-02-10', 99.99, 1),
  ('2017-11-11', 35.50, 1),
  ('2014-12-12', 800.67, 2),
  ('2015-01-03', 12.50, 2),
  ('1999-04-11', 450.25, 5);
```

```sql
SELECT * FROM orders;
```

```
+----+------------+--------+-------------+
| id | order_date | amount | customer_id |
+----+------------+--------+-------------+
|  1 | 2016-02-10 |  99.99 |           1 |
|  2 | 2017-11-11 |  35.50 |           1 |
|  3 | 2014-12-12 | 800.67 |           2 |
|  4 | 2015-01-03 |  12.50 |           2 |
|  5 | 1999-04-11 | 450.25 |           5 |
+----+------------+--------+-------------+
5 rows in set (0.00 sec)
```

```sql
DELETE FROM customers WHERE last_name = "George";

SELECT * FROM customers;
```

```
+----+------------+-----------+-----------------+
| id | first_name | last_name | email           |
+----+------------+-----------+-----------------+
|  2 | George     | Michael   | gm@gmail.com    |
|  3 | David      | Bowie     | david@gmail.com |
|  4 | Blue       | Steele    | blue@gmail.com  |
|  5 | Bette      | Davis     | bette@aol.com   |
+----+------------+-----------+-----------------+
4 rows in set (0.00 sec)
```

```sql
SELECT * FROM orders;
```

```
+----+------------+--------+-------------+
| id | order_date | amount | customer_id |
+----+------------+--------+-------------+
|  3 | 2014-12-12 | 800.67 |           2 |
|  4 | 2015-01-03 |  12.50 |           2 |
|  5 | 1999-04-11 | 450.25 |           5 |
+----+------------+--------+-------------+
3 rows in set (0.00 sec)
```

> All `orders` associated with the customer with the last name "George" (`customer_id = 1`) have been deleted.

## Worked Example

```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50)
);


CREATE TABLE papers (
    title VARCHAR(50),
    grade INT,
    student_id INT,
    FOREIGN KEY (student_id)
        REFERENCES students (id)
);
```

1. For every student (regardless of if they have any papers) select the `first_name` and calculate the `average` of the grades of their paper. Also print out the `passing_status` as `'PASSING'` if the average is greater than 75, and `'FAILING'` otherwise.

- If the `average` is `NULL`, then set the `average` to `0`.
- Order the results by the `average` in descending order.

```sql
SELECT
  s.first_name,
  IFNULL(AVG(p.grade), 0) AS average,
  CASE
    WHEN IFNULL(AVG(p.grade), 0)  > 75 THEN 'PASSING'
    ELSE 'FAILING'
  END AS passing_status
FROM students AS s
LEFT JOIN papers AS p ON s.id = p.student_id
GROUP BY s.first_name ORDER BY average DESC;
```

```
+------------+---------+----------------+
| first_name | average | passing_status |
+------------+---------+----------------+
| Samantha   | 96.0000 | PASSING        |
| Carlos     | 89.0000 | PASSING        |
| Caleb      | 67.5000 | FAILING        |
| Raj        |  0.0000 | FAILING        |
| Lisa       |  0.0000 | FAILING        |
+------------+---------+----------------+
5 rows in set (0.00 sec)
```
