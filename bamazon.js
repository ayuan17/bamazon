var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Tmac37412",
    database: "Bamazon"
});

connection.connect();

connection.query("SELECT * FROM products", function(err, data){
    if(err) throw err;

    console.log(data);
});

