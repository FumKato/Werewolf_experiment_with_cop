VillageInformationView = function() {
	var generateRoleBreakdown = function(roleName, data) {
		if(data <= 0) return '';
		return roleName + ':' + data + ' ';
	};
	
	return {
		renderVillageInformation : function(village) {
			$("#villageNumber").html(village.number + '番地');
			$(".villageNameBody").html(village.settings.villageName);
			var roleset = village.settings.roleset+'配役';
			if(village.settings.wizard && new RoleSet().checkWizard(village.settings)){
				roleset = '[術]' + roleset;
			}
			if(village.settings.quota >= 10){
				if(village.settings.cat) roleset = '[猫]' + roleset;
				if(village.settings.girl) roleset = roleset + '[女]';
			}
			roleset = '<a class="rolesetName" href="/rolesets/roleset.html" target="_blank">' + roleset + '</a>';
			$("#roleset").html(roleset);
		},
		
		updateParticipantsNumber : function(quota, participantsNumber) {
			$("#participantsNumber").html(participantsNumber + '/' + quota);
		},
		
		renderPhaseInformation : function(phase) {
			var phaseIcon = '';
			$(".day").html(phase.day);
			$("#phase").html(phase.phase);
		
			switch(phase.phase) {
				case '事件前':
				case '事件終了':
			  		phaseIcon = "star";
			  		break;
				case '昼':
				case '夕方':
			  		phaseIcon = "sun";
			  		break;
				case '夜':
				case '明け方':
			  		phaseIcon = "moon";
			  		break;
			}
			$("#phase").removeClass();
			$("#phase").addClass(phaseIcon);
		},
		
		renderVillageOptionInformation: function(village){
			if(village == null) return;
			var settings = village.settings;
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
			$('#villageOptionInformation').html(sentence);
			$('#villageOptionInformation').fadeIn('fast');
		},
		
		flushVillageOptionInformation: function(){
			$('#villageOptionInformation').fadeOut('fast');
		},
		
		renderRolesetOptionInformation: function(roles){
			var $rolesetOptionInformation = $("div#rolesetOptionInformation");
			$rolesetOptionInformation.fadeIn('fast');
			var sentence = '';
			sentence += generateRoleBreakdown('村', roles.villager);
			sentence += generateRoleBreakdown('狼', roles.wolf);
			sentence += generateRoleBreakdown('占', roles.seer);
			sentence += generateRoleBreakdown('狂', roles.fanatic);
			sentence += generateRoleBreakdown('霊', roles.medium);
			sentence += generateRoleBreakdown('狩', roles.hunter);
			sentence += generateRoleBreakdown('共', roles.mason);
			sentence += generateRoleBreakdown('狐', roles.fox);
			sentence += generateRoleBreakdown('猫', roles.cat);
			sentence += generateRoleBreakdown('女', roles.girl);
			sentence += generateRoleBreakdown('術', roles.wizard);
			$rolesetOptionInformation.html(sentence);
		},
		
		flushRolesetOptionInformation: function(){
			var $rolesetOptionInformation = $("div#rolesetOptionInformation");
			$rolesetOptionInformation.fadeOut('fast');
		},
	};
};
