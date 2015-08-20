###
CustomerSectionBarView
@author Josh Bass
###

backbone = require("backbone");
customerUpdatePanelModel = require("plugins/CustomerSection/model/CustomerUpdatePanelModel.coffee");
customerUpdatePanelView = require("plugins/CustomerSection/view/CustomerUpdatePanelView.coffee");
confirmDialogModel = require("plugins/ConfirmDialog/model/ConfirmDialogModel.coffee");
confirmDialogView = require("plugins/ConfirmDialog/view/ConfirmDialogView.coffee");
customerSectionTemplate = require("plugins/CustomerSection/view/res/templates/customerSection.html");
customerRowTemplate = require("plugins/CustomerSection/view/res/templates/customerRowTemplate.html");
css = require("plugins/CustomerSection/view/res/css/customerSection.css");

module.exports = backbone.View.extend(

		className: "customerSection widthTransition",

		events: {"click .insertCustomerButton" : "insertCustomerEvent", \
				 "click .customerTable .editButton" : "customerTableEdit", \
				 "click .customerTable .deleteButton" : "customerTableDelete"},


		initialize: (model) ->

			console.log("I am the customer section!!!")

			@customerUpdateModel = new customerUpdatePanelModel({customerViewModel: @model});
			@customerUpdateView = new customerUpdatePanelView({model: @customerUpdateModel});

			@customerDeleteDialogModel = new confirmDialogModel({title: "Customer Delete Confirm"});
			@customerDeleteDialogView = new confirmDialogView({model: @customerDeleteDialogModel});

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


			console.log("YOYOYO")
			@$el.html(customerSectionTemplate({}));
			console.log(customerSectionTemplate({}));

			console.log("YOYOYO")

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
					table.append(customerRowTemplate(row.value));

				@$el.find(".customerTable table button").button();
			);

		customerTableEdit: (event) ->
			console.log("customer table edit");
			dataset = $(event.currentTarget)[0].dataset;
			@customerUpdateModel.set("first_name", dataset.first_name);
			@customerUpdateModel.set("last_name", dataset.last_name);
			@customerUpdateModel.set("nick_name", dataset.nick_name);
			@customerUpdateModel.set("email", dataset.email);
			@customerUpdateModel.set("address", dataset.address);
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
			@customerUpdateModel.set("address", "");
			@customerUpdateModel.set("birthday", "");
			@customerUpdateModel.set("couchid", "");
			@customerUpdateModel.set("couchrev", "");
			@customerUpdateView.toggleHidden(true, true);
	)
