Template.PlayerListItem.getPlayerIcon = function(icon) {
	return '<img class="playerIcon" src="./icon/' + icon + '.png" />';
};

Template.PlayerListItem.getHandleNameAndTripKey = function(handleName, tripKey) {
	if(Session.get('myPlayerID') == null || Session.get('villageID') == null) return '';
	var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
	var phase = new PhasesModel().getPhases(Session.get('villageID'));
	var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
	var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
	if(role==null || phase==null || player==null || village == null)return'';
	if(role.roleName=='GM' || phase.phase=='事件終了' || (player.isPlayer && player.state=='死　亡' && !village.settings.hideRole)){
		return '<div class="handleName">' + handleName + '</div><div class="tripKey">◆' + tripKey + '</div>';
	} else {
		return '';
	}
};

Template.PlayerListItem.getLogCount = function(logCount) {
	if(Session.get('villageID') == null)return;
	var phase = new PhasesModel().getPhases(Session.get('villageID'));
	if(phase != null && (phase.phase == '夜' || phase.phase == '明け方')) return '--';
	return logCount;
};

Template.PlayerListItem.getRole = function(id) {
	if(Session.get('myPlayerID') == null || Session.get('villageID') == null) return '';
	var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
	var phase = new PhasesModel().getPhases(Session.get('villageID'));
	var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
	var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
	if(role==null || phase==null || player==null || village == null)return'';
	if(role.roleName=='GM' || phase.phase=='事件終了' || (player.isPlayer && player.state=='死　亡' && !village.settings.hideRole)){
		role = new RolesModel().getRolesByPlayerID(id);
		if(role == null) return '';
		switch(role.roleName) {
				case '人　狼':
					return '[<span class="wolfOrGM">' + role.roleName + '</span>]';break;
				case '占い師':
					return '[<span class="seer">' + role.roleName + '</span>]';break;
				case '霊能者':
					return '[<span class="medium">' + role.roleName + '</span>]';break;
				case '狂　人':
					return '[<span class="fanatic">' + role.roleName + '</span>]';break;
				case '共有者':
					return '[<span class="mason">' + role.roleName + '</span>]';break;
				case '狩　人':
					return '[<span class="hunter">' + role.roleName + '</span>]';break;
				case '猫　又':
					return '[<span class="cat">' + role.roleName + '</span>]';break;
				case '少　女':
					return '[<span class="girl">' + role.roleName + '</span>]';break;
				case '妖　狐':
					return '[<span class="fox">' + role.roleName + '</span>]';break;
				case '妖術師':
					return '[<span class="fanatic">' + role.roleName + '</span>]';break;
				default:
					return '[' + role.roleName + ']';break;
		}
	}
	return '';
};

Template.PlayerListItem.getRegion = function(region){
	return '';
	//Test of the bellow code are done
	/*if(Session.get('myPlayerID') == null || Session.get('villageID') == null) return '';
	var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
	var phase = new PhasesModel().getPhases(Session.get('villageID'));
	var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
	if(role == null || phase == null || player == null) return '';
	if(role.roleName=='GM' || phase.phase=='事件終了' || (player.isPlayer && player.state=='死　亡' )){
		return '<div class="region">[<span class="regionBody">' + region + '</span>]</div>';
	} else {
		return '';
	}*/
};

Template.PlayerListItem.getRecord = function(record){
	return '';
	////Test of the bellow code are done
	/*if(Session.get('myRole') == null) return '';
	if(Session.get('myRole').roleName == 'GM'){
		return '<div class="record">(' + record + ')</div>';
	} else {
		return '';
	}*/
};
