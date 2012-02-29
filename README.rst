jquery-autofocus
=======================
Set the focus to the desired form element when text is entered without a focus

------------
How to use
------------

Example html:

 <input id="search_input" />

Example javascript:

 $("#search_input").autofocus({
     keypress_limit: 3
 });
