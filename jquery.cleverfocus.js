/**
 * Cleverfocus plugin
 * Set the focus to the desired form element when text is entered without a focus
 * Copyright (c) 2012 Mikhail Andreev (adw0rd.ru)
 */
(function($) {
    $.fn.cleverfocus = function(options) {
        var defaults = {
            keypress_limit: 0
        }
        var options = $.extend(defaults, options);
        var keypress_words = [];
        var has_focus = false;
        var input = $(this);

        $('input, textarea, button, select').focusin(function() {
            has_focus = true;
        }).focusout(function() {
            has_focus = false;
        });

        $(document).keypress(function(button) {
            if (!has_focus) {
                if (button.which != 0 && !button.ctrlKey && !button.altKey) {
                    var ch = String.fromCharCode(button.which);
                    keypress_words.push(ch);
                }
                if (keypress_words.length >= options.keypress_limit) {
                    if (jQuery.browser.webkit || jQuery.browser.opera) {
                        keypress_words.pop();
                    }
                    input.focus().val(input.val() + keypress_words.join(''));
                    keypress_words = [];
                }
            }
        });
    }
}(jQuery));
