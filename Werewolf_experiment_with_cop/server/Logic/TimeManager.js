TimeManager = function(villageID) {
	var phase = 'night';
	var endClock = 500;
	
	var arrangePlayers = function(players) {
		var rnd, i;
		for(i=0; i<players.length; i++){
			rnd = Math.floor(Math.random() * 100);
			playersModel.setPlayersNumber(players[i]._id, rnd);
		}
	};
	
	var killVillage = function(villageID) {
		villagesModel.removeVillages(villageID);
		playersModel.removePlayersByVillageID(villageID);
		chatLogsModel.removeChatLogs(villageID);
		rolesModel.removeRolesByVillageID(villageID);
		ticketsModel.removeTicketsByVillageID(villageID);
		phasesModel.removePhases(villageID);
		timersModel.removeTimers(villageID);
		summariesModel.removeSummariesByVillageID(villageID);
		if(villagesModel.checkUnfinishedVillages()){
			new LogGenerator().generateLogFile();
		}
	};
	
	var day2afternoon = function(villageID) {
		var result = gameManager.judge(villageID);
		 if(!result){
			var tmpPhase = phasesModel.getPhasesByVillageID(villageID);
			chatLogsModel.createSystemChatLogs(villageID, tmpPhase, '日が暮れようとしています。<br>投票メニューから投票を行ってください。');
		 	phase = 'afternoon';
		    phasesModel.updatePhases(villageID, '夕方');
		    return villagesModel.getVillages(villageID).settings.afternoon;
		 } else {
		 	phase = 'end';
		 	phasesModel.updatePhases(villageID, '事件終了');
		 	clock = endClock;
		 	return clock;
		 }
	};
	   
	var afternoon2night = function(villageID) {
		 var result = gameManager.generateVoteResult(villageID);
		 if(result){
		 	result = gameManager.judge(villageID);
		 	if(!result) {
		 		phase = 'night';
		 		phasesModel.updatePhases(villageID, '夜');
		 		var tmpPhase = phasesModel.getPhasesByVillageID(villageID);
		 		chatLogsModel.createSystemChatLogs(villageID, tmpPhase, '夜になりました。');
		 		return villagesModel.getVillages(villageID).settings.night;
		 	} else {
		 		phase = 'end';
		 		phasesModel.updatePhases(villageID, '事件終了');
		 		clock = endClock;
		 		return clock;
		 	}
		 } else {
		 	phasesModel.updateRevote(villageID);
		 	result = gameManager.judge(villageID);
		 	if(!result){
		 		var tmpPhase = phasesModel.getPhasesByVillageID(villageID);
		 		var message = '再投票となりました。<br>あと' + tmpPhase.revote + '回以内に決まらない場合、引き分けとなります';
		 		chatLogsModel.createSystemChatLogs(villageID, tmpPhase, message);
		 		message = '<b>＊＊＊必ず再度、投票を行ってください＊＊＊</b><br>投票を行わないと、突然死となります';
		 		chatLogsModel.createSystemChatLogs(villageID, tmpPhase, message);
		 		return villagesModel.getVillages(villageID).settings.afternoon;
		 	} else {
		 		phase = 'end';
		 		phasesModel.updatePhases(villageID, '事件終了');
		 		clock = endClock;
		 		return clock;
		 	}
		 }
	};
	   
	var night2dawn = function(villageID) {
		 var result = gameManager.judge(villageID);
		 if(!result){
		 	phase = 'dawn';
		 	phasesModel.updatePhases(villageID, '明け方');
		 	var tmpPhase = phasesModel.getPhasesByVillageID(villageID);
		 	chatLogsModel.createSystemChatLogs(villageID, tmpPhase, '夜が明けようとしています。<br>能力者は能力を実行してください。');
		 	return villagesModel.getVillages(villageID).settings.dawn;
		 } else {
		 	phase = 'end';
		 	phasesModel.updatePhases(villageID, '事件終了');
		 	clock = endClock;
		 	return clock;
		 }
	};
	   
	var dawn2day = function(villageID) {
		gameManager.executeActions(villageID);
		var result = gameManager.judge(villageID);
		 if(!result){
		 	phase = 'day';
		 	phasesModel.updatePhases(villageID, '昼');
		 	playersModel.resetLogCount(villageID);
		 	var tmpPhase = phasesModel.getPhasesByVillageID(villageID);
		 	chatLogsModel.createSystemChatLogs(villageID, tmpPhase, '夜が明けました。');
		 	return villagesModel.getVillages(villageID).settings.daytime;
		 } else {
		 	phase = 'end';
		 	phasesModel.updatePhases(villageID, '事件終了');
		 	clock = endClock;
		 	return clock;
		 }
	};
	
	var end = function(villageID) {
		playersModel.removeNonPlayersByVillageID(villageID);
		chatLogsModel.removeDummyChatLogs(villageID);
		ticketsModel.removeTicketsByVillageID(villageID);
		gameManager.executeReport(villageID);
		summariesModel.removeSummariesByVillageID(villageID);
		villagesModel.finishVillages(villageID);
		var players = playersModel.getPlayers(villageID);
		var i = 0;
		var trips = new Array();
		for(i; i<players.length; i++){
			if(players[i].tripKey == 'shonich＊' || players[i].tripKey == 'トリなし') continue;
			trips.unshift(players[i].tripKey);
		}
		tripsModel.updateTripsRecord(trips);
		if(villagesModel.checkUnfinishedVillages()){
			try{
				new LogGenerator().generateLogFile();
			}catch(e){
				console.log(e);
			}
		}
	};
	
	return {
		startTimer : function(villageID) {
			var clock = 60;
			var intervalID = Meteor.setInterval( function() {
				var timer = timersModel.getTimers(villageID).fetch()[0];
				clock--;
				if(clock < 0 || timer.kill) {
					Meteor.clearInterval(intervalID);
					killVillage(villageID);
				}
				if(timer.extend) {
					clock = timer.remain;
					timersModel.updateExtend(villageID, false);
				}
				if(timer.skip) {
					var phase = phasesModel.getPhasesByVillageID(villageID);
					if(phase != null && phase.phase == '事件前') {
						chatLogsModel.createSystemChatLogs(villageID, phase, '間もなくゲームが始まります');
						Meteor.clearInterval(intervalID);
						new TimeManager().startGame(villageID);
					} 
					clock = timer.remain;
					timersModel.updateSkip(villageID, false);
				}
				timersModel.updateTimers(villageID, clock);
			}, 1000);
		},
		
		extendTimer: function(villageID) {
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var timer = timersModel.getTimers(villageID).fetch()[0];
			var village = villagesModel.getVillages(villageID);
			if(phase == null || timer == null || village == null) return;
			switch(phase.phase) {
				case '事件前' :
				  if(timer.remain <= 300 && timer.remain >= 5) {
				  	timersModel.updateTimers(villageID, 900);
				    timersModel.updateExtend(villageID, true);
				  }
				  break;
				case '夕方' :
				  if(timer.remain <= 60 && timer.remain >= 5){
				  	timersModel.updateTimers(villageID, village.settings.afternoon);
				    timersModel.updateExtend(villageID, true);
				  }
				  break;
				case '明け方' :
				  if(timer.remain <= 60 && timer.remain >= 5){
				  	timersModel.updateTimers(villageID, village.settings.dawn);
				    timersModel.updateExtend(villageID, true);
				  }
				  break;
				case '事件終了':
				  if(timer.remain <= 300 && timer.remain >= 5){
				  	timersModel.updateTimers(villageID, timer.remain + 200);
				    timersModel.updateExtend(villageID, true);
				  }
				  break;
			}
		},
		
		skipTimer : function(villageID) {
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var village = villagesModel.getVillages(villageID);
			var timer = timersModel.getTimers(villageID).fetch()[0];
			if(phase == null) return;
			switch(phase.phase) {
				case '事件前' :
				  timersModel.updateSkip(villageID, true);
				  return true;
				case '昼':
				case '夕方' :
				case '夜':
				case '明け方' :
				  if(timer.remain >= 5){
				  	timersModel.updateTimers(villageID, 4);
				  	timersModel.updateSkip(villageID, true);
				  	return true;
				  }
				  return false;
			}
		},
		
		killTimer: function(villageID){
			timersModel.updateTimers(villageID, 1);
			timersModel.updateKill(villageID, true);
			return;
		},
		
		startGame : function(villageID) {
		  var roles = new RoleSet().createRoles(villageID);
		  if(roles == null) return;
		  new RoleSet().setRoles(villageID, roles);
		  
		  playersModel.resetLogCount(villageID);
		  var village = villagesModel.getVillages(villageID);
		  var players = playersModel.getPlayers(villageID);
		  if(village.settings.randomCN) {
		  	new CnManager().setRandomCN(villageID, village.settings.iconset, players);
		  }
		  arrangePlayers(players);
		  phasesModel.updatePhases(villageID, '夜');
		  villagesModel.startVillages(villageID);
		  var clock = villagesModel.getVillages(villageID).settings.night;
		  var tmpPhase = phasesModel.getPhasesByVillageID(villageID);
		  
		  chatLogsModel.createSystemChatLogs(villageID, tmpPhase, '夜になりました。<br>配役の内訳は画面上部の人数・配役欄にポインタをのせることで確認できます。');
		  var intervalID = Meteor.setInterval( function () {
		  	var timer = timersModel.getTimers(villageID).fetch()[0];
	        clock--;
	        if(clock < 0) {
	          switch(phase) {
	          	case 'day': clock = day2afternoon(villageID);break;
	          	case 'afternoon': clock = afternoon2night(villageID);break;
	          	case 'night': clock = night2dawn(villageID);break;
	          	case 'dawn' : clock = dawn2day(villageID);break;
	          	case 'end' : end(villageID);Meteor.clearInterval(intervalID);clock=0;break;
	          }
	        }
	        if(timer.extend || timer.skip) {
					clock = timer.remain;
					timersModel.updateExtend(villageID, false);
					timersModel.updateSkip(villageID, false);
			}
	        timersModel.updateTimers(villageID, clock);
	      }, 1000);
	   }
	};
};
