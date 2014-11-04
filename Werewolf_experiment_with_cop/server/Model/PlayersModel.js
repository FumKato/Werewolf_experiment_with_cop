PlayersModel = function(){
	var setRandomColor = function(villageID){
		var colorArray = ['red', 'green', 'blue', 'pink', 'yellow',
		'navy', 'orange', 'crimson', 'brown', 'purple', 'silver',
		'black', 'greenyellow', 'aqua', 'darkgreen', 'royalblue',
		'bluegreen', 'indigo', 'blueviolet', 'darkred', 'coral',
		'lightpink'];
		var rnd = Math.floor(Math.random() * colorArray.length);
		var color = colorArray[rnd];
		while(Players.find({villageID: villageID, color: color}).count() != 0){
			colorArray.splice(rnd, 1);
			rnd = Math.floor(Math.random() * colorArray.length);
			color = colorArray[rnd];
		}
		return color;
	};
	
	var maxIconNumber = 446;
	
	return{
		getPlayersByID: function(ID){
			return Players.findOne({_id: ID});
		},
		
		getPlayersByTrip: function(trip){
			return Players.find({tripKey: trip, isGM: false}).fetch();
		},
		
		getPlayers: function(villageID){
			return Players.find({villageID: villageID, isPlayer: true}, {sort: {number: 1}}).fetch();
		},
		
		getLivingPlayers: function(villageID){
			return Players.find({villageID: villageID, isPlayer: true, state: '生　存'}).fetch();
		},
		
		getAllPlayers: function(villageID){
			return Players.find({villageID: villageID}).fetch();
		},
		
		getVictim: function(villageID){
			return Players.findOne({villageID: villageID, tripKey: 'shonich＊'});
		},
		
		getGM: function(villageID){
			return Players.findOne({villageID: villageID, isGM: true});
		},
		
		createPlayers:function(village, characterName, handleName, tripKey, password, icon, color, ticket){
			if(characterName == null || !textChecker.checkBlankText(characterName)) return null;
			characterName = textChecker.checkTextLength(characterName, 8);
			characterName = textChecker.checkEscape(characterName);

			if(handleName == null || !textChecker.checkBlankText(handleName)) return null;
			handleName = textChecker.checkTextLength(handleName, 8);
			handleName = textChecker.checkEscape(handleName);
			
			if(tripKey == null || !textChecker.checkBlankText(tripKey)) return null;
			tripKey = textChecker.checkEscape(tripKey);
		
			if(password == null || !textChecker.checkBlankText(password)) return null;
			password = textChecker.checkTextLength(password, 10);
			password = textChecker.checkEscape(password);
			
			if(icon == null) return null;
			icon = textChecker.checkNumberLiteral(icon, 0, maxIconNumber);
			
			if(color == null) return null;
			color = textChecker.checkEscape(color);
			
			var player = Players.findOne({
				villageID: village._id,
				handleName: handleName,
			});
			if(player != null) {
				if(player.tripKey == tripKey && player.password == password)
					return player._id;
				return null;
			}
			var count = Players.find({villageID: village._id, isPlayer: true}).count();
			if(village.settings.quota > count){
				if(tripKey != 'shonich＊' && ticketsModel.checkParticipantExistenceWithVillageID(ticket, village._id)){
					return null;
				}
				var record = '--';
				if(tripKey != 'shonich＊' && tripKey != 'トリなし'){
					record = tripsModel.getTripsRecord(tripKey);
				}
				var region = '--';
				if(tripKey == 'shonich＊'){
					region = 'めておら鯖の近所';
				}
				if(color == 'random') color = setRandomColor(village._id);
				var playerID = Players.insert({
									villageID: village._id,
									icon: icon,
									characterName: characterName,
									handleName: handleName,
		  							tripKey: tripKey,
		  							password: password,
		  							state: '生　存',
		  							color: color,
		  							logCount: 0,
		  							isPlayer: true,
		  							isReady: true,
		  							isGM: false,
		  							num : count,
		  							region: region,
		  							record: record
		  						});
		  		if(tripKey != 'shonich＊'){
		  			var phase = phasesModel.getPhasesByVillageID(village._id);
		  			chatLogsModel.createSystemChatLogs(village._id, phase, characterName + 'が入村しました。');
		  		}
		  		return playerID;
			}
			return null;
		},
		
		createAudience: function(villageID, number){
			var playerID = Players.insert({
								villageID: villageID,
								icon: 0,
								characterName: '観戦者' + number,
								color: 'none',
								logCount: 0,
								isPlayer: false,
								blocked: false,
								isGM: false
							});
			return playerID;
		},
		
		updatePlayersRegion: function(playerID, region){
			Players.update({_id: playerID}, {$set: {region: region}});
		},
		
		updatePlayers:function(villageID, playerID, characterName, icon, color, phase){
			var player = Players.findOne({_id: playerID});
			var sentence = '';
			characterName = textChecker.checkTextLength(characterName, 8);
			characterName = textChecker.checkEscape(characterName);
			
			icon = textChecker.checkNumberLiteral(icon, 0, maxIconNumber);
			color = textChecker.checkEscape(color);
			
			if(characterName != player.characterName && textChecker.checkBlankText(characterName)){
				sentence += player.characterName + ' が ' + characterName + 'に名前を変更しました。';
				chatLogsModel.createSystemChatLogs(villageID, phase, sentence);
			}
			if(!textChecker.checkBlankText(characterName)){
				characterName = player.characterName;
			}
			
			if(color == 'random') color = setRandomColor(villageID);
			
			if(characterName != player.characterName || icon != player.icon || color != player.color){
				Players.update({_id: playerID}, {$set: {characterName: characterName, icon: icon, color: color}});
			}
		},
		
		checkIconNumber: function(villageID, icon) {
			return Players.find({villageID: villageID, isPlayer: true, icon: icon}).count() != 0;
		},
		
		setupPlayers: function(ID, characterName, icon, color){
			Players.update({_id: ID}, {$set: {characterName: characterName, icon: icon, color: color}});
		},
		
		setPlayersNumber: function(ID, num){
			Players.update({_id: ID}, {$set: {num: num}});
		},
		
		killPlayers: function(ID){
			Players.update({_id: ID}, {$set: {state: '死　亡'}});
		},
		
		setGM: function(ID){
			Players.update({_id: ID}, {$set: {isPlayer: false, isGM: true}});
		},
		
		unsetGM: function(ID){
			Players.update({_id: ID}, {$set: {isPlayer: true, isGM: false}});
		},
		
		removePlayersByID:function(ID){
			Players.remove({_id: ID});
		},
		
		removePlayersByVillageID:function(villageID){
			Players.remove({villageID: villageID});
		},
		
		removeNonPlayersByVillageID: function(villageID){
			Players.remove({
				villageID: villageID,
				isPlayer: false,
				isGM: false
			});
		},
		
		updateLogCount: function(playerID){
			Players.update({_id: playerID}, {$inc: {logCount: 1}});
		},
		
		resetLogCount: function(villageID) {
			Players.update({villageID: villageID}, {$set: {logCount: 0}}, {multi: true});
		},
		
		loggingPlayers: function(villageID){
			Players.update(
				{villageID: villageID},
				{$unset: {
					password: '',
					icon: '',
					state: '',
					logCount: '',
					isPlayer: '',
					isReady: '',
					num: '',
					region: '',
					record: ''
				}},
				{multi: true}
			);
		},
		
		resetReady: function(villageID, playerID){
			Players.update(
				{
					_id: {$ne: playerID},
					villageID: villageID,
					isPlayer: true,
					tripKey: {$ne: 'shonich＊'}
				},
				{$set: {isReady: false}},
				{multi: true}
			);
		},
		
		setReady: function(villageID, playerID){
			Players.update(
				{
					villageID: villageID,
					_id: playerID
				},
				{$set: {isReady: true}}
			);
		}
	};
};

playersModel = new PlayersModel();
