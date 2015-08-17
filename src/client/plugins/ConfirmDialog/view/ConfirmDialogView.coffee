###
ConfirmDialogView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/ConfirmDialog/view/Templates",
		'css!plugins/ConfirmDialog/view/res/css/confirmDialog.css'],

(Backbone, Templates, CSS) ->

	Backbone.View.extend(

		className: "confirmDialog",

		events: {"click .dialogYes" : "confirm", \
				 "click .dialogNo" : "cancel"},
		
		
		initialize: (model) ->


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->
			@$el.html(Templates.confirmDialog({}));
			return @$el

		###
		@method realized
		###
		realized: () ->
			@$el.css("display", "none");
			@$el.find(".dialogYes").button();
			@$el.find(".dialogNo").button();
			

		confirmDelete: (confirmAction) ->

			@$el.dialog({hide: { effect: "explode", duration: 1000 }, \
				title: @model.get("title"), \
				close: () =>
					console.log("I was closed...");
					if (@model.get("actionConfirmed"))
						console.log("I Was confirmed!! :)");
						confirmAction();
					
					@model.set("actionConfirmed", false);
				});
			
		confirm: () ->

			@model.set("actionConfirmed", true);
			@$el.dialog("close");

		cancel: () ->
			@$el.dialog("close");

	)
)