$(function(){
	$(document).on('click', '#nightWalkMenuOverlay .playerListItem', function(){
		$('#nightWalkMenuOverlay').find('.playerListItem').removeClass('playerListClicked');
		$this = $(this);
		$this.addClass('playerListClicked');
	});
	
	$('input[name=executeNightWalk]').click(function(){
		$(this).attr('disabled', true);
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer.remain < Math.floor(village.settings.dawn / 2)){
			alert('残り時間が半分を切ったので、夜歩きはできません');
			return;
		} else {
			var selectedPlayerID = $('#nightWalkMenuOverlay').find('.playerListClicked').attr('id');
			if(selectedPlayerID != null && Session.get('currentState') == '生　存'){
				var targetPlayer = new PlayersModel().getPlayersByID(selectedPlayerID);
				var phase = new PhasesModel().getPhases(Session.get('villageID'));
				if(targetPlayer != null && phase != null && phase.day != 1) {
					var sentence = targetPlayer.characterName + ' の様子を見に行きます';
					chatLogsModel.createSystemMonologue(sentence);
					actionsModel.createActions(Session.get('myPlayerID'), selectedPlayerID, 'nightWalk');
				}
			}
		}
		new LogSelection().reset(true);
		new OverlaysView().flush();
		new ActionButtonView().flush();
	});
});
