VillageListView = function(){
	return{
		render:function(){
			$("#villageList").fadeIn('fast');
			$('#villageList').find('input').removeAttr('disabled');
		}
	};
};

Template.VillageList.getVillages = function() {
	var villages = new VillagesModel().getVillagesByFlag(false);
	if(villages.count() == 0) {
		$('#noPrestartVillageMessage').show();
	} else {
		$('#noPrestartVillageMessage').hide();
	}
	return villages;
};

Template.VillageList.getStartedVillages = function() {
	var villages = new VillagesModel().getVillagesByFlag(true);
	if(villages.count() == 0) {
		$('#noStartedVillageMessage').show();
	} else {
		$('#noStartedVillageMessage').hide();
	}
	return villages;
};

Template.VillageList.getSchedules = function(){
	var schedules = new SchedulesModel().getSchedules().fetch();
	if(schedules.length > 0) {
		$('#noVillageScheduleMessage').hide();
	} else {
		$('#noVillageScheduleMessage').show();
	}
	return schedules;
};

Template.VillageList.getMinutes = function(minutes){
	if(minutes == 0) {
		return '00';
	}
	return minutes;
};
