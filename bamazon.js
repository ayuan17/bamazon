var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"Tmac37412",
    database:"Bamazon"
});

connection.connect();

//inquirer questions
var questions = [
    {
        type:"input",
        name:"id",
        message:"What's the ID of the product?"
    },
    {
        type:"input",
        name: "product",
        message:"How many would you like to buy?"
    }
];

var collection;

//displays the data from SQL
var showProduct = function () {
  connection.query("SELECT * FROM products", function (err, data) {
      if(err) throw err;

      collection = data;

      data.map(function (el) {
          console.log("Item ID: " + el.item_id + " || Product Name: " + el.product_name + " || Price: $" + el.price);
      });

  });
};
showProduct();

//function completes the purchase if inventory is enough
var updateInventory = function (quantity, id) {
    connection.query("UPDATE products SET stock_qty = ? WHERE item_id = ?", [quantity, id], function (err, data) {
        if(err) throw err;
        console.log("Process completed!");
    });
};

//This will delay the inquirer 1 second after the data displays
setTimeout(function () {

    inquirer.prompt(questions)
        .then(function (data) {
            var msg = {};

             collection.map(function (val) {

                 if(Number(data.id) === val.item_id){

                     if(Number(data.product) > val.stock_qty){
                         msg.result = "Insufficient quantity";
                     }

                     else{
                         msg.price = val.price * Number(data.product);
                         msg.remaining = val.stock_qty - Number(data.product);
                        updateInventory(msg.remaining, data.id);
                     }
                 }

             });

             return msg;
        })
        .then(function (data) {

            if(data.price){
                console.log("Your total cost is $" + data.price);
                console.log("We have " + data.remaining + " remaining");
            }

            else{
                console.log("Sorry, " + data.result);
            }

        })
        .catch(function (err) {
            console.log(err);
        });
}, 1000);




