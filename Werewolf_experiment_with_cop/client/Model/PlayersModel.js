PlayersModel = function(){
	return{
		removePlayers:function(playerID){
			Meteor.call('removePlayers', Session.get('villageID'), Session.get('myPlayerID'), playerID);
		},
		
		killPlayers: function(playerID){
			Meteor.call('killPlayers', Session.get('villageID'), Session.get('myPlayerID'), playerID);
		},
		
		getLivingPlayers: function(villageID, playerID){
			return Players.find({_id: {$ne: playerID}, villageID: villageID, isPlayer: true, tripKey: {$ne: 'shonich＊'}, state: '生　存'}, {sort:{num: 1}});
		},
		
		getAllLivingPlayers: function(villageID){
			return Players.find({villageID: villageID, isPlayer: true, state: '生　存'}, {sort: {isReady: -1, num: 1}});
		},
		
		getPlayersByVillageID:function(villageID, sort){
			if(sort){
				return Players.find({villageID: villageID, isPlayer: true}, {sort: {isReady: -1 ,state: -1, num: 1}});
			} else {
				return Players.find({villageID: villageID, isPlayer: true}, {sort: {isReady: -1, num: 1}});
			}
			
		},
		
		getPlayersByID: function(ID){
			return Players.findOne({_id: ID});
		},
		
		getPlayersByIDs: function(IDs){
			return Players.find(
				{_id: {$in: IDs}},
				{sort: {num: 1}}).fetch();
		},
		
		getVictim: function(villageID){
			return Players.findOne({villageID: villageID, tripKey: 'shonich＊'});
		},
		
		getGM: function(villageID){
			return Players.find({villageID: villageID, isGM: true}).fetch();
		},
		
		getParticipantsNumber:function(villageID){
			return Players.find({villageID: villageID, state: '生　存', isPlayer: true}).count();
		},
		
		getWolvesTargetPlayers: function(villageID, playerID){
			var wolves = new RolesModel().getRolesByRoleName(villageID, '人　狼').fetch();
			var players = Players.find( {villageID: villageID, isPlayer: true, state: '生　存'}, {sort: {num: 1}}).fetch();
			var i = players.length - 1;
			for(i; i>=0; i--){
				var j = wolves.length - 1;
				for(j; j>=0; j--){
					if(players[i] == null || players[i]._id == null) continue;
					if(players[i]._id == wolves[j].playerID){
						players.splice(i, 1);
						wolves.splice(j, 1);
						break;
					}
				}
			}
			return players;
		},
		
		checkReady: function(villageID){
			var nonReadyCount = Players.find({
				villageID: villageID,
				isPlayer: true,
				isReady: false 
			}).count();
			return nonReadyCount == 0;
		},
		
		resetReady: function(){
			Meteor.call('resetReady', Session.get('villageID'), Session.get('myPlayerID'));
		},
		
		setReady: function(){
			Meteor.call('setReady', Session.get('villageID'), Session.get('myPlayerID'));
		}
	};
};
