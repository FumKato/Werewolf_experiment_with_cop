Meteor.publish('phases', function(villageID) {
	if(villageID != null) {
		return Phases.find({villageID: villageID});
	} else {
		return Phases.find({});
	}
});
