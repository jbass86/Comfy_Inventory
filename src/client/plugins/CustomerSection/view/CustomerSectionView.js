// Generated by CoffeeScript 1.8.0

/*
CustomerSectionBarView
@author Josh Bass
 */
define(["vendor/backbone", "plugins/CustomerSection/model/CustomerUpdatePanelModel", "plugins/CustomerSection/view/CustomerUpdatePanelView", "plugins/ConfirmDialog/model/ConfirmDialogModel", "plugins/ConfirmDialog/view/ConfirmDialogView", "plugins/CustomerSection/view/Templates", 'css!plugins/CustomerSection/view/res/css/customerSection.css'], function(Backbone, CustomerUpdatePanelModel, CustomerUpdatePanelView, ConfirmDialogModel, ConfirmDialogView, Templates, CSS) {
  return Backbone.View.extend({
    className: "customerSection widthTransition",
    events: {
      "click .insertCustomerButton": "insertCustomerEvent",
      "click .customerTable .editButton": "customerTableEdit",
      "click .customerTable .deleteButton": "customerTableDelete"
    },
    initialize: function(model) {
      console.log("I am the customer section!!!");
      this.customerUpdateModel = new CustomerUpdatePanelModel({
        customerViewModel: this.model
      });
      this.customerUpdateView = new CustomerUpdatePanelView({
        model: this.customerUpdateModel
      });
      this.customerDeleteDialogModel = new ConfirmDialogModel({
        title: "Customer Delete Confirm"
      });
      this.customerDeleteDialogView = new ConfirmDialogView({
        model: this.customerDeleteDialogModel
      });
      return this.model.on("change:customerEvent", (function(_this) {
        return function() {
          return window.setTimeout(function() {
            return _this.populateTable();
          }, 5000);
        };
      })(this));
    },

    /*
    		Create the Dialog and return its element
    		@method render
     */
    render: function() {
      var elem;
      console.log("YOYOYO");
      this.$el.html(Templates.customerSection({}));
      console.log(Templates.customerSection({}));
      console.log("YOYOYO");
      elem = this.customerUpdateView.render();
      this.$el.find(".contentDiv").append(elem);
      elem.draggable();
      elem.css("position", "absolute");
      this.customerUpdateView.toggleHidden(false);
      elem = this.customerDeleteDialogView.render();
      this.$el.find(".contentDiv").append(elem);
      return this.$el;
    },

    /*
    		Called after Dialog has been appended, this will set up the prog search
    		list with all known searches
    		@method realized
     */
    realized: function() {
      this.$el.find(".customerInsertPanel .insertCustomerButton").button();
      this.customerUpdateView.realized();
      this.customerDeleteDialogView.realized();
      this.populateTable();
      return window.setInterval((function(_this) {
        return function() {
          return _this.populateTable();
        };
      })(this), 20000);
    },
    populateTable: function() {
      return $.get("users_by_last_name", {}, (function(_this) {
        return function(data) {
          var header, row, table, _i, _len, _ref;
          table = _this.$el.find(".customerTable table");
          header = _this.$el.find(".customerTable table tr")[0];
          table.html("");
          table.append(header);
          _ref = data.rows;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            table.append(Templates.customerRowTemplate(row.value));
          }
          return _this.$el.find(".customerTable table button").button();
        };
      })(this));
    },
    customerTableEdit: function(event) {
      var dataset;
      console.log("customer table edit");
      dataset = $(event.currentTarget)[0].dataset;
      this.customerUpdateModel.set("first_name", dataset.first_name);
      this.customerUpdateModel.set("last_name", dataset.last_name);
      this.customerUpdateModel.set("nick_name", dataset.nick_name);
      this.customerUpdateModel.set("email", dataset.email);
      this.customerUpdateModel.set("address", dataset.address);
      this.customerUpdateModel.set("birthday", dataset.birthday);
      this.customerUpdateModel.set("couchid", dataset.couchid);
      this.customerUpdateModel.set("couchrev", dataset.couchrev);
      return this.customerUpdateView.toggleHidden(true, true);
    },
    customerTableDelete: function(event) {
      var deleteAction;
      console.log("customer table delete");
      deleteAction = (function(_this) {
        return function() {
          var dataset;
          dataset = $(event.currentTarget)[0].dataset;
          $.post("delete_user", {
            _id: dataset.couchid,
            _rev: dataset.couchrev
          });
          return _this.model.trigger("change:customerEvent");
        };
      })(this);
      return this.customerDeleteDialogView.confirmDelete(deleteAction);
    },
    insertCustomerEvent: function(event) {
      this.customerUpdateModel.set("first_name", "");
      this.customerUpdateModel.set("last_name", "");
      this.customerUpdateModel.set("nick_name", "");
      this.customerUpdateModel.set("email", "");
      this.customerUpdateModel.set("address", "");
      this.customerUpdateModel.set("birthday", "");
      this.customerUpdateModel.set("couchid", "");
      this.customerUpdateModel.set("couchrev", "");
      return this.customerUpdateView.toggleHidden(true, true);
    }
  });
});
