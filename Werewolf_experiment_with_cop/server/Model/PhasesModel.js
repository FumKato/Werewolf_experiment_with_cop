PhasesModel = function(){
	return{
		createPhases: function(villageID){
			Phases.insert({
				villageID: villageID,
				day: 1,
				phase: '事件前',
				revote: 5
			});
		},
		
		getPhasesByVillageID : function(villageID){
			return Phases.findOne({villageID: villageID});
		},

		updatePhases: function(villageID, phase){
			if(phase == '昼') {
				Phases.update({villageID: villageID}, {$set: {phase: phase}, $inc: {day: 1}});
			} else {
				Phases.update({villageID: villageID}, {$set: {phase: phase, revote: 5}});
			}
		},
		
		updateRevote: function(villageID){
			Phases.update({villageID: villageID}, {$inc: {revote: -1}});
		},
		
		removePhases: function(villageID){
			Phases.remove({villageID: villageID});
		},
	};
};

phasesModel = new PhasesModel();
