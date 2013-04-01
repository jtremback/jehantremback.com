var polaroidInit = function(elements) {
  //turn off pep
  //expand element to fullscreen
  //get category for id of dom element
  //call pagify with pages in category
  var expand = function (event) {
    $.pep.toggleAll(false);

    var polaroid = $(this).parents(".polaroid"),
        polaroidId = polaroid.attr("id");

    $.getJSON('/jsontest.json', function(data) {
      var pagifyOpts = {};
      //set pages to correct listing for ID
      pagifyOpts.pages = data[polaroidId];
      //set first in arr to default
      pagifyOpts.default = pagifyOpts.pages[0]

      //call pagify
      polaroid.pagify(pagifyOpts);
    })
  };

  var init = function() {
    elements.pep();
    elements.find(".expander").on("mouseup", expand);
  }();
}

polaroidInit($(".polaroid"));
