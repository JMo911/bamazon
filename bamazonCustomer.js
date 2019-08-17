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
 
connection.query('SELECT * FROM products', function (error, results, fields) {
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
        "message": "Which item would you like to buy?",
        "choices": function() {
            var productNames=[];
            productsArray.forEach(function(e){
                productNames.push(e.product_name);
            });
            return productNames;
        }
        
    },
    {
        "name": "quantity",
        "type": "number",
        "message": "How many would you like?",
        // "validate": function(){
        //     return (!NaN);
        // }
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    // console.log(answers.quantity);
    // console.log(answers.productList);
    // console.log(productsArray.product_name);
    productsArray.forEach(function(e){
        if (e.product_name === answers.productList) {
            if (e.stock_quantity > answers.quantity){
                console.log("fulfilling your purchase");
            } else {
                console.log("insufficient quantity!");
            }
        };
    });
    // if (answers.quantity > productsArray[answers.productList]){
    //     console.log("fulfilling your order");
    // } else {
    //     console.log("Insufficient quantity!");
    // }


  });


});

connection.end();