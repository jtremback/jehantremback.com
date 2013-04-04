

var popup = (function () {

  var el = $('#popup'),
      closer = $('#popup').find('.close'),
      holder = $('#popup').find('#holder'),
      prePath = 'content/';

  return {
    open : function(page) {
      console.log("sto");
      var urlFrag = page.replace('#','');

      // Fetch page popup
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


var init = function() {
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
  $(window).bind('hashchange', function() {
    hashProc();
  });
}();
