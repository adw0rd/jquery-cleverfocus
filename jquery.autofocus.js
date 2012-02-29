/**
 * Autofocus plugin
 * Set the focus to the desired form element when text is entered without a focus
 * Copyright (c) 2012 Mikhail Andreev (adw0rd.ru)
 */
jQuery.autofocus = function(input, options) {
    var keypress_words = [];
    var keypress_limit = options['keypress_limit'] ? options['keypress_limit'] : 0;
    var has_focus = false;

    input.focus(function(){
		has_focus = true;
	}).blur(function() {
		has_focus = false;
	});

    $(document).keypress(function(button){
        //console.log(button.charCode, button.ctrlKey, button.altKey)
        if (!has_focus) {
            if (button.charCode && !button.ctrlKey && !button.altKey) {
                var char = String.fromCharCode(button.charCode);
                keypress_words.push(char);
            }
            if (keypress_words.length >= keypress_limit) {
                input.val(keypress_words.join('')).focus();
            }
        } else {
			// flush words
            keypress_words = [];
        }
    });
}