jQuery Dress
============

This script dresses the undressed elements like selects, checkboxes and radiobuttons and make it far more stylable.

Usage
-----

Start with dress the elements onload:

	$( function() {
		$( 'select, :checkbox, :radio' ).dress();
	} );

In case you want to update your elements (e.g. when loading something with AJAX) just run the same `$( ... ).dress();` and the script will fix it for you.

Styling and markup
------------------

The script wraps elements with minimal markup and even moves elements' classes to wrapper (to keep things in place).

Here is the sample markup:

	<div class="selectbox [elements class]">
		<select class="dressed">...</select>
		<span>[selected option text]</span>
	</div>
	
	<div class="checkbox [elements class] [checked]">
		<input type="checkbox" class="dressed" ... />
	</div>
	
	<div class="radiobutton [elements class] [checked]">
		<input type="radio" class="dressed" ... />
	</div>
	