ActionsModel = function(){
	return{
		createActions: function(from, to, type){
			Meteor.call('createActions', Session.get('villageID'), from, to, type);
		},
		
		getActions: function(playerID, phase){
			var count = Actions.find({day: phase.day, phase: phase.phase, from: playerID, type: {$ne: 'extend'}}).count();
			if(count == 0) return null;
			return Actions.find({day: phase.day, phase: phase.phase, from: playerID, type: {$ne: 'extend'}}).fetch();
		},
		
		checkDone: function(playerID, phase, type) {
			if(type == 'wolf'){
				var count = Actions.find({day: phase.day, phase: phase.phase, type: type}).count();
			} else {
				var count = Actions.find({day: phase.day, phase: phase.phase, from: playerID, type: type}).count();
			}
			return count == 0;
		},
		
		getActionsByType: function(playerID, phase, type){
			return Actions.find({day: phase.day, phase: phase.phase, type: type}).fetch();
		}
	};
};

actionsModel = new ActionsModel();
