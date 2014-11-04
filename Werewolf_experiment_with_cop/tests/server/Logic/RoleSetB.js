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
		assert.equal(results.sum, expects.sum);
};

var checkBreakdown = function(results, expects){
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

suite('Server: RoleSetB', function() {
	test('createRoles: quota is 4', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 4,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 4,
				villager: 3,
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 0,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			var flag = results.villager > 0 && results.villager <= expects.villager;
			assert.equal(flag, true);
			assert.equal(results.wolf, expects.wolf);
			flag = results.seer >= 0 && results.seer <= expects.seer;
			assert.equal(flag, true);
			assert.equal(results.medium, expects.medium);
			assert.equal(results.fanatic, expects.fanatic);
			assert.equal(results.hunter, expects.hunter);
			assert.equal(results.mason, expects.mason);
			assert.equal(results.fox, expects.fox);
			assert.equal(results.cat, expects.cat);
			assert.equal(results.girl, expects.girl);
			assert.equal(results.wizard, expects.wizard);
			assert.equal(results.sum, expects.sum);
			
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: quota is 5', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 5,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 5,
				villager: 2,
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 6', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 6,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 6,
				villager: 3,
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 7', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 7,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 7,
				villager: 4,
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 8', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 8,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 8,
				villager: 5,
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 1,
				hunter: 0,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			var flag = results.villager > 0 && results.villager <= expects.villager;
			assert.equal(flag, true);
			assert.equal(results.wolf, expects.wolf);
			assert.equal(results.seer, expects.seer);
			assert.equal(flag, true);
			assert.equal(results.medium, expects.medium);
			flag = results.fanatic >= 0 && results.fanatic <= expects.fanatic;
			assert.equal(flag, true);
			assert.equal(results.hunter, expects.hunter);
			assert.equal(results.mason, expects.mason);
			assert.equal(results.fox, expects.fox);
			assert.equal(results.cat, expects.cat);
			assert.equal(results.girl, expects.girl);
			assert.equal(results.wizard, expects.wizard);
			assert.equal(results.sum, expects.sum);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: quota is 9', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 9,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 9,
				villager: 3,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 10', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 10,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 10,
				villager: 4,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 11', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 11,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 11,
				villager: 4,
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 12', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 12,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 13', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 13,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 13,
				villager: 4,
				wolf: 2,
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 14', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 14,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 14,
				villager: 5,
				wolf: 2,
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 15', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 15,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 15,
				villager: 6,
				wolf: 2,
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 16', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 16,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 16,
				villager: 5,
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 17', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 17,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 17,
				villager: 6,
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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 18', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: false
			};

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

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 9 with cat: cat does not appear', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 9,
				cat: true,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 9,
				villager: 3,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 10 with cat: cat appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 10,
				cat: true,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 10,
				villager: 2,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 1,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 14 with cat: cat appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 14,
				cat: true,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 14,
				villager: 3,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 1,
				cat: 1,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 18 with cat: cat appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: true,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 18,
				villager: 5,
				wolf: 4,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 1,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 9 with girl: girl does not appear', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 9,
				cat: false,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 9,
				villager: 3,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 10 with girl: girl appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 10,
				cat: false,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 10,
				villager: 2,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 1,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 14 with girl: girl appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 14,
				cat: false,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 14,
				villager: 3,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 2,
				hunter: 1,
				mason: 2,
				fox: 1,
				cat: 0,
				girl: 1,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 18 with girl: girl appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 18,
				villager: 5,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 2,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 0,
				girl: 1,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 8 with wizard: wizard may appear', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 8,
				cat: false,
				girl: false,
				wizard: true
			};

			var expects = {
				sum: 8,
				villager: 5,
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 1
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			var flag = results.villager > 0 && results.villager <= expects.villager;
			assert.equal(flag, true);
			assert.equal(results.wolf, expects.wolf);
			assert.equal(results.seer, expects.seer);
			assert.equal(flag, true);
			assert.equal(results.medium, expects.medium);
			assert.equal(results.fanatic, expects.fanatic);
			assert.equal(results.hunter, expects.hunter);
			assert.equal(results.mason, expects.mason);
			assert.equal(results.fox, expects.fox);
			assert.equal(results.cat, expects.cat);
			assert.equal(results.girl, expects.girl);
			flag = results.wizard >= 0 && results.wizard <= expects.wizard;
			assert.equal(flag, true);
			assert.equal(results.sum, expects.sum);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoles: quota is 9 with wizard: wizard does not appear', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 9,
				cat: false,
				girl: false,
				wizard: true
			};

			var expects = {
				sum: 9,
				villager: 3,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 11 with wizard: wizard appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 11,
				cat: false,
				girl: false,
				wizard: true
			};

			var expects = {
				sum: 11,
				villager: 4,
				wolf: 2,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: 1
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 18 with wizard: wizard appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: true
			};

			var expects = {
				sum: 18,
				villager: 7,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 0,
				girl: 0,
				wizard: 1
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 10 with cat and girl: cat and girl appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 10,
				cat: true,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 10,
				villager: 0,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 1,
				girl: 1,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 10 with cat and girl and wizard: cat and girl and wizard appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 10,
				cat: true,
				girl: true,
				wizard: true
			};

			var expects = {
				sum: 10,
				villager: 0,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 1,
				girl: 1,
				wizard: 1
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	
	test('createRoles: quota is 14 with cat and girl: cat and girl appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 14,
				cat: true,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 14,
				villager: 1,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 2,
				hunter: 1,
				mason: 2,
				fox: 1,
				cat: 1,
				girl: 1,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 18 with cat and girl: cat and girl appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: true,
				girl: true,
				wizard: false
			};

			var expects = {
				sum: 18,
				villager: 3,
				wolf: 4,
				seer: 1,
				medium: 1,
				fanatic: 2,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 1,
				girl: 1,
				wizard: 0
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoles: quota is 18 with cat and girl and wizard: cat and girl and wizard appears', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: true,
				girl: true,
				wizard: true
			};

			var expects = {
				sum: 18,
				villager: 3,
				wolf: 4,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 1,
				girl: 1,
				wizard: 1
			};

			var results = new RoleSetB().createRoles(villageSettings);
			results.sum = results.villager + results.wolf + results.seer +
				results.medium + results.fanatic + results.hunter +
				results.mason + results.fox +
				results.cat + results.girl + results.wizard;
			
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
	
	test('createRoleBreakdown: quota is 4', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 4,
				cat: false,
				girl: false,
				wizard: false
			};

			var expects = {
				sum: 4,
				villager: '2〜3',
				wolf: 1,
				seer: '1〜0',
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 0,
				cat: 0,
				girl: 0,
				wizard: 0
			};

			var results = new RoleSetB().createRoleBreakdown(villageSettings);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			checkBreakdown(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoleBreakdown with cat and girl and wizard: quota is 8', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 8,
				cat: true,
				girl: true,
				wizard: true
			};

			var expects = {
				sum: 8,
				villager: '4〜5',
				wolf: 1,
				seer: 1,
				medium: 0,
				fanatic: 0,
				hunter: 0,
				mason: 0,
				fox: 1,
				cat: 0,
				girl: 0,
				wizard: '1〜0'
			};

			var results = new RoleSetB().createRoleBreakdown(villageSettings);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			checkBreakdown(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoleBreakdown with cat and girl and wizard: quota is 10 ', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 10,
				cat: true,
				girl: true,
				wizard: true
			};

			var expects = {
				sum: 10,
				villager: 0,
				wolf: 3,
				seer: 1,
				medium: 1,
				fanatic: 0,
				hunter: 1,
				mason: 0,
				fox: 1,
				cat: 1,
				girl: 1,
				wizard: 1
			};

			var results = new RoleSetB().createRoleBreakdown(villageSettings);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			checkBreakdown(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoleBreakdown: quota is 18', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: false,
				girl: false,
				wizard: false
			};

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

			var results = new RoleSetB().createRoleBreakdown(villageSettings);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			checkBreakdown(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createRoleBreakdown with cat and girl and wizard: quota is 18', function(done, server) {
		server.eval(function() {
			var villageSettings = {
				quota: 18,
				cat: true,
				girl: true,
				wizard: true
			};

			var expects = {
				sum: 18,
				villager: 3,
				wolf: 4,
				seer: 1,
				medium: 1,
				fanatic: 1,
				hunter: 1,
				mason: 2,
				fox: 2,
				cat: 1,
				girl: 1,
				wizard: 1
			};

			var results = new RoleSetB().createRoleBreakdown(villageSettings);
			
			emit('checkRoleSet', results, expects);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(results, expects){
			checkBreakdown(results, expects);
		});
		
		server.once('done', function(){
			done();
		});
	});
});