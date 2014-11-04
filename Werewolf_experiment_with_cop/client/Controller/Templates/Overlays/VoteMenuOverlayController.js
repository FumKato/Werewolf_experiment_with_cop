$(function() {
	$(document).on('click', '#voteMenuOverlay .playerListItem', function(){
		$('#voteMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeVote]').click(function(){
		$(this).attr('disabled', true);
		var selectedPlayerID = $('#voteMenuOverlay').find('.playerListClicked').attr('id');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(selectedPlayerID != null && Session.get('currentState') == '生　存' && timer != null && timer.remain >= 2){
			var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(targetPlayer != null && phase != null) {
				var sentence = targetPlayer.characterName + ' に投票します';
				chatLogsModel.createSystemMonologue(sentence);
				actionsModel.createActions(Session.get('myPlayerID'), selectedPlayerID, 'vote');
			}
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
	});
});