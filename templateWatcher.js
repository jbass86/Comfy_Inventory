
var watcher = require("./recursiveFileWatcher");
var exec = require('child_process').exec;

exec('rake compileTpls',
 function (error, stdout, stderr) {

 	console.log(stdout);
 });

var callback = function(event, filename, path){

	// console.log("got a filewatch callback");
	// console.log(event);
	// console.log(filename);
	// console.log(path);
	var list = filename.split(".");
	console.log(list);
	if (list[1] == 'html'){
		console.log("this is an html file so try to template compile it");
		console.log(path);
		var filePath = path.substring(1, path.length - filename.length);
		exec('rake compileTpls["pretty","' + filePath + '"]',
		function (error, stdout, stderr) {

	 		console.log(stdout);
		});
	}
	
}

watcher.watch("./public/javascripts", callback, {debug: false});