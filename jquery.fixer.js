/*!
 * jquery.fixer.js 0.0.1 - https://github.com/yckart/jquery.fixer.js
 * Fix elements like any other sticky plugins it do.
 *
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/18
 **/
;(function($, window) {
    'use strict';

    $.fn.fixer = function(options) {
        options = $.extend({}, $.fn.fixer.options, options);

        return this.each(function() {
            var $this = $(this),
                $wrap = $this.parent(),
                $win = $(window);

            $win.bind("scroll load", function() {
                var cssPos = (options.horizontal ? 'left' : 'top'),
                    wrapPos = $wrap.offset()[options.horizontal ? 'left' : 'top'],
                    elemSize = $this[options.horizontal ? 'outerWidth' : 'outerHeight'](),
                    wrapSize = $wrap[options.horizontal ? 'outerWidth' : 'outerHeight'](),
                    scrollPos = $win[options.horizontal ? 'scrollLeft' : 'scrollTop']();

                if (scrollPos >= wrapPos - options.gap && (wrapSize + wrapPos - options.gap) >= (scrollPos + elemSize)) {
                    $this.css({
                        position: 'fixed'
                    }).css(options.horizontal ? {
                        left: options.gap
                    } : {
                        top: options.gap
                    });
                    options.isFixed();
                } else if (scrollPos < wrapPos) {
                    $this.css({
                        position: 'absolute'
                    }).css(options.horizontal ? {
                        left: 0
                    } : {
                        top: 0
                    });
                } else {
                    $this.css({
                        position: 'absolute'
                    }).css(options.horizontal ? {
                        left: wrapSize - elemSize
                    } : {
                        top: wrapSize - elemSize
                    });
                }
            });
        });
    };

    $.fn.fixer.options = {
        gap: 0,
        horizontal: false,
        isFixed: $.noop
    };

})(jQuery, window);