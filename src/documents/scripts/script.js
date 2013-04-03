var content = {
  //store relevant dom elements
  el : $('#content'),
  closer : $('#content').find('#closer'),
  tabs : $('#content').find('#tabs'),

  open : function(elementID) {
    //set pages to correct listing for ID
    prePath = '/' + elementID + '/';

    //call pagify
    content.tabs.pagify(prePath);
    window.location.hash = elementID;
    content.el.addClass('shown');
  },

  close : function() {
    content.el.removeClass('shown');
    window.location.hash = ''
  }
}

var polaroids = {
  //store relevant dom elements
  el : $('.polaroid'),
  expander : $('.polaroid').find('.expander'),

  getPages : function (event) {
    //assign jq to useful var
    var elementID = $(this).parents('.polaroid').attr('id');

    content.open(elementID);
  }
}



var init = function() {
  //turn on pep on all polaroids
  polaroids.el.pep();
  //attach events
  polaroids.expander.on('mouseup', polaroids.getPages);
  content.closer.on('mouseup', content.close);
}();
