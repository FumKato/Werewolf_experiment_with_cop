Meteor.publish('players', function(villageID){
	if(villageID == null)
		return Players.find(
							{},
							{fields: {
								characterName: 0,
								handleName: 0,
								tripKey: 0,
								icon: 0,
								password: 0,
								color: 0,
								ip: 0
							}}
						   );
	return Players.find(
							{villageID: villageID},
							{fields: {
								password: 0,
								ip: 0
							}}
						);
});

Meteor.methods({
	createPlayers: function(villageID, characterName, handleName, tripKey, password, icon, color, tickets){
		var village = villagesModel.getVillages(villageID);
		if(village == null)return;
		if(village.settings.tripLimit && tripKey == 'トリなし') return 'tripLimit';
		if(tripKey != 'トリなし'){
			var trip = Meteor.call('referTrips', tripKey);
			if(trip == null || trip == false) return trip;
			if(village.settings.tripLimit && village.settings.recordLimit > trip.record) return 'recordLimit';
			if(trip.tripKey == '開発者'){
				tripKey = '開発者';
			}
		}
		if(village.gatheringGM){
			if(!ticketsModel.checkGMTickets(villageID, tickets)){
				return 'gm';
			}
		}
		var ticketExistence = ticketsModel.checkExistence(villageID, tickets, 'participant');
		if(ticketExistence != null) {
			return 'tickets';
		}
		var playerID = playersModel.createPlayers(village, characterName, handleName, tripKey, password, icon, color, tickets);
		if(playerID==null) return null;
		ticketsModel.setTickets(villageID, tickets, playerID, 'participant');
		var roleName = '役職未定';
		if(village.gatheringGM){
			var phase = phasesModel.getPhasesByVillageID(villageID);
			if(village.settings.GM){
				roleName = 'GM';
				playersModel.setGM(playerID);
				var player = playersModel.getPlayersByID(playerID);
				if(player == null || phase == null) return null;
				var message = player.characterName + '(' + player.handleName + '◆' + player.tripKey + ')がGMになりました';
				chatLogsModel.createSystemChatLogs(villageID, phase, message); 
			}else{
				roleName = '仮GM';
			}
			villagesModel.completeGM(villageID);
			var message = 'GM/仮GMへ:参加者数と村の設定人数が一致しないと「ゲーム開始」ボタンは表示されないことにご注意ください';
			chatLogsModel.createSystemChatLogs(villageID, phase, message);
			message = '【TIPS】村の設定は、画面上部の村名・番地名が表示されている箇所にマウスポインタを乗せることで確認できます';
			chatLogsModel.createSystemChatLogs(villageID, phase, message);
		}
		rolesModel.createRoles(villageID, playerID, roleName);
		return playerID;
	},
	
	createAudience: function(villageID, tickets){
		if(ticketsModel.checkParticipantExistenceWithTickets(tickets)){
			return 'tickets';
		}
		var playerID = ticketsModel.checkExistence(villageID, tickets, 'audience');
		if(playerID != null) return playerID;
		
		var number = rolesModel.getAudienceNumber(villageID);
		if(number > 30) return null;
		var playerID = playersModel.createAudience(villageID, number + 1);
		if(tickets != null){
			ticketsModel.setTickets(villageID, tickets, playerID, 'audience');
		}
		rolesModel.createRoles(villageID, playerID, '観戦者');
		var village = villagesModel.getVillages(villageID);
		if(village.settings.audienceUtter){
			var player = playersModel.getPlayersByID(playerID);
			var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var option = {
				bold: false,
				color: false
			};
			chatLogsModel.createAudienceChatLogs(villageID, playerID, role, phase, player, '観戦者' + (number + 1) + ' が入村しました', option, []);
		}
		return playerID;
	},
	
	changePlayers: function(villageID, playerID, characterName, icon, color){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		
		if(phase != null && role != null && phase.phase == '事件前' && (role.roleName == '役職未定' || role.roleName == 'GM' || role.roleName == '仮GM')){
			playersModel.updatePlayers(villageID, playerID, characterName, icon, color, phase);
		}
	},
	
	removePlayers: function(villageID, playerID, targetID){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		
		if(phase != null && role != null && phase.phase == '事件前' && (role.roleName=='GM' || role.roleName=='仮GM' || role.roleName == '役職未定')){
			playersModel.removePlayersByID(targetID);
			ticketsModel.removeTicketsByPlayerID(targetID);
		}
	},
	
	killPlayers: function(villageID, playerID, targetID){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		
		if(phase != null && role != null && phase.phase != '事件前' && role.roleName=='GM'){
			playersModel.killPlayers(targetID);
			var penaltyIDs = new Array();
			penaltyIDs.unshift(targetID);
			summariesModel.updatePenaltySummaries(villageID, penaltyIDs);
		}
	},
	
	resetReady: function(villageID, playerID){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		
		if(phase != null && role != null && phase.phase == '事件前' && (role.roleName=='GM' || role.roleName=='仮GM')){
			playersModel.resetReady(villageID, playerID);
		}
	},
	
	setReady: function(villageID, playerID){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		
		if(phase != null && role != null && phase.phase == '事件前' && role.roleName == '役職未定'){
			playersModel.setReady(villageID, playerID);
		}
	}
});
