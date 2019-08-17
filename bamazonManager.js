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

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        "type": "list",
        "choices": ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        "name": "availableOptions",
        "message": "Welcome manager. What would you like to do?"
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    //console.log(answers.availableOptions);
    switch(answers.availableOptions) {
        case "View Products for Sale":
          // code block
          console.log("you choose view products for sale");
          viewProducts();
          break;
        case "View Low Inventory":
          // code block
          console.log("you chose view low inventory")
          break;
        case "Add to Inventory":
            // code block
            console.log("you chose Add to Inventory")
            break;
        case "Add New Product":
            // code block
            console.log("you chose Add New Product")
            break;
        //default:
          // code block

      }


    function viewProducts(){
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            results.forEach(element => {
                console.log("ID: " + element.item_id+ "\nname: " +element.product_name +  "\nprice: " + element.price + "\nquantity: " + element.stocu_quantity +"\n--------------------\n");
            });

          });
    }




  });