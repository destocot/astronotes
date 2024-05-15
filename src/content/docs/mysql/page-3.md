---
title: "Inserting Data"
slug: "inserting-data"
sidebar:
  order: 3
---

## INSERT: The Basics

```sql
INSERT INTO <table_name>(col1, col2)
VALUES (val1, val2);
```

**Note** The order of the values must correspond to the column in the same order (type of col1 must be type of val1)

**example**

```sql
INSERT INTO products(product_name, quantity)
VALUES('Samsung Galaxy S22', 25);
```

```
Query OK, 1 row affected (0.00 sec)
```

## Preview of SELECT

```sql
SELECT * FROM <table_name>;
```

**example**

```sql
SELECT * FROM products;
```

```
+--------------------+-----------+
| product_name       | quantity  |
+--------------------+-----------+
| Samsung Galaxy S22 |    25     |
+--------------------+-----------+
1 row in set (0.00 sec)
```

## Multi-inserts

**example**

```sql
INSERT INTO products (product_name, quantity)
VALUES
    ('Apple iPhone 14', 30),
    ('Dell XPS 15 Laptop', 15),
    ('Bose QuietComfort Headphones', 20);
```

```
Query OK, 3 rows affected (0.00 sec)
Records: 3  Duplicates: 0  Warnings: 0
```

## Working With NOT NULL

With our current table schema we are able to insert NULL values for our columns.

**example**

```sql
INSERT INTO products (product_name)
VALUES ('Logitech Mouse');

SELECT * FROM products;
```

```
+----------------+-----------+
| product_name   | quantity  |
+----------------+-----------+
| Logitech Mouse |   NULL    |
+----------------+-----------+
1 row in set (0.00 sec)
```

### NOT NULL Constraint

**example**

```sql
CREATE TABLE products (
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL
);

DESC products;
```

```
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| product_name | varchar(255) | NO   |     | NULL    |       |
| quantity     | int          | NO   |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
```

**Note** Now when inserting a new row, we will get an error if any of the fields with the NOT NULL constraint are not given a value.

## Quotes in MySQL

Although MySQL allows both the usage of double quotes ("") or single quotes ('') other flavors of SQL only allow single quotes. So it is best practice to always use single quotes within queries.

### Escaping Quotes

**example**

```sql
INSERT INTO products (product_name, quantity)
VALUES ('Children\'s Story Book', 45);
```

**Note** Double quotes that are within single quotes do not need to be escaped.

## DEFAULT Values

**example**

```sql
CREATE TABLE products (
  product_name VARCHAR(255) DEFAULT 'unnamed',
  quantity INT DEFAULT 0
);

DESC products;
```

```
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| product_name | varchar(255) | YES  |     | unnamed |       |
| quantity     | int          | YES  |     | 0       |       |
+--------------+--------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

```sql
INSERT INTO products (quantity)
VALUES (2);

SELECT * FROM products;
```

```
+--------------+----------+
| product_name | quantity |
+--------------+----------+
| unnamed      |   2      |
+--------------+----------+
1 row in set (0.00 sec)
```

> It is _NOT REDUNDANT_ to add the `NOT NULL` constraint with a `DEFAULT` value. We could still insert a value as `NULL` or alter the column value to `NOT NULL` if we do not set the `NOT NULL` constraint.

```sql
CREATE TABLE products (
  product_name VARCHAR(255) NOT NULL DEFAULT 'unnamed',
  quantity INT NOT NULL DEFAULT 0
);
```

## Primary Keys

As of right now our table schema allows us to insert rows with equivalent data. Primary keys act as a unique identifier for each row.

```sql
CREATE TABLE products (
  product_id INT NOT NULL PRIMARY KEY,
  product_name VARCHAR(255),
  quantity INT
);

DESC products;
```

```
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| product_id   | int          | NO   | PRI | NULL    |       |
| product_name | varchar(255) | YES  |     | NULL    |       |
| quantity     | int          | YES  |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

### Alternative Syntax

As of right now our table schema allows us to insert rows with equivalent data. Primary keys act as a unique identifier for each row.

```sql
CREATE TABLE products (
  product_id INT NOT NULL,
  product_name VARCHAR(255),
  quantity INT,
  PRIMARY KEY (product_id)
);
```

> It is _REDUNDANT_ to have the `NOT NULL` constraint with the `PRIMARY KEY` constraint because the `PRIMARY KEY` can never be `NULL`.

## AUTO_INCREMENT

With the `AUTO_INCREMENT` field, our column will be automatically incremented for future inserts.

```sql
CREATE TABLE products (
  product_id INT AUTO_INCREMENT,
  product_name VARCHAR(255),
  quantity INT,
  PRIMARY KEY (product_id)
);

DESC products;
```

```
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| product_id   | int          | NO   | PRI | NULL    | auto_increment |
| product_name | varchar(255) | YES  |     | NULL    |                |
| quantity     | int          | YES  |     | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```
