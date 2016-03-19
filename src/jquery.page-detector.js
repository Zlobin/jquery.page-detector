/* global jQuery */

(function iife($) {
  'use strict';

  $.fn.pageDetector = function pageDetector(options = {}) {
    const settings = $.extend({}, $.fn.pageDetector.defaults, options);

    function onScroll(event) {
      const $container = $(event.target);
      const viewportHeight = $container.outerHeight(true);
      const scrollTop = $container.scrollTop();
      const $items = $container.find(settings.itemClass);
      const response = [];

      if ($items.length) {
        $items.each(function eachItem(index) {
          const $this = $(this);
          const topItemPosition = $this.get(0).offsetTop;
          const bottomItemPosition = topItemPosition + $this.height();
          let distance = 0;

          if (scrollTop >= topItemPosition && scrollTop <= bottomItemPosition) {
            distance = bottomItemPosition - scrollTop;
          } else if (scrollTop < topItemPosition &&
            (scrollTop + viewportHeight) >= topItemPosition) {
            distance = scrollTop + viewportHeight - topItemPosition;
          }

          if (distance > 0) {
            response.push({
              index,
              item: $this,
              percentage: Math.min(100, Math.round(distance * 100 / viewportHeight))
            });
          }
        });

        settings.onResult(response);
      } else {
        settings.onError('No items.');
      }
    }

    if (settings.itemClass !== null) {
      this.on('scroll', settings.throttleFunction(onScroll, settings.throttleTime));
    } else {
      settings.onError('No className for child items.');
    }

    return this;
  };

  $.fn.pageDetector.defaults = {
    itemClass: null,
    throttleTime: 100,
    throttleFunction: $.noop,
    onResult: $.noop,
    onError: $.noop
  };
}(jQuery));
