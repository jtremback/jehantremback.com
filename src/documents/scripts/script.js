var content = {
  el : $('#content'),

  closer : $('#content').find('#closer'),

  tabs : $('#content').find('#tabs'),

  open : function(pagifyOpts) {
    //call pagify
    content.tabs.pagify(pagifyOpts);
    content.el.addClass('shown');
  },

  close : function() {
    content.el.removeClass('shown');
  }
}

var polaroids = {
  el : $('.polaroid'),

  expander : $('.polaroid').find('.expander'),
  
  getPages : function (event) {
    //assign jq to useful var
    var elementID = $(this).parents('.polaroid').attr('id');

    $.getJSON('/jsontest.json', function(data) {
      var pagifyOpts = {};

      //set pages to correct listing for ID
      pagifyOpts.pages = data[elementID];
      //set first in arr to default
      pagifyOpts.default = pagifyOpts.pages[0]

      content.open(pagifyOpts);

    })
  }
}



var init = function() {
  polaroids.el.pep();
  polaroids.expander.on('mouseup', polaroids.getPages);
  content.closer.on('mouseup', content.close);
  console.log(content.close);
}();
