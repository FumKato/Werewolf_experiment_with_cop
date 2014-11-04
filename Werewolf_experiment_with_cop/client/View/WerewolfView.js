WerewolfView = function(){
	return{
		render: function(target){
			$('#'+target).fadeIn('fast');
		},
		
		flush: function(target){
			$('#'+target).hide();
			$('#'+target).find('input').attr('disabled', 'disabled');
		}
	};
};
