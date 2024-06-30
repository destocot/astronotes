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
SELECT *
FROM users
ORDER BY created_at
LIMIT 5;
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

**Prompt:** What day of the week do most users register on?

We need to figure out when to schedule an ad campaign

```sql
SELECT
  COUNT(*) AS total_users,
  DAYNAME(created_at) AS day_of_week
FROM users
GROUP BY day_of_week
ORDER BY total_users DESC;
-- LIMIT 2;
```

```
+-------------+-------------+
| total_users | day_of_week |
+-------------+-------------+
|          16 | Thursday    |
|          16 | Sunday      |
|          15 | Friday      |
|          14 | Tuesday     |
|          14 | Monday      |
|          13 | Wednesday   |
|          12 | Saturday    |
+-------------+-------------+
7 rows in set (0.00 sec)
```

### Alternative Solution 1

Using `CASE` to map the day of the week to the name.

```sql
SELECT
  COUNT(*) AS total_users,
  CASE DAYOFWEEK(created_at)
    WHEN 1 THEN 'Sunday'
    WHEN 2 THEN 'Monday'
    WHEN 3 THEN 'Tuesday'
    WHEN 4 THEN 'Wednesday'
    WHEN 5 THEN 'Thursday'
    WHEN 6 THEN 'Friday'
    WHEN 7 THEN 'Saturday'
  END AS day_of_week
FROM users
GROUP BY day_of_week
ORDER BY total_users DESC;
-- LIMIT 2;
```

### Alternative Solution 2

Using `DATE_FORMAT` to format the `created_at` column.

```sql
SELECT
  COUNT(*) AS total_users,
  DATE_FORMAT(created_at, '%a') AS day_of_week
FROM users
GROUP BY day_of_week
ORDER BY total_users DESC;
-- LIMIT 2;
```

## Instagram Challenge #3

**Prompt:** We want to target our inactive users with an email campaign.

Find the users who have never posted a photo.

```sql
SELECT
  users.user_id,
  username,
  photo_id
FROM users
LEFT JOIN photos ON users.user_id = photos.user_id
WHERE photo_id IS NULL;
```

```
+---------+---------------------+----------+
| user_id | username            | photo_id |
+---------+---------------------+----------+
|       5 | Aniya_Hackett       |     NULL |
|      83 | Bartholome.Bernhard |     NULL |
|      91 | Bethany20           |     NULL |
|      80 | Darby_Herzog        |     NULL |
|     ... | ...                 |     NULL |
+---------+---------------------+----------+
26 rows in set (0.01 sec)
```

### Alternative Solution 1

Using the `USING` clause to join on the `user_id` column.

```sql
SELECT
  users.user_id,
  username,
  photo_id
FROM users
LEFT JOIN photos USING (user_id)
WHERE photo_id IS NULL;
```

### Alternative Solution 2

Using the `HAVING` clause to filter the results.

```sql
SELECT
  users.user_id,
  username,
  COUNT(photo_id) AS photo_count
FROM users LEFT JOIN photos ON users.user_id = photos.user_id GROUP BY users.user_id
HAVING photo_count = 0;
```

### Alternative Solution 3

Using a `RIGHT JOIN` to find the users who have not posted a photo.

```sql
SELECT
  users.user_id,
  username,
  photo_id
FROM photos
RIGHT JOIN users ON photos.user_id = users.user_id
WHERE photo_id IS NULL;
```

## Instagram Challenge #4

## Instagram Challenge #5

## Instagram Challenge #6

## Instagram Challenge #7
