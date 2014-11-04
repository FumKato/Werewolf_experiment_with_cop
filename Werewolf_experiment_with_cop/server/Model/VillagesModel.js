VillagesModel = function(){
	return{
		getVillages: function(villageID){
			return Villages.findOne({_id: villageID});
		},
		
		getUnloggedVillages: function(){
			return Villages.find({$and: [{isFinished: {$exists: true}}, {isFinished: true}]}, {sort: {number: 1}}).fetch();
		},
		
		completeGM: function(villageID){
			Villages.update(
				{_id: villageID},
				{$set: {gatheringGM: false}}
			);
		},
		
		removeVillages: function(villageID){
			Villages.remove({_id: villageID});
		},
		
		startVillages: function(villageID) {
			Villages.update(
				{_id: villageID},
				{$set: {isStarted: true}}
			);
		},
		
		finishVillages: function(villageID){
			Villages.update(
				{_id: villageID},
				{$set: {isFinished: true}}
			);
		},
		
		checkUnfinishedVillages: function(){
			var count = Villages.find({isFinished: false}).count();
			return count == 0;
		},
		
		setLogVillageNumber: function(villageID){
			var logNumber = Villages.find({isLogged: true}).count() + 1;
			Villages.update(
				{_id: villageID},
				{$set: {number: logNumber}}
			);
		},
		
		logVillages: function(villageID){
			Villages.update(
				{_id: villageID},
				{
					$set: {
						isLogged: true
					},
					$unset: {
						isStarted: '',
						gatheringGM: '',
						isFinished: ''
					}
				}
			);
		},
		
		createVillages:function(data){
			if(Villages.find({isFinished: false}).count() > 15) return false;
			if(data.villageName == null) return null;
			data.villageName = textChecker.checkEscape(data.villageName);
			data.villageName = textChecker.checkTextLength(data.villageName, 15);
		
			data.quota = textChecker.checkNumberLiteral(data.quota, 4, 20);
			if(data.quota == null || data.quota == -1) return null;
		
			data.roleset = textChecker.checkEscape(data.roleset);
			if(data.roleset == null || (data.roleset != 'A' && data.roleset != 'B' && data.roleset != 'C')) return null;
		
			if(data.villagePR == null) return null;
			data.villagePR = textChecker.checkEscape(data.villagePR);
			data.villagePR = textChecker.checkTextLength(data.villagePR, 30);
		
			data.GM = textChecker.checkNull(data.GM);
			if(!textChecker.checkBoolean(data.GM)) return null;
		
			data.daytime = textChecker.checkNumberLiteral(data.daytime, 10, 600);
			if(data.daytime == null || data.daytime == -1) return null;
			
			data.afternoon = textChecker.checkNumberLiteral(data.afternoon, 10, 300);
			if(data.afternoon == null || data.afternoon == -1) return null;
			
			data.night = textChecker.checkNumberLiteral(data.night, 10, 600);
			if(data.night == null || data.night == -1) return null;
				
			data.dawn = textChecker.checkNumberLiteral(data.dawn, 10, 300);
			if(data.dawn == null || data.dawn == -1) return null;
		
			data.tripLimit = textChecker.checkNull(data.tripLimit);
			if(!textChecker.checkBoolean(data.tripLimit)) return null;
		
			data.recordLimit = textChecker.checkNumberLiteral(data.recordLimit, 0, 1000);
			if(data.recordLimit == null || data.recordLimit == -1) return null;
		
			data.cat = textChecker.checkNull(data.cat);
			if(!textChecker.checkBoolean(data.cat)) return null;
		
			data.girl = textChecker.checkNull(data.girl);
			if(!textChecker.checkBoolean(data.girl)) return null;
			
			data.wizard = textChecker.checkNull(data.wizard);
			if(!textChecker.checkBoolean(data.wizard)) return null;
		
			if(!textChecker.checkIconset(data.iconset)) return null;
		
			data.randomCN = textChecker.checkNull(data.randomCN);
			if(!textChecker.checkBoolean(data.randomCN)) return null;
			
			data.hideRole = textChecker.checkNull(data.hideRole);
			if(!textChecker.checkBoolean(data.hideRole)) return null;
			
			data.audienceUtter = textChecker.checkNull(data.audienceUtter);
			if(!textChecker.checkBoolean(data.audienceUtter)) return null;
		
			data.silenceRule = textChecker.checkNumberLiteral(data.silenceRule, 0, 30);
			if(data.silenceRule == null || data.silenceRule == -1) return null;
		
			data.listSort = textChecker.checkNull(data.listSort);
			if(!textChecker.checkBoolean(data.listSort)) return null;
		
			data.voteSkip = textChecker.checkNull(data.voteSkip);
			if(!textChecker.checkBoolean(data.voteSkip)) return null;
		
			data.actionSkip = textChecker.checkNull(data.actionSkip);
			if(!textChecker.checkBoolean(data.actionSkip)) return null;
		
			if(Villages.find({isFinished: false}).count() > 10) return null;
			var number = Villages.find({}).count() + 1;
			return Villages.insert({
						number: '＊' + number,
						settings: data,
						isStarted: false,
						gatheringGM: true,
						isFinished: false,
						isLogged: false
					});
		}, 
		
		updateVillages: function(villageID, data){
			var village = Villages.findOne({_id: villageID});
			if(village == null) return;
			var message = '村の設定が変更されました<br>';
			var isDiffer = false;
			
			if(data.villageName == null || data.villageName == '') return false;
			data.villageName = textChecker.checkEscape(data.villageName);
			data.villageName = textChecker.checkTextLength(data.villageName, 15);
			if(village.settings.villageName != data.villageName){
				message += '【村名】' + data.villageName + ' 村<br>';
				isDiffer = true;
			}
		
			data.quota = textChecker.checkNumberLiteral(data.quota, 4, 20);
			if(data.quota == -1) return false;
			if(village.settings.quota != data.quota){
				message += '【人数】' + data.quota + '人<br>';
				isDiffer = true;
			}
		
			data.roleset = textChecker.checkEscape(data.roleset);
			if(data.roleset == null || (data.roleset != 'A' && data.roleset != 'B' && data.roleset != 'C')) return false;
			if(village.settings.roleset != data.roleset){
				message += '【配役】' + data.roleset + '配役<br>';
				isDiffer = true;
			}
			
			if(data.villagePR == null) return false;		
			data.villagePR = textChecker.checkEscape(data.villagePR);
			data.villagePR = textChecker.checkTextLength(data.villagePR, 30);
			if(village.settings.villagePR != data.villagePR){
				message += '【村の説明】' + data.villagePR + '<br>';
				isDiffer = true;
			}
		
			data.GM = textChecker.checkNull(data.GM);
			if(!textChecker.checkBoolean(data.GM)) return false;
			if(village.settings.GM != data.GM){
				if(data.GM){
					message += '【GM制】';
				} else {
					message += '【仮GM制】';
				}
				isDiffer = true;
			}
		
			data.daytime = textChecker.checkNumberLiteral(data.daytime, 10, 600);
			if(data.daytime == -1) return false;
			if(village.settings.daytime != data.daytime){
				message += '【昼】' + data.daytime + '秒<br>';
				isDiffer = true;
			}
			
			data.afternoon = textChecker.checkNumberLiteral(data.afternoon, 10, 300);
			if(data.afternoon == -1) return false;
			if(village.settings.afternoon != data.afternoon){
				message += '【夕方】' + data.afternoon + '秒<br>';
				isDiffer = true;
			}
			
			data.night = textChecker.checkNumberLiteral(data.night, 10, 600);
			if(data.night == -1) return false;
			if(village.settings.night != data.night){
				message += '【夜】' + data.night + '秒<br>';
				isDiffer = true;
			}
				
			data.dawn = textChecker.checkNumberLiteral(data.dawn, 10, 300);
			if(data.dawn == -1) return false;
			if(village.settings.dawn != data.dawn){
				message += '【明け方】' + data.dawn + '秒<br>';
				isDiffer = true;
			}
		
			data.tripLimit = textChecker.checkNull(data.tripLimit);
			if(!textChecker.checkBoolean(data.tripLimit)) return false;
			if(village.settings.tripLimit != data.tripLimit){
				message += '【トリップ有りのみ入村可】';
				if(data.tripLimit){
					message += 'ON';
				} else {
					message += 'OFF';
				}
				isDiffer = true;
			}
		
			data.recordLimit = textChecker.checkNumberLiteral(data.recordLimit, 0, 1000);
			if(data.recordLimit == -1) return false;
			if(village.settings.recordLimit != data.recordLimit){
				message += '【トリップ戦績】' + data.tripLimit + '戦以上<br>';
				isDiffer = true;
			}
		
			data.cat = textChecker.checkNull(data.cat);
			if(!textChecker.checkBoolean(data.cat)) return false;
			if(village.settings.cat != data.cat){
				if(data.cat){
					message += '【猫又あり】<br>';
				} else {
					message += '【猫又なし】<br>';
				}
				isDiffer = true;
			}
			
			data.girl = textChecker.checkNull(data.girl);
			if(!textChecker.checkBoolean(data.girl)) return false;
			if(village.settings.girl != data.girl){
				if(data.girl){
					message += '【少女あり】<br>';
				} else {
					message += '【少女なし】<br>';
				}
				isDiffer = true;
			}
			
			data.wizard = textChecker.checkNull(data.wizard);
			if(!textChecker.checkBoolean(data.wizard)) return false;
			if(village.settings.wizard != data.wizard){
				if(data.wizard){
					message += '【妖術師あり】<br>';
				} else {
					message += '【妖術師なし】<br>';
				}
				isDiffer = true;
			}
		
			if(!textChecker.checkIconset(data.iconset)) return false;
			if(village.settings.iconset != data.iconset){
				message += '【アイコンセット】' + data.iconset + '<br>';
				isDiffer = true;
			}
		
			data.randomCN = textChecker.checkNull(data.randomCN);
			if(!textChecker.checkBoolean(data.randomCN)) return false;
			if(village.settings.randomCN != data.randomCN){
				if(data.randomCN){
					message += '【ランダムCN】ON<br>';
				} else {
					message += '【ランダムCN】OFF<br>';
				}
				isDiffer = true;
			}
		
			data.hideRole = textChecker.checkNull(data.hideRole);
			if(!textChecker.checkBoolean(data.hideRole)) return null;
			if(village.settings.hideRole != data.hideRole){
				if(data.hideRole){
					message += '【霊界役職表示なし】<br>';
				} else {
					message += '【霊界役職表示あり】<br>';
				}
				isDiffer = true;
			}
		
			data.audienceUtter = textChecker.checkNull(data.audienceUtter);
			if(!textChecker.checkBoolean(data.audienceUtter)) return false;
			if(village.settings.audienceUtter != data.audienceUtter){
				if(data.audienceUtter){
					message += '【観戦発言あり】<br>';
				} else {
					message += '【観戦発言なし】<br>';
				}
				isDiffer = true;
			}
		
			data.silenceRule = textChecker.checkNumberLiteral(data.silenceRule, 0, 30);
			if(data.silenceRule == -1) return false;
			if(village.settings.silenceRule != data.silenceRule){
				if(data.silenceRule <= 0){
					message += '【〜秒ルール解除】<br>';
				} else {
					message += '【' + data.silenceRule + '秒ルール】<br>';
				}
				isDiffer = true;
			}
		
			data.listSort = textChecker.checkNull(data.listSort);
			if(!textChecker.checkBoolean(data.listSort)) return false;
			if(village.settings.listSort != data.listSort){
				if(data.listSort){
					message += '【生存者ソート】ON<br>';
				} else {
					message += '【生存者ソート】OFF<br>';
				}
				isDiffer = true;
			}
		
			data.voteSkip = textChecker.checkNull(data.voteSkip);
			if(!textChecker.checkBoolean(data.voteSkip)) return false;
			if(village.settings.voteSkip != data.voteSkip){
				if(data.voteSkip){
					message += '【投票時間非固定】<br>';
				} else {
					message += '【投票時間固定】<br>';
				}
				isDiffer = true;
			}
		
			data.actionSkip = textChecker.checkNull(data.actionSkip);
			if(!textChecker.checkBoolean(data.actionSkip)) return false;
			if(village.settings.actionSkip != data.actionSkip){
				if(data.actionSkip){
					message += '【役職時間非固定】<br>';
				} else {
					message += '【役職時間固定】<br>';
				}
				isDiffer = true;
			}
			
			if(isDiffer){
				Villages.update(
					{_id: villageID},
					{$set: {settings: data}}
				);
				var phase = phasesModel.getPhasesByVillageID(villageID);
				chatLogsModel.createSystemChatLogs(villageID, phase, message);
			}
			
			return true;
		}
	};
};

villagesModel = new VillagesModel();
