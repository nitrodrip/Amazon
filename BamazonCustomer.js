//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "96S53Sx1Z8jM",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayData();
});

function displayData() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " | " +
                "Product name: " + res[i].product_name + " | " +
                "Department: " + res[i].department_name + " | " +
                "Price: " + res[i].price + " | " +
                "Quantity in stock: " + res[i].stock_quantity)
        };
        console.log("\n*****************\n");
        itemSelection();
    })
};

function itemSelection() {
    inquirer
        .prompt([{
            name: "userItemID",
            type: "input",
            message: "What item ID would you like to select?"
        }, {
            name: "userQuantity",
            type: "input",
            message: "How many of the item would you like?"
        }])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", {
                item_id: answer.userItemID
            }, function (err, res) {
                if (err) throw err;
                console.log(res[0].stock_quantity);
                var updatedQuantity = res[0].stock_quantity - answer.userQuantity
                if (answer.userQuantity < res[0].stock_quantity) {
                    connection.query("UPDATE products SET stock_quantity = " + updatedQuantity + " WHERE item_id = " + answer.userItemID, function (err, data) {
                        if (err) throw err;
                        console.log("Your total is $" + res[0].price * answer.userQuantity);
                        console.log("\n*****************\n");
                        console.log("Item ID: " + res[0].item_id + " | " +
                            "Product name: " + res[0].product_name + " | " +
                            "Department: " + res[0].department_name + " | " +
                            "Price: " + res[0].price + " | " +
                            "Updated quantity in stock: " + updatedQuantity);
                        console.log("\n*****************\n");
                        console.log("Your total is $" + res[0].price * answer.userQuantity);
                        connection.end();
                    })
                } else {
                    console.log("Sorry, we do not have enough items to fulfill your request.");
                    console.log("\n*****************\n");
                }
            })
        })
};