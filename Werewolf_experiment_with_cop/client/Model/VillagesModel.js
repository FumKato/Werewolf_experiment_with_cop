VillagesModel = function(){
	var textChecker = new TextChecker();
	
	return{
		getVillagesByID: function(villageID){
			return Villages.findOne({_id: villageID});
		},
		updateVillages: function(){
			//TODO
		},
		
		getLoginVillage: function(villageID){
			return Villages.find({_id: villageID});
		},
		
		getVillagesByFlag: function(bool) {
			return Villages.find({isStarted: bool, isFinished: false}, {sort: {number: 1}});
		},
		
		getLogVillages: function(number){
			if(number <= 0){
				return Villages.find(
					{isLogged: true},
					{
						limit: 50,
						sort: {number: -1}
					}
				).fetch();
			}
			return Villages.find(
				{
					number: {$lt: number},
					isLogged: true
				},
				{
					limit: 50,
					sort: {number: -1}
				}
			).fetch();
		},
		
		createVillages:function(data, callback){
			data.villageName = textChecker.checkEscape(data.villageName);
			data.villageName = textChecker.checkTextLength(data.villageName, 15);
			
			data.villagePR = textChecker.checkEscape(data.villagePR);
			data.villagePR = textChecker.checkTextLength(data.villagePR, 30);
			
			data.daytime = textChecker.checkNumberLiteral(data.daytime, 10, 600);
			if(data.daytime == -1) {
				alert('昼の時間: 不正な入力です');
				return null;
			}
			
			data.afternoon = textChecker.checkNumberLiteral(data.afternoon, 10, 300);
			if(data.afternoon == -1) {
				alert('投票時間: 不正な入力です');
				return null;
			}
			
			data.night = textChecker.checkNumberLiteral(data.night, 10, 600);
			if(data.night == -1) {
				alert('夜の時間: 不正な入力です');
				return null;
			}
			
			data.dawn = textChecker.checkNumberLiteral(data.dawn, 10, 300);
			if(data.dawn == -1) {
				alert('役職時間: 不正な入力です');
				return null;
			}
			
			data.recordLimit = textChecker.checkNumberLiteral(data.recordLimit, 0, 1000);
			if(data.recordLimit == -1) {
				alert('戦績: 不正な入力です');
				return null;
			}
			
			data.silenceRule = textChecker.checkNumberLiteral(data.silenceRule, 0, 30);
			if(data.silenceRule == -1) {
				alert('○秒ルール: 不正な入力です');
				return null;
			}
			
			Meteor.call('createVillage', data, Cookie.get('ticket'), callback);
		}
	};
};
