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

## Implementing Hashtags

```

```

```

```
