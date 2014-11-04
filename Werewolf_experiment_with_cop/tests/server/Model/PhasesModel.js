//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: PhasesModel', function() {
	test('createPhases', function(done, server) {
		server.eval(function() {
			var villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			var phase = Phases.find({}).fetch();
			emit('checkPhase', phase, 0);
			
			villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			phase = Phases.find({}).fetch();
			emit('checkPhase', phase, 1);
			
			emit('done');
		});
		
		server.on('checkPhase', function(phase, num){
			assert.equal(phase.length, num + 1);
			assert.equal(phase[num].phase, '事件前');
			assert.equal(phase[num].day, 1);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getPhasesByVillageID', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			Phases.update({villageID: villageID}, {$set: {day: 2, phase: '昼'}});
			
			var phase = phasesModel.getPhasesByVillageID(villageID);
			emit('checkPhase', phase);
		});
		
		server.once('checkPhase', function(phase){
			assert.equal(phase.phase, '昼');
			assert.equal(phase.day, 2);
			done();
		});
	});
	
	test('updatePhases', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			phasesModel.updatePhases(villageID, '夜');
			var phase = phasesModel.getPhasesByVillageID(villageID);
			emit('checkPhase', phase, '夜', 1, 5);
			
			Phases.update({_id: phase._id}, {$set: {revote: 3}});
			phasesModel.updatePhases(villageID, '夜');
			phasesModel.updatePhases(villageID, '昼');
			phase = phasesModel.getPhasesByVillageID(villageID);
			emit('checkPhase', phase, '昼', 2, 5);
			
			emit('done');
		});
		
		server.on('checkPhase', function(phase, expectPhase, expectDay, expectRevote){
			assert.equal(phase.phase, expectPhase);
			assert.equal(phase.day, expectDay);
			assert.equal(phase.revote, expectRevote);
		});
		
		server.on('done', function(){
			done();
		});
	});
	
	test('updateRevote', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			var phase = phasesModel.getPhasesByVillageID(villageID);
			emit('check', phase.revote, 5);
			
			phasesModel.updateRevote(villageID);
			phase = phasesModel.getPhasesByVillageID(villageID);
			emit('check', phase.revote, 4);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('done', function(){
			done();
		});
	});
	
	test('removePhases', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			villageID = Villages.insert({});
			phasesModel.createPhases(villageID);
			
			var phase = Phases.find({}).fetch();
			emit('check', phase.length, 2);
			phasesModel.removePhases(villageID);
			phase = Phases.find({}).fetch();
			emit('check', phase.length, 1);
			
			emit('done');
		});
		
		server.on('check', function(length, expect){
			assert.equal(length, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
});