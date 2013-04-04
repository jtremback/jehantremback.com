WebFontConfig = {
  google: { families: [ 'Permanent+Marker::latin', 'Bitter::latin' ] }
 };

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})(); 



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
      wrapper.removeClass('top')
      $(this).addClass('top');
    }
  }
})();



var init = function() {
  $('.wrapper').on('mousedown', polaroid.bringToTop);
  polaroid.wrapper.pep();
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
