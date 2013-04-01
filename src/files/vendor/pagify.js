/*
 * Pagify - A jquery plugin for effortlessly creating single page web sites.
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011, Chris Polis
 */

(function($) {
  $.fn.pagify = function(options, callback) {
    var that = this;

    this.defaults = {
      'pages': [],
      'default': null,
      'onChange': function (page) {},
      'cache': false
    };
    this.settings = $.extend({}, this.defaults, options);

    // Run after loading if caching, otherwise run immediately
    var runAfterLoading = function() {
      that.switchPage = function(page) {
        // Page is selected from: passed in value, window.location, default
        if(!page) {
          page = window.location.hash.replace('#','') || that.settings['default'];
        }

        if(that.settings.cache) {
          // Load page content from cache
          $(that).html(that.pages[page]);
          that.settings.onChange(page);
          callback();
        }
        else {
          // Fetch page content
          $.get(page+'.html', function(content) {
            $(that).html(content);
            that.settings.onChange(page);
            callback();
          }, 'text');
        }
      }

      // Respond to hash changes
      $(window).bind('hashchange', function() {
        that.switchPage();
      });

      // Load initial page - current hash or default page
      if(window.location.hash) that.switchPage();
      else if(that.settings['default']) that.switchPage(that.settings['default']);
    };

    // Cache pages
    if(that.settings.cache) {
      that.pages = {};
      var pageLoads = that.settings.pages.length;
      $.each(that.settings.pages, function(ndx, page) {
        $.get(page+'.html', function(content) {
          that.pages[page] = content;
          pageLoads--;
          //alert(pageLoads);
          if(!pageLoads) runAfterLoading();
        }, 'text');
      });
    } 
    else runAfterLoading();
  };

})(jQuery);
