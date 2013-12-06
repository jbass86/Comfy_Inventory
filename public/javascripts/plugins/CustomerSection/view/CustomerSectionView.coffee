###
CustomerSectionBarView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/CustomerSection/model/CustomerUpdatePanelModel",
		"plugins/CustomerSection/view/CustomerUpdatePanelView",
		"plugins/ConfirmDialog/model/ConfirmDialogModel",
		"plugins/ConfirmDialog/view/ConfirmDialogView",
		"plugins/CustomerSection/view/Templates",
		'css!plugins/CustomerSection/view/res/css/customerSection.css'],

(Backbone, CustomerUpdatePanelModel, CustomerUpdatePanelView, 
	ConfirmDialogModel, ConfirmDialogView, Templates, CSS) ->

	Backbone.View.extend(

		className: "customerSection widthTransition",

		events: {"click .insertCustomerButton" : "insertCustomerEvent", \
				 "click .customerTable .editButton" : "customerTableEdit", \
				 "click .customerTable .deleteButton" : "customerTableDelete"},

		
		initialize: (model) ->

			console.log("I am the customer section!!!")

			@customerUpdateModel = new CustomerUpdatePanelModel({customerViewModel: @model});
			@customerUpdateView = new CustomerUpdatePanelView({model: @customerUpdateModel});

			@customerDeleteDialogModel = new ConfirmDialogModel({title: "Customer Delete Confirm"});
			@customerDeleteDialogView = new ConfirmDialogView({model: @customerDeleteDialogModel});

			@model.on("change:customerEvent", ()=>
				window.setTimeout(() =>
					@populateTable();
				5000);
			);

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

			elem = @customerDeleteDialogView.render();
			@$el.find(".contentDiv").append(elem);

			return @$el

		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

			@$el.find(".customerInsertPanel .insertCustomerButton").button();
			@customerUpdateView.realized();
			@customerDeleteDialogView.realized();
			
			@populateTable();

			window.setInterval(() =>
				@populateTable();
			20000);
			
		populateTable: () ->

			$.get("users_by_last_name", {}, (data) =>

				table = @$el.find(".customerTable table");
				header = @$el.find(".customerTable table tr")[0];
				table.html("");
				table.append(header);
				for row in data.rows	
					table.append(Templates.customerRowTemplate(row.value));	

				@$el.find(".customerTable table button").button();
			);

		customerTableEdit: (event) ->
			console.log("customer table edit");
			dataset = $(event.currentTarget)[0].dataset;
			@customerUpdateModel.set("first_name", dataset.first_name);
			@customerUpdateModel.set("last_name", dataset.last_name);
			@customerUpdateModel.set("nick_name", dataset.nick_name);
			@customerUpdateModel.set("email", dataset.email);
			@customerUpdateModel.set("country", dataset.country);
			@customerUpdateModel.set("birthday", dataset.birthday);
			@customerUpdateModel.set("couchid", dataset.couchid);
			@customerUpdateModel.set("couchrev", dataset.couchrev);
			@customerUpdateView.toggleHidden(true, true);

		customerTableDelete: (event) ->
			console.log("customer table delete");

			deleteAction = () =>
				dataset = $(event.currentTarget)[0].dataset;
				$.post("delete_user", {_id: dataset.couchid, _rev: dataset.couchrev});
				@model.trigger("change:customerEvent");

			@customerDeleteDialogView.confirmDelete(deleteAction);

			

		insertCustomerEvent: (event) ->

			@customerUpdateModel.set("first_name", "");
			@customerUpdateModel.set("last_name", "");
			@customerUpdateModel.set("nick_name", "");
			@customerUpdateModel.set("email", "");
			@customerUpdateModel.set("country", "");
			@customerUpdateModel.set("birthday", "");
			@customerUpdateModel.set("couchid", "");
			@customerUpdateModel.set("couchrev", "");
			@customerUpdateView.toggleHidden(true, true);
	)
)