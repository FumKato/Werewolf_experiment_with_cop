SummariesModel = function(){
	return {
		getSummariesByVillageID: function(villageID){
			return Summaries.find(
				{
					villageID: villageID
				},
				{sort: {day: -1, type: -1}}
			).fetch();
		}
	};
};
