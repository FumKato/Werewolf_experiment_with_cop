RoleSetC = function() {
	RoleSet.call(this);
	this.prototype = new RoleSet();
	
	this.createRoles = function(villageSettings) {
		var accessNum = villageSettings.quota - 4;
  		var quota = villageSettings.quota;
  		
  		var villagerArray = [1, 1, 0, 2, 1, 3, 2, 3, 3, 3, 3, 3, 4, 3, 4];
		var villager = villagerArray[accessNum];
  		var wolfArray = [1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
  		var wolf = wolfArray[accessNum];
  		var seer = (quota >= 13 || (quota >= 10 && quota <= 11)) ? 2 : 1;
  		var mediumArray = [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2];
  		var medium = mediumArray[accessNum];
  		var fanaticArray = [0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2];
  		var fanatic = fanaticArray[accessNum];
		var hunter = (quota == 4 || quota == 8) ? 0 : 1;
  		var mason = (quota <= 11 && quota != 8) ? 0 : 2;
  		var fox = (quota <= 8) ? 0 : 1 + Math.floor(quota / 16);
		var cat = 0;
  		if(villageSettings.quota >= 10 && villageSettings.cat) {
  			villager -= 2;
  			wolf++;
  			cat++;
  		}
  		var girl = 0;
  		if(villageSettings.quota >= 10 && villageSettings.girl) {
  			if(villager >= 2) {
  				villager -= 2;
  				fanatic++;
  			} else if(villager == 1) {
  				villager--;
  			} else {
  				wolf--;
  			}
  			girl++;
  		}
  		var wizard = 0;
  		if(fanatic >= 1 && villageSettings.wizard){
  			fanatic--;
  			wizard++;
  		}
  		var roles = {
			villager: villager,
			wolf: wolf,
			seer: seer,
			medium: medium,
			fanatic: fanatic,
			hunter: hunter,
			mason: mason,
			fox: fox,
			cat: cat,
			girl: girl,
			wizard: wizard
		};
		return roles;
	};
};
