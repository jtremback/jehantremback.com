var polaroidInit = function(elements) {
  
  var expand = function (event) {
    //turn pep off on all
    $.pep.toggleAll(false);

    //assign jq to useful vars
    var element = $(this).parents('.polaroid'),
        elementID = element.attr('id');

        console.log(element);

    //clear pagify styles and set expanded class
    element.attr('style', '').addClass('expanded');

    $.getJSON('/jsontest.json', function(data) {
      var pagifyOpts = {};
      //set pages to correct listing for ID
      pagifyOpts.pages = data[elementID];
      //set first in arr to default
      pagifyOpts.default = pagifyOpts.pages[0]

      //call pagify
      var detached = element.children().detach();
      console.log(detached);
      element.pagify(pagifyOpts, function() { 
        //attach contract event handler and contract expanded element
        element.find('.contract').on('mouseup', function() {
          console.log('contract');
          element.removeClass("expanded");
          element.html(detached);
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

