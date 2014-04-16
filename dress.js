/**
 * jQuery Dress
 *
 * Wraps unstylable inputs into stylable elements.
 *
 * Author: Mikita Stankiewicz
 * URL: https://github.com/itsmikita/Dress
 * Version: 0.6
 */

;( function( $ ) {
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
			
			function wrap() {
				$( selector ).each( function() {
					if( $( this ).is( '.ignore-dressing' ) || $( this ).is( '.dressed' ) )
						return;
					
					if( $( this ).is( 'select' ) )
						self.wrapSelect( this );
					
					else if( $( this ).is( ':checkbox' ) || $( this ).is( ':radio' ) )
						self.wrapCheckable( this );
					
					else if( 'number' == $( this ).attr( 'type' ) )
						self.wrapNumber( this );
				} );
			}
			
			wrap();
			
			// We usually adding new dom on AJAX
			$( document ).ajaxSuccess( function() {
				wrap();
			} );
		},
		
		/**
		 * Wrap select
		 *
		 * @param object element
		 */
		wrapSelect: function( element ) {
			$( element )
				.wrap( '<span class="dress-select" />' )
				.on( 'change', function() {
					var selected = $( 'option', this ).filter( ':selected' );
					
					$( this ).parent().removeClass( 'dress-default' );
					
					if( selected.length )
						$( this ).siblings( '.dress-value' ).text( selected.text() );
					else {
						$( this ).parent().addClass( 'dress-default' );
						$( this ).siblings( '.dress-value' ).text( $( 'option', this ).first().text() );
					}
				} )
				.on( 'focus', function() {
					$( this ).parent().addClass( 'dress-focused' );
				} )
				.on( 'blur', function() {
					$( this ).parent().removeClass( 'dress-focused' );
				} )
				.parent().addClass( classes ).append( '<span class="dress-value" />' );
			
			$( element ).trigger( 'change' );
		},
		
		/**
		 * Wrap :checkbox and :radio
		 *
		 * @param object element
		 */
		wrapCheckable: function( element ) {
			var tag = $( element ).attr( 'type' );
			
			$( element )
				.wrap( '<span class="dress-' + tag + '">' )
				.on( 'change', function() {
					$( this ).parent().removeClass( 'dress-checked' );
					
					if( $( this ).is( ':checked' ) )
						$( this ).parent().addClass( 'dress-checked' );
				} );
		},
		
		/**
		 * Wrap [type=number]
		 *
		 * @param object element
		 */
		wrapNumber: function( element ) {
			$( element )
				.attr( 'type', 'hidden' )
				.on( 'change', function() {
					$( this ).siblings( '.dress-value' ).text( $( this ).val() );
				} )
				.wrap( '<span class="dress-number">' )
				.parent()
					.append( '<a href="#" class="dress-number-plus"></a>' )
					.append( '<a href="#" class="dress-number-minus"></a>' )
					.append( '<span class="dress-value"></span>' );
			
			$( element ).siblings( 'a' ).on( 'click', function( event ) {
				event.preventDefault();
				
				var value = parseInt( $( this ).siblings( 'input' ).val() ),
					modifier = 1;
				
				if( $( this ).is( '.dress-number-minus' ) )
					modifier = -1;
				
				$( this ).siblings( 'input' ).val( value + modifier ).trigger( 'change' );
			} );
			
			$( element ).trigger( 'change' );
		},
	};
	
	/**
	 * Plugin
	 */
	$.fn.dress = function() {
		new Dress( this );
		
		return this;
	};
} )( jQuery );
