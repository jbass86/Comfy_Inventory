
		define(["vendor/handlebars"], function(Handlebars) {
			return {
		
"customerSection": Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "\r\n<div class=\"contentDiv\">\r\n	<h2 class=\"customerSectionTitle\">Customer Section</h2>\r\n\r\n	<div style=\"clear: both\"></div>\r\n\r\n	<div class=\"customerInsertPanel\">\r\n		<button class=\"insertCustomerButton\">Insert Customer</button>\r\n	</div>\r\n\r\n	<div style=\"clear: both\"></div>\r\n\r\n	<div class=\"customerTable\">\r\n		<table border=\"1\" class=\"pressedBorder\">\r\n		<tr>\r\n		<th>Last Name</th>\r\n		<th>First Name</th>\r\n		<th>NickName</th>\r\n		<th>Email</th>\r\n		<th>Country</th>\r\n		<th>Birthday</th>\r\n		</tr>\r\n		</table>\r\n	</div>\r\n</div>\r\n";
  }

),
"customerUpdatePanel": Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "\r\n<div class=\"headerDiv\">\r\n	<span>Update Customer</span>\r\n	<div class=\"closeButton\">\r\n		<span class=\"ui-icon ui-icon-closethick\"></span>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"infoPanel\">\r\n	<div><span class=\"label\">First Name:</span> \r\n		<input type=\"text\" class=\"firstNameArea\">\r\n	</div>\r\n\r\n	<div><span class=\"label\">Last Name:</span> \r\n		 <input type=\"text\" class=\"lastNameArea\">\r\n	</div>\r\n\r\n	<div><span class=\"label\">Nickname:</span>    \r\n		<input type=\"text\" class=\"nickNameArea\">\r\n	</div>\r\n\r\n	<div><span class=\"label\">Email:</span>     \r\n	  <input type=\"text\" class=\"emailArea\">\r\n	</div>\r\n\r\n	<div><span class=\"label\">Country:</span>    \r\n	  <input type=\"text\" class=\"countryArea\">\r\n	</div>\r\n\r\n	<div> \r\n		<p><span class=\"label\">Birthday:</span>  \r\n			<input type=\"text\" class=\"birthdayArea\" id=\"datepicker\"></p> \r\n	</div>\r\n</div>\r\n\r\n<div class=\"finishButtons\">\r\n	<button id=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only updateButton\" role=\"button\" aria-disabled=\"false\">\r\n		<span class=\"ui-button-text\">Update</span>\r\n	</button>\r\n	<button id=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only cancelButton\" role=\"button\" aria-disabled=\"false\">\r\n		<span class=\"ui-button-text\">Cancel</span>\r\n	</button>\r\n</div>";
  }

)
}});