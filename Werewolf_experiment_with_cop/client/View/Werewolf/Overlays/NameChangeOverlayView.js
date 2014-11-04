NameChangeOverlayView = function(){
	return{
		render: function(player){
			$('input[name=changedCharacterName]').val(player.characterName);
			$('select[name=nameChangeColorForm]').val(player.color);
			var $sample = $('.colorSample');
			$sample.removeClass();
			$sample.addClass('colorSample');
			$sample.addClass(player.color + 'Icon');
		}
	};
};
