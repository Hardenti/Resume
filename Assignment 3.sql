-- *************************************************************
-- Assignment: Assignment 3
-- Written by: Tiyana Harden
-- Date      : 2026-09-16
-- *************************************************************

USE homework1_tiyana_harden;

-- *******************************************
-- Exercise 1
-- *******************************************

SELECT c.category_name, COUNT(p.product_id) AS product_count
FROM Categories c
LEFT JOIN Products p
  ON c.category_id = p.category_id
GROUP BY c.category_name
ORDER BY c.category_name;

-- *******************************************
-- Exercise 2
-- *******************************************

SELECT c.first_name,
       c.last_name,
       a.line1,
       a.city,
       a.state,
       a.zip_code
FROM Customers c
JOIN Addresses a
  ON c.shipping_address_id = a.address_id
ORDER BY c.last_name, c.first_name;

-- *******************************************
-- Exercise 3
-- *******************************************

SELECT p.product_name,
       p.list_price,
       COUNT(oi.order_id) AS times_ordered
FROM Products p
LEFT JOIN Order_Items oi
  ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.list_price
ORDER BY times_ordered DESC, p.product_name ASC;

-- *******************************************
-- Exercise 4
-- *******************************************

SELECT o.order_id,
       o.order_date,
       c.first_name,
       c.last_name,
       SUM(oi.item_price * oi.quantity) AS order_total
FROM Orders o
JOIN Customers c
  ON o.customer_id = c.customer_id
JOIN Order_Items oi
  ON o.order_id = oi.order_id
GROUP BY o.order_id, o.order_date, c.first_name, c.last_name
ORDER BY o.order_date DESC;

-- *******************************************
-- Exercise 5
-- *******************************************

SELECT p.product_name,
       p.list_price,
       p.discount_percent,
       ROUND(p.list_price - (p.list_price * p.discount_percent / 100), 2) AS discount_price
FROM Products p
WHERE p.list_price >= 1000
ORDER BY discount_price DESC;

-- *******************************************
-- Exercise 6
-- *******************************************

SELECT c.category_name,
       AVG(p.list_price) AS avg_list_price,
       MAX(p.list_price) AS max_list_price
FROM Categories c
JOIN Products p
  ON c.category_id = p.category_id
GROUP BY c.category_name
HAVING AVG(p.list_price) > 500
ORDER BY avg_list_price DESC;

-- *******************************************
-- Exercise 7
-- *******************************************

SELECT p.product_name,
       p.product_code
FROM Products p
LEFT JOIN Order_Items oi
  ON p.product_id = oi.product_id
WHERE oi.product_id IS NULL
ORDER BY p.product_name;

-- *******************************************
-- Exercise 8
-- *******************************************

SELECT c.first_name,
       c.last_name,
       COUNT(o.order_id) AS total_orders,
       SUM(oi.item_price * oi.quantity) AS total_spent
FROM Customers c
LEFT JOIN Orders o
  ON c.customer_id = o.customer_id
LEFT JOIN Order_Items oi
  ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC, total_orders DESC;

-- *******************************************
-- Exercise 9
-- *******************************************

INSERT INTO Categories (category_name)
VALUES ('Accessories');

SET @new_category_id = LAST_INSERT_ID();

SELECT category_id, category_name
FROM Categories
WHERE category_id = @new_category_id;

-- *******************************************
-- Exercise 10
-- *******************************************

INSERT INTO Products
    (category_id, product_code, product_name, description, list_price, discount_percent, date_added)
VALUES
    (@new_category_id, 'acc_100', 'Premium Guitar Strap', 'Adjustable durable strap for everyday use.', 29.99, 10, NOW());

SELECT product_id, category_id, product_code, product_name, list_price, discount_percent, date_added
FROM Products
WHERE product_code = 'acc_100';

-- *******************************************
-- Optional Review
-- *******************************************

-- Run the restore script below if your instructor asks you to reset the database:
-- SOURCE C:/path/to/mgs_ex_starts/create_my_guitar_shop.sql;
