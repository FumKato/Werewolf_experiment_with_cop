ChatLogsModel = function(){
	var _this = ChatLogsModel;
	_this.prototype.createChatLogs = function(villageID, playerID, role, phase, player, plainSentence, options, color, quotes){
			var name = player.characterName;
			var sentence = textChecker.checkEscape(plainSentence);
			sentence = textChecker.checkTextCommand(villageID, plainSentence);
			sentence = textConverter.text2Html(sentence);
			sentence = textChecker.checkTextLength(sentence, 500);
			
			var type = 'monologue';
			var enableCopy = false;
			 if(role.roleName == '観戦者') {
				type = 'audience';
				color = 'none';
				enableCopy = true;
			} else if(phase.phase == '事件終了' || phase.phase == '事件前' || role.roleName == 'GM') {
				type = 'normal';
				enableCopy = true;
			} else if(player.state == '死　亡') {
				type = 'ghost';
				color = 'none';
				enableCopy = true;
			} else {
				switch(phase.phase) {
					case '夜':
				  		switch(role.roleName) {
				  			case '人　狼':
				  	  			type = 'wolf';
				  	  			name = '<span class="wolf">' + name + '</span>';
				  	  			sentence = '<span class="wolf">' + sentence + '</span>';
				  	  			break;
				  			case '共有者':
				  	  			type = 'mason';
				  	  			name = '<span class="mason">' + name + '</span>';
				  	  			sentence = '<span class="mason">' + sentence + '</span>';
				  	  			break;
				  		}
				  		break;
					case '昼' :
				  		type = 'normal';
				  		enableCopy = true;
				  		break;
				}
			}
			if(role.roleName == 'GM')
			  name = '<span class="GMName">' + name + '(GM)</span>'; 
			if(options.bold) {
				sentence = '<b>' + sentence + '</b>';
			}
			if(options.color) {
				sentence = '<span class="colored">' + sentence + '</span>';
			}
			if(type == 'monologue'){
				name += '<br>(独り言)';
			}
			var i = 0;
			for(i;i<quotes.length;i++){
				quotes[i].sentence = textChecker.checkEscape(quotes[i].sentence);
				quotes[i].sentence = textConverter.text2Html(quotes[i].sentence);
				var quoteLabel = '<div class="chatLogQuoteWrapper"><div class="quoteLabel"><span class="quoteTag">>>' + quotes[i].name + '</span><div class="quoteContent"><div class="quoteContentHeader">' +
	  			quotes[i].name + '</div><div class="quoteContentBody">' + quotes[i].sentence + '</div></div></div></div><br>';
	  			sentence = quoteLabel + sentence;
			}
			var number = ChatLogs.find({villageID: villageID}).count() + 1;
			ChatLogs.insert({
				villageID: villageID,
				playerID: playerID,
				day: phase.day,
				phase: phase.phase,
				number: number,
				name: name,
				sentence: sentence,
				type: type,
				color: color,
				enableCopy: enableCopy
			});
			if(type == 'wolf') {
				ChatLogs.insert({
					villageID: villageID,
					playerID: 'dummyID',
					day: phase.day,
					phase:phase.phase,
					number: number,
					name: '遠吠え',
					sentence: 'アオォーーン',
					type: 'dummy',
					color: 'none',
					enableCopy: false
				});
			}
			return type;
		};
		
		_this.prototype.createSystemChatLogs = function(villageID, phase, plainSentence){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			if(month < 10) {
				month = '0' + month;
			}
			var day = date.getDate();
			if(day < 10) {
				day = '0' + day;
			}
			var hour = date.getHours();
			if(hour < 10){
				hour = '0' + hour;
			}
			var minute = date.getMinutes();
			if(minute < 10){
				minute = '0' + minute;
			}
			var number = ChatLogs.find({villageID: villageID}).count() + 1;
			var name = '<span class="GMName">天の声</span>';
			var sentence = '<span class="GMName">' + plainSentence + '(' +
				year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ')</span>';
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: 'system',
				day: phase.day,
				phase: phase.phase,
				number: number,
				name: name,
				sentence: sentence,
				type: 'normal',
				color: 'none',
				enableCopy: false
			});
		};
		
		_this.prototype.createResultChatLogs = function(villageID, phase, plainSentence, logType){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			if(month < 10) {
				month = '0' + month;
			}
			var day = date.getDate();
			if(day < 10) {
				day = '0' + day;
			}
			var hour = date.getHours();
			if(hour < 10){
				hour = '0' + hour;
			}
			var minute = date.getMinutes();
			if(minute < 10){
				minute = '0' + minute;
			}
			var number = ChatLogs.find({villageID: villageID}).count() + 1;
			var name = '<span class="GMName">天の声</span>';
			var sentence = plainSentence + '(' + 
				year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ')';
			var type = 'normal';
			if(logType == 'result') {
				phase.phase = '事件終了';
			} else if(logType == 'vote'){
				type = 'voteResult';
			}
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: 'system',
				day: phase.day,
				phase: phase.phase,
				number: number,
				name: name,
				sentence: sentence,
				type: type,
				color: 'none',
				enableCopy: true
			});
		};
		
		_this.prototype.createSystemMonologue = function(villageID, playerID, phase, plainSentence){
			var date = new Date();
			var number = ChatLogs.find({villageID: villageID}).count() + 1;
			var player = playersModel.getPlayersByID(playerID);
			var name = '<span class="GMName">' + player.characterName + '<br>(独り言)</span>';
			var sentence = '<span class="GMName">' + plainSentence + '</span>';
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: playerID,
				day: phase.day,
				phase: phase.phase,
				number: number,
				name: name,
				sentence: sentence,
				type: 'monologue',
				color: 'none',
				enableCopy: false
			});
		};
		
		_this.prototype.createAudienceChatLogs = function(villageID, playerID, role, phase, player, plainSentence, options, quotes){
			var type = 'audience';
			if(role.roleName == 'GM' || role.roleName == '仮GM'){
				var name = '<span class="GMName">' + player.characterName + '(GM)>>観戦者</span>';
			} else {
				var name = '<span class="GMName">天の声>>観戦者</span>';
			}
			var sentence = textChecker.checkEscape(plainSentence);
			sentence = textChecker.checkTextCommand(villageID, plainSentence);
			sentence = textConverter.text2Html(sentence);
			sentence = textChecker.checkTextLength(sentence, 500);
			if(options.bold) {
				sentence = '<b>' + sentence + '</b>';
			}
			if(options.color) {
				sentence = '<span class="colored">' + sentence + '</span>';
			}
			var i = 0;
			for(i;i<quotes.length;i++){
				quotes[i].sentence = textChecker.checkEscape(quotes[i].sentence);
				quotes[i].sentence = textConverter.text2Html(quotes[i].sentence);
				var quoteLabel = '<div class="chatLogQuoteWrapper"><div class="quoteLabel"><span class="quoteTag">>>' + quotes[i].name + '</span><div class="quoteContent"><div class="quoteContentHeader">' +
	  			quotes[i].name + '</div><div class="quoteContentBody">' + quotes[i].sentence + '</div></div></div></div><br>';
	  			sentence = quoteLabel + sentence;
			}
			var number = ChatLogs.find({villageID: villageID}).count() + 1;
			ChatLogs.insert({villageID: villageID,
				playerID: playerID,
				day: phase.day,
				phase: phase.phase,
				number: number,
				name: name,
				sentence: sentence,
				type: type,
				color: 'none',
				enableCopy: true
			});
		};
		
		_this.prototype.createGhostChatLogs = function(villageID, playerID, role, phase, player, plainSentence, options, quotes){
			if(role.roleName != 'GM' && role.roleName != '仮GM') return;
			var type = 'ghost';
			var name = '<span class="GMName">' + player.characterName + '(GM)>>霊話</span>'; 
			var sentence = textChecker.checkEscape(plainSentence);
			sentence = textChecker.checkTextCommand(villageID, plainSentence);
			sentence = textConverter.text2Html(sentence);
			sentence = textChecker.checkTextLength(sentence, 500);
			if(options.bold) {
				sentence = '<b>' + sentence + '</b>';
			}
			if(options.color) {
				sentence = '<span class="colored">' + sentence + '</span>';
			}
			var i = 0;
			for(i;i<quotes.length;i++){
				quotes[i].sentence = textChecker.checkEscape(quotes[i].sentence);
				quotes[i].sentence = textConverter.text2Html(quotes[i].sentence);
				var quoteLabel = '<div class="chatLogQuoteWrapper"><div class="quoteLabel"><span class="quoteTag">>>' + quotes[i].name + '</span><div class="quoteContent"><div class="quoteContentHeader">' +
	  			quotes[i].name + '</div><div class="quoteContentBody">' + quotes[i].sentence + '</div></div></div></div><br>';
	  			sentence = quoteLabel + sentence;
			}
			var number = ChatLogs.find({villageID: villageID}).count() + 1;
			ChatLogs.insert({
				villageID: villageID,
				playerID: playerID,
				day: phase.day,
				phase: phase.phase,
				number: number,
				name: name,
				sentence: sentence,
				type: type,
				color: 'none',
				enableCopy: true
			});
		};
		
		_this.prototype.getChatLogs = function(villageID, playerID, ninKeys){
			return ChatLogs.find({
						villageID: villageID,
						$or: [
							{type: {$nin: ninKeys}},
		  					{playerID: playerID, type: 'monologue'}
		  				]
		  			});
		};
		
		_this.prototype.getChatLogsByVillageID = function(villageID){
			return ChatLogs.find(
				{villageID: villageID},
				{sort: {number: -1}}
			).fetch();
		};
		
		_this.prototype.removeChatLogs = function(villageID){
			ChatLogs.remove({villageID: villageID});
		};
		
		_this.prototype.removeDummyChatLogs = function(villageID){
			ChatLogs.remove({
				villageID: villageID,
				type: 'dummy'
			});
		};
};

chatLogsModel = new ChatLogsModel();
