//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: ActionsController', function() {
	test('createActions: success to create wolf action', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.wolf1ID, IDs.victimID, 'wolf', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 1);
				emit('check', action[0].to, IDs.victimID);
				emit('check', action[0].type, 'wolf');
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: success to create seer action', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.seerID, IDs.wolf1ID, 'seer', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 1);
				emit('check', action[0].to, IDs.wolf1ID);
				emit('check', action[0].type, 'seer');
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: success to create hunter action', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.hunterID, IDs.wolf1ID, 'guard', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 1);
				emit('check', action[0].to, IDs.wolf1ID);
				emit('check', action[0].type, 'guard');
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: success to create girl action', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.girlID, IDs.wolf1ID, 'nightWalk', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 1);
				emit('check', action[0].to, IDs.wolf1ID);
				emit('check', action[0].type, 'nightWalk');
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: success to create report action', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '事件終了');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.girlID, IDs.wolf1ID, 'report', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 1);
				emit('check', action[0].to, IDs.wolf1ID);
				emit('check', action[0].type, 'report');
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create hunter action because of 1st day', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.hunterID, IDs.wolf1ID, 'guard', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create girl action because of 1st day', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.girlID, IDs.wolf1ID, 'nightWalk', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create wolf action because called from non-wolf player', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.villagerID, IDs.victimID, 'wolf', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create seer action because called from non-seer player', function(done, server) {
		server.eval(function() {
			var IDs = setup(1, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.villagerID, IDs.victimID, 'seer', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create hunter action because called from non-hunter player', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.villagerID, IDs.victimID, 'guard', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create girl action because called from non-girl player', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.villagerID, IDs.victimID, 'nightWalk', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create report action because of phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.villagerID, IDs.victimID, 'report', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createActions: fail to create report action because called from non-player', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '事件終了');
			var action = Actions.find({}).fetch();
			emit('check', action.length, 0);
			
			Meteor.call('createActions', IDs.villageID, IDs.audienceID, IDs.victimID, 'report', function(){
				action = Actions.find({}).fetch();
				emit('check', action.length, 0);
				emit('done');
			});
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
});
