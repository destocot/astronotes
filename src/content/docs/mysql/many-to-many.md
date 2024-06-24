---
title: "Many to many"
sidebar:
  order: 13
---

## Many to Many Relationship

### Setup Reviewers Table

```sql
CREATE TABLE reviewers(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);
```

### Setup Series Table

```sql
CREATE TABLE series(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  released_year YEAR NOT NULL,
  genre VARCHAR(100) NOT NULL
);
```

### Setup Reviews Table

```sql
CREATE TABLE reviews(
  id INT PRIMARY KEY AUTO_INCREMENT,
  rating DECIMAL(2,1) NOT NULL,
  series_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  FOREIGN KEY(series_id) REFERENCES series(id),
  FOREIGN KEY(reviewer_id) REFERENCES reviewers(id)
);
```

### Initial Data

```sql
INSERT INTO series (title, released_year, genre) VALUES
  ('Archer', 2009, 'Animation'),
  ('Arrested Development', 2003, 'Comedy'),
  ("Bob's Burgers", 2011, 'Animation'),
  ('Bojack Horseman', 2014, 'Animation'),
  ("Breaking Bad", 2008, 'Drama'),
  ('Curb Your Enthusiasm', 2000, 'Comedy'),
  ("Fargo", 2014, 'Drama'),
  ('Freaks and Geeks', 1999, 'Comedy'),
  ('General Hospital', 1963, 'Drama'),
  ('Halt and Catch Fire', 2014, 'Drama'),
  ('Malcolm In The Middle', 2000, 'Comedy'),
  ('Pushing Daisies', 2007, 'Comedy'),
  ('Seinfeld', 1989, 'Comedy'),
  ('Stranger Things', 2016, 'Drama');
```

```sql
INSERT INTO reviewers (first_name, last_name) VALUES
  ('Thomas', 'Stoneman'),
  ('Wyatt', 'Skaggs'),
  ('Kimbra', 'Masters'),
  ('Domingo', 'Cortes'),
  ('Colt', 'Steele'),
  ('Pinkie', 'Petit'),
  ('Marlon', 'Crafford');
```

```sql
INSERT INTO reviews(series_id, reviewer_id, rating) VALUES
  (1,1,8.0),(1,2,7.5),(1,3,8.5),(1,4,7.7),(1,5,8.9),
  (2,1,8.1),(2,4,6.0),(2,3,8.0),(2,6,8.4),(2,5,9.9),
  (3,1,7.0),(3,6,7.5),(3,4,8.0),(3,3,7.1),(3,5,8.0),
  (4,1,7.5),(4,3,7.8),(4,4,8.3),(4,2,7.6),(4,5,8.5),
  (5,1,9.5),(5,3,9.0),(5,4,9.1),(5,2,9.3),(5,5,9.9),
  (6,2,6.5),(6,3,7.8),(6,4,8.8),(6,2,8.4),(6,5,9.1),
  (7,2,9.1),(7,5,9.7),
  (8,4,8.5),(8,2,7.8),(8,6,8.8),(8,5,9.3),
  (9,2,5.5),(9,3,6.8),(9,4,5.8),(9,6,4.3),(9,5,4.5),
  (10,5,9.9),
  (13,3,8.0),(13,4,7.2),
  (14,2,8.5),(14,3,8.9),(14,4,8.9);
```

## Challenge 1

Write an SQL query to retrieve the `title` and `rating` of series by joining the `series` and `reviews` tables.

```sql
-- 47 rows in set (0.00 sec)
SELECT title, rating
FROM series
JOIN reviews ON series.id = reviews.series_id;
```

## Challenge 2

Write an SQL query to retrieve the `title` and **average rating** of each series by joining the `series` and `reviews` tables, grouping by `series`, and ordering the results by average rating.

```sql
-- 12 rows in set (0.00 sec)
SELECT title, AVG(rating) AS avg_rating
FROM series
JOIN reviews ON series.id = reviews.series_id
GROUP BY series.id
ORDER BY avg_rating;
```

### ROUND

We can also rounded the `avg_rating` using the `ROUND` function.

```sql
-- 12 rows in set (0.00 sec)
SELECT title, ROUND(AVG(rating), 2) AS avg_rating
FROM series
JOIN reviews ON series.id = reviews.series_id
GROUP BY series.id
ORDER BY avg_rating;
```

## Challenge 3

Write an SQL query to retrieve the `first_name`, `last_name`, and `rating` of reviewers by joining the `reviewers` and `reviews` tables.

```sql
-- 47 rows in set (0.00 sec)
SELECT first_name, last_name, rating
FROM reviewers
JOIN reviews ON reviewers.id = reviews.reviewer_id;
```

## Challenge 4

Write an SQL query to retrieve the titles of series that have not been reviewed by using a LEFT JOIN between the `series` and `reviews` tables and filtering for null ratings.

```sql
-- 2 rows in set (0.00 sec)
SELECT title as unreviewer_series
FROM series
LEFT JOIN reviews ON series.id = reviews.series_id
WHERE rating IS NULL;
```

## Challenge 5

Write an SQL query to retrieve the `genre` and the **average rating** for each genre by joining the `series` and `reviews` tables and grouping by `genre`.

```sql
-- 3 rows in set (0.00 sec)
SELECT genre, ROUND(AVG(rating), 2) AS avg_rating
FROM series
JOIN reviews ON series.id = reviews.series_id
GROUP BY genre;
```

## Challenge 6

Write an SQL query to retrieve the `first name`, `last name`, **review count**, **minimum rating**, **maximum rating**, **average rating**, and **status** ('ACTIVE' if they have reviews, 'INACTIVE' if they don't) of reviewers by using a LEFT JOIN between the `reviewers` and `reviews` tables and grouping by `reviewers`.

```sql
SELECT
  first_name,
  last_name,
  COUNT(rating) AS COUNT,
  IFNULL(MIN(rating), 0) AS MIN,
  IFNULL(MAX(rating), 0) AS MAX,
  ROUND(IFNULL(AVG(rating), 0), 2) AS AVG,
  CASE
    WHEN COUNT(rating)  > 0 THEN 'ACTIVE'
    ELSE 'INACTIVE'
  END AS STATUS
FROM reviewers
LEFT JOIN reviews ON reviewers.id = reviews.reviewer_id
GROUP BY reviewers.id;
```

### IF

The `IF()` function returns a value if a condition is **TRUE**, or another value if a condition is **FALSE**.

```sql
SELECT
  first_name,
  last_name,
  COUNT(rating) AS COUNT,
  IFNULL(MIN(rating), 0) AS MIN,
  IFNULL(MAX(rating), 0) AS MAX,
  ROUND(IFNULL(AVG(rating), 0), 2) AS AVG,
  IF (COUNT(rating)  > 0, 'ACTIVE', 'INACTIVE') AS STATUS
FROM reviewers
LEFT JOIN reviews ON reviewers.id = reviews.reviewer_id
GROUP BY reviewers.id;
```

## Challenge 7

Write an SQL query to retrieve the `title` of the series, the `rating`, and the reviewer's **full name** by joining the `series`, `reviews`, and `reviewers` tables.

```sql
SELECT
  title,
  rating,
  CONCAT(first_name, ' ', last_name) AS reviewer
FROM series
JOIN reviews ON series.id = reviews.series_id
JOIN reviewers ON reviews.reviewer_id = reviewers.id;
```
