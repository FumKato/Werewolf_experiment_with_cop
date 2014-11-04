//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

/*var assert = require('assert');

//This test does not work because of headers

suite('Server: PlayersController', function() {
	test('createPlayers: success to create', function(done, server) {
		server.eval(function() {
			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var playerID = Meteor.call('createPlayers', villageID, 'player1', 'player1', 'player1', 'player1', '0', 'random', 'dummyTicket');
			var role = Roles.findOne({playerID: playerID});
			emit('verifyCreation', playerID);
			emit('verifyCreation', role);
			
			var player = Players.findOne({_id: playerID});
			emit('verifyGMCreation', player);
			
			playerID = Meteor.call('createPlayers', villageID, 'player2', 'player2', 'player2', 'player2', '0');
			role = Roles.findOne({playerID: playerID});
			emit('verifyCreation', playerID);
			emit('verifyCreation', role);
			
			playerID = Meteor.call('createPlayers', villageID, 'player3', 'player3', 'player3', 'player3', '0');
			role = Roles.findOne({playerID: playerID});
			emit('verifyCreation', playerID);
			emit('verifyCreation', role);
			
			playerID = Meteor.call('createPlayers', villageID, 'player2', 'player2', 'player2', 'player2', '0');
			role = Roles.findOne({playerID: playerID});
			emit('verifyCreation', playerID);
			emit('verifyCreation', role);
			
			var players = Players.find({isPlayer: true}).fetch();
			emit('verifyPlayers', players);
		});
		
		server.on('verifyCreation', function(target){
			assert.notEqual(target, null);
		});
		
		server.on('verifyGMCreation', function(player){
			assert.equal(player.isPlayer, false);
		});
		
		server.once('verifyPlayers', function(players){
			assert.equal(players.length, 2);
			done();
		});
	});
	
	test('createPlayers: failed to create', function(done, server){
		server.eval(function(){
			var settings = {
				quota : 3,
				GM: false
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var playerID = Meteor.call('createPlayers', 'village1', 'player', 'player', 'player', 'player', '0');
			emit('verifyPlayerNotCreation', playerID);
			playerID = Meteor.call('createPlayers', villageID, null, 'player', 'player', 'player', '0');
			emit('verifyPlayerNotCreation', playerID);
			playerID = Meteor.call('createPlayers', villageID, '', 'player', 'player', 'player', '0');
			emit('verifyPlayerNotCreation', playerID);
			playerID = Meteor.call('createPlayers', villageID, 'player', null, 'player', 'player', '0');
			emit('verifyPlayerNotCreation', playerID);
			playerID = Meteor.call('createPlayers', villageID, 'player', 'player', null, 'player', '0');
			emit('verifyPlayerNotCreation', playerID);
			playerID = Meteor.call('createPlayers', villageID, 'player', 'player', 'player', null, '0');
			emit('verifyPlayerNotCreation', playerID);
			var playersCount = Players.find({}).count();
			emit('checkPlayersCount', playersCount);
			playerID = Meteor.call('createPlayers', villageID, 'player', 'player', 'player', 'player', '0');
			playerID = Meteor.call('createPlayers', villageID, 'player1', 'player1', 'player1', 'player1', '0');
			playerID = Meteor.call('createPlayers', villageID, 'player2', 'player2', 'player2', 'player2', '0');
			playerID = Meteor.call('createPlayers', villageID, 'player3', 'player3', 'player3', 'player3', '0');
			emit('lastVerify', playerID);
		});
		server.on('checkPlayerCreationIsFailed', function(playerID){
			assert.equal(playerID, null);
		});
		server.on('checkPlayersCount', function(playersCount){
			assert.equal(playersCount, 0);
		});
		server.once('lastVerify', function(playerID){
			assert.equal(playerID, null);
			done();
		});
	});
	
  	test('createAudience', function(done, server) {
    	server.eval(function() {
    		Meteor.call('createAudience', 'dummyID');
			Meteor.call('createAudience', 'dummyID');
			Meteor.call('createAudience', 'dummyID');
			Meteor.call('createAudience', 'dummyID');
			Meteor.call('createAudience', 'dummyID');
			var audiences = Players.find({isPlayer: false}).fetch();
      			emit('audienceName', audiences);
    	});

    	server.once('audienceName', function(audiences) {
    		var i;
    		for(i=0; i<audiences.length; i++){
    			assert.equal(audiences[i].characterName, '観戦者' + (i+1));
    		}
    		done();
    	});
  	});
  	
  	test('changePlayers', function(done, server) {
  		server.eval(function(){
  			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			Phases.insert({
				villageID: villageID,
				phase: '昼',
				day: 1
			});
			var GMID = Meteor.call('createPlayers', villageID, 'player0', 'player0', 'player0', 'player0', '0');
			var playerID = Meteor.call('createPlayers', villageID, 'player', 'player', 'player', 'player', '0');
			Meteor.call('changePlayers', villageID, playerID, 'changed', '200');
			var player = Players.findOne({_id: playerID});
			emit('verifyPlayerChange', player, 'player', 0);
			
			Phases.update({villageID: villageID}, {$set: {phase: '事件前'}});
			Meteor.call('changePlayers', villageID, GMID, 'changed', '200');
			player = Players.findOne({_id: GMID});
			emit('verifyPlayerChange', player, 'player0', 0);
			
			Meteor.call('changePlayers', villageID, playerID, 'changed', '200');
			player = Players.findOne({_id: playerID});
			emit('verifyPlayerChange', player, 'changed', 200);
			emit('done');
  		});
  		
  		server.on('verifyPlayerChange', function(player, expectName, expectIcon){
  			assert.equal(player.characterName, expectName);
  			assert.equal(player.icon, expectIcon);
  		});
  		server.once('done', function(){
  			done();
  		});
  	});
  	
  	test('removePlayers', function(done, server){
  		server.eval(function(){
  			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			Phases.insert({
				villageID: villageID,
				phase: '昼',
				day: 1
			});
			var GMID = Meteor.call('createPlayers', villageID, 'player0', 'player0', 'player0', 'player0', '0');
			var playerID = Meteor.call('createPlayers', villageID, 'player', 'player', 'player', 'player', '0');
			
			Meteor.call('removePlayers', villageID, GMID, playerID);
			var playerCount = Players.find({}).count();
			emit('playerCount', playerCount, 2);
			
			Phases.update({villageID: villageID}, {$set: {phase: '事件前'}});
			Meteor.call('removePlayers', villageID, playerID, GMID);
			playerCount = Players.find({}).count();
			emit('playerCount', playerCount, 2);
			
			Meteor.call('removePlayers', villageID, GMID, playerID);
			playerCount = Players.find({}).count();
			emit('playerCount', playerCount, 1);
			emit('done');
  		});
  		
  		server.on('playerCount', function(playerCount, expect){
  			assert.equal(playerCount, expect);
  		});
  		
  		server.once('done', function(){
  			done();
  		});
  	});
  	
  	test('killPlayers: success to kill', function(done, server){
  		server.eval(function(){
  			var IDs = setup(1, '夜');
  			var player = Players.findOne({_id: IDs.villagerID});
  			emit('check', player.state, '生　存');
  			
			Meteor.call('killPlayers', IDs.villageID, IDs.GMID, IDs.villagerID);
			player = Players.findOne({_id: IDs.villagerID});
  			emit('check', player.state, '死　亡');
			emit('done');
  		});
  		
  		server.on('check', function(target, expect){
  			assert.equal(target, expect);
  		});
  		
  		server.once('done', function(){
  			done();
  		});
  	});
  	
  	test('killPlayers: failed to kill because of invalid villageID', function(done, server){
  		server.eval(function(){
  			var IDs = setup(1, '夜');
  			var player = Players.findOne({_id: IDs.villagerID});
  			emit('check', player.state, '生　存');
  			
			Meteor.call('killPlayers', 'dummyID', IDs.GMID, IDs.villagerID);
			player = Players.findOne({_id: IDs.villagerID});
  			emit('check', player.state, '生　存');
			emit('done');
  		});
  		
  		server.on('check', function(target, expect){
  			assert.equal(target, expect);
  		});
  		
  		server.once('done', function(){
  			done();
  		});
  	});
  	
  	test('killPlayers: failed to kill because of invalid role(not GM)', function(done, server){
  		server.eval(function(){
  			var IDs = setup(1, '夜');
  			var player = Players.findOne({_id: IDs.villagerID});
  			emit('check', player.state, '生　存');
  			
			Meteor.call('killPlayers', IDs.villageID, IDs.seerID, IDs.villagerID);
			player = Players.findOne({_id: IDs.villagerID});
  			emit('check', player.state, '生　存');
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
*/