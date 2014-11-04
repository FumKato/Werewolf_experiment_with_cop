RolesController = function(){
	var _this = RolesController;
	_this.prototype.getRoleName = function(playerID, targetID){
		var player = playersModel.getPlayersByID(playerID);
		var playerRole = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		if(player != null && player.state == '生　存' && (playerRole.roleName == '占い師' || playerRole.roleName == '霊能者' || playerRole.roleName == '少　女' || playerRole.roleName == '妖術師')){
			var role = rolesModel.getRolesByPlayerID(targetID).fetch()[0];
			if(role != null) {
				return role.roleName;
			}
		}
		return null;
	};
	
	_this.prototype.publishRoles = function(villageID, playerID, role, phase, state, role) {
		if(playerID == null || villageID == null) return;
		var playerRole = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		var phase = phasesModel.getPhasesByVillageID(villageID);
		var player = playersModel.getPlayersByID(playerID);
		if(playerRole == null || phase == null || player == null) return;
	
		if(phase.phase == '事件終了' || (player.isPlayer && player.state == '死　亡') || playerRole.roleName == 'GM') {
			return rolesModel.getRolesByVillageID(villageID);
		} else if(playerRole.roleName == '人　狼' || playerRole.roleName == '共有者') {
			return rolesModel.getRolesByRoleName(villageID, playerRole.roleName);
		}
		return rolesModel.getRolesByPlayerID(playerID);
	};
};

Meteor.methods({
	getRoleName: function(playerID, targetID){
		return new RolesController.getRoleName(playerID, targetID);
	}
});

Meteor.publish('roles', function(villageID, playerID, role, phase, state, role) {
	return new RolesController().publishRoles(villageID, playerID, role, phase, state, role);
});