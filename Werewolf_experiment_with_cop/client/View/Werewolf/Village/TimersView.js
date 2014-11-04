TimersView = function(){
	return{
		render: function(timer, phase, village){
			if(timer != null) {
				$("div#remainingTime").html(timer.remain);
				
				var daytimeFlag = phase.phase == '昼' && timer.remain > (village.settings.daytime - Session.get('timerOptions').silenceRule);
				var dawnFlag = phase.phase == '明け方' && Session.get('timerOptions').actionSkip && timer.remain > village.settings.dawn / 2;
				var girlFlag = phase.phase == '明け方' && village.settings.quota >= 10 && village.settings.girl && timer.remain > village.settings.dawn / 2;
				if(daytimeFlag || dawnFlag || girlFlag) {
					$('div#remainingTime').addClass('limited');
				} else {
					$('div#remainingTime').removeClass('limited');
				}
			}
		}
	};
};

timersView = new TimersView();
