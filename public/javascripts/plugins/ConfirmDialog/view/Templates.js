
		define(["vendor/handlebars"], function(Handlebars) {
			return {
		
"confirmDialog": Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<span>Do you wish to confirm this action?</span>\r\n\r\n<div class=\"buttonPanel\">\r\n	<button id=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only dialogYes\" role=\"button\" aria-disabled=\"false\">\r\n			Yes\r\n	</button>\r\n	<button id=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only dialogNo\" role=\"button\" aria-disabled=\"false\">\r\n			No\r\n	</button>\r\n</div>";
  }

)
}});