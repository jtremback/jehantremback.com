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

    init : function() {
      console.log('init');
      //add classes for the visual and attach data to dom
      $.each(stack, function(index) {
        $(this).attr('id', index)
      })
    },

    bringToTop : function() {
      console.log('bbt');
      //grab clicked element out of array based on order in dom
      var order = $(this).attr('id'),
          removed = stack.splice(order, 1);

      //add back on to end of array
      stack.push(removed)

      //encode new correct order to dom 
      polaroid.init();
    }
  }
})();


var init = function() {
  // polaroid.init();
  // $('.wrapper').on('mouseup', polaroid.bringToTop);
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
