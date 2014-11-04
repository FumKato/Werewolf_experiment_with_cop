LogSelection = function(){
	var playerListSelection = function(type){
		var playerListView = new PlayerListView();
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		if(type == 'gm'){
			var logs = chatLogsModel.getGMChatLogs(phase);
		} else {
			var logs = chatLogsModel.getChatLogsByPlayerID(phase, Session.get('selectedPlayer'));
		}
		chatLogView.flush();
		chatLogView.render(logs);
	};
	
	var logSelectorSelection = function(type){
		if(Session.get('logSelector') == 'vote'){
			var logs = chatLogsModel.getVoteResults();
		} else if(Session.get('logSelector') == 'all'){
			if(Session.get('selectedPlayer') == null) {
				var logs = chatLogsModel.getAllChatLogs();
			} else {
				var phase = new PhasesModel().getPhases(Session.get('villageID'));
				var logs = chatLogsModel.getGMChatLogs(phase);
			}
		} else {
			if(Session.get('selectedPlayer') == null){
				var logs = chatLogsModel.getChatLogsByDay(Session.get('logSelector'));
			} else {
				var logs = chatLogsModel.getChatLogsByDaynPlayerID(Session.get('logSelector'));
			}
		}
		chatLogView.flush();
		chatLogView.render(logs);
	};
	
	return {
		reset: function(doCheck){
			if(doCheck && Session.get('logSelector') == null && Session.get('selectedPlayer') == null) return;
			var playerListView = new PlayerListView();
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
	    	Session.set('latestLogNumber', -1);
	    	Session.set('logSelector', null);
			Session.set('selectedPlayer', null);
			$('.logSelectorItem').removeClass('logSelectorItemClicked');
			var phases = [phase.phase];
			if(phase.phase == '夕方') phases[1] = '昼';
			if(phase.phase == '明け方') phases[1] = '夜';
			var logs = chatLogsModel.getLatestChatLogs(phase, [phases]);
			chatLogView.flush();
			chatLogView.render(logs);
		},
		
		select: function(type){
			if(Session.get('logSelector') == null){
				playerListSelection(type);
			} else {
				logSelectorSelection(type);
			}
		}
	};
};
