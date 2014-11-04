//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: RolesModel', function() {
	test('getRolesByPlayerID', function(done, server) {
		server.eval(function() {
			Roles.insert({playerID: 'player1'});
			Roles.insert({playerID: 'player2'});
			
			var role = rolesModel.getRolesByPlayerID('player1').fetch();
			emit('check', role.length, 1);
			emit('check', role[0].playerID, 'player1');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getNumberOfRolesByPlayerID', function(done, server) {
		server.eval(function() {
			var IDs = setup();
			var playerIDs = [IDs.villagerID, IDs.wolf1ID, IDs.wolf2ID];
			
			var number = rolesModel.getNumberOfRolesByPlayerID(playerIDs, '人　狼');
			emit('check', number, 2);
			number = rolesModel.getNumberOfRolesByPlayerID(playerIDs, '村　人');
			emit('check', number, 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRolesByVillageID', function(done, server) {
		server.eval(function() {
			Roles.insert({villageID: 'village1'});
			Roles.insert({villageID: 'village1'});
			Roles.insert({villageID: 'village2'});
			
			var role = rolesModel.getRolesByVillageID('village1').fetch();
			emit('check', role.length, 2);
			emit('check', role[0].villageID, 'village1');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRolesByRoleName', function(done, server) {
		server.eval(function() {
			var IDs = setup();
			
			var roles = rolesModel.getRolesByRoleName(IDs.villageID, '人　狼').fetch();
			emit('check', roles.length, 2);
			emit('checkRoles', roles, [IDs.wolf1ID, IDs.wolf2ID]);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkRoles', function(target, expect){
			var i=0;
			var result = [false, false];
			for(i; i<target.length; i++){
				var j=0;
				for(j; j<expect.length; j++){
					if(target[i].playerID == expect[j]){
						result[i] = true;
					}
				}
			}
			assert.equal(result[0] && result[1], true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles', function(done, server) {
		server.eval(function() {
			rolesModel.createRoles('village1', 'player1', '役職未定');
			var role = Roles.findOne({});
			
			emit('check', role.villageID, 'village1');
			emit('check', role.playerID, 'player1');
			emit('check', role.roleName, '役職未定');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateRoles', function(done, server) {
		server.eval(function() {
			rolesModel.createRoles('village1', 'player1', '役職未定');
			var role = Roles.findOne({playerID: 'player1'});
			emit('check', role.roleName, '役職未定');
			
			rolesModel.updateRoles('player1', '村　人');
			var role = Roles.findOne({playerID: 'player1'});
			emit('check', role.roleName, '村　人');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removeRolesByVillageID', function(done, server) {
		server.eval(function() {
			Roles.insert({villageID: 'village1'});
			Roles.insert({villageID: 'village1'});
			Roles.insert({villageID: 'village2'});
			
			
			rolesModel.removeRolesByVillageID('village1');
			var role = Roles.find({villageID: 'village1'}).fetch();
			emit('check', role.length, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getAudienceNumber', function(done, server) {
		server.eval(function() {
			rolesModel.createRoles('village1', 'player1', '役職未定');
			rolesModel.createRoles('village1', 'player1', '観戦者');
			rolesModel.createRoles('village1', 'player2', '観戦者');
			rolesModel.createRoles('village2', 'player3', '観戦者');
			
			var num = rolesModel.getAudienceNumber('village1');
			emit('check', num, 2);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
});