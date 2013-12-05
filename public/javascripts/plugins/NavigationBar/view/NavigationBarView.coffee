###
NavigationBarView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/CustomerSection/model/CustomerSectionModel",
		"plugins/CustomerSection/view/CustomerSectionView"
		"plugins/NavigationBar/view/Templates",
		'css!plugins/NavigationBar/view/res/css/navigationBar.css'],

(Backbone,  CustomerSectionModel, CustomerSectionView, Templates, CSS) ->

	Backbone.View.extend(
		className: "navigationBar pressedBorder", 

		events: {"click .expandButton" : "toggleNavBarExpand"},
		
		initialize: (model) ->

			@navBarExpanded = true;

			console.log("hey the nav bar is initialized")

			@customerSectionModel = new CustomerSectionModel();
			@customerSectionView = new CustomerSectionView({model: @customerSectionModel})

			@currentView = @customerSectionView;


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@customerSectionView.render();

			@$el.html(Templates.NavigationBar());
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
	 )
)