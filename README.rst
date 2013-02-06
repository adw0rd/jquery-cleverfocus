jquery-cleverfocus
=======================
Set the focus to the desired form element when text is entered without a focus.

* Demo page: http://adw0rd.github.com/jquery-cleverfocus/
* jQuery Plugins: http://plugins.jquery.com/cleverfocus/
* English article: http://adw0rd.com/2012/03/01/jquery-cleverfocus/en/
* Russian article: http://adw0rd.com/2012/03/01/jquery-cleverfocus/

How to use
------------

Example html::

    <input id="search_input" />

Example javascript::

    $("#search_input").cleverfocus({
        keypress_limit: 3
    });

When you reach ``keypress_limit``, then it will set the focus to the desired ``input`` and ``input`` will fill the data which you entered.

