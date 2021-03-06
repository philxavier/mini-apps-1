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

    var messageObj = JSON.parse(req.body.data);
    var columns = manipulate_data.getColumns(messageObj);
    var data = manipulate_data.getData(messageObj);
    var result = manipulate_data.buildAnswer(columns, data); 
    var result2 = manipulate_data.buildAnswer2(columns, data);

    fs.writeFile('message.txt', result2, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    
    res.send(result);

});

app.get('/download', function(req, res){
    res.download(path.join(__dirname, 'message.txt'));
})
