$(function() {
	$(document).on('click', '#killMenuOverlay .playerListItem', function(){
		$('#killMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeKill]').click(function(){
		$(this).attr('disabled', true);
		var selectedPlayerID = $('#killMenuOverlay').find('.playerListClicked').attr('id');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(selectedPlayerID != null && Session.get('currentState') == '生　存' && timer != null && timer.remain >= 2){
			var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(targetPlayer != null && phase != null) {
				if(!actionsModel.checkDone(Session.get('myPlayerID'), phase, 'wolf') && phase.day == 1){
					new OverlaysView().flush();
				} else {
					var sentence = targetPlayer.characterName + ' を襲撃します';
					chatLogsModel.createSystemMonologue(sentence);
					actionsModel.createActions(Session.get('myPlayerID'), selectedPlayerID, 'wolf');
				}
			}
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
	});
});