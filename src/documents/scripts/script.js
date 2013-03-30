
var holder = function (elements) {
  var that = {};
  that.elements = elements;

  that.polaroidExpander = function (event) {
    $.pep.toggleAll(false);
    var pagifyOpts = {
      pages: ['hactus', 'hypothesis', 'expression-designer']
    }
    pagifyOpts.default = pagifyOpts.pages[0]
    console.log(pagifyOpts.default);
    $(this).parent().pagify(pagifyOpts);
  };

  that.initialize = (function () {
    // Turn on pep.js
    that.elements.pep();
    // Turn on expander click handlers
    that.elements.find(".expander").on("mouseup", that.polaroidExpander);
  }());

};

var active = holder($(".holding"));

var getPageList = function(category) {
  getjson(url) = famn
  famn.category
}
