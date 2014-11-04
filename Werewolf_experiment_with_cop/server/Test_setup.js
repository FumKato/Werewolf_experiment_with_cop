setup = function(day, phase){
	var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '110',
				tripLimit: false,
				recordLimit: '0',
				cat: true,
				girl: true,
				wizard: true,
				hideRole: false,
				iconset: 'ねこっぷ',
				randomCN: true,
				audienceUtter: true,
				silenceRule: '10',
				listSort: false,
				voteSkip: true,
				actionSkip: true
			};
	var villageID = Villages.insert({
			settings: data,
			number: '＊0',
			isStarted: true,
			gatheringGM: false,
			isFinished: false,
			isLogged: false
		});
	var phaseID = Phases.insert({
			villageID: villageID,
			day: day,
			phase: phase,
			revote: 5
		});
	Timers.insert({
		villageID: villageID,
		remain: 60,
		extend: false,
		skip: false
	});
	var villagerID = Players.insert({
			villageID: villageID,
			characterName: 'villager',
			handleName: 'villager',
			password: 'villager',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			icon: '0',
			color: 'blue',
			num: 0,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var wolf1ID = Players.insert({
			villageID: villageID,
			characterName: 'wolf1',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'wolf1',
			password: 'wolf1',
			icon: '1',
			color: 'red',
			num: 1,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var wolf2ID = Players.insert({
			villageID: villageID,
			characterName: 'wolf2',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'wolf2',
			password: 'wolf2',
			icon: '2',
			color: 'red',
			num: 2,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var seerID = Players.insert({
			villageID: villageID,
			characterName: 'seer',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'seer',
			password: 'seer',
			icon: '3',
			color: 'green',
			num: 3,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var fox1ID = Players.insert({
			villageID: villageID,
			characterName: 'fox1',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'fox1',
			password: 'fox1',
			icon: '4',
			color: 'yellow',
			num: 4,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var fox2ID = Players.insert({
			villageID: villageID,
			characterName: 'fox2',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'fox2',
			password: 'fox2',
			icon: '5',
			color: 'yellow',
			num: 5,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var catID = Players.insert({
			villageID: villageID,
			characterName: 'cat',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'cat',
			password: 'cat',
			icon: '6',
			color: 'navy',
			num: 6,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var hunterID = Players.insert({
			villageID: villageID,
			characterName: 'hunter',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'hunter',
			password: 'hunter',
			icon: '7',
			color: 'silver',
			num: 7,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var girlID = Players.insert({
			villageID: villageID,
			characterName: 'girl',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'girl',
			password: 'girl',
			icon: '8',
			color: 'crimson',
			num: 8,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var wizardID = Players.insert({
			villageID: villageID,
			characterName: 'wizard',
			tripKey: 'トリなし',
			isPlayer: true,
			state: '生　存',
			handleName: 'wizard',
			password: 'wizard',
			icon: '9',
			color: 'coral',
			num: 9,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var victimID = Players.insert({
			villageID: villageID,
			characterName: '初日犠牲者',
			tripKey: 'shonich＊',
			isPlayer: true,
			state: '生　存',
			handleName: 'victim',
			password: 'victim',
			icon: '10',
			color: 'indigo',
			num: 10,
			logCount: 0,
			isReady: true,
			isGM: false
		});
	var audienceID = Players.insert({
			villageID: villageID,
			characterName: '観戦者1',
			isPlayer: false
		});
	var GMID = Players.insert({
			villageID: villageID,
			characterName: 'GM',
			isPlayer: false,
			handleName: 'GM',
			password: 'GM',
			tripKey: 'トリなし',
			icon: '11',
			num: 11,
			color: 'black',
			logCount: 0,
			isReady: true,
			isGM: true
		});
	Roles.insert({
		villageID: villageID,
		playerID: villagerID,
		roleName: '村　人'
	});
	Roles.insert({
		villageID: villageID,
		playerID: wolf1ID,
		roleName: '人　狼'
	});
	Roles.insert({
		villageID: villageID,
		playerID: wolf2ID,
		roleName: '人　狼'
	});
	Roles.insert({
		villageID: villageID,
		playerID: seerID,
		roleName: '占い師'
	});
	Roles.insert({
		villageID: villageID,
		playerID: fox1ID,
		roleName: '妖　狐'
	});
	Roles.insert({
		villageID: villageID,
		playerID: fox2ID,
		roleName: '妖　狐'
	});
	Roles.insert({
		villageID: villageID,
		playerID: catID,
		roleName: '猫　又'
	});
	Roles.insert({
		villageID: villageID,
		playerID: victimID,
		roleName: '村　人'
	});
	Roles.insert({
		villageID: villageID,
		playerID: hunterID,
		roleName: '狩　人'
	});
	Roles.insert({
		villageID: villageID,
		playerID: girlID,
		roleName: '少　女'
	});
	Roles.insert({
		villageID: villageID,
		playerID: wizardID,
		roleName: '妖術師'
	});
	Roles.insert({
		villageID: villageID,
		playerID: audienceID,
		roleName: '観戦者'
	});
	Roles.insert({
		villageID: villageID,
		playerID: GMID,
		roleName: 'GM'
	});
	var ids = {
		villageID: villageID,
		phaseID: phaseID,
		villagerID: villagerID,
		wolf1ID: wolf1ID,
		wolf2ID: wolf2ID,
		seerID: seerID,
		fox1ID: fox1ID,
		fox2ID: fox2ID,
		catID: catID,
		hunterID: hunterID,
		girlID: girlID,
		wizardID: wizardID,
		victimID: victimID,
		audienceID: audienceID,
		GMID: GMID
	};
	return ids;
};