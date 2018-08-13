//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
  })

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

function start(){

// Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;

//Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

// Makes it so all of the following code will affect bamazon_db --
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

// Creates the table "department" within bamazon_db --
CREATE TABLE department (
    //Makes a string column called "document_id" which cannot contain null --
    document_id VARCHAR(30) NOT NULL,
    //Makes a boolean column called "department_name" which cannot contain null --
    department_name VARCHAR(30),
    //Makes a boolean column called "overhead_costs" which cannot contain null --
    overhead_costs VARCHAR(30),
  );

// Creates new rows containing data in all named columns --
INSERT INTO products (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO products (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO products (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", TRUE, "Misty", 10);

INSERT INTO products (name, has_pet)
VALUES ("Peter", false);

// Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE name = "Peter";