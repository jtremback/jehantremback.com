(function($) {
  $.fn.pagify = function(prePath) {
    var that = this;

    that.switchPage = function() {
      page = window.location.hash.replace('#','');

      // Do not run if the hash is empty
      if (window.location.hash != '') {
        // Fetch page content
        $.get(prePath + page + '.html', function(content) {
          $(that).html(content);
        }, 'text');
      }
    }

    //Run it if the page already has a hash
    if (window.location.hash) that.switchPage();

    // Respond to hash changes
    $(window).bind('hashchange', function() {
      that.switchPage();
    });    

  };
})(jQuery);



var content = {
  //store relevant dom elements
  el : $('#content'),
  closer : $('#content').find('#closer'),
  tabs : $('#content').find('#tabs'),

  open : function(defaultPage) {
    window.location.hash = defaultPage;
    content.el.addClass('shown');
  },

  close : function() {
    content.el.removeClass('shown');
    window.location.hash = '';
  }
}



var polaroids = {
  //store relevant dom elements
  el : $('.polaroid'),
  expander : $('.polaroid').find('.expander'),

  getPage : function (event) {
    //assign jq to useful var
    var defaultPage = $(this).parents('.polaroid').attr('data-default-page');

    content.open(defaultPage);
  }
}



var init = function() {
  //turn on pep on all polaroids
  polaroids.el.pep();
  
  //put pagify on content area
  content.tabs.pagify('content/');

  if (window.location.hash) {
    content.open();
  }

  //attach events
  polaroids.expander.on('mouseup', polaroids.getPage);
  content.closer.on('mouseup', content.close);
}();
