$(function(){
	$('input[name=executeVillageScheduleCreation]').click(function(){
		$(this).attr('disabled', true);
		var textChecker = new TextChecker();
		var plainName = $('input[name=villageScheduleName]').val();
		if(!textChecker.checkBlankText(plainName)){
			alert('登録者名を入力してください');
			$(this).removeAttr('disabled');
			return;
		}
		plainName = new TripGenerator().getTrip(plainName);
		
		var password = $('input[name=villageSchedulePassword]').val();
		if(!textChecker.checkBlankText(password)){
			alert('パスワードを入力してください');
			$(this).removeAttr('disabled');
			return;
		} else if(password.length < 4){
			alert('パスワードを4文字以上入力してください');
			$(this).removeAttr('disabled');
			return;
		}
		password = textChecker.checkEscape(password);
		password = textChecker.checkTextLength(password, 8);
		
		var pr = $('#villageSchedulePR').val();
		if(pr == null){
			pr = '';
		}
		pr = textChecker.checkEscape(pr);
		pr = textChecker.checkTextLength(pr, 150);
		
		var month = $('#villageScheduleMonth').val();
		var date = $('#villageScheduleDate').val();
		var hours = $('#villageScheduleHours').val();
		var minutes = $('#villageScheduleMinutes').val();
		var quota = $('#villageScheduleQuota').val();
		var roleset = $('#villageScheduleRoleset').val() + '配役';
		if(quota >= 10 && $('#villageScheduleCat').prop('checked')){
			roleset = '[猫]' + roleset;
		}
		if(quota >= 10 && $('#villageScheduleGirl').prop('checked')){
			roleset = roleset + '[女]';
		}
		var settings = {
			roleset: $('#villageScheduleRoleset').val(),
			quota: quota
		};
		if($('#villageScheduleWizard').prop('checked') && new RoleSet().checkWizard(settings)){
			roleset = '[術]' + roleset;
		}
		var noTweet = $('#villageScheduleNoTweet').prop('checked');
		
		var data = {
			name : plainName[0],
			trip : plainName[1],
			password: password,
			pr: pr,
			month: month,
			date: date,
			hours: hours,
			minutes: minutes,
			quota: quota,
			roleset: roleset,
			pr: pr,
			noTweet: noTweet
		};
		Meteor.call('createSchedules', data, function(error, result){
			Meteor.subscribe('schedules', 10);
		});
		$('input[name=villageScheduleName]').val('');
		$('input[name=villageSchedulePassword]').val('');
		$('#villageSchedulePR').val('');
		new OverlaysView().flush();
	});
});
