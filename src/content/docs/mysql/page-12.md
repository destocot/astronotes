---
title: "One to Many & Joins"
slug: "one-to-many-and-joins"
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

## Inner Joins

## Inner Joins With Group By

## Left Join

## Left Join With Group By

## Right Join

## On Delete Cascade

## Joins Exercise

## Joins Exercise SOLUTION

```

```
