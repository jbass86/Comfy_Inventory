###
ConfirmDialogView
@author Josh Bass
###
backbone = require("backbone");
confirmDialogTemplate = require("plugins/ConfirmDialog/view/res/templates/confirmDialog.html");
css = require("plugins/ConfirmDialog/view/res/css/confirmDialog.css");

module.exports = backbone.View.extend(

		className: "confirmDialog",

		events: {"click .dialogYes" : "confirm", \
				 "click .dialogNo" : "cancel"},

		initialize: (model) ->

		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->
			@$el.html(confirmDialogTemplate({}));
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
						console.log("I Was confirmed!!");
						confirmAction();

					@model.set("actionConfirmed", false);
				});

		confirm: () ->

			@model.set("actionConfirmed", true);
			@$el.dialog("close");

		cancel: () ->
			@$el.dialog("close");
	)
