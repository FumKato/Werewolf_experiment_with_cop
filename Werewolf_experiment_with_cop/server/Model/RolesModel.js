RolesModel = function(){
	return{
		getRolesByPlayerID:function(playerID){
			return Roles.find({playerID: playerID});
		},
		
		getNumberOfRolesByPlayerID: function(playerID, roleName){
			return Roles.find({
				playerID: {$in: playerID},
				roleName: roleName
			}).count();
		},
		
		getRolesByVillageID: function(villageID){
			return Roles.find({villageID: villageID});
		},
		
		getRolesByRoleName: function(villageID, roleName){
			if(roleName == '聴狂人'){
				return Roles.find({villageID: villageID, roleName: {$in: [roleName, '人　狼']}});
			}
			return Roles.find({villageID: villageID, roleName: roleName});
		},
		
		createRoles:function(villageID, playerID, roleName){
			Roles.insert({
				villageID: villageID,
				playerID: playerID,
				roleName: roleName
			});
		},
		
		updateRoles:function(playerID, roleName){
			Roles.update({playerID: playerID}, {$set: {roleName: roleName}});
		},
		
		removeRolesByVillageID:function(villageID){
			Roles.remove({villageID: villageID});
		},
		
		getAudienceNumber: function(villageID){
			return Roles.find({villageID: villageID, roleName:'観戦者'}).count();
		}
	};
};

rolesModel = new RolesModel();
