ChatLogsController = function() {
	return {
		updateChatLogsView : function() {
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(phase == null) return;
			var latestLogs = chatLogsModel.getLatestChatLogs(phase, [phase.phase]);
			switch(phase.phase) {
				case '夕方':
			  		latestLogs = chatLogsModel.getLatestChatLogs(phase, ['昼', '夕方']);
			  		break;
				case '明け方':
					latestLogs = chatLogsModel.getLatestChatLogs(phase, ['夜', '明け方']);
			  		break;
			}
			if(Session.get('logSelector') == null && Session.get('selectedPlayer') == null){
				var logs = chatLogsModel.getLatestChatLogs(phase, [phase.phase]);
				switch(phase.phase) {
					case '夕方':
				  		logs = chatLogsModel.getLatestChatLogs(phase, ['昼', '夕方']);
				  		break;
					case '明け方':
						logs = chatLogsModel.getLatestChatLogs(phase, ['夜', '明け方']);
				  		break;
				}
			} else if(Session.get('logSelector') != null){
				if(Session.get('logSelector') == 'vote'){
					var logs = chatLogsModel.getVoteResults();
				} else if(Session.get('logSelector') == 'all'){
					if(Session.get('selectedPlayer') == null) {
						var logs = chatLogsModel.getAllChatLogs();
					} else {
						var logs = chatLogsModel.getGMChatLogs(phase);
					}
				} else {
					if(Session.get('selectedPlayer') == null){
						var logs = chatLogsModel.getChatLogsByDay(Session.get('logSelector'));
					} else {
						var logs = chatLogsModel.getChatLogsByDaynPlayerID(Session.get('logSelector'), Session.get('selectedPlayer'));
					}
				}
			} else {
				var logs = chatLogsModel.getChatLogsByPlayerID(phase, Session.get('selectedPlayer'));
			}

			chatLogView.renderWithAnimation(logs);
		}
	};
};

chatLogsController = new ChatLogsController();
