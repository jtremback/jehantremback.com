//Get Fonts
WebFontConfig = {
  google: { families: [ 'Source+Sans+Pro:400,700:latin' ] }
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
  var content = $('#content'),
      index = $('#index'),
      holder = $('#content-holder'),
      prePath = 'content/',
      scrollPos;



  return {
    //read url and get corresponding data
    open: function(page) {
      var urlFrag = page.replace('#','');

      // Fetch page content
      $.get(prePath + urlFrag + '.html', function(content) {
        holder.html(content);

        //Not going to bother using callbacks now
        zoomNpan($(".zoom"))
      }, 'text');

      //Store scroll info for later
      scrollPos = $(window).scrollTop();
      $(window).scrollTop(0);

      //hide the index
      index.addClass('hidden');

      //show the popup
      content.addClass('shown');
    },

    close: function() {

      //hide the popup
      content.removeClass('shown');

      //Remove content
      holder.empty();

      //show the index
      index.removeClass('hidden')

      //set scroll back to former
      $(window).scrollTop(scrollPos)
    }
  };
})();

//Keyed on index and scroll to provide crazy fx for bg
var bgFx = function(container, val1) {
  for (i = 0; i < 6; i++) {
    var el = $(container).find('.el').eq(i),
        hsla = 'hsla(' 
        + ((i * 40) + 0) + ', ' 
        + (i * 24)
        + '%, 40%, ' 
        + (0.5 / (i * 0.4)) + ')',
        skew = (i * 10) + (val1 * 3),
        bottom = i * (13 - (i - (val1 * 4))) - 100,
        left = (i * 16) - (15);
    el.css({
      'left': left + '%',
      'transform': 'skew(' + skew + 'deg)',
      'bottom': bottom + '%',
      'background': hsla
    });
  }
}


var zoomNpan = function(zoom) {
  zoom.append('<div class="toggle"><i class="icon-zoom-in z_in"></i><i class="icon-zoom-out z_out"></i></div>'),
  toggle = zoom.find('.toggle'),
  z_in = zoom.find('.z_in'),
  z_out = zoom.find('.z_out'),
  img = zoom.find('img');

  z_in.on('click', function(e) {
    //Set zoom el height to avoid collapse
    var small_height = img.height();

    zoom.height(small_height);
    zoom.addClass('zoomed');
    $.pep.toggleAll(true);

    //Restore abs pos
    img.css('position', 'absolute').pep();
  });

  z_out.on('click', function(e) {
    zoom.removeClass('zoomed');
    //Remove abs pos
    img.css('position', 'static');
    $.pep.toggleAll(false);
  });
}

var init = function() {
  bgFx('#bgfx', 0)

  $(window).scroll(function(){
    var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height(),
        scrollPercent = (s / (d-c)) * 100;
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

  $('#content').on('click', function () {
    window.location.hash = '';
  })

  $('#content-holder').on('click', function (e) {
    e.stopPropagation();
  })

  //respond to hash changes w/out reloads
  $(window).on('hashchange', function() {
    hashProc();
  });
}();
