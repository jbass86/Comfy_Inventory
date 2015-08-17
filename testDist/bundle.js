(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],2:[function(require,module,exports){

module.exports = function(){

  console.log("I'm a sub script");
};

},{}],3:[function(require,module,exports){

var aScript = require('./aScript.js');
//var joshModel = require('./sub1/joshModel.js');
var coffeeTest = require('./sub2/testCoffee.coffee');
//var hbTemplate = require('./hbTest.html');
var someCSS = require('./someCss.css');


console.log("Hello world");
aScript();

//var aModel = new joshModel();

//aModel.set("attr", "yoyoyo");

coffeeTest();

//var temp = hbTemplate({yo: "stuff"});
//console.log(temp);

},{"./aScript.js":2,"./someCss.css":4,"./sub2/testCoffee.coffee":5}],4:[function(require,module,exports){
var css = "body{\n  background: pink;\n}\n"; (require("./..\\node_modules\\cssify"))(css); module.exports = css;
},{"./..\\node_modules\\cssify":1}],5:[function(require,module,exports){
module.exports = function() {
  var x;
  console.log("im a coffee");
  x = 1;
  if (x === 1) {
    return console.log("x was 1");
  }
};


},{}]},{},[3]);
