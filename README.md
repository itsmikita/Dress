jQuery Dress
============

This script dresses the undressed elements like selects, checkboxes and radiobuttons and make it far more stylable.

Usage
-----

Start with dress the elements onload:

	$( function() {
		$( 'select, :checkbox, :radio' ).dress();
	} );

In case you want to update your elements, e.g. when loading something with AJAX, just run the same `$( ... ).dress();` and the script will put everything in place.