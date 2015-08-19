
$ = require("jquery");
jquery = $;
jQuery = $;
bootstrap = require("bootstrap");

var HeaderBarModel = require("./plugins/HeaderBar/model/HeaderBarModel.coffee");
var HeaderBarView = require("./plugins/HeaderBar/view/HeaderBarView.coffee");
var NavigationBarModel = require("./plugins/NavigationBar/model/NavigationBarModel.coffee");
var NavigationBarView = require("./plugins/NavigationBar/view/NavigationBarView.coffee");

var globalCSS = require("./stylesheets/global.css");
var styleCSS = require("./stylesheets/style.css");


$(function(){

	var headerBarModel = new HeaderBarModel();
	var headerBarView = new HeaderBarView({model: headerBarModel});
	console.log(headerBarView);
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
