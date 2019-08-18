var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port: 8889
});
 
connection.connect();

var timesRun = 0;
if (timesRun===0) {
  console.log("Welcome Managers!\n\n\n");
};

function managementOptions() {
  timesRun++;
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        "type": "list",
        "choices": ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        "name": "availableOptions",
        "message": "What would you like to do?"
      }
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
      //console.log(answers.availableOptions);
      switch(answers.availableOptions) {
        case "View Products for Sale":
          // code block
          viewProducts();
          break;
        case "View Low Inventory":
          // code block
          viewLowInventory();
          break;
        case "Add to Inventory":
            // code block
            addInventory();
            break;
        case "Add New Product":
            // code block
            addNewItem();
            break;
        //default:
          // code block

      }
  });
};
managementOptions();


function viewProducts(){
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log("\nHere are your items for sale:\n\n");
    results.forEach(element => {
      console.log("ID: " + element.item_id+ "\nname: " +element.product_name +  "\nprice: " + element.price + "\nquantity: " + element.stock_quantity +"\n--------------------\n");
    });
  });
  // connection.end();
  // managementOptions();
};

function viewLowInventory() {
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log("\nHere are your low inventory items:\n\n");
    results.forEach(element => {
      if (element.stock_quantity < 5 ) {
        console.log("ID: " + element.item_id+ "\nname: " +element.product_name +  "\nprice: " + element.price + "\nquantity: " + element.stock_quantity +"\n--------------------\n");
      } 
    });
  });
  // connection.end();
  // managementOptions();
};


function addInventory(){
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    //PROMPT MANAGER TO SEE WHICH ITEM THEY'D LIKE TO ADD INVENTORY TO
    inquirer
    .prompt([
      /* Pass your questions in here */
      {
        "name": "restockList",
        "type": "rawlist",
        "message": "Which item would you like to restock?",
        "choices": function() {
            var productNames=[];
            results.forEach(function(e){
              productNames.push(e.product_name);
            });
            return productNames;
        }
      },
      {
        "name": "restockQuantity",
        "type": "number",
        "message": "How many units would you like to add?"
      }
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
      //UPDATE DATABASE RECORD ACCORDING TO THE ITEM CHOSEN AND THE QUANTITY ADDED
      var currentQuantity = "";
      results.forEach(function(e){
        if (e.product_name === answers.restockList) {
          currentQuantity = e.stock_quantity;
        }
      })

      connection.query('UPDATE products SET ? WHERE ?',
      [
        {
          //NEED TO MAKE THIS QUERY FOR THIS SPECIFIC ITEM'S QUANT. THEN ADD USER INPUT.
          "stock_quantity": currentQuantity + answers.restockQuantity
        },
        {
          "product_name": answers.restockList
        }
      ], 
      function (error, results, fields) {
        if (error) throw error;
        console.log('Adding ' + answers.restockQuantity  + " " +  answers.restockList + " units to your inventory");
      });

    });

  });
};

function addNewItem() {
  connection.query("INSERT INTO products VALUES")
}