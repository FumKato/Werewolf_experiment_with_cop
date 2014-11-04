RoleSet = function() {
	
	this.createRoles = function(villageID) {
		if(villageID == null) return;
		var village = new VillagesModel().getVillagesByID(villageID);
		if(village == null) return;
		
		var roles = null;
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
	
	this.checkWizard = function(settings){
		if(settings == null) return;
		switch(settings.roleset){
			case 'A':
				return settings.quota >= 10;
			case 'B':
				return settings.quota == 8 || settings.quota >= 11;
			case 'C':
				return settings.quota >= 5;
			default:
				return false;
		}
	};
};
