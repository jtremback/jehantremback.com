// Comment
// $(document).ready(function() {
//  var active = $(".holding");
//  $(active).pep();
//  active.click(function(){
//    $(this).addClass("full")
//    $(this).pagify({
//      pages: ['about'],
//      default: 'about'
//    });
//  });
// });

var holder = function (elements) {
  var that = {};
  that.elements = elements;

  that.polaroidExpander = function (event) {
    $.pep.toggleAll(false);
    $(this).parent().pagify({
      pages: ['about', 'one', 'two'],
      default: 'about'
    });
  };

  that.initialize = (function () {
    // Turn on pep.js
    that.elements.pep();
    // Turn on expander click handlers
    that.elements.find(".expander").on("mouseup", that.polaroidExpander);
  }());

};

var active = holder($(".holding"));