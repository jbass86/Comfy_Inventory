###*
* @author Josh Bass
*###
backbone = require("backbone");

module.exports = backbone.Model.extend(

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
