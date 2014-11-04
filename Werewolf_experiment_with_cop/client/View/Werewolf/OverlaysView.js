OverlaysView = function(){
	return{
		render: function(target){
			$('.overlay').find('input').attr('disabled', true);
			$('.overlay').hide();
			$('#'+target).fadeIn('fast');
			$('#'+target).find('input').removeAttr('disabled');
		},
		
		renderLayeredOverlay: function(target){
			$('#'+target).fadeIn('fast');
			$('#'+target).find('input').removeAttr('disabled');
		},
		
		flushLayeredOverlay: function(target){
			$('#'+target).find('input').attr('disabled', true);
			$('#'+target).fadeOut('fast');
		},
		
		flush: function(){
			$('.overlay').find('input').attr('disabled', true);
			$('.overlay').fadeOut('fast');
		}
	};
};

