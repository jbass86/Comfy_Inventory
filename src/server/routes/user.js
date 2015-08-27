
/*
 * GET users listing.
 */

exports.users_by_last_name = function(req, res){

	var nano = require('nano')('http://localhost:5984');
	nano.db.get('users', function() {

		var users = nano.use('users');

		users.view('get_users', 'sort_by_last_name', function(err, body){
			res.send(body);
		});
	});
};

exports.update_user = function(req, res){

	console.log("the update user http request was made...");

	var nano = require('nano')('http://localhost:5984');
	nano.db.get('users', function() {

		var users = nano.use('users');

		if (!req.body._id){
			delete req.body._id;
		}
		if (!req.body._rev){
			delete req.body._rev
		}

		console.log("inserting into user db... " + req.body._id);
		users.insert(req.body, req.body.id, function(err, body, header){
			if (err){
				console.log("There was an error updating the user");
				console.log(err);
			}
			res.send({});
		});
	});
};

exports.delete_user = function(req, res){

	console.log("the update user http request was made...");

	var nano = require('nano')('http://localhost:5984');
	nano.db.get('users', function() {

		var users = nano.use('users');

		if (req.body._id && req.body._rev){
			console.log("deleting entry in user db... " + req.body._id);
			users.destroy(req.body._id, req.body._rev, function(err, body){
				if (err){
					console.log("There was an error deleting the user");
					console.log(err);
				}
				res.send({});
			});
		}


	});
};

exports.test_post = function(req, res){
	console.log("test_post...");
};
