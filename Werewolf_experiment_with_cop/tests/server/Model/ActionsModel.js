//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: ActionsModel', function() {
	test('createActions: make target of wolf actions victim on the first day', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs.length, 0);
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			var action = Actions.findOne({});
			emit('check', action.from, IDs.wolf1ID);
			emit('check', action.to, IDs.victimID);
			chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs.length, 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: success to create actions except wolf on the first day', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			var action = Actions.findOne({});
			emit('check', action.from, IDs.seerID);
			emit('check', action.to, IDs.villagerID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: success to create actions', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.villagerID, 'wolf');
			var action = Actions.findOne({});
			emit('check', action.from, IDs.wolf2ID);
			emit('check', action.to, IDs.villagerID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateActions: success to update wolf actions with from IDs', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			var action = Actions.findOne({});
			emit('check', action.from, IDs.wolf1ID);
			emit('check', action.to, IDs.villagerID);
			
			actionsModel.updateActions(IDs.villageID, phase, IDs.wolf2ID, IDs.seerID, 'wolf');
			action = Actions.findOne({});
			emit('check', action.from, IDs.wolf2ID);
			emit('check', action.to, IDs.seerID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateActions: success to update wolf actions with from IDs', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			var action = Actions.findOne({});
			emit('check', action.from, IDs.seerID);
			emit('check', action.to, IDs.villagerID);
			
			actionsModel.updateActions(IDs.villageID, phase, IDs.seerID, IDs.wolf1ID, 'seer');
			action = Actions.findOne({});
			emit('check', action.from, IDs.seerID);
			emit('check', action.to, IDs.wolf1ID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getActionsByPlayerID: return the one actions wtih phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			phase.day = 4;
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.wolf1ID, 'seer');
			var action = actionsModel.getActionsByPlayerID(IDs.villageID, phase, IDs.seerID).fetch();
			emit('check', action.length, 1);
			emit('check', action[0].from, IDs.seerID);
			emit('check', action[0].to, IDs.wolf1ID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getActionsByPlayerID: return the all actions (not wolf) according to playerID', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			phase.day = 4;
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.wolf1ID, 'seer');
			var action = actionsModel.getActionsByPlayerID(IDs.villageID, null, IDs.seerID).fetch();
			emit('check', action.length, 2);
			emit('check', action[0].from, IDs.seerID);
			emit('check', action[0].to, IDs.villagerID);
			emit('check', action[1].from, IDs.seerID);
			emit('check', action[1].to, IDs.wolf1ID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getActionsByPlayerID: return the all wolf actions according to playerID', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			phase.day = 4;
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			var action = actionsModel.getActionsByPlayerID(IDs.villageID, null, IDs.wolf1ID).fetch();
			emit('check', action.length, 2);
			emit('check', action[0].from, IDs.wolf1ID);
			emit('check', action[0].to, IDs.villagerID);
			emit('check', action[1].from, IDs.wolf2ID);
			emit('check', action[1].to, IDs.victimID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getActionsByTargetPlayerID', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '夕方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.catID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.foxID, IDs.villagerID, 'vote');
			var action = actionsModel.getActionsByTargetPlayerID(IDs.villageID, phase, IDs.villagerID).fetch();
			emit('check', action.length, 3);
			emit('check', action[0].from, IDs.wolf1ID);
			emit('check', action[0].to, IDs.villagerID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getActionsByType', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			phase.day = 4;
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			var action = actionsModel.getActionsByType(IDs.villageID, phase, 'wolf');
			emit('check', action.length, 2);
			emit('check', action[0].from, IDs.wolf1ID);
			emit('check', action[0].to, IDs.villagerID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removeActionsByType', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			phase.day = 4;
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			var action = actionsModel.getActionsByType(IDs.villageID, phase, 'wolf');
			emit('check', action.length, 2);
			emit('check', action[0].from, IDs.wolf1ID);
			emit('check', action[0].to, IDs.villagerID);
			actionsModel.removeActionsByType(IDs.villageID, phase, 'wolf');
			action = actionsModel.getActionsByType(IDs.villageID, phase, 'wolf');
			emit('check', action.length, 0);
			phase.day = 3;
			action = actionsModel.getActionsByType(IDs.villageID, phase, 'wolf');
			emit('check', action.length, 2);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkExistence: return true when wolf action does not exist in the phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			
			phase.day = 4;
			var result = actionsModel.checkExistence(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			emit('check', result, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkExistence: return true when action (not wolf) does not exist in the phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.victimID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			
			phase.day = 4;
			var result = actionsModel.checkExistence(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'seer');
			emit('check', result, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkExistence: return false when wolf action exists in the phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			
			var result = actionsModel.checkExistence(IDs.villageID, phase, IDs.wolf2ID, 'wolf');
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkExistence: return false when action (not wolf) exists in the phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			
			var result = actionsModel.checkExistence(IDs.villageID, phase, IDs.seerID, 'seer');
			emit('check', result, false);
			
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