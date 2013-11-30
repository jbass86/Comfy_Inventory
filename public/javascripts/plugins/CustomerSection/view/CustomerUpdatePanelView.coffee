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


		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

			@$el.find(".birthdayArea").datepicker();			
	)
)