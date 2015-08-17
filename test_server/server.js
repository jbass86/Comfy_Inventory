var express = require('express');

var app = express();

//app.use(express.staticProvider(__dirname));

app.use(express.static(__dirname));

app.get('/', function(req, res) {

    res.render('index.html');
});


// spin up server
app.listen(8080, 'localhost')
