---
title: "Revisiting Data Types"
slug: "revisiting-data-types"
sidebar:
  order: 9
---

## Overview

[Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

## CHAR vs VARCHAR

`CHAR(size)` - A FIXED length string (can contain letters, numbers, and special characters). The size parameter specifies the column length in characters - can be from 0 to 255. Default is 1

**Note** When CHAR values are stored, they are right-padded with spaces to the specified length. When CHAR values are retrieved, trailing spaces are removed unless the PAD_CHAR_TO_FULL_LENGTH SQL mode is enabled.

`VARCHAR(size)` - A VARIABLE length string (can contain letters, numbers, and special characters). The size parameter specifies the maximum column length in characters - can be from 0 to 65535

**example**

```sql
CREATE TABLE states (name VARCHAR(255), abbreviation CHAR(2));
```

> It is more efficient to use `CHAR` over `VARCHAR` when our data is similar in size (i.e. state abbreivations, yes/no flags, zip codes)

**Note** By default `MySQL` is in strict mode, therefore, it will throw an error if the `CHAR` or `VARCHAR` that is inserted exceeds the size parameter of the column.

## INT, TINYINT, & BIGINT

`TINYINT(size)` - Signed range is from -128 to 127. Unsigned range is from 0 to 255.

**example**

```sql
-- By using `UNSIGNED` we specify the range to be 0-255
CREATE TABLE parents (children TINYINT UNSIGNED);
```

`SMALLINT(size)` - Signed range is from -32768 to 32767. Unsigned range is from 0 to 65535.

`MEDIUMINT(size)` - Signed range is from -8388608 to 8388607. Unsigned range is from 0 to 16777215.

`INT(size)` - Signed range is from -2147483648 to 2147483647. Unsigned range is from 0 to 4294967295 (same as `INTEGER(size)`).

**example**

```sql
CREATE TABLE products (quantity INT);
```

`BIGINT(size)` - Signed range is from -9223372036854775808 to 9223372036854775807. Unsigned range is from 0 to 18446744073709551615.

> The size parameter specifies the maximum display width (which is 255)

**Note** `MySQL` will throw an "out of range value" error if the value inserted exceeds the size parameter of the column.

## DECIMAL

`DECIMAL` can be more exact than `FLOAT` or `DOUBLE` but can take up moer space.

`DEC(size, d)` - An exact fixed-point number. The total number of digits is specified in size. The number of digits after the decimal point is specified in the d parameter. The maximum number for size is 65. The maximum number for d is 30. The default value for size is 10. The default value for d is 0 (same as `DECIMAL(size, d)`).

```sql
-- five digits, two of which come after the decimal
CREATE TABLE products (price DECIMAL(5,2));
```

**Note** `MySQL` will throw an "out of range value" error if we have more than (`5 - 2 = 3`) digits before the decimal point we will be out of range (i.e. `8347.9`)

### WARNINGS

```sql
INSERT INTO products (price) VALUES (5.026);
```

```
Query OK, 1 row affected, 1 warning (0.00 sec)
```

```sql
SHOW WARNINGS;
```

```
+-------+------+--------------------------------------------+
| Level | Code | Message                                    |
+-------+------+--------------------------------------------+
| Note  | 1265 | Data truncated for column 'price' at row 1 |
+-------+------+--------------------------------------------+
1 row in set (0.00 sec)
```

> If we have a more precise (more digits after the decimal than allocated) we get a **warning** and are provided a less precise value inserted into our table.

## FLOAT & DOUBLE

`FLOAT` and `DOUBLE` can store large numbers using less space than `DECIMAL` **BUT** it comes at the cost of precision.

`FLOAT`

- Memory Needed: 4 Bytes
- Precision Issues: 7 digits

`DOUBLE`

- Memory Needed: 8 Bytes
- Precision Issues: 15 digits

**example**

```sql
CREATE TABLE measurement_data (
  measurement_float FLOAT,
  measurement_double DOUBLE
);

INSERT INTO measurement_data (5.05202024, 5.05202024);
SELECT * FROM measurement_data;
```

```
+-------------------+--------------------+
| measurement_float | measurement_double |
+-------------------+--------------------+
| 5.05202           | 5.05202024         |
+--------------------+-------------------+
1 row in set (0.00 sec)
```

## DATE & TIME

`DATE` - Values with a date **but** no time. Format: YYYY-MM-DD. The supported range is from '1000-01-01' to '9999-12-31'.

`TIME` - Values with a time **but** no date. Format: hh:mm:ss. The supported range is from '-838:59:59' to '838:59:59'.

`DATETIME` - Values with a data **and** a time. Format: YYYY-MM-DD hh:mm:ss. The supported range is from '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.

> Adding DEFAULT and ON UPDATE in the column definition to get automatic initialization and updating to the current date and time.

```sql
CREATE TABLE users (
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Working With Dates

```sql
CREATE TABLE profiles (
  name VARCHAR(100),
  birthdate DATE,
  birthtime TIME,
  birthdt DATETIME
);

DESC profiles;
```

```
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| name      | varchar(100) | YES  |     | NULL    |       |
| birthdate | date         | YES  |     | NULL    |       |
| birthtime | time         | YES  |     | NULL    |       |
| birthdt   | datetime     | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

```sql
INSERT INTO profiles (name, birthdate, birthtime, birthdt)
VALUES
  ('Elton', '2000-12-25', '11:00:00', '2000-12-25 11:00:00'),
  ('Lulu', '1985-04-11', '9:45:10', '1985-04-11 9:45:10'),
  ('Juan', '2020-08-15', '23:59:00', '2020-08-15 23:59:00');

SELECT * FROM profiles;
```

```
+-------+------------+-----------+---------------------+
| name  | birthdate  | birthtime | birthdt             |
+-------+------------+-----------+---------------------+
| Elton | 2000-12-25 | 11:00:00  | 2000-12-25 11:00:00 |
| Lulu  | 1985-04-11 | 09:45:10  | 1985-04-11 09:45:10 |
| Juan  | 2020-08-15 | 23:59:00  | 2020-08-15 23:59:00 |
+-------+------------+-----------+---------------------+
3 rows in set (0.00 sec)
```

**Note** Dates and times will be given a leading `0` if needed.

## CURDATE, CURTIME, & NOW

## Date Functions

## Time Functions

## Formatting Dates

## Date Math

## TIMESTAMPS

## DEFAULT & ON UPDATE TIMESTAMPS

```

```
