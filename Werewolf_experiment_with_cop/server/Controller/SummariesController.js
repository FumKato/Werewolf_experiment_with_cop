Meteor.publish('summaries', function(villageID){
	return summariesModel.getSummariesByVillageID(villageID);
});
