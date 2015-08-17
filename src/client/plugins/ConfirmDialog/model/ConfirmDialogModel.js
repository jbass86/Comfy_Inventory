// Generated by CoffeeScript 1.8.0

/**
* @author Josh Bass
*
 */
define(["vendor/backbone"], function(Backbone) {
  var customerDeleteDialogModel;
  return customerDeleteDialogModel = Backbone.Model.extend({

    /**
    		* @method initialize
    		*
    		*
     */
    initialize: function(options) {
      if (options.title) {
        return this.set("title", options.title);
      } else {
        return this.set("title", "Confirm Dialog");
      }
    }
  });
});
