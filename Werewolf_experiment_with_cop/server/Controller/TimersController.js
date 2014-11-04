Meteor.publish('timers', function(villageID) {
	return timersModel.getTimers(villageID);
});

Meteor.methods({
	startGame: function(villageID, playerID) {
		if(villageID == null || playerID == null) return;
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		if(role == null || (role.roleName != 'GM' && role.roleName != '仮GM')) return;
		new TimeManager().skipTimer(villageID);
	},
	
	extendTimer: function(villageID, playerID) {
		if(villageID == null || playerID == null) return;
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		if(role == null || (role.roleName != 'GM' && role.roleName != '仮GM')) return;
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var action = actionsModel.getActionsByType(villageID, phase, 'extend');
		if(action.length > 2) return;
		new TimeManager().extendTimer(villageID);
		var message = '残り時間が延長されました';
		if(phase.phase != '事件前'){
			var remain = 2 - action.length;
			message = message + '(このフェーズ内で あと' + remain + '回延長可能)';
			actionsModel.createActions(villageID, phase, playerID, 'dummy', 'extend');
		}
		chatLogsModel.createSystemChatLogs(villageID, phase, message);
	},
	
	skipTimer: function(villageID, playerID){
		if(villageID == null || playerID == null) return;
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		if(role == null || (role.roleName != 'GM' && role.roleName != '仮GM')) return;
		new TimeManager().skipTimer(villageID);
	},
	
	killTimer: function(villageID, playerID){
		if(villageID == null || playerID == null) return;
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var phase = phasesModel.getPhasesByVillageID(villageID);
		if(phase == null || phase.phase != '事件前') return;
		if(role == null || (role.roleName != 'GM' && role.roleName != '仮GM')) return;
		new TimeManager().killTimer(villageID);
	}
});
