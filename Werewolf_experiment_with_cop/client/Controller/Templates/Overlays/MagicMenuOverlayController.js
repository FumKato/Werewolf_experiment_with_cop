$(function(){
	$(document).on('click', '#magicMenuOverlay .playerListItem', function(){
		$('#magicMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeMagic]').click(function(){
		$(this).attr('disabled', true);
		var selectedPlayerID = $('#magicMenuOverlay').find('.playerListClicked').attr('id');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(selectedPlayerID != null && Session.get('currentState') == '生　存' && timer != null && timer.remain >= 1){
			var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(targetPlayer != null && phase != null) {
				var sentence = targetPlayer.characterName + ' のオーラを読み取ります';
				chatLogsModel.createSystemMonologue(sentence);
				actionsModel.createActions(Session.get('myPlayerID'), selectedPlayerID, 'wizard');
			}
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
		new ActionButtonView().flush();
	});
});
