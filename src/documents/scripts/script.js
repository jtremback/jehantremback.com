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
      element.pagify(pagifyOpts, function() { console.log(element.find('.contract'));})
      // .on('mouseup', contract);
    })

    //contract expanded element
    var contract = function(event) {
      console.log('contract');
      $(this).removeClass("expanded");
      $.pep.toggleAll(true);
    }
  };


  var init = function() {
    elements.pep();
    elements.find('.expander').on('mouseup', expand);
  }();
}

polaroidInit($('.polaroid'));

