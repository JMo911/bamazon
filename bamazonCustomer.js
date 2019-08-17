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

    function shopping(){
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
            productsArray.forEach(function(e){
                if (e.product_name === answers.productList) {
                    if (e.stock_quantity > answers.quantity){
                        console.log("fulfilling your purchase");
                        connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                "stock_quantity": e.stock_quantity-answers.quantity
                            },
                            {
                                "product_name": answers.productList
                            }
                        ],
                        function(error, response) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(response.changedRows + " quantity updated!");
                                keepShopping();
                                // console.log(keepShopping());
                            }
                        }
                        );
                        







                    } else {
                        console.log("insufficient quantity!");
                        keepShopping();
                    }
                };
            });
        });
    }
    shopping();
    function keepShopping() {
        inquirer
      .prompt([
        /* Pass your questions in here */
        {
            "type": "confirm",
            "name": "continueShopping",
            "message": "Would you like to keep shopping?"
    
        }
      ])
      .then(answers => {
        if(answers.continueShopping) {
            shopping();
        } else {
            console.log("Thank you for shopping with us. See you next time!");
        };
      });
    }
});  



// connection.end();