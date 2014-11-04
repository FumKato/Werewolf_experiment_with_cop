RoleSetB = function() {
	RoleSet.call(this);
	this.prototype = new RoleSet();
	
	this.createRoles = function(villageSettings) {
		var accessNum = villageSettings.quota - 4;
  		var rnd = Math.floor( Math.random() * 2);
  		var quota = villageSettings.quota;

		var villagerArray = [2 + rnd, 2, 3, 4, 4 + rnd, 3, 4, 4, 5, 4, 5, 6, 5, 6, 7];
		var villager = villagerArray[accessNum];
  		var wolfArray = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3];
  		var wolf = wolfArray[accessNum];
		var seer = (quota == 4 && rnd == 1) ? 0 : 1;
		var medium = (quota <= 8) ? 0 : 1;
		var fanaticArray = [0, 0, 0, 0, 1 - rnd, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
		var fanatic = fanaticArray[accessNum];
  		var hunter = (quota <= 8) ? 0 : 1;
  		var mason = (quota <= 12) ? 0 : 2;
		var fox = (quota <= 4) ? 0 : 1 + Math.floor(quota / 16);
		var cat = 0;
  		if(villageSettings.quota >= 10 && villageSettings.cat) {
  			villager -= 2;
  			wolf++;
  			cat++;
  		}
  		var girl = 0;
  		if(villageSettings.quota >= 10 && villageSettings.girl) {
  			villager -= 2;
  			fanatic++;
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
	
	this.createRoleBreakdown = function(villageSettings) {
		var accessNum = villageSettings.quota - 4;
  		var quota = villageSettings.quota;

		var villagerArray = ['2〜3', 2, 3, 4, '4〜5', 3, 4, 4, 5, 4, 5, 6, 5, 6, 7];
		var villager = villagerArray[accessNum];
  		var wolfArray = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3];
  		var wolf = wolfArray[accessNum];
		var seer = (quota == 4) ? '1〜0' : 1;
		var medium = (quota <= 8) ? 0 : 1;
		var fanaticArray = [0, 0, 0, 0, '1〜0', 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
		var fanatic = fanaticArray[accessNum];
  		var hunter = (quota <= 8) ? 0 : 1;
  		var mason = (quota <= 12) ? 0 : 2;
		var fox = (quota <= 4) ? 0 : 1 + Math.floor(quota / 16);
		var cat = 0;
  		if(villageSettings.quota >= 10 && villageSettings.cat) {
  			villager -= 2;
  			wolf++;
  			cat++;
  		}
  		var girl = 0;
  		if(villageSettings.quota >= 10 && villageSettings.girl) {
  			villager -= 2;
  			fanatic++;
  			girl++;
  		}
  		var wizard = 0;
  		if(villageSettings.wizard){
  			if(fanatic == '1〜0'){
  				fanatic = 0;
  				wizard = '1〜0';
  			} else if(fanatic >= 1){
  				fanatic--;
  				wizard++;
  			}
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
