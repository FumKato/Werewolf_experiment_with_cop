var assert = require('assert');

suite('Server: TripsModel', function() {
	test('createTrips: success to create', function(done, server) {
		server.eval(function() {
			var result = tripsModel.createTrips('foo');
			emit('check', result.tripKey, 'foo');
			emit('check', result.record, 0);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createTrips: return false because the trip has already existed', function(done, server) {
		server.eval(function() {
			Trips.insert({tripKey: 'foo'});
			var result = tripsModel.createTrips('foo');
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
	
	test('updateTripsRecord: success to update', function(done, server) {
		server.eval(function() {
			var result = tripsModel.createTrips('foo');
			emit('check', result.tripKey, 'foo');
			emit('check', result.record, 0);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			result = tripsModel.createTrips('bar');
			emit('check', result.tripKey, 'bar');
			emit('check', result.record, 0);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			tripsModel.updateTripsRecord(['foo', 'bar']);
			result = Trips.findOne({tripKey: 'foo'});
			emit('check', result.tripKey, 'foo');
			emit('check', result.record, 1);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			result = Trips.findOne({tripKey: 'bar'});
			emit('check', result.tripKey, 'bar');
			emit('check', result.record, 1);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateTripsRecord: return false because of null', function(done, server) {
		server.eval(function() {
			var result = tripsModel.updateTripsRecord(null);
			emit('check', result, false);
			
			result = tripsModel.updateTripsRecord([null]);
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
	
	test('penaltyTrips: success to penalty', function(done, server) {
		server.eval(function() {
			var result = tripsModel.createTrips('foo');
			emit('check', result.tripKey, 'foo');
			emit('check', result.record, 0);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			tripsModel.penaltyTrips('foo');
			result = Trips.findOne({tripKey: 'foo'});
			var date = new Date();
			emit('check', result.tripKey, 'foo');
			emit('check', result.record, -1);
			emit('check', result.penaltyNum, 1);
			emit('check', result.penalty.year, date.getYear() + 1900);
			emit('check', result.penalty.month, date.getMonth() + 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getTrips: success to get', function(done, server) {
		server.eval(function() {
			tripsModel.createTrips('foo');
			var result = tripsModel.getTrips('foo');
			emit('check', result.tripKey, 'foo');
			emit('check', result.record, 0);
			emit('check', result.penaltyNum, 0);
			emit('check', result.penalty.year, 0);
			emit('check', result.penalty.month, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getTrips: return null because of no existence', function(done, server) {
		server.eval(function() {
			tripsModel.createTrips('foo');
			var result = tripsModel.getTrips('bar');
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
	
	test('getTrips: return false because of penalty', function(done, server) {
		server.eval(function() {
			tripsModel.createTrips('foo');
			tripsModel.penaltyTrips('foo');
			var result = tripsModel.getTrips('foo');
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