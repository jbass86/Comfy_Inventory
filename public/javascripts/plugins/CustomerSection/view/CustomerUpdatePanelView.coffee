###
CustomerSectionBarView
@author Josh Bass
###
define(["vendor/backbone", 
		"plugins/CustomerSection/view/Templates"
		"css!plugins/CustomerSection/view/res/css/customerUpdatePanel.css"],

(Backbone, Templates, CSS) ->

	Backbone.View.extend(
		className: "customerUpdatePanel pressedborder box_shadow",
		id: "draggable",

		events: {"click .closeButton" : "closePanel", \
				 "click .cancelButton" : "closePanel", \
				 "click .updateButton" : "updateCustomer"},

		
		initialize: (model) ->


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@$el.html(Templates.customerUpdatePanel());
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

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

			@$el.find(".birthdayArea").datepicker();	

			console.log(@$el.find(".updateButton"));
			@$el.find(".updateButton").button();
			@$el.find(".cancelButton").button();		

		updateCustomer: () ->

			console.log(@$el.find(".firstNameArea").val());
			update = {first_name: @$el.find(".firstNameArea").val(), \
				last_name: @$el.find(".lastNameArea").val(), \
				nick_name: @$el.find(".nickNameArea").val(), \ 
				email: @$el.find(".emailArea").val(), \
				country: @$el.find(".countryArea").val(), \ 
				birthday: @$el.find(".birthdayArea").val()}
			console.log("update to send to server");
			console.log(update);

			$.post("update_user", update, (data) =>

				console.log("updated user");
				console.log(data);
			);
			@toggleHidden(false, true);
	)
)