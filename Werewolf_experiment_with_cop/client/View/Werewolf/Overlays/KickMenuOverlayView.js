KickMenuOverlayView = function() {
	return {
		render: function(role, players){
			var i = 0;
			var $playerList = $('#kickMenuOverlay').find('.overlayPlayerList');
			$playerList.html('');
			if(role.roleName == 'GM'){
				for(i=0; i<players.length; i++){
					var playerListItem = '<div class="playerListItem" id="' + players[i]._id + '"><img class="playerIcon" src="./icon/' + 
					players[i].icon + '.png" /><div class="characterName">' + players[i].characterName + '</div><div class="handleName">' +
					players[i].handleName + '</div><div class="tripKey">◆' + players[i].tripKey + '</div>' +
					'<div class="logCount">[' + players[i].logCount + ']</div>';
					$playerList.append(playerListItem);
				}
			} else if(role.roleName == '仮GM'){
				for(i=0; i<players.length; i++){
					var playerListItem = '<div class="playerListItem" id="' + players[i]._id + '"><img class="playerIcon" src="./icon/' + 
					players[i].icon + '.png" /><div class="characterName">' + players[i].characterName + '</div>' + 
					'<div class="logCount">[' + players[i].logCount + ']</div>';
					$playerList.append(playerListItem);
				}
			}
		}
	};
};
