TimersModel = function(){
	return{
		getTimers:function(villageID){
			return Timers.find({villageID: villageID});
		},
		
		createTimers:function(villageID){
			Timers.insert({
				villageID: villageID,
				remain: 60,
				skip: false,
				extend: false,
				kill: false
			});
		},
		
		updateTimers:function(villageID, remain){
			Timers.update(
				{villageID: villageID},
				{$set: {remain: remain}}
			);
		},
		
		updateExtend: function(villageID, bool) {
			Timers.update(
				{villageID: villageID},
				{$set: {extend: bool}}
			);
		},
		
		updateSkip: function(villageID, bool) {
			Timers.update(
				{villageID: villageID},
				{$set: {skip: bool}}
			);
		},
		
		updateKill: function(villageID, bool){
			Timers.update(
				{villageID: villageID},
				{$set: {kill: bool}}
			);
		},
		
		removeTimers:function(villageID){
			Timers.remove({villageID: villageID});
		}
	};
};

timersModel = new TimersModel();
