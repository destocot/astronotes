---
title: "Working With Lots of IG Data"
sidebar:
  order: 17
---

## Getting Lots of Instagram Data

[Download ig_clone_data.sql](/ig_clone_data/ig_clone_data.sql)

```
mysql> source ig_clone_data.sql
```

## Instagram Challenge #1

**Prompt:** We want to reward our `users` who have been around the longest. Find the 5 oldest users.

```sql
SELECT * FROM users
ORDER BY created_at LIMIT 5;
```

```
+---------+------------------+---------------------+
| user_id | username         | created_at          |
+---------+------------------+---------------------+
|      80 | Darby_Herzog     | 2016-05-06 00:14:21 |
|      67 | Emilio_Bernier52 | 2016-05-06 13:04:30 |
|      63 | Elenor88         | 2016-05-08 01:30:41 |
|      95 | Nicole71         | 2016-05-09 17:30:22 |
|      38 | Jordyn.Jacobson2 | 2016-05-14 07:56:26 |
+---------+------------------+---------------------+
5 rows in set (0.00 sec)
```

## Instagram Challenge #2

## Instagram Challenge #3

## Instagram Challenge #4

## Instagram Challenge #5

## Instagram Challenge #6

## Instagram Challenge #7
