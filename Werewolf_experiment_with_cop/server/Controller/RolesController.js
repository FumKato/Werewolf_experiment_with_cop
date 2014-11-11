RolesController = function(){
	var _this = RolesController;
	_this.prototype.getRoleName = function(playerID, targetID){
		return null;
	};
	
	_this.prototype.publishRoles = function(villageID, playerID, role, phase, state, role) {
		if(playerID == null || villageID == null) return;
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var player = playersModel.getPlayersByID(playerID);
		if(phase == null || player == null) return;
		if(phase.phase == '事件終了' || (player.isPlayer && player.state == '死　亡')) {
			return rolesModel.getRolesByVillageID(villageID);
		}
		return rolesModel.getRolesByPlayerID(playerID);
	};
};
rolesController = new RolesController();

Meteor.methods({
	getRoleName: function(playerID, targetID){
		adapt_context(playerID);
		var result = rolesController.getRoleName(playerID, targetID);
		deactivate_context(playerID);
		return result;
	}
});

Meteor.publish('roles', function(villageID, playerID, role, phase, state, role) {
	adapt_context(playerID);
	var result = rolesController.publishRoles(villageID, playerID, role, phase, state, role);
	deactivate_context(playerID);
	return result;
});