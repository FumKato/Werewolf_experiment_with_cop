ExtraMenuView = function(){
	return {
		renderButtons: function(buttons){
			var i = 0;
			$('.extraMenuButton').hide();
			for(i; i<buttons.length; i++){
				var buttonName = '#' + buttons[i];
				$(buttonName).show();
			}
		}
	};
};
