//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
  })

// Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

// Makes it so all of the following code will affect animals_db --
USE bamazon_db;

// Creates the table "products" within bamazon_db --
CREATE TABLE products (
    // Makes a string column called "department_id" which cannot contain null --
  department_id VARCHAR(30) NOT NULL,
    // Makes a string column called "department name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  // Makes a boolean column called "overhead_costs" which cannot contain null --
  overhead_costs BOOLEAN NOT NULL,
  // Makes a sting column called "product_sales" --
  product_sales VARCHAR(30),
);

// Creates the table "products" within bamazon_db --
CREATE TABLE department (
    //Makes a string column called "document_id" which cannot contain null --
    document_id VARCHAR(30) NOT NULL,
    //Makes a boolean column called "department_name" which cannot contain null --
    department_name VARCHAR(30),
    //Makes a boolean column called "overhead_costs" which cannot contain null --
    overhead_costs VARCHAR(30),
  );

// Creates new rows containing data in all named columns --
INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", TRUE, "Misty", 10);

INSERT INTO people (name, has_pet)
VALUES ("Peter", false);

-- Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE name = "Peter";