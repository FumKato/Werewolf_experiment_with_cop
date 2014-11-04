PlayerListView = function(){
	return{
		renderColor: function($this, className){
			$this.addClass(className);
		},
		
		flushColor: function($this, className){
			$this.removeClass(className);
		},
		
		renderPlayerLogWindow: function(playerID, mouseEvent){
			var player = new PlayersModel().getPlayersByID(playerID);
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			if(player == null || phase == null) return;
			
			var $playerLogWindow = $('#playerLogWindow');
			$playerLogWindow.css({
				display: 'none'
			});
			
			var $playerLogWindowHeader = $playerLogWindow.find('#playerLogWindowHeader');
			var name = player.characterName;
			if(player.isGM && !player.isPlayer){
				name += '(GM)';
			}
			name += '(' + phase.day + '日目)の発言';
			$playerLogWindowHeader.html(name);
			$playerLogWindowHeader.attr('class', player._id);
			
			var $playerLogWindowSelector = $playerLogWindow.find('#playerLogWindowSelector');
			var i;
			$playerLogWindowSelector.html('');
			if(phase.phase != '事件前'){
				for(i=phase.day; i>1; i--){
					var item = '<div class="playerLogWindowSelectorItem';
					if(i == phase.day) item += 'Clicked';
					item += '" id="' + i + '">' + i + '日目</div>';
					$playerLogWindowSelector.append(item);
				}
			} else {
				var item = '<div class="playerLogWindowSelectorItemClicked" id="1">1日目</div>';
				$playerLogWindowSelector.prepend(item);
			}
			
			var $playerLogWindowBody = $playerLogWindow.find('#playerLogWindowBody');
			$playerLogWindowBody.html('');
			var chatLogs = chatLogsModel.getChatLogsByPlayerIDWithoutSession(phase, player._id);
			for(i=0; i<chatLogs.length; i++){
				var item = '<div class="playerLogWindowBodyItem">' + chatLogs[i].sentence + '</div>';
				$playerLogWindowBody.prepend(item);
			}
			$playerLogWindow.css({
				top: mouseEvent.pageY - 20,
				left: mouseEvent.pageX - 35,
				display: 'block'
			});
		},
		
		updatePlayerLogWindow: function(playerID, day){
			var player = new PlayersModel().getPlayersByID(playerID);
			console.log(playerID);
			console.log(player);
			if(player == null) return;
			var $playerLogWindow = $('#playerLogWindow');
			
			var $playerLogWindowHeader = $playerLogWindow.find('#playerLogWindowHeader');
			var name = player.characterName;
			if(player.isGM && !player.isPlayer){
				name += '(GM)';
			}
			name += '(' + day + '日目)の発言';
			$playerLogWindowHeader.html(name);
			
			var $playerLogWindowBody = $playerLogWindow.find('#playerLogWindowBody');
			$playerLogWindowBody.html('');
			var chatLogs = chatLogsModel.getChatLogsByDaynPlayerIDWithoutSession(day, playerID);
			for(i=0; i<chatLogs.length; i++){
				var item = '<div class="playerLogWindowBodyItem">' + chatLogs[i].sentence + '</div>';
				$playerLogWindowBody.prepend(item);
			}
		}
	};
};

Template.PlayerList.getPlayers = function(){
	if(Session.get('villageID') != null){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		if(Session.get('playerSummary')){
			$('#isLiving').show();
			return new PlayersModel().getAllLivingPlayers(Session.get('villageID'), village.settings.listSort);
		} else {
			$('#isLiving').hide();
			return new PlayersModel().getPlayersByVillageID(Session.get('villageID'), village.settings.listSort);
		}
	}
};

Template.PlayerList.getSummaries = function(){
	if(Session.get('villageID') != null && Session.get('playerSummary')){
		return new SummariesModel().getSummariesByVillageID(Session.get('villageID'));
	}
};

Template.PlayerList.getSummaryItemClassName = function(playerIDs){
	if(playerIDs.length >= 2){
		return 'wideSummaryItem';
	}
	return 'summaryItem';
};

Template.PlayerList.getSummaryItemLabel = function(day, type, playerIDs){
	var className = 'summaryItemLabel';
	if(playerIDs.length >= 2) className = 'wideSummaryItemLabel';
	var label = '<div class="' + className + '">';
	if(type == '突然死'){
		label += '突然死';
	} else {
		label += '' + day + '日目 ' + type;
	}
	label += '</div>';
	return label;
};

Template.PlayerList.getDay = function(day, type){
	if(type != '突然死'){
		return '' + day + '日目';
	}
	return '';
};

Template.PlayerList.isNoPlayer = function(playerIDs){
	return playerIDs.length == 0;
};

Template.PlayerList.getSummaryPlayers = function(playerIDs){
	return new PlayersModel().getPlayersByIDs(playerIDs);
};

Template.PlayerList.getPlayerListItemClassName = function(id, state, ready){
	var className = 'playerListItem';
	if(Session.get('selectedPlayer') == id){
		if(state == '生　存') {
			className = 'playerListClicked';
		} else {
			className = 'deadPlayerListClicked';
		}
	} else if(state == '死　亡') {
		className = 'deadPlayerList';
	}
	if(!ready) {
		className += ' nonReady';
	}
	return className;
};

Template.PlayerList.isGM = function(){
	if(Session.get('villageID') != null){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		return village.settings.GM;
	}
	return false;
};

Template.PlayerList.getGM = function(){
	return new PlayersModel().getGM(Session.get('villageID'));
};

Template.PlayerList.getGMPlayerListItemClassName = function(id){
	var className = 'gmPlayerListItem';
	if(Session.get('selectedPlayer') == id){
		className = 'gmPlayerListClicked';
	}
	return className;
};
