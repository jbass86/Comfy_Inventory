// Generated by CoffeeScript 1.3.3
/**
* @author Josh Bass
*
*/

define(["vendor/backbone"], function(Backbone, Math2) {
  var customerUpdatePanelModel;
  return customerUpdatePanelModel = Backbone.Model.extend({
    /**
    		* initialize a new model, will automatically initialize a new
    		* search
    		* @method initialize
    		*
    		*
    */

    initialize: function(options) {
      return this.set("customerViewModel", options.customerViewModel);
    }
  });
});
