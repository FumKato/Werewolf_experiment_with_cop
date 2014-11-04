Meteor.methods({
	referTrips: function(tripKey){
		var result = tripsModel.getTrips(tripKey);
		if(result == null) {
			result = tripsModel.createTrips(tripKey);
		}
		return result;
	}
});
