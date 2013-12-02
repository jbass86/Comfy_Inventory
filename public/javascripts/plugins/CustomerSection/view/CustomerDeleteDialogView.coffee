###
CustomerSectionBarView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/CustomerSection/view/Templates",
		'css!plugins/CustomerSection/view/res/css/customerDeleteDialog.css'],

(Backbone, Templates, CSS) ->

	Backbone.View.extend(

		className: "customerDeleteDialog",

		events: {"click .dialogYes" : "confirm", \
				 "click .dialogNo" : "cancel"},
		
		
		initialize: (model) ->


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->
			@$el.html(Templates.customerDeleteDialog({}));
			return @$el

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->
			@$el.css("display", "none");
			@$el.find(".dialogYes").button();
			@$el.find(".dialogNo").button();
			

		confirmDelete: (deleteAction) ->

			@$el.dialog({title: "Customer Delete Confirm", \
				close: () =>
					console.log("I was closed...");
					if (@model.get("actionConfirmed"))
						console.log("I Was confirmed!! :)");
						deleteAction();
					
					@model.set("actionConfirmed", false);
				});
			
		confirm: () ->

			@model.set("actionConfirmed", true);
			@$el.dialog("close");

		cancel: () ->
			@$el.dialog("close");

	)
)