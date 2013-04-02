var polaroidInit = function(elements) {
  
  var expand = function (event) {
    //turn pep off on all
    $.pep.toggleAll(false);

    //assign jq to useful vars
    var element = $(this).parents('.polaroid'),
        elementID = element.attr('id');

    //save polaroid children and styling
    var detached = {};
    detached.children = element.children().detach();
    detached.style = element.attr('style');
    console.log(detached.style);

    //clear polaroid styles and set expanded class
    element.attr('style', '').addClass('expanded');

    $.getJSON('/jsontest.json', function(data) {
      var pagifyOpts = {};

      //set pages to correct listing for ID
      pagifyOpts.pages = data[elementID];
      //set first in arr to default
      pagifyOpts.default = pagifyOpts.pages[0]

      //call pagify
      element.pagify(pagifyOpts, function() { 
        //attach contract event handler and contract expanded element
        element.find('.contract').on('mouseup', function() {
          element.removeClass("expanded");
          element.html(detached.children).attr('style', detached.style);
          $.pep.toggleAll(true);
        });
      })
    })

    var contract = function(event) {
    }
  };


  var init = function() {
    elements.pep();
    elements.find('.expander').on('mouseup', expand);
  }();
}

polaroidInit($('.polaroid'));

