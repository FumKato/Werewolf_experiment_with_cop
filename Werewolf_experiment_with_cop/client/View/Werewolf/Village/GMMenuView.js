GMMenuView = function() {
	return {
		renderButton: function(target){
			var buttonName = '#' + target;
			$(buttonName).show();
			$(buttonName).removeAttr('disabled');
		},
		
		flushButton: function(target){
			var buttonName = '#' + target;
			$(buttonName).attr('disabled', 'disabled');
			$(buttonName).hide();
		}
	};
};
