/**
 * jQuery Dress
 *
 * This jQuery plugin dresses unstylable form elements into stylable elemnts.
 *
 * Author: Mikita Stankiewicz
 * URL: http://designed.bymikita.com/juicy/
 * Version: 0.2
 */

;( function( $, window, document, undefined ) {
	/**
	 * Selectbox constructor
	 *
	 * @param element elem - jQuery selector
	 */
	var Selectbox = function( elem ) {
		this.$elem = $( elem );
		
		console.log( this.$elem );
	};
	
	/**
	 * Selectbox prototype
	 */
	Selectbox.prototype = {
		init: function() {
			this.wrap();
		},
		
		/**
		 * Wrap selectbox with stylable elements
		 * Don't touch already dressed elements
		 */
		wrap: function() {
			if( this.$elem.is( '.dressed' ) )
				return;
			
			this.$elem.wrap( '<div class="selectbox ' + this.$elem.attr( 'class' ) + '" />' );
			this.$elem.attr( 'class', '' ).addClass( 'dressed' ).closest( '.selectbox' ).append( $( '<span />' ) );
			
			this.listen();
		},
		
		/**
		 * Add event listeners to simulate standard behavior
		 */
		listen: function() {
			this.$elem.focus( function() {
				$( this ).closest( '.selectbox' ).addClass( 'focused' );
			} ).blur( function() {
				$( this ).closest( '.selectbox' ).removeClass( 'focused' );
			} ).change( function() {
				$( this ).siblings( 'span' ).text( $( this ).find( ':selected' ).text() );
			} );
		},
	};
	
	/**
	 * Checkbox constructor
	 */
	var Checkbox = function( elem ) {
		this.$elem = $( elem );
		
		console.log( this.$elem );
	};
	
	/**
	 * Checkbox prototype
	 */
	Checkbox.prototype = {
		init: function() {
			this.wrap();
		},
		
		/**
		 * Wrap checkbox with stylable elements
		 * Don't touch already dressed elements
		 */
		wrap: function() {
			if( this.$elem.is( '.dressed' ) )
				return;
			
			this.$elem.wrap( '<div class="checkbox ' + this.$elem.attr( 'class' ) + '" />' );
			this.$elem.attr( 'class', '' ).addClass( 'dressed' );
			
			this.listen();
		},
		
		/**
		 * Add event listeners to simulate standard behavior
		 */
		listen: function() {
			this.$elem.click( function() {
				if( $( this ).is( ':checked' ) )
					$( this ).closest( '.checkbox' ).addClass( 'checked' );
				else
					$( this ).closest( '.checkbox' ).removeClass( 'checked' );
			} );
		},
	};
	
	/**
	 * Radiobutton
	 */
	var Radiobutton = function( elem ) {
		this.$elem = $( elem );
		
		console.log( this.$elem );
	};
	
	/**
	 * Radiobutton prototype
	 */
	Radiobutton.prototype = {
		init: function() {
			this.wrap();
		},
		
		/**
		 * Wrap radiobutton with stylable elements
		 * Don't touch already dressed elements
		 */
		wrap: function() {
			if( this.$elem.is( '.dressed' ) )
				return;
			
			this.$elem.wrap( '<div class="radiobutton ' + this.$elem.attr( 'class' ) + '" />' );
			this.$elem.attr( 'class', '' ).addClass( 'dressed' );
			
			this.listen();
		},
		
		/**
		 * Add event listeners to simulate standard behavior
		 */
		listen: function() {
			this.$elem.click( function() {
				if( $( this ).is( ':checked' ) )
					$( this ).closest( '.radiobutton' ).addClass( 'checked' );
				else
					$( this ).closest( '.radiobutton' ).removeClass( 'checked' );
			} );
		},
	};
	
	/**
	 * Plugin
	 */
	$.fn.dress = function() {
		$( this ).each( function() {
			if( $( this ).is( 'select' ) ) {
				new Selectbox( this ).init();
			}
			else if( $( this ).is( ':checkbox' ) ) {
				new Checkbox( this ).init();
			}
			else if( $( this ).is( ':radio' ) ) {
				new Radiobutton( this ).init();
			}
		} );
		
		return this;
	};
} )( jQuery, window, document );
