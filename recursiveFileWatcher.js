//
//Author: Josh Bass
//

var fs = require("fs");
var exec = require('child_process').exec;

var fileWatchMap = {};

var watchFunction = function(path, callback, options){

	var self = this;
	self.callback = callback;
	self.options = options ? options : {};

	if (self.options.debug){
		console.log("watchfunction called with path: " + path)
	}

	fs.stat(path, function(err, stats){

		if (!err && stats.isFile()){

			if (!fileWatchMap[path]){
				fileWatchMap[path] = true;
				if (self.options.debug){
					console.log("going to watch file " + path);
				}
				fs.watch(path, function(event, filename){
					self.callback(event, filename, path);
				});
			}
		}else if (!err && stats.isDirectory()){

			if (!fileWatchMap[path]){
				fileWatchMap[path] = true;
				if (self.options.debug){
					console.log("need to watch directory for changes " + path);
				}
				fs.watch(path, function(event, filename){
					watchFunction(path, self.callback, self.options);
				});
			}

			fs.readdir(path, function(err, files){

				if (!err && files){

					for (var i = 0; i < files.length; i++){
						if (self.options.debug){
							console.log("file contained in path dir " + files[i]);
						}
						watchFunction(path + "/" + files[i], self.callback, self.options);
					}
				}
			});
		}

	});

}


exports.watch = function(topPath, callback, options){

	watchFunction(topPath, callback, options);
}