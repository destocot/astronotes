---
title: "Introduction & Installation"
slug: "introduction-and-installation"
sidebar:
  order: 1
---

## Introduction

MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter My, and "SQL", the acronym for Structured Query Language

## Preview

[MySQL Tryit Editor](https://www.w3schools.com/sql/trysql.asp?filename=trysql_op_or)

```sql
SELECT * FROM products
ORDER BY price DESC;
```

| ProductID | ProductName             | Unit                 | Price  |
| --------- | ----------------------- | -------------------- | ------ |
| 38        | Côte de Blaye           | 12 - 75 cl bottles   | 263.5  |
| 29        | Thüringer Rostbratwurst | 50 bags x 30 sausgs. | 123.79 |
| 9         | Mishi Kobe Niku         | 18 - 500 g pkgs.     | 97     |
| ...       | ...                     | ...                  | ...    |

```sql
SELECT
    customers.customerName,
    COUNT(*) AS numberOfOrders
FROM customers
INNER JOIN orders
    ON orders.CustomerID = customers.CustomerID
GROUP BY customers.customerID, customers.customerName
ORDER BY COUNT(*) DESC;
```

| customerName   | numberOfOrders |
| -------------- | -------------- |
| Ernst Handel   | 10             |
| QUICK-Stop     | 7              |
| Wartian Herkku | 7              |
| ...            | ...            |

## What Is a Database?

1. A collection of data
2. A method for accessing and manipulating that data

> A structured set of computerized data with an accessible interface

## Database vs Database Management System

Database (database management system) ==> (database)

Common Databases

- PostgreSQL
- MySQL
- Oracle Database
- SQLite

## MySQL vs SQL

SQL is the language we use to "talk" to our databases

```sql
-- Find all users who are 18 or older
SELECT * FROM Users WHERE AGE >= 18;
```

## Installation

[MySQL Community Downloads](https://dev.mysql.com/downloads/)

```bash
 systemctl status mysql
```

```bash
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl restart mysql
```
