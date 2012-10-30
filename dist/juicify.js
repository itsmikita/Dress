/**
 * @file: juicify.js
 *
 * This is a simple jQuery plugin that wraps unstylable form elements
 * into stylable elemnts. This plugin even supports dynamicly laoded DOM.
 *
 * Author: Mikita Stankiewicz
 * URL: http://designed.bymikita.com/juicy/
 * Version: 0.2
 *
 *
 * Markup:
 *
 * 1. Basic syntax:
 * <div [class=*]>
 *     [<span>{value}</span>]
 *     [<select>...</select>|<input />]
 * </div>
 *
 * 2. How-to:
 * $( selector ).juicy();
 *
 * 3. Update elements:
 * $( selector ).juicy();
 */

;( function( $, window, document, undefined ) {
	/**
	 * Selectbox constructor
	 *
	 * @param element elem - Element
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
		 * Here where magic happens
		 */
		wrap: function() {
			if( this.$elem.hasClass( 'juicified' ) )
				return;
			
			this.$elem.wrap( '<div class="selectbox ' + this.$elem.attr( 'class' ) + '" />' );
			this.$elem.attr( 'class', '' ).addClass( 'juicified' ).closest( '.selectbox' ).append( $( '<span />' ) );
			
			this.listen();
		},
		
		/**
		 * Add event listeners
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
		 * Here where magic happens
		 */
		wrap: function() {
			if( this.$elem.hasClass( 'juicified' ) )
				return;
			
			this.$elem.wrap( '<div class="checkbox ' + this.$elem.attr( 'class' ) + '" />' );
			this.$elem.attr( 'class', '' ).addClass( 'juicified' );
			
			this.listen();
		},
		
		/**
		 * Add event listeners
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
	 * Radio
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
		 * Here where magic happens
		 */
		wrap: function() {
			if( this.$elem.hasClass( 'juicified' ) )
				return;
			
			this.$elem.wrap( '<div class="radiobutton ' + this.$elem.attr( 'class' ) + '" />' );
			this.$elem.attr( 'class', '' ).addClass( 'juicified' );
			
			this.listen();
		},
		
		/**
		 * Add event listeners
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
	$.fn.juicify = function() {
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
