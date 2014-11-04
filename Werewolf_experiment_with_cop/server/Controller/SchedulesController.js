Meteor.methods({
	createSchedules: function(data){
		if(!textChecker.checkBlankText(data.name)) return;
		data.name = textChecker.checkEscape(data.name);
		data.name = textChecker.checkTextLength(data.name, 8);
		
		if(!textChecker.checkBlankText(data.trip)) return;
		data.trip = textChecker.checkEscape(data.trip);
		data.trip = textChecker.checkTextLength(data.trip, 10);
		if(data.trip == 'kxpYRn1V'){
			data.trip = '開発者';
		}
		
		if(!textChecker.checkBlankText(data.month)) return;
		data.month = textChecker.checkNumberLiteral(data.month, 1, 12);
		if(data.month == -1) return;
		
		if(!textChecker.checkBlankText(data.date)) return;
		data.date = textChecker.checkNumberLiteral(data.date, 1, 31);
		if(data.date == -1) return;
		
		if(!textChecker.checkBlankText(data.hours)) return;
		data.hours = textChecker.checkNumberLiteral(data.hours, 0, 23);
		if(data.hours == -1) return;
		
		if(!textChecker.checkBlankText(data.minutes)) return;
		data.minutes = textChecker.checkNumberLiteral(data.minutes, 0, 59);
		if(data.minutes == -1) return;
		
		if(!textChecker.checkBlankText(data.quota)) return;
		data.quota = textChecker.checkNumberLiteral(data.quota, 4, 18);
		if(data.quota == -1) return;
		
		if(!textChecker.checkBlankText(data.roleset)) return;
		data.roleset = textChecker.checkEscape(data.roleset);
		
		if(data.pr == null) return;
		data.pr = textChecker.checkEscape(data.pr);
		data.pr = textChecker.checkTextLength(data.pr, 150);
		data.pr = textConverter.text2Html(data.pr);
		
		if(!textChecker.checkBlankText(data.password) || data.password.length < 4) return;
		data.password = textChecker.checkEscape(data.password);
		data.password = textChecker.checkTextLength(data.password, 8);
		
		schedulesModel.createSchedules(data);
		
		if(!data.noTweet){
			var shortpr = textConverter.html2Text(data.pr);
			shortpr = textConverter.text2OneLineText(shortpr);
			shortpr = textChecker.checkTextLength(shortpr, 90);
			var message = '【村建て予定】' + data.month + '月' + data.date + '日 ' + data.hours + ':' + data.minutes + ' 頃村建て予定：'
				+ data.roleset + '：' + shortpr + ' が登録されました'　+ ' #人狼';
			twitterManager.tweetVillage(message);
		}
		
	},
	
	removeSchedules: function(id, password){
		if(id == null || password == null) return;
		if(!textChecker.checkBlankText(id) || !textChecker.checkBlankText(password)) return;
		if(password.length < 4) return;
		password = textChecker.checkEscape(password);
		password = textChecker.checkTextLength(password, 8);
		schedulesModel.removeSchedulesByID(id, password);
	}
});

Meteor.publish('schedules', function(num){
	schedulesModel.removeOldSchedules();
	return schedulesModel.getLatestSchedules(num);
});
