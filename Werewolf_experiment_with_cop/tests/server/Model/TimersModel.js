//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: TimersModel', function() {
	test('getTimers', function(done, server) {
		server.eval(function() {
			Timers.insert({villageID: 'village1'});
			Timers.insert({villageID: 'village2'});
			
			var timer = timersModel.getTimers('village1').fetch();
			emit('check', timer[0].villageID, 'village1');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createTimers', function(done, server) {
		server.eval(function() {
			timersModel.createTimers('village1');
			
			var timer = Timers.find({}).fetch();
			emit('check', timer.length, 1);
			emit('check', timer[0].villageID, 'village1');
			emit('check', timer[0].remain, 60);
			emit('check', timer[0].skip, false);
			emit('check', timer[0].extend, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateTimers', function(done, server) {
		server.eval(function() {
			timersModel.createTimers('village1');
			timersModel.createTimers('village2');
			timersModel.updateTimers('village1', 100);
			
			var timer = Timers.findOne({villageID: 'village1'});
			emit('check', timer.remain, 100);
			timer = Timers.findOne({villageID: 'village2'});
			emit('check', timer.remain, 60);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateExtend', function(done, server) {
		server.eval(function() {
			timersModel.createTimers('village1');
			timersModel.createTimers('village2');
			timersModel.updateExtend('village1', true);
			
			var timer = Timers.findOne({villageID: 'village1'});
			emit('check', timer.extend, true);
			timer = Timers.findOne({villageID: 'village2'});
			emit('check', timer.extend, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateSkip', function(done, server) {
		server.eval(function() {
			timersModel.createTimers('village1');
			timersModel.createTimers('village2');
			timersModel.updateSkip('village1', true);
			
			var timer = Timers.findOne({villageID: 'village1'});
			emit('check', timer.skip, true);
			timer = Timers.findOne({villageID: 'village2'});
			emit('check', timer.skip, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removeTimers', function(done, server) {
		server.eval(function() {
			timersModel.createTimers('village1');
			timersModel.createTimers('village2');
			
			var timers = Timers.find({}).fetch();
			emit('check', timers.length, 2);
			timersModel.removeTimers('village1');
			timers = Timers.find({}).fetch();
			emit('check', timers.length, 1);
			emit('check', timers[0].villageID, 'village2');
			
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