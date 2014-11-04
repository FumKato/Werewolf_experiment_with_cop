$(function(){
	$(document).on('click', '#guardMenuOverlay .playerListItem', function(){
		$('#guardMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeGuard]').click(function(){
		$(this).attr('disabled', true);
		var selectedPlayerID = $('#guardMenuOverlay').find('.playerListClicked').attr('id');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(selectedPlayerID != null && Session.get('currentState') == '生　存' && timer != null && timer.remain >= 2){
			var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(targetPlayer != null && phase != null && phase.day != 1) {
				var sentence = targetPlayer.characterName + ' を護衛します';
				chatLogsModel.createSystemMonologue(sentence);
				actionsModel.createActions(Session.get('myPlayerID'), selectedPlayerID, 'guard');
			}
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
	});
});
