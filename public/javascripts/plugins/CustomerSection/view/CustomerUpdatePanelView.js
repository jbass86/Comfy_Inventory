// Generated by CoffeeScript 1.3.3
/*
CustomerSectionBarView
@author Josh Bass
*/

define(["vendor/backbone", "plugins/CustomerSection/view/Templates", "css!plugins/CustomerSection/view/res/css/customerUpdatePanel.css"], function(Backbone, Templates, CSS) {
  return Backbone.View.extend({
    className: "customerUpdatePanel pressedborder box_shadow",
    id: "draggable",
    initialize: function(model) {},
    /*
    		Create the Dialog and return its element
    		@method render
    */

    render: function() {
      this.$el.html(Templates.customerUpdatePanel());
      this.$el.find(".birthdayArea").datepicker();
      return this.$el;
    },
    toggleHidden: function(overlayOn, animate) {
      if (!overlayOn) {
        if (animate) {
          return this.$el.fadeOut("slow");
        } else {
          return this.$el.css("display", "none");
        }
      } else {
        if (animate) {
          return this.$el.fadeIn("slow");
        } else {
          return this.$el.css("display", "");
        }
      }
    },
    /*
    		Called after Dialog has been appended, this will set up the prog search
    		list with all known searches
    		@method realized
    */

    realized: function() {
      this.$el.find(".birthdayArea").datepicker();
      console.log(this.$el.find(".updateButton"));
      this.$el.find(".updateButton").button();
      return this.$el.find(".cancelButton").button();
    }
  });
});