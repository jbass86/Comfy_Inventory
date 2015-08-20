###*
* @author Josh Bass
*###
backbone = require("backbone");

module.exports = backbone.Model.extend(

		###*
		* initialize a new model, will automatically initialize a new
		* search
		* @method initialize
		*
		*###
		initialize: (options) ->
			console.log(options.mainArea);
			@set("mainElement", options.mainArea);
			console.log("main element from the model is ");
			console.log(@get("mainElement"));


	);
