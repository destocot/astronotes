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

`DECIMAL` can be more exact than `FLOAT` or `DOUBLE` but can take up more space.

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

> Adding DEFAULT and ON UPDATE in the column definition to get automatic initialization and updating to the current date and time. [See here](#default--on-update-timestamps)

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

`CURDATE()` - Returns the current date (same as `CURRENT_DATE`)

`CURTIME()` - Returns the current time (same as `CURRENT_TIME`)

`NOW()` - Returns the current date and time (same as `CURRENT_TIMESTAMP`)

```sql
-- 2024-05-20
SELECT CURDATE();

-- 18:30:00
SELECT CURTIME();

-- 2024-05-20 18:30:00
SELECT NOW();
```

```sql
INSERT INTO profiles (name, birthdate, birthtime, birthdt)
VALUES ('Hazel', CURDATE(), CURTIME(), NOW());

SELECT * FROM profiles WHERE name = 'Hazel';
```

```
+-------+------------+-----------+---------------------+
| name  | birthdate  | birthtime | birthdt             |
+-------+------------+-----------+---------------------+
| Hazel | 2024-05-20 | 18:30:00  | 2024-05-20 18:30:00 |
+-------+------------+-----------+---------------------+
1 row in set (0.00 sec)
```

## Date Functions

Date functions can be useful in formatting dates or extracting parts of a date that are relevant to us.

### DAY

`DAY` - Returns the day of the month for a given date

```sql
SELECT birthdate, DAY(birthdate) FROM profiles;
```

```
+------------+----------------+
| birthdate  | DAY(birthdate) |
+------------+----------------+
| 2000-12-25 |             25 |
| 1985-04-11 |             11 |
| ...                         |
+------------+----------------+
4 rows in set (0.00 sec)
```

### DAYOFWEEK

`DAYOFWEEK` - Returns the weekday index for a given date

```sql
SELECT birthdate, DAYOFWEEK(birthdate) FROM profiles;
```

```
+------------+----------------------+
| birthdate  | DAYOFWEEK(birthdate) |
+------------+----------------------+
| 2000-12-25 |                    2 |
| 1985-04-11 |                    5 |
| ...                               |
+------------+----------------------+
4 rows in set (0.00 sec)
```

### DAYOFYEAR

`DAYOFYEAR` - Returns the day of the year for a given date

```sql
SELECT birthdate, DAYOFYEAR(birthdate) FROM profiles;
```

```
+------------+----------------------+
| birthdate  | DAYOFYEAR(birthdate) |
+------------+----------------------+
| 2000-12-25 |                  360 |
| 1985-04-11 |                  101 |
| ...                               |
+------------+----------------------+
4 rows in set (0.00 sec)
```

### MONTHNAME

`MONTHNAME` - Returns the name of the month for a given date

```sql
SELECT birthdate, MONTHNAME(birthdate) FROM profiles;
```

```
+------------+----------------------+
| birthdate  | MONTHNAME(birthdate) |
+------------+----------------------+
| 2000-12-25 | December             |
| 1985-04-11 | April                |
| ...                               |
+------------+----------------------+
4 rows in set (0.00 sec)
```

### YEAR

`YEAR` - Returns the year part for a given date

```sql
SELECT name, birthdt, YEAR(birthdt) FROM profiles;
```

```
+-------+---------------------+---------------+
| name  | birthdt             | YEAR(birthdt) |
+-------+---------------------+---------------+
| Elton | 2000-12-25 11:00:00 |          2000 |
| Lulu  | 1985-04-11 09:45:10 |          1985 |
| ...                                         |
+-------+---------------------+---------------+
4 rows in set (0.00 sec)
```

## Time Functions

### HOUR

`HOUR` - Returns the hour part for a given date

```sql
SELECT name, birthtime, HOUR(birthtime) FROM profiles;
```

```
+-------+-----------+-----------------+
| name  | birthtime | HOUR(birthtime) |
+-------+-----------+-----------------+
| Elton | 11:00:00  |              11 |
| Lulu  | 09:45:10  |               9 |
| ...                                 |
+-------+-----------+-----------------+
4 rows in set (0.00 sec)
```

### MINUTE

`MINUTE` - Returns the minute part of a time/datetime

```sql
SELECT name, birthtime, MINUTE(birthtime) FROM profiles;
```

```
+-------+-----------+-------------------+
| name  | birthtime | MINUTE(birthtime) |
+-------+-----------+-------------------+
| Elton | 11:00:00  |                 0 |
| Lulu  | 09:45:10  |                45 |
| ...                                   |
+-------+-----------+-------------------+
4 rows in set (0.00 sec)
```

### SECOND

`SECOND` - Returns the seconds part of a time/datetime

```sql
SELECT name, birthtime, SECOND(birthtime) FROM profiles;
```

```
+-------+-----------+-------------------+
| name  | birthtime | SECOND(birthtime) |
+-------+-----------+-------------------+
| Elton | 11:00:00  |                 0 |
| Lulu  | 09:45:10  |                10 |
| ...                                   |
+-------+-----------+-------------------+
4 rows in set (0.00 sec)
```

**Note** We can isolate the `DATE` or `TIME` from a `DATETIME`

```sql
SELECT birthdt, DATE(birthdt), TIME(birthdt) FROM profiles;
```

```
+---------------------+---------------+---------------+
| birthdt             | DATE(birthdt) | TIME(birthdt) |
+---------------------+---------------+---------------+
| 2000-12-25 11:00:00 | 2000-12-25    | 11:00:00      |
| 1985-04-11 09:45:10 | 1985-04-11    | 09:45:10      |
| ...                                                 |
+---------------------+---------------+---------------+
4 rows in set (0.00 sec)
```

## Formatting Dates

### DATE_FORMAT

`DATE_FORMAT(date, specifier)` function formats a date as specified.

- first argument is the date to be formatted
- second argument is the format to use

[MySQL DATE_FORMAT](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-format)

**example** Get a date in the following format

`<weekday_abbreviated> <month_abbreviated> <day_without_leading_zero>, <year>`

(i.e. Thu Apr 11, 1985)

```sql
-- %a - abbreviated weekday name (Sun to Sat)
-- %b - abbreviated month name (Jan to Dec)
-- %e - day of the month as a numeric value (0 to 31)
-- %Y - year as a numeric, 4-digit value
SELECT birthdate, DATE_FORMAT(birthdate, '%a %b %e, %Y')
FROM profiles;
```

```
+------------+----------------------------------------+
| birthdate  | DATE_FORMAT(birthdate, '%a %b %e, %Y') |
+------------+----------------------------------------+
| 2000-12-25 | Mon Dec 25, 2000                       |
| 1985-04-11 | Thu Apr 11, 1985                       |
| ...                                                 |
+------------+----------------------------------------+
4 rows in set (0.00 sec)
```

### TIME_FORMAT

`TIME_FORMAT(date, specifier)` function formats a time by a specified format.

- first argument is the date to be formatted
- second argument is the format to use

**example** Get a date in the following format

`<weekday_abbreviated> <month_abbreviated> <day_without_leading_zero>, <year>`

(i.e. Thu Apr 11, 1985)

```sql
-- %h - Hour (01..12)
-- %i - Minutes, numeric (00..59)
-- %s - Seconds (00..59)
-- %p - AM or PM
SELECT birthtime, TIME_FORMAT(birthtime, "%h:%i:%s %p")
FROM profiles;
```

```
+-----------+---------------------------------------+
| birthtime | TIME_FORMAT(birthtime, "%h:%i:%s %p") |
+-----------+---------------------------------------+
| 11:00:00  | 11:00:00 AM                           |
| 09:45:10  | 09:45:10 AM                           |
| ...                                               |
+-----------+---------------------------------------+
4 rows in set (0.01 sec)
```

**Note** The `TIME_FORMAT` is restricted to only using the time format specifies (hours, minutes, seconds, etc.)

## Date Math

### DATEDIFF

`DATEDIFF()` function returns the **number of days** between two date values.

```sql
SELECT birthdate, DATEDIFF(CURDATE(), birthdate)
FROM profiles;
```

```
+------------+--------------------------------+
| birthdate  | DATEDIFF(CURDATE(), birthdate) |
+------------+--------------------------------+
| 2000-12-25 |                           8548 |
| 1985-04-11 |                          14285 |
| ...                                         |
+------------+--------------------------------+
4 rows in set (0.00 sec)
```

### DATE_ADD & DATE_SUB

`DATE_ADD(date, INTERVAL value addunit)` function adds a time/date interval to a date and then returns the date.

`DATE_SUB(date, INTERVAL value subunit)` function subtracts a time/date interval from a date and then returns the date. (More flexibile than `DATE_DIFF`)

- first argument is the date to be modified
- second argument is the value of the time/date interval to add. Both positive and negative values are allowed. The `addunit/subunit` is the type of interval to add.

[MySQL Temportal Interval](https://dev.mysql.com/doc/refman/8.0/en/expressions.html#temporal-intervals)

```sql
-- 2024-05-21
SELECT CURDATE();

-- 2025-05-21
SELECT DATE_ADD(CURDATE(), INTERVAL 1 YEAR);

-- 2024-04-21
SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH);
```

```sql
SELECT birthdate, DATE_ADD(birthdate, INTERVAL 18 YEAR)
FROM profiles;
```

```
+------------+---------------------------------------+
| birthdate  | DATE_ADD(birthdate, INTERVAL 18 YEAR) |
+------------+---------------------------------------+
| 2000-12-25 | 2018-12-25                            |
| 1985-04-11 | 2003-04-11                            |
| ...                                                |
+------------+---------------------------------------+
4 rows in set (0.00 sec)
```

**Note** We also have `ADDTIME()`, `SUBTIME()`, and `TIMEDIFF()` to work specifically with time.

```sql
SELECT TIMEDIFF(CURTIME(), '07:00:00');
```

```
+---------------------------------+
| TIMEDIFF(CURTIME(), '07:00:00') |
+---------------------------------+
| 12:37:09                        |
+---------------------------------+
1 row in set (0.00 sec)
```

**Note** We can also use the `+` and the `-` operator to do operatins with time.

```sql
-- 2006-05-21 19:38:03
SELECT NOW() - INTERVAL 18 YEAR;
```

```sql
SELECT
  name,
  birthdate,
  YEAR(birthdate + INTERVAL 21 YEAR) AS year_turns_21
FROM profiles;
```

```
+-------+------------+---------------+
| name  | birthdate  | year_turns_21 |
+-------+------------+---------------+
| Elton | 2000-12-25 |          2021 |
| Lulu  | 1985-04-11 |          2006 |
| ...                                |
+-------+------------+---------------+
4 rows in set (0.00 sec)
```

## TIMESTAMPS

`TIMESTAMP()` function returns a datetime value based on a date or datetime value.

- first argument - is a date or datetime value
- second argument (optional) - is a time value to add to expression

`TIMESTAMP` has a range of `1970-01-01 00:00:01 UTC` to `2038-01-19 03:14:07 UTC`. Which allows it to take up **less space** than a `DATETIME`.

```sql
-- 2024-05-21 19:50:42
SELECT TIMESTAMP(NOW());
```

## DEFAULT & ON UPDATE TIMESTAMPS

```sql
CREATE TABLE captions (
  text VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO captions (text)
VALUES
  ('staying warm in the blizzard'),
  ('viewing a beautiful sunset');

SELECT * FROM captions;
```

```
+------------------------------+---------------------+
| text                         | created_at          |
+------------------------------+---------------------+
| staying warm in the blizzard | 2024-05-21 20:06:43 |
| viewing a beautiful sunset   | 2024-05-21 20:06:43 |
+------------------------------+---------------------+
2 rows in set (0.00 sec)
```

> Here, the `created_at` column is given the default value of the `CURRENT_TIMESTAMP`

[MySQL Automatic Initialization and Updating for TIMESTAMP and DATETIME](https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html)

```sql
CREATE TABLE captions (
  text VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO captions (text)
VALUES ('days feel like the perfect length');

SELECT * FROM captions;
```

```
+-----------------------------------+---------------------+---------------------+
| text                              | created_at          | updated_at          |
+-----------------------------------+---------------------+---------------------+
| days feel like the perfect length | 2024-05-21 20:11:25 | 2024-05-21 20:11:25 |
+-----------------------------------+---------------------+---------------------+
1 row in set (0.00 sec)
```

```sql
-- update every row
UPDATE captions SET text = 'but the years feel way too short';

SELECT * FROM captions;
```

```
+----------------------------------+---------------------+---------------------+
| text                             | created_at          | updated_at          |
+----------------------------------+---------------------+---------------------+
| but the years feel way too short | 2024-05-21 20:11:25 | 2024-05-21 20:14:01 |
+----------------------------------+---------------------+---------------------+
1 row in set (0.00 sec)
```

> The `updated_at` field will automatically update to the `CURRENT_TIMESTAMP` anytime we update our row.

```sql
-- update every row
UPDATE captions SET text = 'for my soul, corazón ';

SELECT * FROM captions;
```

```
+-----------------------+---------------------+---------------------+
| text                  | created_at          | updated_at          |
+-----------------------+---------------------+---------------------+
| for my soul, corazón  | 2024-05-21 20:11:25 | 2024-05-21 20:15:23 |
+-----------------------+---------------------+---------------------+
1 row in set (0.00 sec)
```

**Note** Similarly, we can create a `DEFAULT` and an `ON UPDATE` for `DATETIME`.
