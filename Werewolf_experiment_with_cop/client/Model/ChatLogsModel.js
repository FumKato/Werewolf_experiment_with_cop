ChatLogsModel = function(){
	return{
		getLatestChatLogs: function(phase, inKeys){
			return ChatLogs.find(
				{
					$or: [
						{
							villageID: Session.get('villageID'),
							day: phase.day,
							phase: {$in: inKeys},
							number: {$gt: Session.get('latestLogNumber')}
						},
						{
							villageID: Session.get('villageID'),
							day: phase.day,
							number: {$gt: Session.get('latestLogNumber')},
							type: 'voteResult'
						}
					]
				},
				{sort: {number: 1}}
			).fetch();
		},
		
		getChatLogsByPlayerID: function(phase){
			if(phase.phase == '事件前') {
	  			return ChatLogs.find(
	  				{
	  					villageID: Session.get('villageID'), 
	  					playerID: Session.get('selectedPlayer'), 
	  					phase: '事件前', 
	  					number: {$gt: Session.get('latestLogNumber')},
	  				},
	  				 {sort: {number: 1}}).fetch();
	  		} else {
	  			return ChatLogs.find(
	  				{
	  					villageID: Session.get('villageID'),
	  					playerID: Session.get('selectedPlayer'),
	  					phase: '昼',
	  					number: {$gt: Session.get('latestLogNumber')},
	  				},
	  				{sort: {number: 1}}).fetch();
	  		}
		},
		
		getGMChatLogs: function(phase){
			if(phase.phase == '事件前'){
				return ChatLogs.find(
					{
						villageID: Session.get('villageID'),
						playerID: Session.get('selectedPlayer'),
						phase: phase.phase,
						number: {$gt: Session.get('latestLogNumber')},
						type: 'normal'
					},
					{sort: {number: 1}}).fetch();
			} else {
				return ChatLogs.find(
				{
					villageID: Session.get('villageID'),
					playerID: Session.get('selectedPlayer'),
					phase: {$ne: '事件前'},
					number: {$gt: Session.get('latestLogNumber')},
					type: 'normal'
				},
				{sort: {number: 1}}).fetch();
			}
		},
		
		getChatLogsByDay: function(day){
			var integerDay = parseInt(day);
			return ChatLogs.find({
				villageID: Session.get('villageID'),
				phase: '昼',
				day: integerDay,
				number: {$gt: Session.get('latestLogNumber')},
				type: 'normal'
			},
			{sort: {number: 1}}).fetch();
		},
		
		getChatLogsByDaynPlayerID: function(day, playerID){
			var integerDay = parseInt(day);
			return ChatLogs.find({
				villageID: Session.get('villageID'),
				playerID: playerID,
				phase: '昼',
				day: integerDay,
				number: {$gt: Session.get('latestLogNumber')},
				type: 'normal'
			},
			{sort: {number: 1}}).fetch();
		},
		
		getChatLogsByPlayerIDWithoutSession: function(phase, playerID){
			var integerDay = parseInt(phase.day);
			if(phase.phase != '事件前'){
				return ChatLogs.find({
					villageID: Session.get('villageID'),
					playerID: playerID,
					phase: '昼',
					day: integerDay,
					type: 'normal'
				},
				{sort: {number: 1}}).fetch();
			} else {
				return ChatLogs.find({
					villageID: Session.get('villageID'),
					playerID: playerID,
					phase: '事件前',
					type: 'normal'
				},
				{sort: {number: 1}}).fetch();
			}
		},
		
		getChatLogsByDaynPlayerIDWithoutSession: function(day, playerID){
			var integerDay = parseInt(day);
			return ChatLogs.find({
				villageID: Session.get('villageID'),
				playerID: playerID,
				phase: '昼',
				day: integerDay,
				type: 'normal'
			},
			{sort: {number: 1}}).fetch();
		},
		
		getVoteResults: function(){
			return ChatLogs.find({
				villageID: Session.get('villageID'),
				number: {$gt: Session.get('latestLogNumber')},
				type: 'voteResult'
			},
			{sort: {number: 1}}).fetch();
		},
		
		getAllChatLogs: function(){
			return ChatLogs.find({
				villageID: Session.get('villageID'),
				number: {$gt: Session.get('latestLogNumber')},
			},
			{sort: {number: 1}}).fetch();
		},
		
		createSystemChatLogs: function(sentence){
			Meteor.call('createSystemChatLogs', Session.get('villageID'), Session.get('myPlayerID'), sentence);
		},
		
		createSystemMonologue: function(sentence){
			Meteor.call('createSystemMonologue', Session.get('villageID'), Session.get('myPlayerID'), sentence);
		}
	};
};

chatLogsModel = new ChatLogsModel();
