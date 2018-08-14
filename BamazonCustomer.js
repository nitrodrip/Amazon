//require mysql and inquirer
const mysql = require('mysql');
const inquirer = require('inquirer');
//create connection to db
const mysql = require("mysql");
const inquirer = require("inquirer");

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

// connection.connect(function (err) {
//   if (err) throw err;
//   displayData();
// });

// function startPage(){
// //prints the items for sale and their details
// connection.query('SELECT * FROM Products', function(err, res){
//   if(err) throw err;

//   console.log('Welcome to BAMazon')
//   console.log('----------------------------------------------------------------------------------------------------')

//   for(var i = 0; i<res.length;i++){
//     console.log("Item ID: " + res[i].item_ID + " | " + "Product Name: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity in stock: " + res[i].stock_quantity);
    
//     console.log('--------------------------------------------------------------------------------------------------')
//   }

//   console.log(' ');
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "userItemID",
//       message: "What is the ID of the product you would like to purchase?",
//       validate: function(value){
//         if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
//           return true;
//         } else{
//           return false;
//         }
//       }
//     },
//     {
//       type: "input",
//       name: "userQuantity",
//       message: "How many would you like to purchase?",
//       validate: function(value){
//         if(isNaN(value)){
//           return false;
//         } else{
//           return true;
//         }
//       }
//     }
//     ]).then(function(ans){
//       var whatToBuy = (ans.id)-1;
//       var howMuchToBuy = parseInt(ans.qty);
//       var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

//       //check if there's enough quantity
//       if(res[whatToBuy].StockQuantity >= howMuchToBuy){
        
//         //after purchase, updates quantity in Products
//         connection.query("UPDATE Products SET ? WHERE ?", [
//         {StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)},
//         {ItemID: ans.id}
//         ], function(err, result){
//             if(err) throw err;
//             console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
//         });

//         connection.query("SELECT * FROM Departments", function(err, deptRes){
//           if(err) throw err;
//           var index;
//           for(var i = 0; i < deptRes.length; i++){
//             if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
//               index = i;
//             }
//           }
          
//           //updates totalSales in departments table
//           connection.query("UPDATE Departments SET ? WHERE ?", [
//           {TotalSales: deptRes[index].TotalSales + grandTotal},
//           {DepartmentName: res[whatToBuy].DepartmentName}
//           ], function(err, deptRes){
//               if(err) throw err;
//               //console.log("Updated Dept Sales.");
//           });
//         });

//       } else{
//         console.log("Sorry, there's not enough in stock!");
//       }

//       reprompt();
//     })
// })
// }

// //asks if they would like to purchase another item
// function reprompt(){
//   inquirer.prompt([{
//     type: "confirm",
//     name: "reply",
//     message: "Would you like to purchase another item?"
//   }]).then(function(ans){
//     if(ans.reply){
//       startPage();
//     } else{
//       console.log("See you soon!");
//     }
//   });
// }

// startPage();