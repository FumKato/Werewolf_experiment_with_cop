Template.VillageListItem.getVillagePhase = function(villageID) {
	var phase = new PhasesModel().getPhases(villageID); 
	if(phase == null) return;
	return phase.day + '日目 ' + phase.phase;
};

Template.VillageListItem.getRoleset = function(settings){
	var roleset = settings.roleset + '配役';
	if(settings.wizard != null && settings.wizard && new RoleSet().checkWizard(settings)){
		roleset = '[術]' + roleset;
	}
	if(settings.quota >= 10){
		if(settings.cat) roleset = '[猫]' + roleset;
		if(settings.girl) roleset = roleset + '[女]';
	}
	return roleset;
};

Template.VillageListItem.getVillageOptions = function(settings) {
	var sentence = '昼/夕/夜/明:' + settings.daytime + '/' + settings.afternoon + '/' + settings.night + '/' + settings.dawn;
	if(settings.GM) {
		sentence += '　GM制';
	}
	if(settings.tripLimit) {
		sentence += '　トリップ' + settings.recordLimit + '戦以上';
	}
	if(settings.randomCN) {
		sentence += '　ランダムCN(' + settings.iconset + ')';
	}
	if(settings.hideRole){
		sentence += '　霊界表示無し';
	}
	if(settings.audienceUtter) {
		sentence += '　観戦者発言';
	}
	if(settings.silenceRule > 0) {
		sentence += '　' + settings.silenceRule + '秒ルール';
	}
	if(settings.listSort) {
		sentence += '　生存者ソート';
	}
	if(settings.voteSkip) {
		sentence += '　投票時間非固定';
	}
	if(settings.actionSkip) {
		sentence += '　役職時間非固定';
	}
	return sentence;
};

Template.VillageListItem.getVillageParticipants = function(villageID, settings, gatheringGM) {
			var phase = new PhasesModel().getPhases(villageID);
			if(phase == null) return;
			var sentence = new PlayersModel().getParticipantsNumber(villageID) + '/' + settings.quota;
			if(gatheringGM && phase.phase == '事件前') {
				sentence = '<div class="gatheringGM">' + sentence + '</div>';
			}
			return sentence;
};
