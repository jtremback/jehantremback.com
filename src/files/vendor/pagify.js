/*
 * Pagify - A jquery plugin for effortlessly creating single page web sites.
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011, Chris Polis
 */

(function($) {
  $.fn.pagify = function(prePath) {
    var that = this;

    that.switchPage = function() {
      page = window.location.hash.replace('#','');

      // Fetch page content
      $.get(prePath + page + '.html', function(content) {
        $(that).html(content);
      }, 'text');
    }

    // Respond to hash changes
    $(window).bind('hashchange', function() {
      that.switchPage();
    });    

  };
})(jQuery);
