VillageScheduleOverlayView = function(){
	return {
		render : function(){
			$('#villageScheduleMonth').html('');
			$('#villageScheduleDate').html('');
			var date = new Date();
			var month = date.getMonth() + 1;
			var i = month;
			for(i; i<=month+1; i++){
				if(i >= 13) break;
				$('#villageScheduleMonth').append('<option value=' + i + '>' + i + '月' + '</option>');
			}
			i = new Date().getDate();
			var dateLimit = i + 30;
			for(i; i<dateLimit; i++){
				var dateValue = i;
				switch(month){
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						if(i > 31){
							dateValue = i % 31;
						}
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						if(i > 30){
							dateValue = i % 30;
						}
						break;
					case 2:
						if(i > 28){
							var dateValue = i % 28;
						}
						break;
				}
				$('#villageScheduleDate').append('<option value=' + dateValue + '>' + dateValue + '日' + '</option>');
			}
		}
	};
};
