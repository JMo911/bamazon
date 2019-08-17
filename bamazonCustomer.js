var mysql      = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port: 8889
});
 
connection.connect();
 
connection.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
  if (error) throw error;
  var productsArray=[];

  //STORE RESULTS IN ARRAY FOR USE IN INQUIRER PROMPTS
  results.forEach(element => {
      productsArray.push(element);
  });
  productsArray.forEach(element => {
    console.log("Item ID: " + element.item_id + "\nProduct: " + element.product_name + "\nPrice: " + element.price + "\n---------\n");
  });

  inquirer
  .prompt([
    /* Pass your questions in here */
    {
        "name": "productList",
        "type": "rawlist",
        "choices": function() {
            var productNames=[];
            productsArray.forEach(function(e){
                productNames.push(e.product_name);
            });
            return productNames;
        }
        
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    //console.log(answers);
  });


});

connection.end();