window.addEvent('domready', function(){
		$('drop_down_menu').getElements('li.menu').each( function( elem ){
			var list = elem.getElement('ul.links');	
			var myFx = new Fx.Slide(list).hide();			
			elem.addEvents({
				'mouseenter' : function(){ 					
					myFx.cancel();
					myFx.slideIn();					
				},
				'mouseleave' : function(){ 
					myFx.cancel();
					myFx.slideOut();					
				}
			});	
		})
	});	