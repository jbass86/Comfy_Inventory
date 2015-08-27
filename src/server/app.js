
/**
 * Module dependencies.
 */

var express = require('express')
var user = require('./routes/user')
var http = require('http')
var path = require('path');

var nano = require('nano')('http://localhost:5984');

var app = express();

app.use(express.static(__dirname + "/client/"));
app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/users_by_last_name', user.users_by_last_name);

app.post('/update_user', user.update_user);
app.post('/delete_user', user.delete_user);
app.post('/test_post', user.test_post);

app.listen(8080, 'localhost');
