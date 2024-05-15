---
title: "CRUD Challenge"
slug: "crud-challenge"
sidebar:
  order: 5
---

Spring Cleaning - The Annual Closer Inventory

## Create Database

```sql
CREATE DATABASE shirts_db;
```

## Select Database

```sql
USE shirts_db;
```

## Create Table

```sql
CREATE TABLE shirts(
  shirt_id INT AUTO_INCREMENT,
  article VARCHAR(50),
  color VARCHAR(50),
  shirt_size VARCHAR(5),
  last_worn INT,
  PRIMARY KEY (shirt_id)
);
```

## Describe Table

```sql
DESC shirts;
```

```
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| shirt_id   | int         | NO   | PRI | NULL    | auto_increment |
| article    | varchar(50) | YES  |     | NULL    |                |
| color      | varchar(50) | YES  |     | NULL    |                |
| shirt_size | varchar(5)  | YES  |     | NULL    |                |
| last_worn  | int         | YES  |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
```

## Insert Seed Data

```sql
INSERT INTO shirts (article, color, shirt_size, last_worn)
VALUES
  ('t-shirt', 'white', 'S', 10),
  ('t-shirt', 'green', 'S', 200),
  ('polo shirt', 'black', 'M', 10),
  ('tank top', 'blue', 'S', 50),
  ('t-shirt', 'pink', 'S', 0),
  ('polo shirt', 'red', 'M', 5),
  ('tank top', 'white', 'S', 200),
  ('tank top', 'blue', 'M', 15);
```

## Add New Shirt

```sql
INSERT INTO shirts (article, color, shirt_size, last_worn)
VALUES ('polo shirt', 'purple', 'M', 50);
```

## Select Shirts

```sql
-- return article and color columns
SELECT article, color FROM shirts;
```

```
+------------+--------+
| article    | color  |
+------------+--------+
| t-shirt    | white  |
| t-shirt    | green  |
| polo shirt | black  |
| tank top   | blue   |
| t-shirt    | pink   |
| polo shirt | red    |
| tank top   | white  |
| tank top   | blue   |
| polo shirt | purple |
+------------+--------+
9 rows in set (0.00 sec)
```

```sql
-- return all columns except shirt_id
-- where shirt_size equals 'M'
SELECT article, color, shirt_size, last_worn FROM shirts
WHERE shirt_size = 'M';
```

```
+------------+--------+------------+-----------+
| article    | color  | shirt_size | last_worn |
+------------+--------+------------+-----------+
| polo shirt | black  | M          |        10 |
| polo shirt | red    | M          |         5 |
| tank top   | blue   | M          |        15 |
| polo shirt | purple | M          |        50 |
+------------+--------+------------+-----------+
4 rows in set (0.00 sec)
```

## Update Shirts

```sql
-- update shirt_size to 'L'
-- where article equals 'polo shirt'
UPDATE shirts SET shirt_size = 'L'
where article = 'polo shirt';
```

```sql
-- update last_worn to 0
-- where last_worn equals 15
UPDATE shirts SET last_worn = 0
where last_worn = 15;
```

```sql
-- update size to 'XS' and color to 'off white'
-- where color equals 'white'
UPDATE shirts SET shirt_size = 'XS', color = 'off white'
WHERE color = 'white';
```

## Delete Shirts

```sql
-- delete all shirts
-- where last_worn equals 200
DELETE FROM shirts
WHERE last_worn = 200;
```

```sql
-- delete all shirts
-- where article equals 'tank top'
DELETE FROM shirts
WHERE article = 'tank top';
```

```sql
-- delete all shirts
DELETE FROM shirts;
```

## Drop Table

```sql
DROP TABLE shirts;
```
