/*!
 * jquery.equalHeights.js

Description: Sets the height of a set of specified elements within a container.

Dependancies:
    - jQuery
    - jquery.debounced.js (for window resize)

Example usage:

    var matchHeights = function(windowResize) {
        $(container).equalHeights({target: element, onResize: windowResize});
    }
    matchHeights();

    $(window).smartresize(function () {
        matchHeights(true);
    });

 */


(function ($) {

  /*  Check browser for min-height support.
      Returns true or undefined
  */

  var supportsMinHeight = function () {
    if (typeof document.body.style.minHeight !== "undefined")
      return true;
  };


  $.fn.equalHeights = function (options) {
    var settings = $.extend({}, $.fn.equalHeights.defaultOptions, options),
        greatestHeight = 0,
        heightCSS = supportsMinHeight() ? 'min-height' : 'height';

    return this.each(function () {
      var container = $(this),
          $elem = $(settings.target, container);

      // On window resize, reset the heights
      if (settings.onResize) {
        $elem.removeAttr('style');
      }

      // For each item within the container
      $elem.each(function (i) {
        var $elemHeight = $(this).outerHeight();

        // Get the tallest item height
        if ($elemHeight > greatestHeight) {
          greatestHeight = $elemHeight;
        }

        // Set the height for all items within the container
        if (i + 1 == $elem.length) {
          $elem.css(heightCSS, greatestHeight);
        }
      });

    });

  };

  // Default options
  $.fn.equalHeights.defaultOptions = {
    target: '.item',
    onResize: false
  };

})(jQuery);
