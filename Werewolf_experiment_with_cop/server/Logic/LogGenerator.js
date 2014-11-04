LogGenerator = function(){
	//var basePath = '/Users/FumKATO/Jinro/Werewolf/public/logs/'; //for local execution
	var basePath = '/home/meteora/bundle/programs/web.browser/app/logs/';
	var htmlHeadBase = '<html><title>汝は人狼なりや？@めておら鯖〜';
	var styleStatement = '</title><head><link rel="stylesheet" type="text/css" href="LogVillage.css">' +
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> ' +
		'<script type="text/javascript" src="jquery-1.11.1.min.js"></script>' +
		'<script type="text/javascript" src="logsController.js"></script></head><body><div id="village">';
	styleStatement += '<div class="hiddenImage"><img src="../images/bg_y01.jpg"><img src="../images/head004_06.gif">' +
		'<img src="../images/btn055_05.gif"></div>';
	var villageInformationBase = '<div id="villageInformation">';
	
	var renderVillageInformation = function(fs, path, village){
		var villageInformation = '<div id="villageBaseInformation"><div id="villageNumber">' +
			village.number + '番地</div><div id="villageName"><span class="villageNameBody">' +
			village.settings.villageName + '</span>村</div></div>';
		fs.appendFileSync(path, villageInformation);
		
		var rolesetInformation = '<div id="rolesetBaseInformation"><div id="roleset">';
		if(village.settings.wizard && new RoleSet().checkWizard(village.settings)){
			rolesetInformation += '[術]';
		}
		if(village.settings.quota >= 10 && village.settings.cat){
			rolesetInformation += '[猫]';
		}
		rolesetInformation += village.settings.roleset + '配役';
		if(village.settings.quota >= 10 && village.settings.girl){
			rolesetInformation += '[女]';
		} 
		rolesetInformation += '</div><div id="participantsNumber">' +
		playersModel.getLivingPlayers(village._id).length + '/' + village.settings.quota + '</div></div>';
		rolesetInformation += '<div id="rolesetOptionInformation">';
		var roles = new RoleSet().createRoleBreakdown(village._id);
		var generateRoleBreakdown = function(roleName, data) {
			if(data <= 0) return '';
			return roleName + ':' + data + ' ';
		};
		rolesetInformation += generateRoleBreakdown('村', roles.villager);
		rolesetInformation += generateRoleBreakdown('狼', roles.wolf);
		rolesetInformation += generateRoleBreakdown('占', roles.seer);
		rolesetInformation += generateRoleBreakdown('狂', roles.fanatic);
		rolesetInformation += generateRoleBreakdown('霊', roles.medium);
		rolesetInformation += generateRoleBreakdown('狩', roles.hunter);
		rolesetInformation += generateRoleBreakdown('共', roles.mason);
		rolesetInformation += generateRoleBreakdown('狐', roles.fox);
		rolesetInformation += generateRoleBreakdown('猫', roles.cat);
		rolesetInformation += generateRoleBreakdown('女', roles.girl);
		rolesetInformation += generateRoleBreakdown('術', roles.wizard);
		rolesetInformation += '</div>';
		fs.appendFileSync(path, rolesetInformation);
	};
	
	var renderPlayerList = function(fs, path, village){
		var playerList = '<div id="rightSideContents"><div id="villageOptionInformation">';
		var settings = village.settings;
		playerList += '昼/夕/夜/明:' + settings.daytime + '/' + settings.afternoon + '/' + settings.night + '/' + settings.dawn;
		if(settings.GM) {
			playerList += '　GM制';
		}
		if(settings.tripLimit) {
			playerList += '　トリップ' + settings.recordLimit + '戦以上';
		}
		if(settings.randomCN) {
			playerList += '　ランダムCN(' + settings.iconset + ')';
		}
		if(settings.hideRole){
			playerList += '　霊界表示無し';
		}
		if(settings.audienceUtter) {
				playerList += '　観戦者発言';
		}
		if(settings.silenceRule > 0) {
			playerList += '　' + settings.silenceRule + '秒ルール';
		}
		if(settings.listSort) {
			playerList += '　生存者ソート';
		}
		if(settings.voteSkip) {
			playerList += '　投票時間非固定';
		}
		if(settings.actionSkip) {
			playerList += '　役職時間非固定';
		}
		playerList += '</div><div id="playerList">';
		if(settings.GM){
			var gm = playersModel.getGM(village._id);
			playerList += '<div class="gmPlayerListItem">';
			playerList += '<img class="playerIcon" src="../icon/' + gm.icon + '.png" />';
			playerList += '<div class="characterName">' + gm.characterName + '</div>';
			playerList += '<div class="handleName">' + gm.handleName + '</div>';
			playerList += '<div class="gmColorIcon ' + gm.color + 'Border"></div><div class="tripKey">◆' + gm.tripKey + '</div>';
			playerList += '<div class="role">[<span class="wolfOrGM">G　M</span>]</div></div>';
		}
		var players = playersModel.getPlayers(village._id);
		var i;
		for(i=0;i<players.length;i++){
			if(players[i].state == '死　亡') {
				playerList += '<div class="deadPlayerList">';
			} else {
				playerList += '<div class="playerListItem">';
			}
			playerList += '<img class="playerIcon" src="../icon/' + players[i].icon + '.png" />';
			playerList += '<div class="characterName ' + players[i].color + 'Border">' + players[i].characterName + '</div>';
			playerList += '<div class="handleName">' + players[i].handleName + '</div><div class="tripKey">◆' + players[i].tripKey + '</div>';
			playerList += '<div class="state">[' + players[i].state + ']</div>';
			playerList += '<div class="role">';
			var role = rolesModel.getRolesByPlayerID(players[i]._id).fetch()[0];
			switch(role.roleName) {
				case '人　狼':
					playerList += '[<span class="wolfOrGM">' + role.roleName + '</span>]';break;
				case '占い師':
					playerList += '[<span class="seer">' + role.roleName + '</span>]';break;
				case '霊能者':
					playerList += '[<span class="medium">' + role.roleName + '</span>]';break;
				case '狂　人':
					playerList += '[<span class="fanatic">' + role.roleName + '</span>]';break;
				case '共有者':
					playerList += '[<span class="mason">' + role.roleName + '</span>]';break;
				case '狩　人':
					playerList += '[<span class="hunter">' + role.roleName + '</span>]';break;
				case '猫　又':
					playerList += '[<span class="cat">' + role.roleName + '</span>]';break;
				case '少　女':
					playerList += '[<span class="girl">' + role.roleName + '</span>]';break;
				case '妖　狐':
					playerList += '[<span class="fox">' + role.roleName + '</span>]';break;
				case '妖術師':
					playerList += '[<span class="fanatic">' + role.roleName + '</span>]';break;
				default:
					playerList += '[' + role.roleName + ']';break;
			}
			playerList += '</div></div>';
		}
		
		playerList += '</div></div>';
		fs.appendFileSync(path, playerList);
	};
	
	var renderLogSelector = function(fs, path, village){
		try{
			var phase = phasesModel.getPhasesByVillageID(village._id);
			var selectors = '<div id="logSelector"><div class="logSelectorItem" id="before">事件前</div>';
			var i = 1;
			for(i = 1; i<=phase.day; i++){
				selectors += '<div class="logSelectorItem" id="' + i + '">' + i + '日目</div>';
			}
			selectors += '<div class="logSelectorItem" id="after">事件終了</div><div class="logSelectorItem" id="all">ALL</div></div>';
			selectors += '<div id="subSelector"><div class="subSelectorLabel">逆順表示:</div><div class="subSelectorItem" id="reverse">OFF</div></div>';
			fs.appendFileSync(path, selectors);
		}catch(e){
			console.log('errored-villageID: ' + village._id);
			throw e;
		}
	};
	
	var renderChatLogs = function(fs, path, village){
		var chatLogs = chatLogsModel.getChatLogsByVillageID(village._id);
		var getSelectorClasses = function(chatLog){
			var selectorClasses = '';
			switch(chatLog.phase) {
				case '事件前':
					selectorClasses += 'beforePhase';
					break;
				case '昼':
				case '夕方':
					selectorClasses += 'daytimePhase';
					break;
				case '夜':
				case '明け方':
					selectorClasses += 'nightPhase';
					break;
				case '事件終了':
					selectorClasses += 'afterPhase';
					break;
			}
			if(chatLog.phase != '事件前' && chatLog.phase != '事件終了'){
				selectorClasses += ' ' + chatLog.day;
			}
			selectorClasses += ' ' + chatLog.playerID + ' ';
			return selectorClasses;
		};
		var chat = '<div id="chatLog"><table id="log" onselectstart="return false;">';
		chat += '<tr><th class="logNameHeader"> </th><th class="logSentenceHeader"> </th></tr>';
		fs.appendFileSync(path, chat);
		var i;
		for(i=0; i<chatLogs.length; i++){
			chat = '<tr><td class="logName ' + chatLogs[i].color + 'Icon ';
			chat += getSelectorClasses(chatLogs[i]);
			if(chatLogs[i].type == 'ghost'){
				chat += 'ghostChatLog';
			} else if(chatLogs[i].type == 'audience') {
				chat += 'audienceChatLog';
			} else if(chatLogs[i].phase == '夜'){
				chat += 'night';
			} else if(chatLogs[i].phase == '夕方'){
				chat += 'afternoon';
			}  else if(chatLogs[i].phase == '明け方'){
				chat += 'dawn';
			}
			chat += '"><div class="logElement">' + chatLogs[i].name + '</div></td><td class="logSentence noColorIcon ';
			chat += getSelectorClasses(chatLogs[i]);
			if(chatLogs[i].type == 'ghost'){
				chat += 'ghostChatLog';
			} else if(chatLogs[i].type == 'audience') {
				chat += 'audienceChatLog';
			} else if(chatLogs[i].phase == '夜'){
				chat += 'night';
			} else if(chatLogs[i].phase == '夕方'){
				chat += 'afternoon';
			} else if(chatLogs[i].phase == '明け方'){
				chat += 'dawn';
			}
			chat += '"><div class="logElement">' + chatLogs[i].sentence + '</div></td></tr>';
			fs.appendFileSync(path, chat);
		}
		chat = '</table></div>';
		fs.appendFileSync(path, chat);
	};
	
	return {
		generateLogFile: function(){
			try{
				var villages = villagesModel.getUnloggedVillages();
				if(villages == null || villages.length == 0) return;
				var i = 0;
				var fs = Npm.require('fs');
				for(i; i<villages.length; i++){
					if(phasesModel.getPhasesByVillageID(villages[i]._id) == null || chatLogsModel.getChatLogsByVillageID(villages[i]._id) == 0 || playersModel.getPlayers(villages[i]._id).length == 0){
						villagesModel.logVillages(villages[i]._id);
						continue;
					}
					villagesModel.setLogVillageNumber(villages[i]._id);
					var village = villagesModel.getVillages(villages[i]._id);
					var path = basePath + 'log_' + village.number + '.html';
					var htmlHead = htmlHeadBase + village.number + '番地 ' + village.settings.villageName + '村〜</title>';
					fs.writeFileSync(path, htmlHead);
					fs.appendFileSync(path, styleStatement);
					renderVillageInformation(fs, path, village);
					renderPlayerList(fs, path, village);
					renderLogSelector(fs, path, village);
					renderChatLogs(fs, path, village);
					fs.appendFileSync(path, '</div></body></html>');
				
					chatLogsModel.removeChatLogs(village._id);
					actionsModel.removeActionsByVillageID(village._id);
					phasesModel.removePhases(village._id);
					playersModel.loggingPlayers(village._id);
					rolesModel.removeRolesByVillageID(village._id);
					timersModel.removeTimers(village._id);
					villagesModel.logVillages(villages[i]._id);
				}
			}catch(e){
				throw e;
			}
		}
	};
};
