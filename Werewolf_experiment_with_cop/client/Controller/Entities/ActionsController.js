ActionsController = function(){
	return {
		updateActionsView: function(){
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(phase == null) return;
			var actions = actionsModel.getActions(Session.get('myPlayerID'), phase);
			if(actions == null) {
				if(phase.phase == '夕方'){
					new SystemWindowView().flush('voteInformation');
				} else if((phase.phase == '夜' || phase.phase == '明け方') &&
						Session.get('currentState') == '生　存' &&
						Session.get('currentRole') == '人　狼'){
					new SystemWindowView().flush('actionInformation');	
				}
				return;
			}
			switch(actions[0].type){
				case 'vote':
					var player = new PlayersModel().getPlayersByID(actions[0].to);
					new SystemWindowView().renderVoteInformation(player.characterName);
					if(Session.get('sound')){
						soundManager.stop();
					}
					break;
				case 'medium':
					if(Session.get('currentState') == '死　亡') return;
					Meteor.call('getRoleName', Session.get('myPlayerID'), actions[0].to, function(error, result){
						if(result == null) return;
						var player = new PlayersModel().getPlayersByID(actions[0].to);
						var message = '<b>' + player.characterName + '</b> は '; 
						if(result == '人　狼'){
							message += '<span class="GMName"><b>人　狼</b></span> でした';
						} else {
							message += '<b>村　人</b> でした';
						}
						new SystemWindowView().renderActionInformation(message);
					});
					break;
				case 'seer':
					if(Session.get('currentState') == '死　亡') return;
					Meteor.call('getRoleName', Session.get('myPlayerID'), actions[0].to, function(error, result){
						if(result == null) return;
						var player = new PlayersModel().getPlayersByID(actions[0].to);
						var message = '<b>' + player.characterName + '</b> は '; 
						if(result == '人　狼'){
							message += '<span class="GMName"><b>人　狼</b></span> でした';
						} else {
							message += '<b>村　人</b> でした';
						}
						new SystemWindowView().renderActionInformation(message);
					});
					break;
				case 'wolf':
					var player = new PlayersModel().getPlayersByID(actions[0].to);
					var message = '<b>' + player.characterName + '</b> を襲撃します';
					new SystemWindowView().renderActionInformation(message);
					break;
				case 'guard':
					var player = new PlayersModel().getPlayersByID(actions[0].to);
					var message = '<b>' + player.characterName + '</b> を護衛します';
					new SystemWindowView().renderActionInformation(message);
					break;
				case 'nightWalk':
					if(Session.get('currentState') == '死　亡') return;
					Meteor.call('getRoleName', Session.get('myPlayerID'), actions[0].to, function(error, result){
						if(result == null) return;
						var player = new PlayersModel().getPlayersByID(actions[0].to);
						var message = '<b>' + player.characterName + '</b> は '; 
						if(result == '人　狼'){
							message += '<span class="GMName"><b>人　狼</b></span> でした';
						} else {
							message += '<b>村　人</b> でした';
						}
						new SystemWindowView().renderActionInformation(message);
					});
					break;
				case 'wizard':
					if(Session.get('currentState') == '死　亡') return;
					Meteor.call('getRoleName', Session.get('myPlayerID'), actions[0].to, function(error, result){
						if(result == null) return;
						var player = new PlayersModel().getPlayersByID(actions[0].to);
						var message = '<b>' + player.characterName + '</b> は '; 
						if(result == '村　人'){
							message += 'ただの村人のようだ';
						} else {
							message += '<span class="GMName"><b>ただの村人ではないようだ</b></span>';
						}
						new SystemWindowView().renderActionInformation(message);
					});
					break;
				case 'report':
					var player = new PlayersModel().getPlayersByID(actions[0].to);
					var message = '<b>' + player.characterName + '</b> を通報します';
					new SystemWindowView().renderActionInformation(message);
					break;
			}
		}
	};
};
