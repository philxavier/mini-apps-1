var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
//var db = require('./db')
var countId  = 2 ;

var connection = mysql.createConnection({

  host:"localhost",
  user:'root',
  password:'Jackson5Secreta1',
  database:'checkout'

});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
}); 

var app = express();

app.use(express.static('public'));  

app.use(parser.json())

app.listen('8000', console.log('listening on  8000'));

app.get('/', function(req, res) {
    
})

app.post('/f1', function(req, res){

    [name, email, password] = Object.values(req.body);

    var queryString = "insert into customer_data(C_NAME,C_EMAIL, C_PASSWORD) values ('"+name+"',  '"+email+"','"+password+"')";
    connection.query(queryString, (err) => {
      if (err) {
        console.log(err)
      } 
      res.end()
      res.statusCode = 201
    })
})


app.post('/f2', function(req, res){
  
  countQuery = "SELECT COUNT(*) FROM customer_data"
  connection.query(countQuery, (err, result) => {

    if (err) {
      console.log(err)
    }
     countId = result[0]['COUNT(*)'];
     [address, city, state, zipcode] = Object.values(req.body);
     var queryString = "UPDATE customer_data SET C_ADDRESS=?, C_CITY=?, C_STATE=?, C_ZIPCODE=? WHERE ID=? ";
     //var queryString = "UPDATE customer_data SET C_ADDRESS='endereco' WHERE ID=39 ";
     connection.query(queryString,[address, city, state, zipcode, countId], (err, rows, fiels) => {
        if (err) {
          console.log(err)
        } 
        res.end()
        res.statusCode = 201
      })
  })
 
})


app.post('/f3', function(req, res) {

  var queryString = "UPDATE customer_data SET C_CREDITCARD=?, C_EXPIRY_DATE=?, C_CVV=?, C_BILLINGZIP=? WHERE ID=? ";
  [creditCardNum, expDate, cvv, billingZip] = Object.values(req.body);
  connection.query(queryString,[creditCardNum, expDate, cvv, billingZip, countId], (err, rows, fiels) => {
    if (err) {
      console.log(err)
    } 
    res.statusCode = 201
    res.end()
  })

})


app.get('/confirmation', function(req, res){
  console.log("im at confirmation")
  var getAllQuery = "SELECT * FROM customer_data WHERE id=?";
  connection.query(getAllQuery, [countId], function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
    res.end()
  })
})