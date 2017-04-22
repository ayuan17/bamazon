CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    dept_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,3),
    stock_qty INTEGER,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, dept_name, price, stock_qty)
VALUES("Learn JS", "Book", 7.99, 20);

INSERT INTO products(product_name, dept_name, price, stock_qty)
VALUES("Shirt", "Apparel", 20.99, 20);

INSERT INTO products(product_name, dept_name, price, stock_qty)
VALUES("Bike", "Outdoor", 100.99, 20);