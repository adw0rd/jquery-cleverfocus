/**
 * Autofocus plugin
 * Set the focus to the desired form element when text is entered without a focus
 * Copyright (c) 2012 Mikhail Andreev (adw0rd.ru)
 */
(function($) {
    $.fn.autofocus = function(options) {
        var defaults = {
            keypress_limit: 0
        }
        var options = $.extend(defaults, options);
        var keypress_words = [];
        var has_focus = false;
        var input = $(this);

        input.focus(function(){
            has_focus = true;
        }).blur(function() {
            has_focus = false;
        });

        $(document).keypress(function(button){
            if (!has_focus) {
                if (button.charCode && !button.ctrlKey && !button.altKey) {
                    var ch = String.fromCharCode(button.charCode);
                    keypress_words.push(ch);
                }
                if (keypress_words.length >= options.keypress_limit) {
                    input.focus().val(input.val() + keypress_words.join(''));
                }
            } else {
                // flush words
                keypress_words = [];
            }
        });
    }
}(jQuery));
