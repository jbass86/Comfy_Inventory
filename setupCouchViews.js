
var nano = require('nano')('http://localhost:5984');

console.log("*************************************************************")
console.log("This script runs under the assumption that the databases have " +
  " yet to be created...");
console.log("*************************************************************")

//insert user views
nano.db.create('users', function(err, body) {

  if (!err){
    var users = nano.use('users');
    users.insert(
      { "views":
        { "sort_by_first_name":
          { "map": function(doc) { emit(doc.first_name, doc); }},
          "sort_by_last_name":
          { "map": function(doc) { emit(doc.last_name, doc); }}
        }
      }, '_design/get_users', function (error, response) {
        if(error){
          console.log("something went wrong adding users view");
          console.log(error);
        }
      });
  }else{

    console.log("Something went wrong adding user views");
    console.log(err);
  }
});
