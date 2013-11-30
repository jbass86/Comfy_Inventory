requirejs.config({
	packages: [],
	
	paths: {"css": "vendor/amd_plugins/css",
			"text": "vendor/amd_plugins/text",
            "shader": "vendor/amd_plugins/shader"}
});



(function($) {
	jQuery.event.special.destroyed = {
		remove: function(o) {
      		if (o.handler)
        		o.handler();
        }
    };
})(jQuery);

requirejs(["plugins/HeaderBar/model/HeaderBarModel",
	"plugins/HeaderBar/view/HeaderBarView",
	"plugins/NavigationBar/model/NavigationBarModel",
	"plugins/NavigationBar/view/NavigationBarView"],
function(HeaderBarModel, HeaderBarView, 
	NavigationBarModel, NavigationBarView) {

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
	
});
