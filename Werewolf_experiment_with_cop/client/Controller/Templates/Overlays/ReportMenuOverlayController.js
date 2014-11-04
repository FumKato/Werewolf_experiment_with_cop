$(function(){
	$(document).on('click', '#reportMenuOverlay .playerListItem', function(){
		$('#reportMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeReport]').click(function(){
		$(this).attr('disabled', true);
		var selectedPlayerID = $('#reportMenuOverlay').find('.playerListClicked').attr('id');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(selectedPlayerID != null && timer != null && timer.remain >= 2){
			var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(targetPlayer != null && phase != null && phase.phase == '事件終了') {
				actionsModel.createActions(Session.get('myPlayerID'), selectedPlayerID, 'report');
			}
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
		new ActionButtonView().flush();
	});
});
