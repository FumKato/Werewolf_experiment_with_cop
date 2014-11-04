//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: PlayersModel', function() {
	test('getPlayersByID', function(done, server) {
		server.eval(function() {
			Players.insert({});
			var playerID = Players.insert({characterName: 'test'});
			emit('check', playersModel.getPlayersByID(playerID), 'test');
			
			emit('done');
		});
		
		server.on('check', function(player, expectName){
			assert.equal(player.characterName, expectName);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getPlayers', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var players = playersModel.getPlayers(IDs.villageID);
			emit('check', players.length, 10);
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			players = playersModel.getPlayers(IDs.villageID);
			emit('check', players.length, 10);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getLivingPlayers', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var players = playersModel.getLivingPlayers(IDs.villageID);
			emit('check', players.length, 10);
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			players = playersModel.getLivingPlayers(IDs.villageID);
			emit('check', players.length, 9);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getAllPlayers', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var players = playersModel.getAllPlayers(IDs.villageID);
			emit('check', players.length, 12);
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			players = playersModel.getAllPlayers(IDs.villageID);
			emit('check', players.length, 12);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('getVictim', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var players = playersModel.getVictim(IDs.villageID);
			emit('check', players.characterName, '初日犠牲者');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: success to create', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			var player = Players.findOne({_id: playerID});
			emit('check', player.villageID, villageID);
			emit('check', player.icon, 0);
			emit('check', player.characterName, 'cn');
			emit('check', player.handleName, 'hn');
			emit('check', player.tripKey, 'trip');
			emit('check', player.password, 'pass');
			emit('check', player.year, accessDate.year);
			emit('check', player.month, accessDate.month);
			emit('check', player.date, accessDate.date);
			emit('check', player.hours, accessDate.hours);
			emit('check', player.minutes, accessDate.minutes);
			emit('check', player.seconds, accessDate.seconds);
			
			var returnedID = playersModel.createPlayers(village, 'cn2', 'hn', 'trip', 'pass', '0', accessDate);
			emit('check', playerID, returnedID);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: fail to create because of characterName', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, ' ', 'hn', 'trip', 'pass', '0', accessDate);
			emit('check', playerID, null);
			playerID = playersModel.createPlayers(village, null, 'hn', 'trip', 'pass', '0');
			emit('check', playerID, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: fail to create because of handleName', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', ' ', 'trip', 'pass', '0', accessDate);
			emit('check', playerID, null);
			playerID = playersModel.createPlayers(village, 'cn', null, 'trip', 'pass', '0');
			emit('check', playerID, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: fail to create because of tripKey', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', ' ', 'pass', '0', accessDate);
			emit('check', playerID, null);
			playerID = playersModel.createPlayers(village, 'cn', 'hn', null, 'pass', '0');
			emit('check', playerID, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: fail to create because of password', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', ' ', '0', accessDate);
			emit('check', playerID, null);
			playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', null, '0');
			emit('check', playerID, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: fail to create because of icon', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', null, accessDate);
			emit('check', playerID, null);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createPlayers: fail to create because of quota', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			playersModel.createPlayers(village, 'cn2', 'hn2', 'trip2', 'pass2', '1', accessDate);
			var playerID = playersModel.createPlayers(village, 'cn3', 'hn3', 'trip3', 'pass3', '2', accessDate);
			emit('check', playerID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createAudience', function(done, server){
		server.eval(function(){
			var num = Players.find({isPlayer: false}).count();
			emit('check', num, 0);
			playersModel.createAudience('villageID', 1);
			num = Players.find({isPlayer: false}).count();
			emit('check', num, 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updatePlayers', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			playersModel.updatePlayers(villageID, playerID, 'test', '100', phase);
			var player = Players.findOne({_id: playerID});
			emit('check', player.characterName, 'test');
			emit('check', player.icon, '100');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('setGM', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			var player = Players.findOne({_id: playerID});
			emit('check', player.isPlayer, true);
			playersModel.setGM(playerID);
			player = Players.findOne({_id: playerID});
			emit('check', player.isPlayer, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('unsetGM', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			Players.update({_id: playerID}, {$set: {isPlayer: false}});
			playersModel.unsetGM(playerID);
			var player = Players.findOne({_id: playerID});
			emit('check', player.isPlayer, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removePlayersByID', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			playersModel.createPlayers(village, 'cn2', 'hn2', 'trip2', 'pass2', '0', accessDate);
			var num = Players.find({}).count();
			emit('check', num, 2);
			playersModel.removePlayersByID(playerID);
			num = Players.find({}).count();
			emit('check', num, 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removePlayersByVillageID', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			playersModel.createPlayers(village, 'cn2', 'hn2', 'trip2', 'pass2', '0', accessDate);
			Players.insert({villageID: 'anotherVillage'});
			var num = Players.find({}).count();
			emit('check', num, 3);
			playersModel.removePlayersByVillageID(villageID);
			num = Players.find({}).count();
			emit('check', num, 1);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateLogCount', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			var anotherPlayerID = playersModel.createPlayers(village, 'cn2', 'hn2', 'trip2', 'pass2', '0', accessDate);
			var player = Players.findOne({_id: playerID});
			emit('check', player.logCount, 0);
			playersModel.updateLogCount(playerID);
			var player = Players.findOne({_id: playerID});
			emit('check', player.logCount, 1);
			var player = Players.findOne({_id: anotherPlayerID});
			emit('check', player.logCount, 0);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('resetLogCount', function(done, server){
		server.eval(function(){
			var settings = {quota: 2};
			var villageID = Villages.insert({settings: settings});
			var village = Villages.findOne({_id: villageID});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var date = new Date();
			var accessDate = {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate(),
				hours: date.getHours(),
				minutes: date.getMinutes(),
				seconds: date.getSeconds()
			};
			
			var playerID = playersModel.createPlayers(village, 'cn', 'hn', 'trip', 'pass', '0', accessDate);
			var anotherPlayerID = playersModel.createPlayers(village, 'cn2', 'hn2', 'trip2', 'pass2', '0', accessDate);
			var player = Players.findOne({_id: playerID});
			emit('check', player.logCount, 0);
			playersModel.updateLogCount(playerID);
			playersModel.updateLogCount(playerID);
			player = Players.findOne({_id: playerID});
			emit('check', player.logCount, 2);
			playersModel.updateLogCount(anotherPlayerID);
			player = Players.findOne({_id: anotherPlayerID});
			emit('check', player.logCount, 1);
			
			playersModel.resetLogCount(villageID);
			var player = Players.findOne({_id: playerID});
			emit('check', player.logCount, 0);
			player = Players.findOne({_id: anotherPlayerID});
			emit('check', player.logCount, 0);
			
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