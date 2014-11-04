var assert = require('assert');

suite('Server: GameManager', function() {
	
	test('executeActions: victim is killed on the 1stDay', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			
			var victim = Players.findOne({_id: IDs.victimID});
			emit('check', victim.state, '生　存');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			victim = Players.findOne({_id: IDs.victimID});
			emit('check', victim.state, '死　亡');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: one player is killed', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			var seer = Players.findOne({_id: IDs.seerID});
			emit('check', seer.state, '生　存');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.seerID, 'wolf');
			phase.day = 1;
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.villagerID, 'wolf');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			villager = Players.findOne({_id: IDs.villagerID});
			seer = Players.findOne({_id: IDs.seerID});
			emit('check', villager.state, '生　存');
			emit('check', seer.state, '死　亡');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: one player is killed even if two wolf actions exist', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			var seer = Players.findOne({_id: IDs.seerID});
			emit('check', seer.state, '生　存');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.seerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.villagerID, 'wolf');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			villager = Players.findOne({_id: IDs.villagerID});
			seer = Players.findOne({_id: IDs.seerID});
			emit('checkStates', villager, seer);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkStates', function(target1, target2){
			var flag1 = target1.state == '生　存'  && target2.state == '死　亡';
			var flag2 = target1.state == '死　亡'  && target2.state == '生　存';
			assert.equal(flag1 || flag2, true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: one wolf is killed if no wolf actions exist', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			var wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', wolf2.state, '生　存');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			wolf1 = Players.findOne({_id: IDs.wolf1ID});
			wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('checkStates', wolf1, wolf2);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkStates', function(target1, target2){
			var flag1 = target1.state == '生　存'  && target2.state == '死　亡';
			var flag2 = target1.state == '死　亡'  && target2.state == '生　存';
			assert.equal(flag1 || flag2, true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: one wolf is killed if no wolf actions exist and exist in last day', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			var wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', wolf2.state, '生　存');
			
			phase.day = 2;
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.fox1ID, 'wolf');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			wolf1 = Players.findOne({_id: IDs.wolf1ID});
			wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('checkStates', wolf1, wolf2);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkStates', function(target1, target2){
			var flag1 = target1.state == '生　存'  && target2.state == '死　亡';
			var flag2 = target1.state == '死　亡'  && target2.state == '生　存';
			assert.equal(flag1 || flag2, true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: fox1 is not killed even if fox1 is the target of wolf', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var fox1 = Players.findOne({_id: IDs.fox1ID});
			emit('check', fox1.state, '生　存');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.fox1ID, 'wolf');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			fox1 = Players.findOne({_id: IDs.fox1ID});
			emit('check', fox1.state, '生　存');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: guarded player is not killed', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: past guard action is invalid', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'wolf');
			phase.day = 1;
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'guard');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '死　亡');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: cat kills one wolf when cat is killed', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			var wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', wolf2.state, '生　存');
			var cat = Players.findOne({_id: IDs.catID});
			emit('check', cat.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.catID, 'wolf');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			cat = Players.findOne({_id: IDs.catID});
			wolf1 = Players.findOne({_id: IDs.wolf1ID});
			wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', cat.state, '死　亡');
			emit('checkStates', wolf1, wolf2);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkStates', function(target1, target2){
			var flag1 = target1.state == '生　存'  && target2.state == '死　亡';
			var flag2 = target1.state == '死　亡'  && target2.state == '生　存';
			assert.equal(flag1 || flag2, true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: cat does not kills one wolf when cat is guarded', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			var wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', wolf2.state, '生　存');
			var cat = Players.findOne({_id: IDs.catID});
			emit('check', cat.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.catID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.catID, 'guard');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			cat = Players.findOne({_id: IDs.catID});
			wolf1 = Players.findOne({_id: IDs.wolf1ID});
			wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', cat.state, '生　存');
			emit('check', wolf1.state, '生　存');
			emit('check', wolf2.state, '生　存');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkStates', function(target1, target2){
			var flag1 = target1.state == '生　存'  && target2.state == '死　亡';
			var flag2 = target1.state == '死　亡'  && target2.state == '生　存';
			assert.equal(flag1 || flag2, true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: fox1 is killed by seer', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var fox1 = Players.findOne({_id: IDs.fox1ID});
			emit('check', fox1.state, '生　存');
			var fox2 = Players.findOne({_id: IDs.fox2ID});
			emit('check', fox2.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.fox1ID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.fox1ID, 'seer');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			fox1 = Players.findOne({_id: IDs.fox1ID});
			fox2 = Players.findOne({_id: IDs.fox2ID});
			emit('check', fox1.state, '死　亡');
			emit('check', fox2.state, '生　存');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: fox1 is killed by seer even if guarded', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var fox1 = Players.findOne({_id: IDs.fox1ID});
			emit('check', fox1.state, '生　存');
			var fox2 = Players.findOne({_id: IDs.fox2ID});
			emit('check', fox2.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.fox1ID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.fox1ID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.fox1ID, 'guard');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			fox1 = Players.findOne({_id: IDs.fox1ID});
			fox2 = Players.findOne({_id: IDs.fox2ID});
			emit('check', fox1.state, '死　亡');
			emit('check', fox2.state, '生　存');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('executeActions: two foxes are killed by two seer actions', function(done, server) {
		server.eval(function() {
			var IDs = setup(3, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			
			var fox1 = Players.findOne({_id: IDs.fox1ID});
			emit('check', fox1.state, '生　存');
			var fox2 = Players.findOne({_id: IDs.fox2ID});
			emit('check', fox2.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.fox1ID, 'wolf');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.fox1ID, 'seer');
			actionsModel.createActions(IDs.villageID, phase, IDs.villagerID, IDs.fox2ID, 'seer');
			
			var gameManager = new GameManager();
			gameManager.executeActions(IDs.villageID);
			fox1 = Players.findOne({_id: IDs.fox1ID});
			fox2 = Players.findOne({_id: IDs.fox2ID});
			emit('check', fox1.state, '死　亡');
			emit('check', fox2.state, '死　亡');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('generateVoteResult: decide villager', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夕方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			var gameManager = new GameManager();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.villagerID, IDs.wolf1ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox2ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.catID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.girlID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wizardID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.victimID, IDs.villagerID, 'vote');
			var result = gameManager.generateVoteResult(IDs.villageID);
			emit('cehck', result, true);
			villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '死　亡');
			
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('generateVoteResult: return true if penalty player got the most votes', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夕方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			var gameManager = new GameManager();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox2ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.catID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.victimID, IDs.villagerID, 'vote');
			var result = gameManager.generateVoteResult(IDs.villageID);
			emit('cehck', result, false);
			villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '死　亡');
			
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('generateVoteResult: two or more players die because of penalty', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夕方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			var gameManager = new GameManager();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			var wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			var wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', wolf2.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox2ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.catID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.victimID, IDs.villagerID, 'vote');
			var result = gameManager.generateVoteResult(IDs.villageID);
			emit('cehck', result, false);
			villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '死　亡');
			wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '死　亡');
			wolf2 = Players.findOne({_id: IDs.wolf2ID});
			emit('check', wolf2.state, '死　亡');
			
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('generateVoteResult: decide cat and cat kills one player', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夕方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			var gameManager = new GameManager();
			
			var cat = Players.findOne({_id: IDs.catID});
			emit('check', cat.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.villagerID, IDs.wolf1ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox1ID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox2ID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.catID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.girlID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wizardID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.victimID, IDs.catID, 'vote');
			var result = gameManager.generateVoteResult(IDs.villageID);
			emit('cehck', result, true);
			cat = Players.findOne({_id: IDs.catID});
			emit('check', cat.state, '死　亡');
			var players = Players.find({characterName: {$ne: 'cat'}}).fetch();
			emit('checkPlayersState', players);
			
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('checkPlayersState', function(players){
			var i=0;
			var result = true;
			for(i; i<players.length; i++){
				if(players[i].state == '死　亡'){
					players.splice(i, 1);
					break;
				}
			}
			for(i=0; i<players.length; i++){
				if(players[i].state == '死　亡'){
					result = false;
				}
			}
			assert.equal(result, true);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('generateVoteResult: return false because more than two players got the most vote', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夕方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var actionsModel = new ActionsModel();
			var gameManager = new GameManager();
			
			var villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			var wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			
			actionsModel.createActions(IDs.villageID, phase, IDs.villagerID, IDs.wolf1ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf1ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wolf2ID, IDs.wolf1ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.seerID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox1ID, IDs.wolf1ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.fox2ID, IDs.villagerID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.catID, IDs.catID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.girlID, IDs.fox2ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.wizardID, IDs.girlID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.hunterID, IDs.fox1ID, 'vote');
			actionsModel.createActions(IDs.villageID, phase, IDs.victimID, IDs.catID, 'vote');
			var result = gameManager.generateVoteResult(IDs.villageID);
			emit('cehck', result, false);
			villager = Players.findOne({_id: IDs.villagerID});
			emit('check', villager.state, '生　存');
			wolf1 = Players.findOne({_id: IDs.wolf1ID});
			emit('check', wolf1.state, '生　存');
			
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: draw because nobody live', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			
			playersModel.killPlayers(IDs.villagerID);
			playersModel.killPlayers(IDs.wolf1ID);
			playersModel.killPlayers(IDs.wolf2ID);
			playersModel.killPlayers(IDs.seerID);
			playersModel.killPlayers(IDs.hunterID);
			playersModel.killPlayers(IDs.fox1ID);
			playersModel.killPlayers(IDs.fox2ID);
			playersModel.killPlayers(IDs.victimID);
			playersModel.killPlayers(IDs.catID);
			playersModel.killPlayers(IDs.girlID);
			playersModel.killPlayers(IDs.wizardID);
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
			emit('check', result, true);
			var sentence = '<span class="result draw">引き分け</span>です<br>そして誰もいなくなった';
			var count = ChatLogs.find({type: 'normal'}).count();
			emit('check', count, 1);
			var chatLog = ChatLogs.findOne({type: 'normal'});
			var index = chatLog.sentence.indexOf('<span class="result draw">引き分け</span>です<br>そして誰もいなくなった');
			emit('check', index, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: fox wins instead of villager', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			
			playersModel.killPlayers(IDs.wolf1ID);
			playersModel.killPlayers(IDs.wolf2ID);
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
			emit('check', result, true);
			var count = ChatLogs.find({type: 'normal'}).count();
			emit('check', count, 1);
			var chatLog = ChatLogs.findOne({type: 'normal'});
			var index = chatLog.sentence.indexOf('<span class="result fox">妖　狐</span>の勝利です<br>間抜けな村人共を騙す事など容易いことよ');
			emit('check', index, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: villager wins', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			
			playersModel.killPlayers(IDs.wolf1ID);
			playersModel.killPlayers(IDs.wolf2ID);
			playersModel.killPlayers(IDs.fox1ID);
			playersModel.killPlayers(IDs.fox2ID);
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
			emit('check', result, true);
			var count = ChatLogs.find({type: 'normal'}).count();
			emit('check', count, 1);
			var chatLog = ChatLogs.findOne({type: 'normal'});
			var index = chatLog.sentence.indexOf('<span class="result">村人達</span>の勝利です<br>人狼の血を根絶することに成功しました');
			emit('check', index, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: fox wins instead of wolf', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			
			playersModel.killPlayers(IDs.hunterID);
			playersModel.killPlayers(IDs.victimID);
			playersModel.killPlayers(IDs.catID);
			playersModel.killPlayers(IDs.villagerID);
			playersModel.killPlayers(IDs.girlID);
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
			emit('check', result, true);
			var count = ChatLogs.find({type: 'normal'}).count();
			emit('check', count, 1);
			var chatLog = ChatLogs.findOne({type: 'normal'});
			var index = chatLog.sentence.indexOf('<span class="result fox">妖　狐</span>の勝利です<br>間抜けな人狼共を騙す事など容易いことよ');
			emit('check', index, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: wolf wins', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			
			playersModel.killPlayers(IDs.villagerID);
			playersModel.killPlayers(IDs.seerID);
			playersModel.killPlayers(IDs.hunterID);
			playersModel.killPlayers(IDs.girlID);
			playersModel.killPlayers(IDs.wizardID);
			playersModel.killPlayers(IDs.fox1ID);
			playersModel.killPlayers(IDs.fox2ID);
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
			emit('check', result, true);
			var count = ChatLogs.find({type: 'normal'}).count();
			emit('check', count, 1);
			var chatLog = ChatLogs.findOne({type: 'normal'});
			var index = chatLog.sentence.indexOf('<span class="result wolfOrGM">人　狼</span>の勝利です<br>最後の獲物を食い尽くすと、次の獲物を求めて旅立った');
			emit('check', index, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: draw because revote 5 times', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			Phases.update({_id: IDs.phaseID}, {$set: {revote: 0}});
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
			emit('check', result, true);
			var count = ChatLogs.find({type: 'normal'}).count();
			emit('check', count, 1);
			var chatLog = ChatLogs.findOne({type: 'normal'});
			var index = chatLog.sentence.indexOf('<span class="result draw">引き分け</span>です<br>村人達の議論は延々と続くのであった...');
			emit('check', index, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('judge: return false', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var playersModel = new PlayersModel();
			
			var gameManager = new GameManager();
			var result = gameManager.judge(IDs.villageID);
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