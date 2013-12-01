// Generated by CoffeeScript 1.3.3
/*
CustomerSectionBarView
@author Josh Bass
*/

define(["vendor/backbone", "plugins/CustomerSection/model/CustomerUpdatePanelModel", "plugins/CustomerSection/view/CustomerUpdatePanelView", "plugins/CustomerSection/view/Templates", 'css!plugins/CustomerSection/view/res/css/customerSection.css'], function(Backbone, CustomerUpdatePanelModel, CustomerUpdatePanelView, Templates, CSS) {
  return Backbone.View.extend({
    className: "customerSection",
    events: {
      "click .insertCustomerButton": "insertCustomerEvent",
      "click .customerTable .editButton": "customerTableEdit",
      "click .customerTable .deleteButton": "customerTableDelete"
    },
    initialize: function(model) {
      console.log("I am the customer section!!!");
      this.customerUpdateModel = new CustomerUpdatePanelModel();
      return this.customerUpdateView = new CustomerUpdatePanelView({
        model: this.customerUpdateModel
      });
    },
    /*
    		Create the Dialog and return its element
    		@method render
    */

    render: function() {
      var elem;
      this.$el.html(Templates.customerSection({}));
      elem = this.customerUpdateView.render();
      this.$el.find(".contentDiv").append(elem);
      elem.draggable();
      elem.css("position", "absolute");
      this.customerUpdateView.toggleHidden(false);
      return this.$el;
    },
    /*
    		Called after Dialog has been appended, this will set up the prog search
    		list with all known searches
    		@method realized
    */

    realized: function() {
      var _this = this;
      this.customerUpdateView.realized();
      this.populateTable();
      return window.setInterval(function() {
        return _this.populateTable();
      }, 10000);
    },
    populateTable: function() {
      var _this = this;
      return $.get("users_by_last_name", {}, function(data) {
        var row, table, _i, _len, _ref, _results;
        table = _this.$el.find(".customerTable table");
        table.html("");
        _ref = data.rows;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          console.log("wowow");
          _results.push(table.append(Templates.customerRowTemplate(row.value)));
        }
        return _results;
      });
    },
    customerTableEdit: function(event) {
      return console.log("customer table edit");
    },
    customerTableDelete: function(event) {
      return console.log("customer table delete");
    },
    insertCustomerEvent: function(event) {
      var _this = this;
      this.customerUpdateView.toggleHidden(true, true);
      return window.setTimeout(function() {
        return _this.populateTable();
      }, 2000);
    }
  });
});
