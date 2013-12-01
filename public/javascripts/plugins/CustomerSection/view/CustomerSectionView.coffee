###
CustomerSectionBarView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/CustomerSection/model/CustomerUpdatePanelModel",
		"plugins/CustomerSection/view/CustomerUpdatePanelView",
		"plugins/CustomerSection/view/Templates",
		'css!plugins/CustomerSection/view/res/css/customerSection.css'],

(Backbone, CustomerUpdatePanelModel, CustomerUpdatePanelView, Templates, CSS) ->

	Backbone.View.extend(
		className: "customerSection",

		events: {"click .insertCustomerButton" : "insertCustomerEvent", \
				 "click .customerTable .editButton" : "customerTableEdit", \
				 "click .customerTable .deleteButton" : "customerTableDelete"},

		
		initialize: (model) ->

			console.log("I am the customer section!!!")

			@customerUpdateModel = new CustomerUpdatePanelModel();
			@customerUpdateView = new CustomerUpdatePanelView({model: @customerUpdateModel});


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@$el.html(Templates.customerSection({}));

			elem = @customerUpdateView.render();
			@$el.find(".contentDiv").append(elem);
			elem.draggable();
			elem.css("position", "absolute");
			@customerUpdateView.toggleHidden(false);

			return @$el

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

			@customerUpdateView.realized();
			@populateTable();

			window.setInterval(() =>
				@populateTable();
			10000);
			
		populateTable: () ->

			$.get("users_by_last_name", {}, (data) =>

				table = @$el.find(".customerTable table");
				table.html("");
				for row in data.rows
					console.log("wowow");
					table.append(Templates.customerRowTemplate(row.value));
			);

		customerTableEdit: (event) ->
			console.log("customer table edit");

		customerTableDelete: (event) ->
			console.log("customer table delete");

		insertCustomerEvent: (event) ->

			@customerUpdateView.toggleHidden(true, true);
			window.setTimeout(() =>
				@populateTable();
			2000);	
	)
)