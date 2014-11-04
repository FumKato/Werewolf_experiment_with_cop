Meteor.methods({
	createVillage : function(data, tickets) {
		if(!textChecker.checkBoolean(data.noTweet)){
			data.noTweet = false;
		};

		if(tickets == null){
	    	tickets = ip;
	    }
		var ticketsExistence = ticketsModel.checkExistence('dummyID', tickets, 'gm');
		if(ticketsExistence != null) return 'tickets';
		if(ticketsModel.checkParticipantExistenceWithTickets(tickets)){
			return 'participant';
		}
	    var villageID = villagesModel.createVillages(data);
	    if(villageID == null || villageID == false) return villageID;
	    phasesModel.createPhases(villageID);
	    timersModel.createTimers(villageID);
	    ticketsModel.setTickets(villageID, tickets, 'dummyID', 'gm');
	    var village = villagesModel.getVillages(villageID);
	    var rnd = Math.floor(Math.random() * 211) + '';
	    var playerID = playersModel.createPlayers(village, '初日犠牲者', '初日犠牲者', 'shonich＊', '39fjef8h3d', rnd, 'random', 'dummyTickets');
	    rolesModel.createRoles(villageID, playerID, '役職未定');
	    new TimeManager().startTimer(villageID);
	    
	    var message = village.number + '番地 ' + village.settings.villageName + '村: ' + village.settings.quota + '人/';
	    if(village.settings.wizard && new RoleSet().checkWizard(village.settings)){
	    	message += '[術]';
	    }
	    if(village.settings.quota >= 10 && village.settings.cat) {
	    	message += '[猫]';
	    }
	    message += village.settings.roleset + '配役';
	    if(village.settings.quota >= 10 && village.settings.girl) {
	    	message += '[少女]';
	    }
	    if(village.settings.villagePR != null && village.settings.villagePR != '') {
	    	message += ':' + village.settings.villagePR;
	    }
	    message += ' が建ちました。(http://werewolf-meteora.com/)#人狼 #人狼募集';
	    if(!data.noTweet){
	    	twitterManager.tweetVillage(message);
	    }
	    
		return villageID;
	},
	
	updateVillageSettings: function(villageID, playerID, data){
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		if(phase != null && phase.phase != '事件前' || (role != null && role.roleName != 'GM' && role.roleName != '仮GM')) return;
		
		villagesModel.updateVillages(villageID, data);
	},
	
	getLogVillagesByTrip: function(trip){
		if(trip != null && trip != 'トリなし'){
			trip = textChecker.checkEscape(trip);
			var players = playersModel.getPlayersByTrip(trip);
			if(players.length == 0) {
				return null;
			}
			var i;
			var villageIDs = new Array();
			for(i=0; i<players.length; i++){
				villageIDs.unshift(players[i].villageID);
			}
			var count = Villages.find({isLogged: true,_id: {$in: villageIDs}}).count();
			var villages = Villages.find(
						{
							isLogged: true,
							_id: {$in: villageIDs}
						},
						{sort: {number: -1}}
					).fetch();
			var result = {
				hit: count,
				result: villages
			};
			return result;
		}
		return null;
	}
});

Meteor.publish('villages', function(villageID){
	if(villageID != null) {
		return Villages.find({_id: villageID});
	} else {
		return Villages.find({isLogged: false});
	}
});

Meteor.publish('logVillagesWithNumber', function(number){
	number = textChecker.checkNumberLiteral(number, -1, 65534);
	number = parseInt(number);
	if(number <= 0) {
		var village = Villages.find({isLogged: true}, {sort: {number: -1}}).fetch()[0];
		if(village == null) return null;
		return Villages.find(
			{
				isLogged: true,
				$and : [
					{number: {$gt: village.number - 51}},
					{number: {$lt: village.number + 1}}
				]
			},
			{sort: {number: -1}}
		);
	} else {
		return Villages.find(
			{
				isLogged: true,
				$and : [
					{number: {$gt: number - 51}},
					{number: {$lt: number}}
				]
			},
			{sort: {number: -1}}
		);
	}
});
