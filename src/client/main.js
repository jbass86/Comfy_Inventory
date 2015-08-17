
var headerBarModel = require("./plugins/HeaderBar/model/HeaderBarModel.js");
var headerBarView = require("./plugins/HeaderBar/view/HeaderBarView.js");
var navBarModel = require("./plugins/NavigationBar/model/NavigationBarModel.js");
var navBarModel = require("./plugins/NavigationBar/view/NavigationBarView.js");
var $ = require("jquery");

var globalCSS = require("./stylesheets/global.css");
var styleCSS = require("./stylesheets/style.css");


$(function(){


	var headerBarModel = new HeaderBarModel();
	var headerBarView = new HeaderBarView({model: headerBarModel});
	$(".headerArea").append(headerBarView.render());

	var navigationBarModel = new NavigationBarModel({mainArea: $(".mainArea")});
	var navBarView = new NavigationBarView({model: navigationBarModel});
	$(".mainArea").append(navBarView.render());


	console.log("hello3333 inventory ka! :)");
	// console.log($.get("users", {add: {name: "kankamol", country: "thai"}}, function(data){

	// 	console.log("data is ");
	// 	console.log(data);
	// 	console.log("name is าส่สา่" + data.name);
	// 	console.log("country is " + data.country);
	// }));

	$.get("users_by_last_name", {}, function(data){

		console.log("users by last name returned...");
		console.log(data);
	});

});
