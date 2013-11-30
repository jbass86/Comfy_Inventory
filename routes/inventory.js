
exports.list = function(req, res){
  //res.send("respond with a resource");

  var nano = require('nano')('http://localhost:5984');

  nano.db.get('inventory', function() {

  inventory.get('josh', function(err, body, header){

	console.log("got something out of inventory");
	console.log(body.name);
	res.send(body.name);

  });

});

};