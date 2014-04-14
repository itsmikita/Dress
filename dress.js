/**
 * jQuery Dress
 *
 * This jQuery plugin dresses unstylable form elements into stylable elemnts.
 *
 * Author: Mikita Stankiewicz
 * URL: https://github.com/itsmikita/Dress
 * Version: 0.4
 */

;( function( $, window, document, undefined ) {
	/**
	 * Constructor
	 *
	 * @param Object selector
	 */
	var Dress = function( selector ) {
		this.init( selector );
	};
	
	/**
	 * Prototype
	 */
	Dress.prototype = {
		/**
		 * Init
		 *
		 * @param Object selector
		 */
		init: function( selector ) {
			var self = this;
			
			selector.each( function() {
				if( $( this ).is( '.dressed' ) )
					return;
				
				var tag = $( this ).prop( 'tagName' ).toLowerCase();
				
				self.wrap( tag, $( this ) );
				self.listen( tag, $( this ) );
			} );
		},
		
		/**
		 * Wrap
		 *
		 * @param String tag
		 * @param Object selector
		 */
		wrap: function( tag, selector ) {
			if( selector.is( '.ignore-dressing' ) )
				return;
			
			if( selector.is( '.dressed' ) )
				return;
			
			switch( tag ) {
				case 'select':
					selector
						.wrap( '<span class="dress-select" />' )
						.parent().append( '<span class="dress-value" />' );
					break;
				
				case 'input':
					if( selector.is( ':checkbox' ) )
						selector.wrap( '<span class="dress-checkbox" />' );
					else if( selector.is( ':radio' ) )
						selector.wrap( '<span class="dress-radio" />' );
					break;
			}
			
			selector.parent().addClass( selector.attr( 'class' ) );
			selector.attr( 'class', '' );
			selector.addClass( 'dressed' );
		},
		
		/**
		 * Listen
		 * 
		 * @param String tag
		 * @param Object selector
		 */
		listen: function( tag, selector ) {
			function update() {
				//selector.parent().removeClass( 'dress-default' );
				
				if( selector.is( ':radio' ) ) {
					if( ! selector.is( ':checked' ) )
						return;
					
					$( '[name=' + selector.attr( 'name' ) + ']' ).parent().removeClass( 'dress-checked' );
					
					selector.parent().addClass( 'dress-checked' );
				}
				if( selector.is( ':checkbox' ) ) {
					if( selector.is( ':checked' ) )
						selector.parent().addClass( 'dress-checked' );
					else
						selector.parent().removeClass( 'dress-checked' );
				}
				else if( selector.is( 'select' ) ) {
					selector.parent().find( '.selectbox-value' ).text( selector.find( ':selected' ).text() );
					
					if( '' == selector.find( ':selected' ).val() )
						//selector.parent().addClass( 'default-value' );
				}
			};
			
			function focus() {
				selector.parent().addClass( 'dress-focused' );
			};
			
			function blur() {
				selector.parent().removeClass( 'dress-focused' );
			};
			
			selector
				.on( 'change', update )
				.on( 'focus', focus )
				.on( 'blur', blur );
			
			// Init
			update();
		},
	};
	
	/**
	 * Plugin
	 */
	$.fn.dress = function() {
		new Dress( this );
		
		return this;
	};
} )( jQuery, window, document );
