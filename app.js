
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var nano = require('nano')('http://localhost:5984');


nano.db.get('users', function(){

  

  var users = nano.use('users');

  users.insert ( { name: 'kankamol', country: 'thailand'}, 'kate', function(err, body, header) {
    if (err){
      console.log("there was an error");
    }
    console.log("we inserted");
    console.log(body);
  });



    console.log(users)

    users.list(function(err, body){

      console.log("seach users");
      console.log(err);
      console.log(body);

      body.rows.forEach(function(row){

        console.log(row.value)

      });

     
    })

    users.view('get_users', 'sort_by_last_name', function(err, body){

      console.log("i called view");
      console.log("key: " + body.key);
      console.log("value: " + body.value);
      console.log(body.rows);
      console.log("******")
    })

});

// nano.db.get('inventory', function() {

//   var inventory = nano.use('inventory');
//   inventory.insert ( { name: 'kankamol', country: 'thailand'}, 'kate', function(err, body, header) {
//     if (err){
//       console.log("there was an error");
//     }
//     console.log("we inserted");
//     console.log(body);
//   });

  // inventory.insert ( { name: 'josh', country: 'usa'}, 'josh', function(err, body, header) {
  //   if (err){
  //     console.log("there was an error");
  //     console.log(err)
  //   }
  //   console.log("we inserted");
  //   console.log(body);
  // });

  // inventory.get('josh', function(err, body, header){

  //   console.log("got something out of inventory");
  //   console.log(body.name);

  // });

// });

// // clean up the database we created previously
// nano.db.destroy('alice', function() {
//   // create a new database
//   nano.db.create('alice', function() {
//     // specify the database we are going to use
//     var alice = nano.use('alice');
//     // and insert a document in it
//     alice.insert({ crazy: true }, 'rabbit', function(err, body, header) {
//       if (err) {
//         console.log('[alice.insert] ', err.message);
//         return;
//       }
//       console.log('you have inserted the rabbit.')
//       console.log(body);
//     });
//   });
// });


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users_by_last_name', user.users_by_last_name);
app.post('/update_user', user.update_user);
//app.get('/inventory', routes.inventory);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
