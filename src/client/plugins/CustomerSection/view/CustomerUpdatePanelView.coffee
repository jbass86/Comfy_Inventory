###
CustomerSectionBarView
@author Josh Bass
###

backbone = require("backbone");
customerUpdatePanelTemplate = require("plugins/CustomerSection/view/res/templates/customerUpdatePanel.html");
css = require("plugins/CustomerSection/view/res/css/customerUpdatePanel.css");

module.exports = 	backbone.View.extend(

		className: "customerUpdatePanel pressedborder box_shadow",
		id: "draggable",

		events: {"click .closeButton" : "closePanel", \
				 "click .cancelButton" : "closePanel", \
				 "click .updateButton" : "updateCustomer"},


		initialize: (model) ->

			@model.on("change:first_name", () =>
				@$el.find(".firstNameArea").val(@model.get("first_name"));
			);
			@model.on("change:last_name", () =>
				@$el.find(".lastNameArea").val(@model.get("last_name"));
			);
			@model.on("change:nick_name", () =>
				@$el.find(".nickNameArea").val(@model.get("nick_name"));
			);
			@model.on("change:email", () =>
				@$el.find(".emailArea").val(@model.get("email"));
			);
			@model.on("change:address", () =>
				@$el.find(".addressArea").val(@model.get("address"));
			);
			@model.on("change:birthday", () =>
				@$el.find(".birthdayArea").val(@model.get("birthday"));
			);

		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@$el.html(customerUpdatePanelTemplate());
			@$el.find(".birthdayArea").datepicker();
			return @$el


		toggleHidden: (overlayOn, animate) ->

			if (!overlayOn)
				if (animate)
					@$el.fadeOut("slow");
				else
					@$el.css("display", "none");
			else
				if (animate)
					@$el.fadeIn("slow");
				else
					@$el.css("display", "");

		closePanel: () ->

			@toggleHidden(false, true);
			@model.set("first_name", "");
			@model.trigger("change:first_name", "");
			@model.set("last_name", "");
			@model.trigger("change:last_name", "");
			@model.set("nick_name", "");
			@model.trigger("change:nick_name", "");
			@model.set("email", "");
			@model.trigger("change:email", "");
			@model.set("address", "");
			@model.trigger("change:address", "");
			@model.set("birthday", "");
			@model.trigger("change:birthday", "");
			@model.set("couchid", "");
			@model.trigger("change:couchid", "");
			@model.set("couchrev", "");
			@model.trigger("change:couchrev", "");

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

			@$el.find(".birthdayArea").datepicker();

			@$el.find(".updateButton").button();
			@$el.find(".cancelButton").button();

		updateCustomer: () ->

			update = {first_name: @$el.find(".firstNameArea").val(), \
				last_name: @$el.find(".lastNameArea").val(), \
				nick_name: @$el.find(".nickNameArea").val(), \
				email: @$el.find(".emailArea").val(), \
				address: @$el.find(".addressArea").val(), \
				birthday: @$el.find(".birthdayArea").val(), \
				_id: @model.get("couchid"), \
				_rev: @model.get("couchrev")}

			console.log("############################### I am inserting");
			$.post("update_user", update);
			@closePanel();
			@model.get("customerViewModel").trigger("change:customerEvent");
	)
