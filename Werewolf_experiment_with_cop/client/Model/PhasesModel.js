PhasesModel = function(){
	return{
		getPhases : function(villageID){
			return Phases.findOne({villageID: villageID});
		},
		
		getAllPhases: function() {
			return Phases.find({}).fetch();
		}
	};
};

