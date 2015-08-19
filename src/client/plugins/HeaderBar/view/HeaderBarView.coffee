###
NavigationBarView
@author Josh Bass
###

backbone = require("backbone");
headerBarTemplate = require("plugins/HeaderBar/view/res/templates/headerBar.html");
css = require("plugins/HeaderBar/view/res/css/headerBar.css");

module.exports = backbone.View.extend(

		className: "headerBar",


		initialize: (model) ->

			console.log("hey the nav bar is initialized")


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@$el.html(headerBarTemplate());
			return @$el

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

	);
