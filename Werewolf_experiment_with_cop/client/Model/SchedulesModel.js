SchedulesModel = function(){
	return {
		getSchedules : function(){
			return Schedules.find(
				{},
				{
					sort: {
						month: 1,
						date: 1,
						hours: 1,
						minutes: 1
					}
				}
			);
		}
	};
};
