getColleagueName = function(roles){
	var playersModel = new PlayersModel();
	var message = '';
	for(var i=0; i<roles.length; i++){
		if(roles[i].playerID == Session.get('myPlayerID')) continue;
		var player = playersModel.getPlayersByID(roles[i].playerID);
		message = message + player.characterName + ' ';
	}
	message = message.slice(0, -1);
	return message;
};

RolesController = function() {
		var _this = RolesController;
		
		_this.prototype.updateRolesView = function() {
			var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			if(role == null) return;
			Session.set('myRole', role);
			roleInformationView.render(role);
			var villageView = new VillageView();
			villageView.flush('GMMenu');
			villageView.render('systemWindow');
	};
};

rolesController = new RolesController();
