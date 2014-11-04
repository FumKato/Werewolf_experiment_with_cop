ActionsController = function(){
	var _this = ActionsController;
	_this.prototype.createActions = function(villageID, from, to, type){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		if(phase == null || (phase.day == 1 && (type == 'guard' || type == 'nightWalk'))) return;
		var village = villagesModel.getVillages(villageID);
		var role = rolesModel.getRolesByPlayerID(from).fetch()[0];
		var timer = timersModel.getTimers(villageID).fetch()[0];
		if(village == null || role == null || timer == null) return;
		if(timer.remain <= 1) return;
		switch(type){
			case 'wolf':
				if(role.roleName != '人　狼') return;
				break;
			case 'seer':
				if(role.roleName != '占い師') return;
				break;
			case 'guard':
				if(role.roleName != '狩　人') return;
				break;
			case 'nightWalk':
				if(timer.remain < (village.settings.dawn / 2)) return;
				if(role.roleName != '少　女') return;
				break;
			case 'wizard':
				if(role.roleName != '妖術師') return;
				break;
			case 'report':
				if(phase.phase != '事件終了' || role.roleName == 'GM' || role.roleName == '観戦者') return;
				break;
		}
		
		if(actionsModel.checkExistence(villageID, phase, from, type)){
			actionsModel.createActions(villageID, phase, from, to, type);
			var voteSkip = phase.phase == '夕方' && village.settings.voteSkip && type == 'vote';
			var actionSkip = phase.phase == '明け方' && village.settings.actionSkip && type == 'wolf';
			if(voteSkip){
				var players = playersModel.getLivingPlayers(villageID).length;
				var votes = actionsModel.getActionsByType(villageID, phase, 'vote').length;
				if(votes == players){
					new TimeManager().skipTimer(villageID);
				}
			} else if(actionSkip){
				new TimeManager().skipTimer(villageID);
			}
		} else {
			var voteSkip = phase.phase == '夕方' && village.settings.voteSkip && type == 'vote';
			var actionSkip = phase.day == 1 || (phase.phase == '明け方' && village.settings.actionSkip && (type == 'wolf' || type == 'guard'));
			if(voteSkip || actionSkip || type == 'seer' || type == 'nightWalk' || type == 'wizard' || type == 'report') return;
			actionsModel.updateActions(villageID, phase, from, to, type);
		}
	};
};

Meteor.methods({
	createActions: function(villageID, from, to, type){
		new ActionsController().createActions(villageID, from, to, type);
	},
	
	skipCheck: function(villageID){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var livingPlayers = playersModel.getLivingPlayers(villageID);
		if(phase == null || livingPlayers == null)return;
		var skips = actionsModel.getActionsByType(villageID, phase, 'skip');
		if(phase.phase == '夜' && skips.length == livingPlayers.length) {
			if(new TimeManager().skipTimer(villageID)){
				chatLogsModel.createSystemChatLogs(villageID, phase, '村は静寂に包まれた...');
			}
		} else if(phase.phase == '昼' && skips.length >= Math.ceil(livingPlayers.length / 2)){
			if(new TimeManager().skipTimer(villageID)){
				chatLogsModel.createSystemChatLogs(villageID, phase, '会議は沈黙に包まれたまま、時間だけが過ぎていった...');
			}
		}
	},
});

Meteor.publish('actions', function(villageID, playerID, phase, state){
	return actionsModel.getActionsByPlayerID(villageID, null, playerID);
});
