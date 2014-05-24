###
CustomerSectionBarView
@author Josh Bass
###
define(["vendor/backbone",
		"plugins/InventorySection/view/Templates",
		'css!plugins/InventorySection/view/res/css/inventorySection.css'],

(Backbone, Templates, CSS) ->

	Backbone.View.extend(

		className: "inventorySection widthTransition",

		events: {},

		
		initialize: (model) ->

			console.log("I am the inventory section!!!")

			
		###
		Create the Dialog and return its element
		@method render
		###
		render: () ->


		###
		Called after Dialog has been appended, this will set up the prog search
		list with all known searches
		@method realized
		###
		realized: () ->

		
			
		populateTable: () ->

			

		inventoryTableEdit: (event) ->
		

		inventoryTableDelete: (event) ->
			
			

		insertInventoryEvent: (event) ->

		
	)
)