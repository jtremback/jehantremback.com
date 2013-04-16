//Get Fonts
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



//Group everything having to do with popup content window together
var popup = (function () {
  //Assign elements to nice vars
  var el = $('#popup'),
      closer = $('#popup').find('.close'),
      holder = $('#popup').find('#content-holder'),
      prePath = 'content/';

  return {
    //read url and get corresponding data
    open : function(page) {
      var urlFrag = page.replace('#','');

      // Fetch page content
      $.get(prePath + urlFrag + '.html', function(content) {
        holder.html(content);
      }, 'text');

      //show the popup
      el.addClass('shown');
    },

    //hide the popup
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

  //if window has a hash, run with it.
  //if not, close it.
  var hashProc = function() {
    if (window.location.hash) {
      popup.open(window.location.hash);
    } else {
      popup.close()
    }
  }

  //run on start
  hashProc();

  //respond to hash changes w/out reloads
  $(window).on('hashchange', function() {
    hashProc();
  });
}();
