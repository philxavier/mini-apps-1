var express = require('express');
var app = express();
var path = require('path');
//var parser = require('body-parser')
var fs = require('fs');
var multer  = require('multer')
const fileUpload = require('express-fileupload');



// app.use(parser.urlencoded({
//     extended: true
// }));

app.use(fileUpload())

app.use(express.static('client'));

//app.use(parser.json());

app.listen(8080);

app.get('/', function(req, res) {


});

app.post('/', function (req, res) {

    var messageObj = req.files.file.data.toString()
   
    var messageObj =  JSON.parse(messageObj);
    var columns = getColumns(messageObj);
    var data = getData(messageObj);
    var result = buildAnswer(columns, data); 
    console.log('results here=====================', result)
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <link rel="stylesheet" type="text/css" href="./style.css">

        </head>
        <body>
            <h1>JSON to CSV</h1>
            <form method="post" action= "/" class="mainForm" id="myform" enctype="multipart/form-data">
                <div class="form-example">
                    <label for="name">Select the file</label>
                    <div>
                        <input type="file" id="filePick" name="file"accept=".doc, .txt">
                    </div>
                </div>
                <div class="form-example">
                    <button id="form_button" type="submit">Submit</button>
                </div>
            </form>
            <div id="results">${result}</div>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
            <script type="text/javascript" src="./app.js"></script>
        </body>
        </html>`);

});

/////////////////////////////functions
function getColumns(obj) {
    var container = [];
    for (key in obj) {
        if (key !== 'children')
        container.push(key);
    }
    return container;
}

function getData(messageObj) {
    var container = [];
    
    function recurGetData(obj) {

        if (!obj.children) {
            return;
        }

        var hold = [];
        for (var key in obj) {
            if (key !== 'children') {
                hold.push(obj[key])
            }
        }
        container.push(hold);

        if (obj.children) {
            for (let i = 0; i < obj.children.length; i++) {
                recurGetData(obj.children[i]);
            }
        }
    }

    recurGetData(messageObj);
    return container;          
};

function buildAnswer(col, row) {
    var result = ''
    result += col.join(',') + '\n';
    
    for (let i = 0; i < row.length; i++) {
        var currentRow = `<div>${row[i].join(',')}</div>`
        result += currentRow;
    }

    return result;

}
