###*
* @author Josh Bass
*###

define(["vendor/backbone"]

(Backbone) ->

	customerDeleteDialogModel = Backbone.Model.extend(

		###*
		* @method initialize
		*
		*###
		initialize: (options) ->

			if (options.title)
				@set("title", options.title);
			else
				@set("title", "Confirm Dialog");

	);
);