(function($) {
  $.fn.pagify = function(prePath) {
    var that = this;

    that.switchPage = function() {
      page = window.location.hash.replace('#','');

      // Do not run if the hash is empty
      if (window.location.hash != '') {
        // Fetch page popup
        $.get(prePath + page + '.html', function(popup) {
          $(that).html(popup);
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



var popup = {
  //store relevant dom elements
  el : $('#popup'),
  closer : $('#popup').find('.close'),
  holder : $('#popup').find('#holder'),

  open : function(defaultPage) {
    window.location.hash = defaultPage;
    popup.el.addClass('shown');
  },

  close : function() {
    popup.el.removeClass('shown');
    window.location.hash = '';
  }
}



var polaroids = {
  //store relevant dom elements
  el : $('.wrapper'),
  link : $('.polaroid').find('.link'),

  getPage : function (event) {
    //assign jq to useful var
    var defaultPage = $(this).parents('.polaroid').attr('data-default-page');

    popup.open(defaultPage);
  }
}



var init = function() {
  //turn on pep on all polaroids
  polaroids.el.pep();
  
  //put pagify on popup area
  popup.holder.pagify('content/');

  if (window.location.hash) {
    popup.open();
  }

  //attach events
  polaroids.link.on('mouseup', polaroids.getPage);
  popup.closer.on('mouseup', popup.close);
}();
