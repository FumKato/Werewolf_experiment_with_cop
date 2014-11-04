ReportMenuOverlayView = function(){
	return {
		render: function(players){
			var $playerList = $('#reportMenuOverlay').find('.overlayPlayerList');
			$playerList.html('');
			for(i=0; i<players.length; i++){
					if(players[i].tripKey == 'shonich＊') continue;
					var playerListItem = '<div class="playerListItem" id="' + players[i]._id + '"><img class="playerIcon" src="./icon/' + 
					players[i].icon + '.png" /><div class="characterName">' + players[i].characterName + '</div><div class="handleName">' +
					'<div class="logCount">[' + players[i].logCount + ']</div>';
					$playerList.append(playerListItem);
			}
		}
	};
};
