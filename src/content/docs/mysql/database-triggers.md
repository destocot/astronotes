---
title: "Database Triggers"
sidebar:
  order: 18
---

## Introduction to Database Triggers

Database Triggers are SQL statements that are AUTOMATICALLY RUN when a specific table is changed

### Syntax

```sql
CREATE TRIGGER <trigger_name>
  <trigger_time> <trigger_event> ON <table_name> FOR EACH ROW
  BEGIN
  ...
  END;
```

**`trigger_time`**

- BEFORE
- AFTER

**`trigger_event`**

- INSERT
- UPDATE
- DELETE

## Writing Our First Trigger

```sql
-- we change the default DELIMITER ';' so that we can use
-- ';' in our trigger definition without ending the statement
DELIMITER $$

CREATE TRIGGER must_be_adult
  BEFORE INSERT ON users FOR EACH ROW
  BEGIN
    IF NEW.age < 18
    THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Must be an adult!';
    END IF;
  END;
$$

-- we restore the DELIMITER back to it's default ';'
DELIMITER ;
```

```
Query OK, 0 rows affected (0.00 sec)
```

Right `BEFORE` data is `INSERT`ed into table `users`, we will check if the `NEW` user row's age is < 18.

- If it is we will throw an error.
- Otherwise, we will proceed normally.

```sql
INSERT INTO users (username, age)
VALUES ("Sue", 54);
-- Query OK, 1 row affected (0.00 sec)
```

```sql
INSERT INTO users (username, age)
VALUES ("Yang", 14);
-- ERROR 1644 (45000): Must be an adult!
```

## MySQL Errors

There are three components to a mysql error.

1. A numeric error code (e.g. 1146)

- This number is a MySQL-specific error code

2. A five-character SQLSTATE VALUE (e.g. '42S02')

- The values are taken from ANSI SQL and ODBC and are more standardized.

3. A message string

- A textual description of the error

[MySQL Server Error Message Reference](https://dev.mysql.com/doc/mysql-errors/8.4/en/server-error-reference.html)

**Example**

```sql
SELECT * FROM table_does_not_exist;
```

```
ERROR 1146 (42S02): Table 'trigger_demo.table_does_not_exist' doesn't exist
```

From **MySQL** Documentation

```
Error number: 1146; Symbol: ER_NO_SUCH_TABLE; SQLSTATE: 42S02

Message: Table '%s.%s' doesn't exist
```

## Preventing Instagram Self-Follows With Triggers

## Creating Logger Triggers

## Managing Triggers and a Warning
