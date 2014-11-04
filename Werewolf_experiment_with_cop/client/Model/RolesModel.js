RolesModel = function(){
	return{
		getRolesByPlayerID:function(playerID){
			return Roles.findOne({playerID: playerID});
		},
		
		getRolesByRoleName: function(villageID, roleName){
			return Roles.find({villageID: villageID, roleName: roleName});
		}
	};
};
