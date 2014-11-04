Meteor.methods({
	setAccesses: function(){
		accessesModel.setAccesses();
		return accessesModel.getAccesses();
	}
});
