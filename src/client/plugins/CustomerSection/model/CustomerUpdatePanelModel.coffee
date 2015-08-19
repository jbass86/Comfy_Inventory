###*
* @author Josh Bass
*###
backbone = require("backbone");

module.exports = () ->

	customerUpdatePanelModel = backbone.Model.extend(

		###*
		* initialize a new model, will automatically initialize a new
		* search
		* @method initialize
		*
		*###
		initialize: (options) ->
			@set("customerViewModel", options.customerViewModel);
	);
