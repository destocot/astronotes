---
title: "CRUD Basics"
slug: "crud-basics"
sidebar:
  order: 4
---

## CRUD

**C**reate
**R**ead
**U**pdate
**D**elete

## Getting Our New "Dataset"

Create a new table named cats.

```sql
CREATE TABLE cats (
  cat_id INT AUTO_INCREMENT,
  name VARCHAR(100),
  breed VARCHAR(100),
  age INT,
  PRIMARY KEY (cat_id)
);

DESC cats;
```

```
+--------+--------------+------+-----+---------+----------------+
| Field  | Type         | Null | Key | Default | Extra          |
+--------+--------------+------+-----+---------+----------------+
| cat_id | int          | NO   | PRI | NULL    | auto_increment |
| name   | varchar(100) | YES  |     | NULL    |                |
| breed  | varchar(100) | YES  |     | NULL    |                |
| age    | int          | YES  |     | NULL    |                |
+--------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```

Multi insert seed data into cats.

```sql
INSERT INTO cats (name, breed, age)
VALUES
  ('Ringo', 'Tabby', 4),
  ('Cindy', 'Maine Coon', 10),
  ('Dumbledore', 'Maine Coon', 11),
  ('Egg', 'Persian', 4),
  ('Misty', 'Tabby', 13),
  ('George Michael', 'Ragdoll', 9),
  ('Jackson', 'Sphynx', 7);

SELECT * FROM cats;
```

```
+--------+----------------+------------+------+
| cat_id | name           | breed      | age  |
+--------+----------------+------------+------+
|      1 | Ringo          | Tabby      |    4 |
|      2 | Cindy          | Maine Coon |   10 |
|      3 | Dumbledore     | Maine Coon |   11 |
|      4 | Egg            | Persian    |    4 |
|      5 | Misty          | Tabby      |   13 |
|      6 | George Michael | Ragdoll    |    9 |
|      7 | Jackson        | Sphynx     |    7 |
+--------+----------------+------------+------+
7 rows in set (0.00 sec)
```

## SELECT

```sql
-- return all columns
SELECT * FROM cats;
```

```sql
-- return name column
SELECT name from cats;
```

```sql
-- return name and age columns
SELECT name, age FROM cats;
```

## WHERE clause

The **WHERE** clause is used to filter records. It is used to extract only those records that fulfill a specified condition.

```sql
-- return all columns where age column equals 4
SELECT * FROM cats
WHERE age = 4;
```

```sql
-- return name and age columns where age column equals 4
SELECT name, age FROM cats
WHERE age = 4;
```

> It is not necessary to select the column that is being used within the **WHERE** clause

```sql
-- return name column where age column equals 4
SELECT name FROM cats
WHERE age = 4;
```

```sql
-- return all columns where name column equals 'Egg'
SELECT * FROM cats
WHERE name='Egg';
-- WHERE name='egg';
```

> For this select statement our **WHERE** clause is case **insensitive**.

```sql
-- return cat_id and age columns where cat_id equals age
SELECT cat_id, age FROM cats
WHERE cat_id = age;
```

## Aliases

```sql
-- return cat_id and name with cat_id aliased as id
SELECT cat_id as id, name from cats
```

```
+----+----------------+
| id | name           |
+----+----------------+
|  1 | Ringo          |
|  2 | Cindy          |
|  3 | Dumbledore     |
|  4 | Egg            |
|  5 | Misty          |
|  6 | George Michael |
|  7 | Jackson        |
+----+----------------+
7 rows in set (0.00 sec)
```

## UPDATE

```sql
UPDATE cats SET age = 14
WHERE name = 'Misty';
```

```
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

**Note** A good rule of thumb is to try SELECTing your data before doing an UPDATE.

## DELETE

```sql
DELETE FROM cats
WHERE name = 'Egg';
```

```
Query OK, 1 row affected (0.00 sec)
```

**Note** Executing the DELETE query without a WHERE clause will cause all the data in the table to be deleted.
