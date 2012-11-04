/**
 * Cleverfocus plugin
 * Set the focus to the desired form element when text is entered without a focus
 * Copyright (c) 2012 Mikhail Andreev (http://adw0rd.com/)
 */

if (!Array.indexOf) {
    // Implementation indexOf for IE
    Array.prototype.indexOf = function(obj) {
        for (var i=0; i<this.length; i++) {
            if (this[i] == obj){
                return i;
            }
        }
        return -1;
    }
}

(function($) {
    $.fn.cleverfocus = function(options) {
        var defaults = {
            keypress_limit: 0
        }
        var options = $.extend(defaults, options);
        var keypress_words = [];
        var current_position_in_keypress_words = 0;
        var has_focus = false;
        var input = $(this);

        // Special buttons
        var BACKSPACE = 8;
        var DELETE = 46;
        var END = 35;
        var HOME = 36;
        var LEFT = 37;
        var RIGHT = 39;

        $('input, textarea, button, select').live('focusin', function() {
            has_focus = true;
        }).live('focusout', function() {
            has_focus = false;
        });

        $(document).keypress(function(button) {
            if (!has_focus) {
                if ([BACKSPACE, DELETE, END, HOME, LEFT, RIGHT].indexOf(button.keyCode) != -1) {
                    // Handling special buttons
                    if (button.keyCode == BACKSPACE) {
                        current_position_in_keypress_words--;
                        keypress_words.splice(current_position_in_keypress_words, 1);
                    }
                    if (current_position_in_keypress_words && button.keyCode == DELETE) {
                        keypress_words.splice(current_position_in_keypress_words, 1);
                    }
                    if (button.keyCode == END) {
                        current_position_in_keypress_words = keypress_words.length;
                    }
                    if (button.keyCode == HOME) {
                        current_position_in_keypress_words = 0;
                    }
                    if (button.keyCode == LEFT && current_position_in_keypress_words != 0) {
                        current_position_in_keypress_words--;
                    }
                    if (button.keyCode == RIGHT && current_position_in_keypress_words != keypress_words.length) {
                        current_position_in_keypress_words++;
                    }
                } else if (button.which != 0 && !button.ctrlKey && !button.altKey) {
                    // Write a symbol
                    keypress_words.splice(current_position_in_keypress_words, 0, String.fromCharCode(button.which));
                    current_position_in_keypress_words++;
                }
                if (keypress_words.length >= options.keypress_limit) {
                    // Put a symbols to specified input
                    if (jQuery.browser.webkit || jQuery.browser.opera || jQuery.browser.msie) {
                        keypress_words.pop();
                    }
                    input.focus().val(input.val() + keypress_words.join(''));
                    keypress_words = [];
                }
                // console.log(current_position_in_keypress_words, keypress_words)
            }
        });
    }
}(jQuery));