###
NavigationBarView
@author Josh Bass
###

backbone = require("backbone");
customerSectionModel = require("plugins/CustomerSection/model/CustomerSectionModel.coffee");
customerSectionView = require("plugins/CustomerSection/view/CustomerSectionView.coffee");
navigationBarTemplate = require("plugins/NavigationBar/view/res/templates/navigationBar.html");
css = require("plugins/NavigationBar/view/res/css/navigationBar.css");

module.exports = () ->

	backbone.View.extend(
		className: "navigationBar pressedBorder",

		events: {"click .expandButton" : "toggleNavBarExpand", \
				 "click .section" : "selectView"},

		initialize: (model) ->

			@navBarExpanded = true;

			console.log("hey the nav bar is initialized")

			@customerSectionModel = new customerSectionModel();
			@customerSectionView = new customerSectionView({model: @customerSectionModel})

			@currentView = @customerSectionView;


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@customerSectionView.render();

			@$el.html(navigationBarTemplate());
			console.log(@currentView);
			@model.get("mainElement").append(@currentView.$el);
			@currentView.realized();
			return @$el

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

		toggleNavBarExpand: () ->

			@navBarExpanded = !@navBarExpanded;
			if (@navBarExpanded)

				@$el.css("width", "15%");
				@currentView.$el.css("width", "85%");
				@$el.find(".navBarLabel").css("display", "");
				@$el.find(".section").css("display", "")
			else

				@$el.css("width", "1%");
				@currentView.$el.css("width", "99%");
				@$el.find(".navBarLabel").css("display", "none");
				@$el.find(".section").css("display", "none");

		selectView: (event)->

			#unfortunatley css transition does not play nice with
			#jqueryUI so remove it before the animation then re add it
			#when its done.
			@currentView.$el.removeClass("widthTransition");
			@currentView.$el.toggle( "blind", {}, 500, () =>
				console.log("done folding now open new view");
				@currentView.$el.addClass("widthTransition");
				console.log("the event is ");
				console.log(event);
			);

		loadNewView: (viewName) ->

			console.log("loading up a new view...");
	 )
