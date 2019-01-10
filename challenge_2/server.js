var express = require('express');
var app = express();
var path = require('path');
var parser = require('body-parser')
var fs = require('fs');
var multer  = require('multer')
const fileUpload = require('express-fileupload');
var manipulate_data = require('./manipulate_data')



app.use(parser.urlencoded({
    extended: true
}));

// app.use(fileUpload())

app.use(express.static('client'));

app.use(parser.json());

app.listen(8080);

app.get('/', function(req, res) {


});

app.post('/', function (req, res) {

    console.log('req body here==========', req.body)
    var messageObj = JSON.parse(req.body.data);
    var columns = manipulate_data.getColumns(messageObj);
    var data = manipulate_data.getData(messageObj);
    var result = manipulate_data.buildAnswer(columns, data); 
    console.log('results here=====================', result)
    res.send(result);

});

