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

		events: {"click .insertCustomerButton" : "insertCustomerEvent"},

		
		initialize: (model) ->

			console.log("I am the customer section!!!")

			@customerUpdateModel = new CustomerUpdatePanelModel();
			@customerUpdateView = new CustomerUpdatePanelView({model: @customerUpdateModel});


		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->

			@$el.html(Templates.customerSection());

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
			
		populateTable: () ->

			$.get("users_by_last_name", {}, (data) =>

				table = @$el.find(".customerTable table");
				for row in data.rows
					table.append("<tr>" +  \ 
						"<td>" + row.value.last_name + "</td>" + \
						"<td>" + row.value.first_name + "</td>" + \
						"<td>" + row.value.nick_name + "</td>" + \
						"<td>" + row.value.email + "</td>" + \
						"<td>" + row.value.country + "</td>" + \
						"<td>" + row.value.birthday + "</td>" + \
						"<td> <button>" + "Edit" + "</button> </td>" + \
						"<td> <button>" + "Delete" + "</button> </td>" + \
						"</tr>");		
			);

		insertCustomerEvent: () ->

			@customerUpdateView.toggleHidden(true, true);	
	)
)