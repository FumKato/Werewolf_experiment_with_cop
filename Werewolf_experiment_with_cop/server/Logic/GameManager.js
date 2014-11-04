GameManager = function(){
	return {
		executeActions: function(villageID){
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var killTarget = null;
			var messages = new Array();
			var playerIDs = new Array();
			var penaltyIDs = new Array();
			if(phase.day == 1) {
				killTarget = {
					to: playersModel.getVictim(villageID)._id
				};
			} else {
				killTarget = actionsModel.getActionsByType(villageID, phase, 'wolf')[0];
			}
			if(killTarget == null) {
				var wolves = rolesModel.getRolesByRoleName(villageID, '人　狼').fetch();
				var rnd = Math.floor(Math.random() * wolves.length);
				while(true){
					var player = playersModel.getPlayersByID(wolves[rnd].playerID);
					var killTarget = {
						to: wolves[rnd].playerID
					};
					if(player.state == '生　存'){
						break;
					} else {
						wolves.splice(rnd, 1);
					}
					rnd = Math.floor(Math.random() * wolves.length);
				}
				playersModel.killPlayers(killTarget.to);
				messages.unshift('<b>' + player.characterName + '</b> は突然死しました...');
				penaltyIDs.unshift(killTarget.to);
			} else {
				var role = rolesModel.getRolesByPlayerID(killTarget.to).fetch()[0];
				var guard = actionsModel.getActionsByType(villageID, phase, 'guard')[0];
				var isGuarded = guard != null && guard.to == killTarget.to;
				
				if(role.roleName != '妖　狐' && !isGuarded){
					var player = playersModel.getPlayersByID(killTarget.to);
					playersModel.killPlayers(killTarget.to);
					messages.unshift('<b>' + player.characterName + '</b> は無惨な姿で発見された...');
					playerIDs.unshift(killTarget.to);
					
					if(role.roleName == '猫　又'){
						var wolves = rolesModel.getRolesByRoleName(villageID, '人　狼').fetch();
						var rnd = Math.floor(Math.random() * wolves.length);
						while(true){
							var player = playersModel.getPlayersByID(wolves[rnd].playerID);
							killTarget = {
								to: wolves[rnd].playerID
							};
							if(player.state == '生　存'){
								break;
							} else {
								wolves.splice(rnd, 1);
							}
							rnd = Math.floor(Math.random() * wolves.length);
						}
						playersModel.killPlayers(killTarget.to);
						messages.unshift('<b>' + player.characterName + '</b> は無惨な姿で発見された...');
						playerIDs.unshift(killTarget.to);
					}
				}
			}
			var seerTargets = actionsModel.getActionsByType(villageID, phase, 'seer');
			var foxes = rolesModel.getRolesByRoleName(villageID, '妖　狐').fetch();
			if(seerTargets.length != 0 && foxes.length != 0){
				var i = 0;
				for(i;i<seerTargets.length; i++){
					var j = foxes.length - 1;
					for(j;j>=0;j--){
						var player = playersModel.getPlayersByID(foxes[j].playerID);
						if(seerTargets[i].to == foxes[j].playerID && player.state == '生　存'){
							playersModel.killPlayers(player._id);
							messages.unshift('<b>' + player.characterName + '</b> は無惨な姿で発見された...');
							playerIDs.unshift(player._id);
							foxes.splice(j, 1);
						}
					}
				}
			}
			
			var messagePhase = {
				day: phase.day + 1,
				phase: '昼'
			};
			while(messages.length > 0){
				var rnd = Math.floor(Math.random() * messages.length);
				chatLogsModel.createSystemChatLogs(villageID, messagePhase, messages[rnd]);
				messages.splice(rnd, 1);
			}
			if(penaltyIDs.length > 0){
				summariesModel.updatePenaltySummaries(villageID, penaltyIDs);
			}
			summariesModel.setSummaries(villageID, phase, playerIDs, '襲撃');
		},
		
		generateVoteResult: function(villageID){
			//return true if one victim is decided;
			//(return false if two or more players get votes the most;(revote is occured))
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var players = playersModel.getLivingPlayers(villageID);
			var i = 0;
			var message = phase.day + '日目(' + ((phase.revote - 6) * -1) + '回目) 投票結果:';
			var decide = false;
			var penalty = false;
			var max = {
				player : null,
				got: 0
			};
			var playerIDs = new Array();
			var penaltyIDs = new Array();
			
			for(i; i<players.length; i++){
				var existence = actionsModel.getActionsByPlayerID(villageID, phase, players[i]._id).fetch();
				if(existence.length == 0){
					playersModel.killPlayers(players[i]._id);
					var sentence = players[i].characterName + ' は突然死しました';
					chatLogsModel.createSystemChatLogs(villageID, phase, sentence);
					penalty = true;
					penaltyIDs.unshift(players[i]._id);
					continue;
				}
				
				var got = actionsModel.getActionsByTargetPlayerID(villageID, phase, players[i]._id).fetch().length;
				try {
					var targetID = actionsModel.getActionsByPlayerID(villageID, phase, players[i]._id).fetch()[0].to;
					var target = playersModel.getPlayersByID(targetID);
					message += '<br><div class="voteResultLine"><div class="voteResultName">' + players[i].characterName +
						'</div><div class="voteResultNumber">(' + got + '票): →</div><div class="voteResultTarget">' + target.characterName + '</div></div>';
				} catch(e){
					console.log(e);
					console.log('errored at GameManager.generateVoteResult(line 127-131)');
					console.log('Errored playerID: ' + players[i]._id);
					console.log('Errored action: ' + actionsModel.getActionsByPlayerID(villageID, phase, players[i]._id).fetch());
					console.log('Errored targetID: ' + targetID);
					console.log('Erroed target: ' + target);
				}
				
				if(got > max.got) {
					max.player = players[i];
					max.got = got;
					decide = true;
				} else if(max.got == got) {
					decide = false;
				}
			}
			message += '<br>';
			chatLogsModel.createResultChatLogs(villageID, phase, message, 'vote');
			if(decide && !penalty){
				if(max.player.state == '生　存'){
					playersModel.killPlayers(max.player._id);
					var sentence = '<span class="GMName">協議の結果 <b>' + max.player.characterName + '</b> は処刑されました</span>';
					playerIDs.unshift(max.player._id);
					chatLogsModel.createResultChatLogs(villageID, phase, sentence, 'vote');
					var role = rolesModel.getRolesByPlayerID(max.player._id).fetch()[0];
					var medium = rolesModel.getRolesByRoleName(villageID, '霊能者').fetch();
					if(medium.length != 0){
						var actionPhase = {
							day: phase.day,
							phase: '夜'
						};
						var i = 0;
						for(i; i<medium.length; i++){
							actionsModel.createActions(villageID, actionPhase, medium[i].playerID, role.playerID, 'medium');
						}
					}
					if(role.roleName == '猫　又'){
						players = playersModel.getLivingPlayers(villageID);
						var rnd = Math.floor(Math.random() * players.length);
						playersModel.killPlayers(players[rnd]._id);
						sentence = '<span class="GMName"><b>' + players[rnd].characterName + '</b> は猫又の呪いで死亡した...</span>';
						chatLogsModel.createResultChatLogs(villageID, phase, sentence, 'vote');
						playerIDs.unshift(players[rnd]._id);
					}
					summariesModel.setSummaries(villageID, phase, playerIDs, '投票結果');
				}
			} else {
				actionsModel.removeActionsByType(villageID, phase, 'vote');
				decide = false;
			}
			if(penaltyIDs.length > 0){
				summariesModel.updatePenaltySummaries(villageID, penaltyIDs);
			}
			return decide;
		},
		
		judge: function(villageID){
			//return true if winner is decided;
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var players = playersModel.getLivingPlayers(villageID);
			if(players.length == 0) {
				var message = '<span class="result draw">引き分け</span>です<br>そして誰もいなくなった';
				chatLogsModel.createResultChatLogs(villageID, phase, message, 'result');
				return true;
			} else {
				var playerIDs = new Array(players.length);
				var i = 0;
				for(i; i<players.length; i++){
					playerIDs[i] = players[i]._id;
				}
				var wolf = rolesModel.getNumberOfRolesByPlayerID(playerIDs, '人　狼');
				var fox = rolesModel.getNumberOfRolesByPlayerID(playerIDs, '妖　狐');
				if(wolf == 0){
					if(fox != 0){
						var message = '<span class="result fox">妖　狐</span>の勝利です<br>間抜けな村人共を騙す事など容易いことよ';
						chatLogsModel.createResultChatLogs(villageID, phase, message, 'result');
						return true;
					} else {
						var message = '<span class="result">村人達</span>の勝利です<br>人狼の血を根絶することに成功しました';
						chatLogsModel.createResultChatLogs(villageID, phase, message, 'result');
						return true;
					}
				} else if(wolf >= (players.length - wolf - fox)) {
					if(fox != 0){
						var message = '<span class="result fox">妖　狐</span>の勝利です<br>間抜けな人狼共を騙す事など容易いことよ';
						chatLogsModel.createResultChatLogs(villageID, phase, message, 'result');
						return true;
					} else {
						var message = '<span class="result wolfOrGM">人　狼</span>の勝利です<br>最後の獲物を食い尽くすと、次の獲物を求めて旅立った';
						chatLogsModel.createResultChatLogs(villageID, phase, message, 'result');
						return true;
					}
				}
			}
			if(phase.revote <= 0){
				var message = '<span class="result draw">引き分け</span>です<br>村人達の議論は延々と続くのであった...';
				chatLogsModel.createResultChatLogs(villageID, phase, message, 'result');
				return true;
			}
			return false;
		},
		
		executeReport: function(villageID){
			var phase = phasesModel.getPhasesByVillageID(villageID);
			var players = playersModel.getPlayers(villageID);
			var village = villagesModel.getVillages(villageID);
			var i = 0;
			for(i; i<players.length; i++){
				if(players[i].tripKey == 'shonich＊' || players[i].tripKey == 'トリなし') continue;
				var got = actionsModel.getActionsByTargetPlayerID(villageID, phase, players[i]._id).fetch().length;
				if(got >= Math.ceil(village.settings.quota / 2)) {
					tripsModel.penaltyTrips(players[i].tripKey);
					break;
				}
			}
		}
	};
};

gameManager = new GameManager();
