var clickEvent = "createTouch" in document ? "touchend" : "click";

WebFontConfig = {
  google: { families: [ 'Bitter::latin' ] }
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
      holder = $('#popup').find('#content-holder'),
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
      a = 1;

  return {
    init : function() {
      wrapper.pep({
        start: function(event, object) {
          $(object.el).css("z-index", a++); 
        },
        shouldPreventDefault: true
      });


      wrapper.find('.link').on('touchend', function(event){
        window.location.hash = $(this).attr('href');
      })
    }
  }
})();



var init = function() {
  polaroid.init()

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
