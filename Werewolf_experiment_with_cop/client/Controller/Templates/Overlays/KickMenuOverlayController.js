$(function() {
	$(document).on('click', '#kickMenuOverlay .playerListItem', function(){
		$('#kickMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeKick]').click(function(){
		$(this).attr('disabled', true);
		var selectedPlayerID = $('#kickMenuOverlay').find('.playerListClicked').attr('id');
		if(selectedPlayerID != null){
			var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(targetPlayer != null && phase != null) {
				if(phase.phase == '事件終了') return;
				if(phase.phase == '事件前'){
					new PlayersModel().removePlayers(selectedPlayerID);
					var sentence = targetPlayer.characterName + ' は追放されました。';
				} else {
					new PlayersModel().killPlayers(selectedPlayerID);
					var sentence = targetPlayer.characterName + ' は突然死しました。';
				}
				
				chatLogsModel.createSystemChatLogs(sentence);
			} 
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
	});
});
