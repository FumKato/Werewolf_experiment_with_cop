//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: AccessesModel', function() {
	test('setAccesses', function(done, server) {
		server.eval(function() {
			Accesses.insert({value: 0, type: 'total'});
			Accesses.insert({minutes: 0, type: 'latest'});
			Accesses.insert({minutes: 6, type: 'latest'});
			Accesses.insert({minutes: 12, type: 'latest'});
			Accesses.insert({minutes: 18, type: 'latest'});
			Accesses.insert({minutes: 24, type: 'latest'});
			Accesses.insert({minutes: 30, type: 'latest'});
			Accesses.insert({minutes: 36, type: 'latest'});
			Accesses.insert({minutes: 42, type: 'latest'});
			Accesses.insert({minutes: 48, type: 'latest'});
			Accesses.insert({minutes: 54, type: 'latest'});
			
			accessesModel.setAccesses();
			var latest = Accesses.find({type: 'latest'}).count();
			var total = Accesses.findOne({type: 'total'}).value;
			
			emit('check', latest, 2);
			emit('check', total, 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getAccesses', function(done, server) {
		server.eval(function() {
			Accesses.insert({value: 0, type: 'total'});
			Accesses.insert({minutes: 0, type: 'latest'});
			Accesses.insert({minutes: 6, type: 'latest'});
			Accesses.insert({minutes: 12, type: 'latest'});
			Accesses.insert({minutes: 18, type: 'latest'});
			Accesses.insert({minutes: 24, type: 'latest'});
			Accesses.insert({minutes: 30, type: 'latest'});
			Accesses.insert({minutes: 36, type: 'latest'});
			Accesses.insert({minutes: 42, type: 'latest'});
			Accesses.insert({minutes: 48, type: 'latest'});
			Accesses.insert({minutes: 54, type: 'latest'});
			
			accessesModel.setAccesses();
			var access = accessesModel.getAccesses();
			
			emit('check', access.latest, 2);
			emit('check', access.total, 1);
			
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