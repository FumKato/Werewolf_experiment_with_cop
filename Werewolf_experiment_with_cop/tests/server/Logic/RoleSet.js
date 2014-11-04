var assert = require('assert');

var check = function(results, expects){
		assert.equal(results.villager, expects.villager);
		assert.equal(results.wolf, expects.wolf);
		assert.equal(results.seer, expects.seer);
		assert.equal(results.medium, expects.medium);
		assert.equal(results.fanatic, expects.fanatic);
		assert.equal(results.hunter, expects.hunter);
		assert.equal(results.mason, expects.mason);
		assert.equal(results.fox, expects.fox);
		assert.equal(results.cat, expects.cat);
		assert.equal(results.girl, expects.girl);
		assert.equal(results.wizard, expects.wizard);
};

suite('Server: RoleSet', function() {
	test('createRoles: success to create with roleset A', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: false,
				roleset : 'A'
			};
			var villageID = Villages.insert({settings: villageSettings});
			
			var expects = {
				villager: 8,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSet().createRoles(villageID);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: success to create with roleset B', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: false,
				roleset : 'B'
			};
			var villageID = Villages.insert({settings: villageSettings});
			
			var expects = {
				sum: 18,
				villager: 7,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSet().createRoles(villageID);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: success to create with roleset C', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: false,
				roleset : 'C'
			};
			var villageID = Villages.insert({settings: villageSettings});
			
			var expects = {
				sum: 18,
				villager: 4,
				wolf: 3,
				seer: 2,
				medium: 2,
				fanatic: 2,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSet().createRoles(villageID);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: failed to create because of invalid villageID', function(done, server) {
		server.eval(function() {
			var villageID = 'invalidVillageID';
			var results = new RoleSet().createRoles(villageID);
			
			emit('check', results, null);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: failed to create because of invalid roleset', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: false,
				roleset : null
			};
			var villageID = Villages.insert({settings: villageSettings});
			
			var results = new RoleSet().createRoles(villageID);
			
			emit('check', results, null);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return true in roleset A', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 10,
				girl: false,
				roleset : 'A'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, true);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return false in roleset A', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 9,
				girl: false,
				roleset : 'A'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, false);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return true in roleset B, quota is 8', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 8,
				girl: false,
				roleset : 'B'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, true);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return true in roleset B, quota is 10 with girl', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 10,
				girl: true,
				roleset : 'B'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, true);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return true in roleset B, quota is 11', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 11,
				girl: false,
				roleset : 'B'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, true);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return false in roleset B, quota is 7', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 7,
				girl: true,
				roleset : 'B'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, false);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return false in roleset B, quota is 10', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 10,
				girl: false,
				roleset : 'B'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, false);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return true in roleset C, quota is 5', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 5,
				girl: false,
				roleset : 'C'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, true);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkWizard: return false in roleset C, quota is 4', function(done, server){
		server.eval(function(){
			var villageSettings = {
				quota: 4,
				girl: false,
				roleset : 'C'
			};
			
			var result = new RoleSet().checkWizard(villageSettings);
			emit('check', result, false);
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('setRoles: roleset is C and quota is 4', function(done, server){
		server.eval(function() {
			var quota = 4;
			var villageID = Villages.insert({});
			var playerID = Players.insert({villageID: villageID, tripKey: 'shonich＊', isPlayer: true, state: '生　存'});
			Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			
			var i = 0;
			for(i; i<quota - 1; i++){
				var playerID = Players.insert({villageID: villageID, tripKey: i, isPlayer: true, state: '生　存'});
				Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			}
			
			var roles = {
				sum: 4,
				villager: 1,
				wolf: 1,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 0,
				cat: 0,
				girl: 0,
				wizard: 0
			};
			
			new RoleSet().setRoles(villageID, roles);
			
			var results = {
				sum: Roles.find({}).count(),
				villager: Roles.find({roleName: '村　人'}).count(),
				wolf: Roles.find({roleName: '人　狼'}).count(),
				seer: Roles.find({roleName: '占い師'}).count(),
				medium: Roles.find({roleName: '霊能者'}).count(),
				fanatic: Roles.find({roleName: '狂　人'}).count(),
				hunter: Roles.find({roleName: '狩　人'}).count(),
				mason: Roles.find({roleName: '共有者'}).count(),
				fox: Roles.find({roleName: '妖　狐'}).count(),
				cat: Roles.find({roleName: '猫　又'}).count(),
				girl: Roles.find({roleName: '少　女'}).count(),
				wizard: Roles.find({roleName: '妖術師'}).count()
			};
			
			emit('check', results, roles);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results.sum, expects.sum);
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('setRoles: roleset is B and quota is 12', function(done, server){
		server.eval(function() {
			var quota = 12;
			var villageID = Villages.insert({});
			var playerID = Players.insert({villageID: villageID, tripKey: 'shonich＊', isPlayer: true, state: '生　存'});
			Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			
			var i = 0;
			for(i; i<quota - 1; i++){
				var playerID = Players.insert({villageID: villageID, tripKey: i, isPlayer: true, state: '生　存'});
				Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			}
			
			var roles = {
				sum: 12,
				villager: 5,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};
			
			new RoleSet().setRoles(villageID, roles);
			
			var results = {
				sum: Roles.find({}).count(),
				villager: Roles.find({roleName: '村　人'}).count(),
				wolf: Roles.find({roleName: '人　狼'}).count(),
				seer: Roles.find({roleName: '占い師'}).count(),
				medium: Roles.find({roleName: '霊能者'}).count(),
				fanatic: Roles.find({roleName: '狂　人'}).count(),
				hunter: Roles.find({roleName: '狩　人'}).count(),
				mason: Roles.find({roleName: '共有者'}).count(),
				fox: Roles.find({roleName: '妖　狐'}).count(),
				cat: Roles.find({roleName: '猫　又'}).count(),
				girl: Roles.find({roleName: '少　女'}).count(),
				wizard: Roles.find({roleName: '妖術師'}).count()
			};
			
			emit('check', results, roles);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results.sum, expects.sum);
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('setRoles with cat and girl and wizard: roleset is B and quota is 12', function(done, server){
		server.eval(function() {
			var quota = 12;
			var villageID = Villages.insert({});
			var playerID = Players.insert({villageID: villageID, tripKey: 'shonich＊', isPlayer: true, state: '生　存'});
			Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			
			var i = 0;
			for(i; i<quota - 1; i++){
				var playerID = Players.insert({villageID: villageID, tripKey: i, isPlayer: true, state: '生　存'});
				Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			}
			
			var roles = {
				sum: 12,
				villager: 1,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 1,
				girl: 1,
				wizard: 1
			};
			
			new RoleSet().setRoles(villageID, roles);
			
			var results = {
				sum: Roles.find({}).count(),
				villager: Roles.find({roleName: '村　人'}).count(),
				wolf: Roles.find({roleName: '人　狼'}).count(),
				seer: Roles.find({roleName: '占い師'}).count(),
				medium: Roles.find({roleName: '霊能者'}).count(),
				fanatic: Roles.find({roleName: '狂　人'}).count(),
				hunter: Roles.find({roleName: '狩　人'}).count(),
				mason: Roles.find({roleName: '共有者'}).count(),
				fox: Roles.find({roleName: '妖　狐'}).count(),
				cat: Roles.find({roleName: '猫　又'}).count(),
				girl: Roles.find({roleName: '少　女'}).count(),
				wizard: Roles.find({roleName: '妖術師'}).count()
			};
			
			emit('check', results, roles);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results.sum, expects.sum);
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('setRoles: roleset is A and quota is 18', function(done, server){
		server.eval(function() {
			var quota = 18;
			var villageID = Villages.insert({});
			var playerID = Players.insert({villageID: villageID, tripKey: 'shonich＊', isPlayer: true, state: '生　存'});
			Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			
			var i = 0;
			for(i; i<quota - 1; i++){
				var playerID = Players.insert({villageID: villageID, tripKey: i, isPlayer: true, state: '生　存'});
				Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			}
			
			var roles = {
				sum: 18,
				villager: 8,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};
			
			new RoleSet().setRoles(villageID, roles);
			
			var results = {
				sum: Roles.find({}).count(),
				villager: Roles.find({roleName: '村　人'}).count(),
				wolf: Roles.find({roleName: '人　狼'}).count(),
				seer: Roles.find({roleName: '占い師'}).count(),
				medium: Roles.find({roleName: '霊能者'}).count(),
				fanatic: Roles.find({roleName: '狂　人'}).count(),
				hunter: Roles.find({roleName: '狩　人'}).count(),
				mason: Roles.find({roleName: '共有者'}).count(),
				fox: Roles.find({roleName: '妖　狐'}).count(),
				cat: Roles.find({roleName: '猫　又'}).count(),
				girl: Roles.find({roleName: '少　女'}).count(),
				wizard: Roles.find({roleName: '妖術師'}).count()
			};
			
			emit('check', results, roles);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results.sum, expects.sum);
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('setRoles with cat and girl and wizard: roleset is A and quota is 18', function(done, server){
		server.eval(function() {
			var quota = 18;
			var villageID = Villages.insert({});
			var playerID = Players.insert({villageID: villageID, tripKey: 'shonich＊', isPlayer: true, state: '生　存'});
			Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			
			var i = 0;
			for(i; i<quota - 1; i++){
				var playerID = Players.insert({villageID: villageID, tripKey: i, isPlayer: true, state: '生　存'});
				Roles.insert({villageID: villageID, playerID: playerID, roleName: '役職未定'});
			}
			
			var roles = {
				sum: 18,
				villager: 4,
				wolf: 4,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 1,
				cat: 1,
				girl: 1,
				wizard: 1
			};
			
			new RoleSet().setRoles(villageID, roles);
			
			var results = {
				sum: Roles.find({}).count(),
				villager: Roles.find({roleName: '村　人'}).count(),
				wolf: Roles.find({roleName: '人　狼'}).count(),
				seer: Roles.find({roleName: '占い師'}).count(),
				medium: Roles.find({roleName: '霊能者'}).count(),
				fanatic: Roles.find({roleName: '狂　人'}).count(),
				hunter: Roles.find({roleName: '狩　人'}).count(),
				mason: Roles.find({roleName: '共有者'}).count(),
				fox: Roles.find({roleName: '妖　狐'}).count(),
				cat: Roles.find({roleName: '猫　又'}).count(),
				girl: Roles.find({roleName: '少　女'}).count(),
				wizard: Roles.find({roleName: '妖術師'}).count()
			};
			
			emit('check', results, roles);
			
			emit('done');
		});
		
		server.on('check', function(results, expects){
			assert.equal(results.sum, expects.sum);
			check(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
});