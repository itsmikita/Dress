/**
 * jQuery Dress
 *
 * This jQuery plugin dresses unstylable form elements into stylable elemnts.
 *
 * Author: Mikita Stankiewicz
 * URL: http://designed.bymikita.com/dress/
 * Version: 0.3
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
						.wrap( '<span class="selectbox" />' )
						.parent().append( '<span class="selectbox-value" />' );
					break;
				
				case 'input':
					if( selector.is( ':checkbox' ) )
						selector.wrap( '<span class="checkbox" />' );
					else if( selector.is( ':radio' ) )
						selector.wrap( '<span class="radio" />' );
					break;
			}
			
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
				if( selector.is( ':radio' ) ) {
					if( ! selector.is( ':checked' ) )
						return;
					
					$( '[name=' + selector.attr( 'name' ) + ']' ).parent().removeClass( 'checked' );
					
					selector.parent().addClass( 'checked' );
				}
				if( selector.is( ':checkbox' ) ) {
					if( selector.is( ':checked' ) )
						selector.parent().addClass( 'checked' );
					else
						selector.parent().removeClass( 'checked' );
				}
				else if( selector.is( 'select' ) ) {
					selector.parent().find( '.selectbox-value' ).text( selector.find( ':selected' ).text() );
				}
			};
			
			selector
				.on( 'change', update );
			
			// init
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
