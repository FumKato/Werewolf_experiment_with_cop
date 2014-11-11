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
