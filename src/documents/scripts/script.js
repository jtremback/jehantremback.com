var popup = (function () {

  var el = $('#popup'),
      closer = $('#popup').find('.close'),
      holder = $('#popup').find('#holder'),
      prePath = 'content/';

  return {
    open : function(page) {
      var urlFrag = page.replace('#','');

      // Fetch page content
      $.get(prePath + urlFrag + '.html', function(content) {
        holder.html(content);
      }, 'text');

      el.addClass('shown');
    },

    close : function() {
      el.removeClass('shown');
    }
  };

})();

var polaroid = (function() {
  var wrapper = $('.wrapper'),
      stack = $.makeArray(wrapper);

  return {
    wrapper: wrapper,

    bringToTop : function() {
      console.log('bbt');
      wrapper.removeClass('top')
      $(this).addClass('top');
    }
  }
})();


var init = function() {
  $('.wrapper').on('mouseup', polaroid.bringToTop);
  polaroid.wrapper.pep({ shouldPreventDefault: true });
  //if window has a hash, run with it
  var hashProc = function() {
    if (window.location.hash) {
      popup.open(window.location.hash);
    } else {
      popup.close()
    }
  } 
  hashProc();

  //respond to hash changes w/out reloads
  $(window).on('hashchange', function() {
    hashProc();
  });
}();
