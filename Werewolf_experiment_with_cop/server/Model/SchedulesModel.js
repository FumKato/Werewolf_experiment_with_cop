SchedulesModel = function(){
	return {
		createSchedules: function(data){
			Schedules.insert({
				name: data.name,
				trip: data.trip,
				month: data.month - 0,
				date: data.date - 0,
				hours: data.hours,
				minutes: data.minutes,
				quota: data.quota,
				roleset: data.roleset,
				pr: data.pr,
				password: data.password
			});
		},
		
		removeSchedulesByID: function(id, password){
			Schedules.remove({_id: id, password: password});
		},
		
		removeOldSchedules: function(){
			var date = new Date();
			var border = {
				month: date.getMonth() + 1,
				date: date.getDate()
			};
			Schedules.remove({
				$or: [
					{
						month: {$lt: border.month}
					},
					{
						month: border.month,
						date: {$lt: border.date}
					}
				]
			});
		},
		
		getLatestSchedules: function(num){
			return Schedules.find(
				{},
				{
					limit: num,
					sort: {
						month: 1,
						date: 1,
						hours: 1,
						minutes: 1
					},
					fields: {
						password: 0
					}
				});
		}
	};
};

schedulesModel = new SchedulesModel();
