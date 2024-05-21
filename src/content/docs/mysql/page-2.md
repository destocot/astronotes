---
title: "Creating Databases & Tables"
slug: "creating-databases-and-tables"
sidebar:
  order: 2
---

## Showing Databases

```sql
SHOW DATABASES;
```

## Creating Databases

```sql
CREATE DATABASE <name>;
```

**example**

```sql
CREATE DATABASE inventory_management;
```

```
Query OK, 1 row affected (0.00 sec)
```

## Dropping & Using Databases

### Dropping Database

```sql
DROP DATABASE <name>;
```

**example**

```sql
DROP DATABASE inventory_management;
```

```
Query OK, 0 rows affected (0.00 sec)
```

### Using Database

```sql
USE <database_name>;
```

**example**

```sql
USE inventory_management;
```

```
Database changed
```

**Note** In MySQL Workbench, you can double-click a database to select it.

### Name of Current Database

```sql
SELECT database();
```

**example**

```sql
USE inventory_management;
```

```
+----------------------+
| database()           |
+----------------------+
| inventory_management |
+----------------------+
1 row in set (0.00 sec)
```

## Data Types: The Basics

### Numeric Types

- Integer: INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT
- Floating-Point: FLOAT, DOUBLE
- Fixed-Point: DECIMAL, NUMERIC
- Bit-Value: BIT

### String Types

- Character: CHAR, BINARY
- Variable Character: VARCHAR, VARBINARY
- Large Objects: BLOB (TINYBLOB, MEDIUMBLOB, LONGBLOB), TEXT (TINYTEXT, MEDIUMTEXT, LONGTEXT)
- Enumeration: ENUM

### Date and Time Types

- Date: DATE
- Date and Time: DATETIME, TIMESTAMP
- Time: TIME
- Year: YEAR

---

**INT** A Whole Number  
Has a max (signed) value of 2147483647, signed meaning that we can have as low as -2147483647.

**VARCHAR** A Variable-Length String

### Continue

[Revisiting Data Types](/revisiting-data-types)

## Creating Tables

```sql
CREATE TABLE <table_name> (
  <column_name1> <data_type>,
  <column_name2> <data_type>,
              ...           ,
  <column_nameN> <data_type>,
);
```

**example**

```sql
CREATE TABLE products (
  product_name VARCHAR(255),
  quantity INT
);
```

```
Query OK, 0 rows affected (0.00 sec)
```

## Utility Commands

### Show tables in database;

```sql
SHOW TABLES;
```

### Show columns in table;

```sql
SHOW COLUMNS FROM <table_name>;
DESCRIBE <table_name>;
DESC <table_name>;
```

**Note** `SHOW COLUMNS FROM`, `DESCRIBE`, and `DESC` will execute the same query.

**Note** In MySQL Workbench, you can view table information under `Object Info` after clicking on the table.

**example**

```sql
DESC products;
```

```
+---------------+--------------+------+-----+---------+-------+
| Field         | Type         | Null | Key | Default | Extra |
+---------------+--------------+------+-----+---------+-------+
| product_name  | varchar(255) | YES  |     | NULL    |       |
| quantity      | int          | YES  |     | NULL    |       |
+---------------+--------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

## Dropping Tables

```sql
DROP TABLE <table_name>;
```

**Note** In MySQL Workbench, we can right click out table name to drop it.

**example**

```sql
DROP TABLE products;
```

```
Query OK, 0 rows affected (0.00 sec)
```

## Comments

In MySQL, we can write comments by prefixing any line with `--`

```sql
-- Uncomment to drop the products table
-- DROP TABLE products;
```
