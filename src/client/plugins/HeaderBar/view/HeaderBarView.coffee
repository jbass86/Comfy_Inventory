###
NavigationBarView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/HeaderBar/view/Templates",
		'css!plugins/HeaderBar/view/res/css/headerBar.css'],

(Backbone, Templates, CSS) ->

	Backbone.View.extend(
		className: "headerBar",

		
		initialize: (model) ->

			console.log("hey the nav bar is initialized")


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@$el.html(Templates.HeaderBar());
			return @$el

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->
			
	)
)