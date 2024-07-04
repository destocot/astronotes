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

### DELIMITER

```sql
DELIMITER $$

CREATE TRIGGER must_be_adult
  -- ...
$$

DELIMITER ;
```

Since we are using multiple statements we change the `DELIMITER` to `$$` so that we are not executing any code while creating our `TRIGGER`. Now, the `$$` will represent the end of our statement to be executed.

We then change our `DELIMITER` back to to `;` after creating our `TRIGGER`

## MySQL Errors

There are three components to a mysql error.

1. A numeric error code (e.g. `1146`)

- This number is a MySQL-specific error code

2. A five-character SQLSTATE VALUE (e.g. `42S02`)

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

### SQLSTATE '45000'

```sql
SIGNAL SQLSTATE '45000'
  SET MESSAGE_TEXT = 'Must be an adult!';
```

SQLSTATE '45000' represents a generic state "unhandled user-defined exeption"

## Preventing Instagram Self-Follows With Triggers

> See `ig_clone_data` from [previous section](/mysql/working-with-lots-of-ig-data)

```sql
DELIMITER $$

CREATE TRIGGER prevent_self_follows
  BEFORE INSERT ON follows FOR EACH ROW
  BEGIN
    IF NEW.follower_id = NEW.followee_id
    THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'You cannot follow yourself!';
    END IF;
  END;
$$

DELIMITER ;
```

```sql
INSERT INTO follows (follower_id, followee_id)
VALUES (4, 4);
```

```
ERROR 1644 (45000): You cannot follow yourself!
```

## Creating Logger Triggers

We can create new data using `TRIGGERS` that act on certain actions.

**Example** Logging the `unfollow` action in our `ig_clone` database.

```sql
CREATE TABLE unfollows (
  created_at TIMESTAMP DEFAULT NOW(),

  follower_id INTEGER NOT NULL,
  FOREIGN KEY (follower_id) REFERENCES users(user_id),

  followee_id INTEGER NOT NULL,
  FOREIGN KEY (followee_id) REFERENCES users(user_id),

  -- Composite Primary Key
  PRIMARY KEY (follower_id, followee_id)
);
```

```sql
DELIMITER $$

CREATE TRIGGER capture_unfollow
  AFTER DELETE on follows FOR EACH ROW
  BEGIN
    INSERT INTO unfollows (follower_id, followee_id)
    VALUES (OLD.follower_id, OLD.followee_id);
  END;
$$

DELIMITER ;
```

### Alternative `TRIGGER` syntax using `SET`

```sql
DELIMITER $$

CREATE TRIGGER capture_unfollow
  AFTER DELETE on follows FOR EACH ROW
  BEGIN
    INSERT INTO unfollows
    SET follower_id = OLD.follower_id,
        followee_id = OLD.followee_id;
  END;
$$

DELIMITER ;
```

### Testing Logging

```sql
DELETE FROM follows WHERE follower_id = 2 AND followee_id = 1;
-- Query OK, 1 row affected (0.00 sec)
```

```sql
SELECT * FROM unfollows;
```

```
+---------------------+-------------+-------------+
| created_at          | follower_id | followee_id |
+---------------------+-------------+-------------+
| 2024-07-04 13:48:54 |           2 |           1 |
+---------------------+-------------+-------------+
1 row in set (0.00 sec)
```

## Managing Triggers and a Warning

### Listing Triggers

```sql
SHOW TRIGGERS;
```

```
+----------------------+--------+---------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+------------------------+-----------------------------------------------------------------------------------------------------------------------+----------------+----------------------+----------------------+--------------------+
| Trigger              | Event  | Table   | Statement                                                                                                                                                       | Timing | Created                | sql_mode                                                                                                              | Definer        | character_set_client | collation_connection | Database Collation |
+----------------------+--------+---------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+------------------------+-----------------------------------------------------------------------------------------------------------------------+----------------+----------------------+----------------------+--------------------+
| prevent_self_follows | INSERT | follows | BEGIN
    IF NEW.follower_id = NEW.followee_id
    THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'You cannot follow yourself!';
    END IF;
  END | BEFORE | 2024-07-04 13:33:42.12 | ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION | root@localhost | utf8mb4              | utf8mb4_0900_ai_ci   | utf8mb4_0900_ai_ci |
| capture_unfollow     | DELETE | follows | BEGIN
    INSERT INTO unfollows
    SET follower_id = OLD.follower_id,
        followee_id = OLD.followee_id;
  END                                             | AFTER  | 2024-07-04 13:47:08.98 | ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION | root@localhost | utf8mb4              | utf8mb4_0900_ai_ci   | utf8mb4_0900_ai_ci |
+----------------------+--------+---------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+------------------------+-----------------------------------------------------------------------------------------------------------------------+----------------+----------------------+----------------------+--------------------+
2 rows in set (0.00 sec)
```

### Remove Triggers

```sql
DROP TRIGGER <trigger_name>;
```

```sql
DROP TRIGGER prevent_self_follows;
-- Query OK, 0 rows affected (0.00 sec)
```

### Word of Warning

**Note** Triggers can make debugging hard!
