ActionsModel = function(){
	return{
		createActions:function(villageID, phase, from, to, type){
			if(phase.day == 1 && type == 'wolf'){
				var victim = playersModel.getVictim(villageID);
				var id = Actions.insert({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					from: from,
					to: victim._id,
					type: type
				});
			} else {
				var id = Actions.insert({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					from: from,
					to: to,
					type: type
				});
			}
			if(type == 'wolf'){
				chatLogsModel.createSystemChatLogs(villageID, phase, '辺りに背筋が凍るような遠吠えが響き渡った...');
			} else if(type == 'vote'){
				var votes = Actions.find({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					type: 'vote'
				}).count();
				chatLogsModel.createSystemChatLogs(villageID, phase, '現在' + votes + '人 投票済みです');
			} else if(type == 'nightWalk'){
				var action = Actions.findOne({_id: id});
				var role = rolesModel.getRolesByPlayerID(action.to).fetch()[0];
				if(role.roleName != '人　狼') return;
				var target = playersModel.getPlayersByID(action.to);
				var monologue = '<b>' + target.characterName + '</b> に勘付かれたようだ...!';
				Meteor.call('createSystemMonologue', villageID, action.from, monologue);
				var myself = new PlayersModel().getPlayersByID(action.from);
				monologue = '<b>' + myself.characterName + '</b> に人狼であることを見破られた!';
				Meteor.call('createSystemMonologue', villageID, action.to, monologue);
			}
		},
		
		updateActions:function(villageID, phase, from, to, type){
			if(type == 'wolf'){
				Actions.update({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					type: type	
				},
				{
					$set: {
						from: from,
						to: to
					}
				});
			} else {
				Actions.update({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					from: from,
					type: type	
				},
				{
					$set: {to: to}
				});
			}
			if(type == 'wolf'){
				chatLogsModel.createSystemChatLogs(villageID, phase, '辺りに背筋が凍るような遠吠えが響き渡った...');
			}
		},
		
		getActionsByPlayerID: function(villageID, phase, playerID){
			if(phase == null){
				var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
				if(role != null && role.roleName == '人　狼'){
					return Actions.find({
						villageID: villageID,
						$or: [
							{from: playerID},
							{type: 'wolf'}
						]
					});
				} else {
					return Actions.find({
						villageID: villageID,
						from: playerID,
					});
				}
			}
			return Actions.find({
				villageID: villageID,
				day: phase.day,
				phase: phase.phase,
				from: playerID,
			});
		},
		
		getActionsByTargetPlayerID: function(villageID, phase, playerID){
			return Actions.find({
				villageID: villageID,
				day: phase.day,
				phase: phase.phase,
				to: playerID
			});
		},
		
		getActionsByType: function(villageID, phase, type){
			return Actions.find({
				villageID: villageID,
				day: phase.day,
				phase: phase.phase,
				type: type
			}).fetch();
		},
		
		removeActionsByType:function(villageID, phase, type){
			Actions.remove({
				villageID: villageID,
				day: phase.day,
				phase: phase.phase,
				type: type
			});
		},
		
		checkExistence: function(villageID, phase, from, type){
			if(type == 'wolf'){
				var count = Actions.find({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					type: type
				}).count();
			} else {
				var count = Actions.find({
					villageID: villageID,
					day: phase.day,
					phase: phase.phase,
					from: from,
					type: type
				}).count();
			}
			return count == 0;
		},
		
		removeActionsByVillageID: function(villageID){
			Actions.remove({villageID: villageID});
		}
	};
};

actionsModel = new ActionsModel();
