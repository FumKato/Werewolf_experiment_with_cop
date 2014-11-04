ChatLogsController = function(){
	var _this = ChatLogsController;
	_this.prototype.publishChatLogs = function(villageID, playerID, phase, state){
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var player = playersModel.getPlayersByID(playerID);
		var village = villagesModel.getVillages(villageID);
		if(role == null || phase == null || player == null || village == null) return null;
		if(phase == '事件前' || phase == '事件終了' || role.roleName == 'GM') {
			return chatLogsModel.getChatLogs(villageID, playerID, ['dummy']);
		} else if(player.isPlayer && player.state == '死　亡') {
			if(village.settings.hideRole){
				return chatLogsModel.getChatLogs(villageID, playerID, ['wolf', 'mason', 'audience', 'monologue']);
			}
			return chatLogsModel.getChatLogs(villageID, playerID, ['dummy', 'audience']);
		} else if(role.roleName == '観戦者') {
			return chatLogsModel.getChatLogs(villageID, playerID, ['wolf', 'mason', 'ghost', 'monologue']);
		} else if(role.roleName == '人　狼') {
			return chatLogsModel.getChatLogs(villageID, playerID, ['dummy', 'audience', 'mason', 'ghost', 'monologue']);
		} else if(role.roleName == '共有者') {
			return chatLogsModel.getChatLogs(villageID, playerID, ['wolf', 'audience', 'ghost', 'monologue']);
		} else {
			return chatLogsModel.getChatLogs(villageID, playerID, ['wolf', 'mason', 'audience', 'ghost', 'monologue']);
		}
	};
};

Meteor.methods({
	createChatLogs: function(villageID, playerID, plainSentence, options, quotes, clientPhase) {
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var player = playersModel.getPlayersByID(playerID);
		if(role == null || phase == null || player == null) return;
		if(!textChecker.checkBlankText(plainSentence)) return;
		if(clientPhase.phase != phase.phase && clientPhase.phase == '明け方'){
			phase.phase = '明け方';
		}
		var type = chatLogsModel.createChatLogs(villageID, playerID, role, phase, player, plainSentence, options, player.color, quotes);
		if(type == 'normal' && playersModel.getPlayersByID(playerID) != null)
			playersModel.updateLogCount(playerID);
	},
	
	createAudienceChatLogs: function(villageID, playerID, plainSentence, options, quotes){
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var player = playersModel.getPlayersByID(playerID);
		if(role == null || phase == null || player == null) return;
		if(!textChecker.checkBlankText(plainSentence)) return;
		chatLogsModel.createAudienceChatLogs(villageID, playerID, role, phase, player, plainSentence, options, quotes);
	},
	
	createGhostChatLogs: function(villageID, playerID, plainSentence, options, quotes){
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var player = playersModel.getPlayersByID(playerID);
		if(role == null || phase == null || player == null) return;
		if(!textChecker.checkBlankText(plainSentence)) return;
		var type = chatLogsModel.createGhostChatLogs(villageID, playerID, role, phase, player, plainSentence, options, quotes);
	},
	
	createSystemChatLogs: function(villageID, playerID, plainSentence){
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var phase = phasesModel.getPhasesByVillageID(villageID);
		if(role == null || phase == null || (role.roleName != 'GM' && role.roleName != '仮GM' && role.roleName != '役職未定')) return;
		if(!textChecker.checkBlankText(plainSentence)) return;
		var sentence = textChecker.checkEscape(plainSentence);
		chatLogsModel.createSystemChatLogs(villageID, phase, sentence);
	},
	
	createSystemMonologue: function(villageID, playerID, plainSentence){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		if(phase == null) return;
		if(!textChecker.checkBlankText(plainSentence)) return;
		chatLogsModel.createSystemMonologue(villageID, playerID, phase, plainSentence); 
	}
});


Meteor.publish('chatLogs', function(villageID, playerID, phase, state){
	return new ChatLogsController().publishChatLogs(villageID, playerID, phase, state);
});
