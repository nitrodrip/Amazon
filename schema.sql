CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    Item_ID MEDIUMINT AUTO_INCREMENT NOT NULL,
    Product_Name VARCHAR(100) NOT NULL,
    Department_Name VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock_Quantity INT(10) NOT NULL,
    primary key(ItemID)
);

select * from Products;

INSERT INTO Products(Product_Name,Department_Name,Price,Stock_Quantity)
VALUES 
    ("Burrito Movie","ENTERTAINMENT",49.95,150),
    ("Super Mario Bros 17","ENTERTAINMENT",59.99,200),
    ("Peanut Butter Salad","GROCERY",24.50,50),
    ("Beavis and Butthead thong","CLOTHING",75.00,5),
    ("Extra Thick Toering","CLOTHING",54.25,35),
    ("Survival Toothpick","SPORTS & OUTDOORS",42.42,42),
    ("Ted and Bill's Okay Adventure","ENTERTAINMENT",15.00,25),
    ("When will my heart stop?","ENTERTAINMENT",25.50,57),
    ("Monopoly Headhunters Edition","ENTERTAINMENT",30.50,35),
    ("Russian Roulette","ENTERTAINMENT",19.95,23)