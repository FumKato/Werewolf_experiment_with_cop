SystemWindowView = function(){
	return{
		renderMyCharacterName: function(characterName){
			$('#myCharacterName').find('.characterNameBody').text(characterName);
		},
		
		renderColleague: function(message){
			$('#myColleague').html(message);
		},
		
		renderVoteInformation: function(characterName){
			var message = 'あなたは <b>' + characterName + '</b> に投票しました';
			$('#voteInformation').html(message);
		},
		
		renderActionInformation: function(message){
			$('#actionInformation').html(message);
		},
		
		flush: function(id){
			var target = '#' + id;
			$(target).html('');
		}
	};
};
