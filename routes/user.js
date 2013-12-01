
/*
 * GET users listing.
 */

exports.users_by_last_name = function(req, res){
  //res.send("respond with a resource");

	var nano = require('nano')('http://localhost:5984');
	nano.db.get('users', function() {

		var users = nano.use('users');

		users.view('get_users', 'sort_by_last_name', function(err, body){

			console.log("got something out of users");
			console.log(body);
			console.log(req.query.add)
			//console.log(req);
			if (body){
				console.log(body.name);
			}
			res.send(body);
		});
	});
};

exports.update_user = function(req, res){
  //res.send("respond with a resource");

	var nano = require('nano')('http://localhost:5984');
	nano.db.get('users', function() {

		var users = nano.use('users');

		if (!req.body.id){
			
			users.insert(req.body, req.body.id, function(err, body, header){
				if (err){
					console.log("There was an error updating the user");
				}
			});

		}
	});
};