SummariesModel = function(){
	return {
		setSummaries : function(villageID, phase, playerIDs, type){
			Summaries.insert({
				villageID: villageID,
				phase: phase.phase,
				day: phase.day,
				playerIDs: playerIDs,
				type: type
			});
		},
		
		getSummariesByVillageID: function(villageID){
			return Summaries.find({
				villageID: villageID
			});
		},
		
		removeSummariesByVillageID: function(villageID){
			Summaries.remove({villageID: villageID});
		},
		
		updateSummaries: function(villageID, playerIDs, type){
			Summaries.update(
				{
					villageID: villageID,
					type: type
				},
				{$set: {playerIDs: playerIDs}},
				{multi: true}
			);
		},
		
		updatePenaltySummaries: function(villageID, playerIDs){
			var count = Summaries.find({villageID: villageID, type: '突然死'}).count();
			if(count != 0){
				var IDs = Summaries.findOne({villageID: villageID, type: '突然死'}).playerIDs;
				var i = 0;
				for(i; i<playerIDs.length; i++){
					IDs.unshift(playerIDs[i]);
				}
				Summaries.update(
					{
						villageID: villageID,
						type: '突然死'
					},
					{$set: {playerIDs: IDs}}
				);
			} else {
				Summaries.insert({
					villageID: villageID,
					day: 0,
					phase: 'dummyPhase',
					playerIDs: playerIDs,
					type: '突然死'
				});
			}
		}
	};
};

summariesModel = new SummariesModel();
