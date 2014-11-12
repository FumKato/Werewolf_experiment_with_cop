//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: RolesController', function() {
	test('getRoleName: seer can get target role name', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.seerID);
			var result = rolesController.getRoleName(IDs.seerID, IDs.wolf1ID);
			emit('check', result, '人　狼');
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRoleName: medium can get target role name', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.mediumID);
			var result = rolesController.getRoleName(IDs.mediumID, IDs.wolf1ID);
			emit('check', result, '人　狼');
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRoleName: girl can get target role name', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.girlID);
			var result = rolesController.getRoleName(IDs.girlID, IDs.wolf1ID);
			emit('check', result, '人　狼');
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRoleName: wizard can get target role name', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.wizardID);
			var result = rolesController.getRoleName(IDs.wizardID, IDs.wolf1ID);
			emit('check', result, '人　狼');
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRoleName: other roles cannot get target role name', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.villagerID);
			var result = rolesController.getRoleName(IDs.villagerID, IDs.wolf1ID);
			emit('check', result, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getRoleName: dead players cannot get target role name', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			Players.update({_id: IDs.seerID}, {$set: {state: '死　亡'}});
			adapt_context(IDs.seerID);
			var result = rolesController.getRoleName(IDs.villageID, IDs.seerID);
			emit('check', result, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishRoles: GM can get all roles', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.GMID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.GMID, phase, '生　存', 'GM').fetch();
			emit('check', results.length, 16);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishRoles: wolf can get colleague roles', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.wolf1ID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.wolf1ID, phase, '生　存', '人　狼').fetch();
			emit('check', results.length, 2);
			for(var i=0; i<results.length; i++){
				emit('check', results[i].roleName, '人　狼');
			}
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishRoles: mason can get colleague roles', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.mason1ID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.mason1ID, phase, '生　存', '共有者').fetch();
			emit('check', results.length, 2);
			for(var i=0; i<results.length; i++){
				emit('check', results[i].roleName, '共有者');
			}
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishRoles: other roles can get only own roles', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.villagerID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.villagerID, phase, '生　存', '村　人').fetch();
			emit('check', results.length, 1);
			for(var i=0; i<results.length; i++){
				emit('check', results[i].roleName, '村　人');
			}
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishRoles: all players can get all roles if phase is 事件終了', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '事件終了');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.villagerID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.villagerID, phase, '生　存', '村　人').fetch();
			emit('check', results.length, 16);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishRoles: dead players can get all roles', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			adapt_context(IDs.villagerID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.villagerID, phase, '死　亡', '村　人').fetch();
			emit('check', results.length, 16);
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