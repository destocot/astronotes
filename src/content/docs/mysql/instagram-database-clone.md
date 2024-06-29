---
title: "Instagram Database Clone"
sidebar:
  order: 16
---

## Introducing Instagram Clone

```sql
CREATE DATABASE ig_clone;
```

## Users Schema

```sql
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESC users;
```

```
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| user_id    | int          | NO   | PRI | NULL              | auto_increment    |
| username   | varchar(255) | NO   | UNI | NULL              |                   |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
3 rows in set (0.00 sec)
```

## Photos Schema

```sql
CREATE TABLE photos (
  photo_id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DESC photos;
```

```
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| photo_id   | int          | NO   | PRI | NULL              | auto_increment    |
| image_url  | varchar(255) | NO   |     | NULL              |                   |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| user_id    | int          | NO   | MUL | NULL              |                   |
+------------+--------------+------+-----+-------------------+-------------------+
4 rows in set (0.00 sec)
```

## Comments Schema

```sql
CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  comment_text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),

  photo_id INT NOT NULL,
  FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
);

DESC comments;
```

```
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| comment_id   | int          | NO   | PRI | NULL              | auto_increment    |
| comment_text | varchar(255) | NO   |     | NULL              |                   |
| created_at   | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| user_id      | int          | NO   | MUL | NULL              |                   |
| photo_id     | int          | NO   | MUL | NULL              |                   |
+--------------+--------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)
```

## Likes Schmea

```sql
CREATE TABLE likes (
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),

  photo_id INT NOT NULL,
  FOREIGN KEY (photo_id) REFERENCES photos(photo_id),

  -- Composite Primary Key
  PRIMARY KEY (user_id, photo_id)
);

DESC likes;
```

```
+------------+-----------+------+-----+-------------------+-------------------+
| Field      | Type      | Null | Key | Default           | Extra             |
+------------+-----------+------+-----+-------------------+-------------------+
| created_at | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| user_id    | int       | NO   | PRI | NULL              |                   |
| photo_id   | int       | NO   | PRI | NULL              |                   |
+------------+-----------+------+-----+-------------------+-------------------+
3 rows in set (0.00 sec)
```

**Note**: The `likes` table has a composite primary key of `user_id` and `photo_id`. This means that a user can only like a photo once since the combination of `user_id` and `photo_id` is unique.

## Followers Schema

```sql
CREATE TABLE follows (
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  follower_id INT NOT NULL,
  FOREIGN KEY (follower_id) REFERENCES users(user_id),

  followee_id INT NOT NULL,
  FOREIGN KEY (followee_id) REFERENCES users(user_id),

  -- Composite Primary Key
  PRIMARY KEY (follower_id, followee_id)
);

DESC follows;
```

```
+-------------+-----------+------+-----+-------------------+-------------------+
| Field       | Type      | Null | Key | Default           | Extra             |
+-------------+-----------+------+-----+-------------------+-------------------+
| created_at  | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| follower_id | int       | NO   | PRI | NULL              |                   |
| followee_id | int       | NO   | PRI | NULL              |                   |
+-------------+-----------+------+-----+-------------------+-------------------+
3 rows in set (0.00 sec)
```

**Note**: The `follows` table has a composite primary key of `follower_id` and `followee_id`. This means that a user can only follow another user once since the combination of `follower_id` and `followee_id` is unique.

## 3 Approaches for Hashtags

### Solution 1: Add a column called `tags` to the `photos` table

```
Photo Table
+----------+------------+-----------------------------+
| photo_id | image_url  | tags                        |
+----------+------------+-----------------------------+
|        1 | /ksjd97123 | #cat#pets#animals#cute#omg  |
|        2 | /098fsdskj | #microwave#sadfood#gross    |
|        3 | /87hghjkd  | #smile#ego#cute#srrynotsrry |
+----------+------------+-----------------------------+
3 rows in set (0.00 sec)
```

### Solution 2: Create a `tags` table

```
Photo Table
+----------+------------+
| photo_id | image_url  |
+----------+------------+
|        1 | /ksjd97123 |
|        2 | /098fsdskj |
|        3 | /87hghjkd  |
+----------+------------+

Tags Table
+------------+----------+
| tag_name   | photo_id |
+------------+----------+
| #cute      |        1 |
| #cute      |        3 |
| #microwave |        2 |
| #ego       |        3 |
| #smile     |        3 |
| #gross     |        2 |
+------------+----------+
```

### Solution 3: Create a `tags` table and a `photo_tags` table

```
Photo Table
+----------+------------+
| photo_id | image_url  |
+----------+------------+
|        1 | /ksjd97123 |
|        2 | /098fsdskj |
|        3 | /87hghjkd  |
+----------+------------+

Tags Table
+--------+------------+
| tag_id | tag_name   |
+--------+------------+
|      1 | #cute      |
|      2 | #pets      |
|      3 | #microwave |
|      4 | #ego       |
|      5 | #smile     |
|      6 | #gross     |
+--------+------------+

Photo Tags Table
+----------+--------+
| photo_id | tag_id |
+----------+--------+
|        1 |      1 |
|        3 |      1 |
|        1 |      2 |
|        2 |      3 |
|        3 |      4 |
|        3 |      5 |
|        2 |      6 |
+----------+--------+
```

## Hashtags Schema

```sql
CREATE TABLE tags (
  tag_id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  tag_name VARCHAR(255) NOT NULL UNIQUE
);

DESC tags;
```

```
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| tag_id     | int          | NO   | PRI | NULL              | auto_increment    |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| tag_name   | varchar(255) | NO   | UNI | NULL              |                   |
+------------+--------------+------+-----+-------------------+-------------------+
3 rows in set (0.00 sec)
```

```sql
CREATE TABLE photo_tags (
  photo_id INT NOT NULL,
  FOREIGN KEY (photo_id) REFERENCES photos(photo_id),

  tag_id INT NOT NULL,
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id),

  -- Composite Primary Key
  PRIMARY KEY (photo_id, tag_id)
);

DESC photo_tags;
```

```
+----------+------+------+-----+---------+-------+
| Field    | Type | Null | Key | Default | Extra |
+----------+------+------+-----+---------+-------+
| photo_id | int  | NO   | PRI | NULL    |       |
| tag_id   | int  | NO   | PRI | NULL    |       |
+----------+------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

**Note**: The `photo_tags` table has a composite primary key of `photo_id` and `tag_id`. This means that a photo can only have a tag once since the combination of `photo_id` and `tag_id` is unique.
