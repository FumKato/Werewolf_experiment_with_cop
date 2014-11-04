RoleSet = function() {
	
	this.createRoles = function(villageID) {
		if(villageID == null) return;
		var village = villagesModel.getVillages(villageID);
		if(village == null) return;
		
		switch(village.settings.roleset) {
			case 'A' :
			  return new RoleSetA().createRoles(village.settings);
			case 'B' :
			  return new RoleSetB().createRoles(village.settings);
			case 'C' :
			  return new RoleSetC().createRoles(village.settings);
			default :
			  return null;
		}
	};
	
	this.createRoleBreakdown = function(villageID) {
		if(villageID == null) return;
		var village = villagesModel.getVillages(villageID);
		if(village == null) return;
		
		switch(village.settings.roleset) {
			case 'A' :
			  return new RoleSetA().createRoleBreakdown(village.settings);
			case 'B' :
			  return new RoleSetB().createRoleBreakdown(village.settings);
			case 'C' :
			  return new RoleSetC().createRoleBreakdown(village.settings);
			default :
			  return null;
		}
	};
	
	this.checkWizard = function(settings){
		if(settings == null) return;
		switch(settings.roleset){
			case 'A':
				return settings.quota >= 10;
			case 'B':
				return settings.quota == 8 || (settings.quota == 10 && settings.girl) || settings.quota >= 11;
			case 'C':
				return settings.quota >= 5;
			default:
				return false;
		}
	};
	
	this.setRoles = function(villageID, roles){
		var players = playersModel.getPlayers(villageID);
		var i = 0;
		for(i=0; i<players.length; i++){
			if(players[i].tripKey == 'shonich＊'){
				var victim = players[i];
				players.splice(i, 1);
				break;
			}
		}
		var rolesArray = new Array();
		var insertRoleArrayItem = function(rolesArray, roleNumber, roleName){
			while(roleNumber > 0){
				rolesArray.push(roleName);
				roleNumber--;
			}
			return rolesArray;
		};
		rolesArray = insertRoleArrayItem(rolesArray, roles.villager, '村　人');
		rolesArray = insertRoleArrayItem(rolesArray, roles.seer, '占い師');
		rolesArray = insertRoleArrayItem(rolesArray, roles.medium, '霊能者');
		rolesArray = insertRoleArrayItem(rolesArray, roles.fanatic, '狂　人');
		rolesArray = insertRoleArrayItem(rolesArray, roles.hunter, '狩　人');
		rolesArray = insertRoleArrayItem(rolesArray, roles.mason, '共有者');
		rolesArray = insertRoleArrayItem(rolesArray, roles.girl, '少　女');
		rolesArray = insertRoleArrayItem(rolesArray, roles.wizard, '妖術師');
		
		var rnd = Math.floor(Math.random() * rolesArray.length);
		rolesModel.updateRoles(victim._id, rolesArray[rnd]);
		rolesArray.splice(rnd, 1);
			
		rolesArray = insertRoleArrayItem(rolesArray, roles.wolf, '人　狼');
		rolesArray = insertRoleArrayItem(rolesArray, roles.fox, '妖　狐');
		rolesArray = insertRoleArrayItem(rolesArray, roles.cat, '猫　又');
		
		var i = 0;
		for(i; i<players.length; i++){
			rnd = Math.floor(Math.random() * rolesArray.length);
			rolesModel.updateRoles(players[i]._id, rolesArray[rnd]);
			rolesArray.splice(rnd, 1);
		}
	};
};

Meteor.methods({
	getRoles : function(villageID) {
		return new RoleSet().createRoles(villageID);
	}
});
