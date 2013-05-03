//Get Fonts
WebFontConfig = {
  google: { families: [ 'Source+Sans+Pro::latin' ] }
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

var bgFx = function(container, val1) {
  for (i = 0; i < 6; i++) {
    var el = $(container).find('.el').eq(i),
        hsla = 'hsla(' 
        + ((i * 58) + 110) + ', ' 
        + (i * 24)
        + '%, 40%, ' 
        + (0.5 / (i * 0.4)) + ')',
        skew = (i * 10) + (val1 * 3),
        bottom = i * (9 + (val1 * 3)) - 100,
        left = (i * 16) - (15);
    el.css({
      'left': left + '%',
      'transform': 'skew(' + skew + 'deg)',
      'bottom': bottom + '%',
      'background': hsla
    });
  }
}




var init = function() {
  bgFx('#bgfx', 0)

  $(window).scroll(function(){
    var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height(),
        scrollPercent = (s / (d-c)) * 100;
        console.log(scrollPercent / 100);
        bgFx('#bgfx', scrollPercent / 100);
  })

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
