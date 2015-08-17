var backbone = require('backbone');

module.exports = backbone.Model.extend({

  initialize: function(){

    console.log("ctor josh model");

    this.on("change:attr", function(model, value){

      console.log("you set my attr");
      console.log("value is " + value);
    });
  }
});
