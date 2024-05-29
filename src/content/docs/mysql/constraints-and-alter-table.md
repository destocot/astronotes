---
title: "Constraints & ALTER TABLE"
sidebar:
  order: 11
---

## Constraints

### UNIQUE

The `UNIQUE` constraint enforces the uniqueness of a column.

```sql
CREATE TABLE contacts (
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE
);

-- Query OK, 1 row affected (0.02 sec)
INSERT INTO contacts (name, phone)
VALUES ('Billy', '8781213455');

-- Duplicate entry '8781213455' for key 'contacts.phone'
INSERT INTO contacts (name, phone)
VALUES ('Timmy', '8781213455');
```

**Note** The `PRIMARY KEY` constraint enforces the `UNIQUE` constraint.

### CHECK Constraint

`CHECK` constraints are custom constraints that we can define on a column.

```sql
CREATE TABLE users (
  username VARCHAR(20) NOT NULL,
  age INT CHECK (age >= 0)
);

-- Query OK, 1 row affected (0.02 sec)
INSERT INTO users (username, age)
VALUES ('bluethecat', 50);

-- Check constraint 'users_chk_1' is violated.
INSERT INTO users (username, age)
VALUES ('stoneocean', -3);
```

**example** Create a constraint to only allow words that are palindromes.

```sql
CREATE TABLE palindromes (
  word VARCHAR(100) CHECK (word = REVERSE(word))
);

-- Query OK, 1 row affected (0.03 sec)
INSERT INTO palindromes (word)
VALUES ('racecar');

-- Check constraint 'palindromes_chk_1' is violated.
INSERT INTO palindromes (word)
VALUES ('yusuke');
```

### Named Constraint

We can provide a name to our `CHECK` constraints. This can help us with more readable error messages when our `CHECK` constraints fail.

```sql
CREATE TABLE users (
  username VARCHAR(20) NOT NULL,
  age INT,
  CONSTRAINT age_not_negative CHECK (age >= 0)
);

-- Check constraint 'age_not_negative' is violated.
INSERT INTO users (username, age)
VALUES ('chickenwarrior', -9);
```

## Multiple Column Constraints

We can create constraints that utilize multiple columns.

**example** The name and address are not `UNIQUE` individually but the combination of a name and address must be `UNIQUE`.

```sql
CREATE TABLE companies (
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  CONSTRAINT name_address UNIQUE (name, address)
);

-- Query OK, 1 row affected (0.04 sec)
INSERT INTO companies (name, address)
VALUES ('blackbird auto', '123 spruce');

-- Query OK, 1 row affected (0.04 sec)
INSERT INTO companies (name, address)
VALUES ('luigis pies', '123 spruce');

-- Duplicate entry 'luigis pies-123 spruce' for key 'companies.name_address'
INSERT INTO companies (name, address)
VALUES ('luigis pies', '123 spruce');
```

**example** The `sale_price` of a house must always be greater than or equal to the `purchase_price`;

```sql
CREATE TABLE houses (
  purchase_price INT NOT NULL,
  sale_price INT NOT NULL,
  CONSTRAINT sprice_gt_pprice
    CHECK (sale_price >= purchase_price)
);

-- Query OK, 1 row affected (0.03 sec)
INSERT INTO houses (purchase_price, sale_price)
VALUES (100, 200);

-- Check constraint 'sprice_gt_pprice' is violated.
INSERT INTO houses (purchase_price, sale_price)
VALUES (300, 250);
```

## ALTER TABLE

The `ALTER TABLE` statement is used to add, delete, or modify columns in an existing table.

### Adding Columns

```sql
ALTER TABLE companies
ADD COLUMN phone VARCHAR(15);

SELECT * FROM companies;
```

```
+----------------+------------+-------+
| name           | address    | phone |
+----------------+------------+-------+
| blackbird auto | 123 spruce | NULL  |
| luigis pies    | 123 spruce | NULL  |
+----------------+------------+-------+
2 rows in set (0.00 sec)
```

**Note** By default the value of `NULL` will be used for a new column.

> The `COLUMN` keyword is optional. However, it might be more clear to the reader to alway use the `COLUMN` keyword.

**Note** If we decalare a new column to be `NOT NULL` it will have `DEFAULT` value based on the data type of the column.

```sql
ALTER TABLE companies
ADD COLUMN employee_count INT NOT NULL;

SELECT * FROM companies;
```

```sql
+----------------+------------+-------+----------------+
| name           | address    | phone | employee_count |
+----------------+------------+-------+----------------+
| blackbird auto | 123 spruce | NULL  |              0 |
| luigis pies    | 123 spruce | NULL  |              0 |
+----------------+------------+-------+----------------+
2 rows in set (0.00 sec)
```

**Note** We can also declare our own `DEFAULT` value as desired.

```sql
ALTER TABLE companies
ADD COLUMN employee_count INT NOT NULL DEFAULT 1;

SELECT * FROM companies;
```

```sql
+----------------+------------+-------+----------------+
| name           | address    | phone | employee_count |
+----------------+------------+-------+----------------+
| blackbird auto | 123 spruce | NULL  |              1 |
| luigis pies    | 123 spruce | NULL  |              1 |
+----------------+------------+-------+----------------+
2 rows in set (0.00 sec)
```

### Dropping Columns

```sql
ALTER TABLE companies
DROP COLUMN phone;

SELECT * FROM companies;
```

```
+----------------+------------+----------------+
| name           | address    | employee_count |
+----------------+------------+----------------+
| blackbird auto | 123 spruce |              0 |
| luigis pies    | 123 spruce |              0 |
+----------------+------------+----------------+
2 rows in set (0.00 sec)
```

**Note** `MySQL` will drop the column regardless of if the values in that column are `NULL` or not.

```sql
-- Query OK, 0 rows affected (0.00 sec)
-- Records: 0  Duplicates: 0  Warnings: 0
ALTER TABLE companies
DROP COLUMN employee_count;
```

### Renaming

**Tables**

There are two syntaxes for renaming tables in `MySQL`.

```sql
RENAME TABLE <table_name> TO <new_table_name>;
```

```sql
ALTER TABLE <table_name> RENAME TO <new_table_name>;
```

**example**

```sql
RENAME TABLE companies TO suppliers;

-- Table 'book_shop.companies' doesn't exist
SELECT * FROM companies;

-- 2 rows in set (0.00 sec)
SELECT * FROM suppliers;
```

```sql
ALTER TABLE suppliers RENAME TO companies;

-- Table 'book_shop.suppliers' doesn't exist
SELECT * FROM suppliers;

-- 2 rows in set (0.00 sec)
SELECT * FROM companies;
```

**Columns**

```sql
ALTER TABLE <table_name>
RENAME COLUMN <col_name> TO <new_col_name>;
```

**example**

```sql
ALTER TABLE companies
RENAME COLUMN name TO company_name;

SELECT * FROM companies;
```

```
+----------------+------------+
| company_name   | address    |
+----------------+------------+
| blackbird auto | 123 spruce |
| luigis pies    | 123 spruce |
+----------------+------------+
2 rows in set (0.00 sec)

```

### Modifying Columns

We can modify a column's datatype.

```sql
ALTER TABLE <table_name>
MODIFY <col_name> <new_datatype>;
```

**example**

```sql
DESC companies;
```

```
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| company_name | varchar(255) | NO   | PRI | NULL    |       |
| address      | varchar(255) | NO   | PRI | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
2 rows in set (0.01 sec)
```

```sql
ALTER TABLE companies
MODIFY company_name VARCHAR(100) DEFAULT 'unknown';

DESC companies;
```

```
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| company_name | varchar(100) | YES  | MUL | unknown |       |
| address      | varchar(255) | NO   |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
2 rows in set (0.01 sec)
```

**CHANGE**

We can use the `CHANGE` operator to both rename **and** modify the datatype of a column.

```sql
ALTER TABLE <table_name>
CHANGE <col_name> <new_col_name> <new_datatype>;
```

### Constraints

We can **add** constraints to our table.

```sql
ALTER TABLE <table_name>
  ADD CONSTRAINT <constaint_name>
  CHECK <check_expression>
```

```sql
ALTER TABLE houses
  ADD CONSTRAINT positive_pprice
  CHECK (purchase_price >= 0);
```

```
Query OK, 1 row affected (0.00 sec)
Records: 1  Duplicates: 0  Warnings: 0
```

```sql
-- Check constraint 'positive_pprice' is violated.
INSERT INTO houses (purchase_price, sale_price)
VALUES (-100, 400);
```

We can also **drop** constraints to our table.

```sql
ALTER TABLE <table_name>
  DROP {CHECK | CONSTRAINT} <check_or_constraint_name>
```

```sql
ALTER TABLE houses
  DROP CONSTRAINT positive_pprice;
```

```
Query OK, 0 rows affected (0.00 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

```sql
-- Query OK, 1 row affected (0.00 sec)
INSERT INTO houses (purchase_price, sale_price)
VALUES (-100, 400);
```
