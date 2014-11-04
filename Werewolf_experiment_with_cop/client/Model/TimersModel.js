TimersModel = function(){
	return{
		getTimers:function(villageID){
			return Timers.findOne({villageID: villageID});
		}
	};
};

timersModel = new TimersModel();
