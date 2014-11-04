//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: ChatLogsModel', function() {
	test('createChatLogs: type is set appropriately', function(done, server) {
		server.eval(function() {
			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var GMID = Meteor.call('createPlayers', villageID, 'GM', 'GM', 'GM', 'GM', '0');
			var GM = Players.findOne({_id: GMID});
			var playerID = Meteor.call('createPlayers', villageID, 'player1', 'player1', 'player1', 'player1', '0');
			var player = Players.findOne({_id: playerID});
			var audienceID = Meteor.call('createAudience', villageID);
			var audience = Players.findOne({_id: audienceID});
			var options = {color: false, bold: false};
			
			ChatLogs.remove({});
			
			var role = Roles.findOne({playerID: player._id});
			var phase = Phases.findOne({_id: phaseID});
			
			var type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			var num = ChatLogs.find({}).count();
			emit('checkType', type, 'normal');
			emit('checkNumber', num, 1);
			
			Phases.update({_id: phaseID}, {$set: {phase: '事件終了'}});
			phase = Phases.findOne({_id: phaseID});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'normal');
			emit('checkNumber', num, 2);
			
			Phases.update({_id: phaseID}, {$set: {phase: '昼'}});
			phase = Phases.findOne({_id: phaseID});
			role = Roles.findOne({playerID: GM._id});
			type = chatLogsModel.createChatLogs(villageID, GM._id, role, phase, GM, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'normal');
			emit('checkNumber', num, 3);
			
			role = Roles.findOne({playerID: audience._id});
			type = chatLogsModel.createChatLogs(villageID, audience._id, role, phase, audience, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'audience');
			emit('checkNumber', num, 4);
			
			Roles.update({playerID: player._id}, {$set: {roleName: '人　狼'}});
			role = Roles.findOne({playerID: player._id});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'normal');
			emit('checkNumber', num, 5);
			
			Phases.update({_id: phaseID}, {$set: {phase: '夕方'}});
			phase = Phases.findOne({_id: phaseID});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'monologue');
			emit('checkNumber', num, 6);
			
			Phases.update({_id: phaseID}, {$set: {phase: '夜'}});
			phase = Phases.findOne({_id: phaseID});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'wolf');
			emit('checkNumber', num, 8);
			
			Roles.update({playerID: player._id}, {$set: {roleName: '共有者'}});
			role = Roles.findOne({playerID: player._id});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'mason');
			emit('checkNumber', num, 9);
			
			Phases.update({_id: phaseID}, {$set: {phase: '明け方'}});
			phase = Phases.findOne({_id: phaseID});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'monologue');
			emit('checkNumber', num, 10);
			
			Roles.update({playerID: player._id}, {$set: {roleName: '人　狼'}});
			role = Roles.findOne({playerID: player._id});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'monologue');
			emit('checkNumber', num, 11);
			
			Players.update({_id: player._id}, {$set: {state: '死　亡'}});
			player = Players.findOne({_id: playerID});
			type = chatLogsModel.createChatLogs(villageID, player._id, role, phase, player, 'test', options);
			num = ChatLogs.find({}).count();
			emit('checkType', type, 'ghost');
			emit('checkNumber', num, 12);
			
			emit('done');
		});
		
		server.on('checkType', function(chatLogType, expectType){
			assert.equal(chatLogType, expectType);
		});
		
		server.on('checkNumber', function(num, expect){
			assert.equal(num, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createSystemChatLogs', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			chatLogsModel.createSystemChatLogs(villageID, phase, 'test');
			var chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs);
		});
		
		server.on('check', function(chatLogs){
			assert.equal(chatLogs.length, 1);
			assert.equal(chatLogs[0].name, '<span class="GMName">天の声</span>');
			done();
		});
	});
	
	test('createResultChatLogs: create result type chatlog', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			chatLogsModel.createResultChatLogs(villageID, phase, 'test', 'result');
			var chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs);
		});
		
		server.on('check', function(chatLogs){
			assert.equal(chatLogs.length, 1);
			assert.equal(chatLogs[0].phase, '事件終了');
			assert.equal(chatLogs[0].type, 'normal');
			done();
		});
	});
	
	test('createResultChatLogs: create result type voteResult', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			chatLogsModel.createResultChatLogs(villageID, phase, 'test', 'vote');
			var chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs);
		});
		
		server.on('check', function(chatLogs){
			assert.equal(chatLogs.length, 1);
			assert.equal(chatLogs[0].phase, '事件前');
			assert.equal(chatLogs[0].type, 'voteResult');
			done();
		});
	});
	
	test('createSystemMonologue', function(done, server){
		server.eval(function(){
			var villageID = Villages.insert({});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var playerID = Players.insert({
				villageID: villageID,
				characterName: 'test'
			});
			var phase = Phases.findOne({_id: phaseID});
			chatLogsModel.createSystemMonologue(villageID, playerID, phase, 'test');
			var chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs, playerID);
		});
		
		server.on('check', function(chatLogs, playerID){
			assert.equal(chatLogs.length, 1);
			assert.equal(chatLogs[0].playerID, playerID);
			assert.equal(chatLogs[0].type, 'monologue');
			done();
		});
	});
	
	test('createAudienceChatLogs', function(done, server){
		server.eval(function(){
			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var GMID = Meteor.call('createPlayers', villageID, 'GM', 'GM', 'GM', 'GM', '0');
			var GM = Players.findOne({_id: GMID});
			var GMRole = Roles.findOne({playerID: GM._id});
			var playerID = Meteor.call('createPlayers', villageID, 'player1', 'player1', 'player1', 'player1', '0');
			var player = Players.findOne({_id: playerID});
			var playerRole = Roles.findOne({playerID: player._id});
			var phase = Phases.findOne({_id: phaseID});
			var options = {color: false, bold: false};
			
			ChatLogs.remove({});
			chatLogsModel.createAudienceChatLogs(villageID, playerID, playerRole, phase, player, 'test', options);
			var num = ChatLogs.find({}).count();
			emit('check', num, 0);
			
			chatLogsModel.createAudienceChatLogs(villageID, GMID, GMRole, phase, GM, 'test', options);
			num = ChatLogs.find({}).count();
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
	
	test('createGhostChatLogs', function(done, server){
		server.eval(function(){
			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var GMID = Meteor.call('createPlayers', villageID, 'GM', 'GM', 'GM', 'GM', '0');
			var GM = Players.findOne({_id: GMID});
			var GMRole = Roles.findOne({playerID: GM._id});
			var playerID = Meteor.call('createPlayers', villageID, 'player1', 'player1', 'player1', 'player1', '0');
			var player = Players.findOne({_id: playerID});
			var playerRole = Roles.findOne({playerID: player._id});
			var phase = Phases.findOne({_id: phaseID});
			var options = {color: false, bold: false};
			
			ChatLogs.remove({});
			chatLogsModel.createGhostChatLogs(villageID, playerID, playerRole, phase, player, 'test', options);
			var num = ChatLogs.find({}).count();
			emit('check', num, 0);
			
			chatLogsModel.createGhostChatLogs(villageID, GMID, GMRole, phase, GM, 'test', options);
			num = ChatLogs.find({}).count();
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
	
	test('getChatLogs', function(done, server){
		server.eval(function(){
			var settings = {
				quota : 3,
				GM: true
			};
			var villageID = Villages.insert({
				settings: settings,
				gatheringGM: true
			});
			var phaseID = Phases.insert({
				villageID: villageID,
				phase: '事件前',
				day: 1
			});
			var phase = Phases.findOne({_id: phaseID});
			var GMID = Meteor.call('createPlayers', villageID, 'GM', 'GM', 'GM', 'GM', '0');
			var GM = Players.findOne({_id: GMID});
			var wolfID = Meteor.call('createPlayers', villageID, 'player1', 'player1', 'player1', 'player1', '0');
			var wolf = Players.findOne({_id: wolfID});
			Roles.update({playerID: wolfID}, {$set: {roleName: '人　狼'}});
			var masonID = Meteor.call('createPlayers', villageID, 'player2', 'player2', 'player2', 'player2', '0');
			var mason = Players.findOne({_id: masonID});
			Roles.update({playerID: masonID}, {$set: {roleName: '共有者'}});
			var villagerID = Meteor.call('createPlayers', villageID, 'player3', 'player3', 'player3', 'player3', '0');
			var villager = Players.findOne({_id: villagerID});
			Roles.update({playerID: villagerID}, {$set: {roleName: '村　人'}});
			var audienceID = Meteor.call('createAudience', villageID);
			var audience = Players.findOne({_id: audienceID});
			ChatLogs.remove({});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: GMID,
				type: 'normal' 
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: wolfID,
				type: 'wolf' 
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: wolfID,
				type: 'dummy' 
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: wolfID,
				type: 'monologue' 
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: masonID,
				type: 'mason' 
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: masonID,
				type: 'monologue'
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: villagerID,
				type: 'normal'
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: villagerID,
				type: 'ghost'
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: villagerID,
				type: 'monologue'
			});
			
			ChatLogs.insert({
				villageID: villageID,
				playerID: audienceID,
				type: 'audience'
			});
			
			//GM: get logs except dummy
			var chatLogs = chatLogsModel.getChatLogs(villageID, GMID, ['dummy']).fetch();
			emit('check', chatLogs.length, 9);
			//Villager(dead): get logs except dummy and audience
			chatLogs = chatLogsModel.getChatLogs(villageID, villagerID, ['dummy', 'audience']).fetch();
			emit('check', chatLogs.length, 8);
			//audience: get logs: 2 normals, 1 dummy, and 1 audience
			chatLogs = chatLogsModel.getChatLogs(villageID, audienceID, ['wolf', 'mason', 'ghost', 'monologue']).fetch();
			emit('check', chatLogs.length, 4);
			//wolf: get logs: 2 normals, 1 wolf, and 1 monogue
			chatLogs = chatLogsModel.getChatLogs(villageID, wolfID, ['dummy', 'audience', 'mason', 'ghost', 'monologue']).fetch();
			emit('check', chatLogs.length, 4);
			//mason: get logs: 2 normals, 1 mason, 1 dummy, and 1 monologue
			chatLogs = chatLogsModel.getChatLogs(villageID, masonID, ['wolf', 'audience', 'ghost', 'monologue']).fetch();
			emit('check', chatLogs.length, 5);
			//villager(living): get logs: 2 normals, 1dummy, and 1 monologue
			chatLogs = chatLogsModel.getChatLogs(villageID, villagerID, ['wolf', 'mason', 'audience', 'ghost', 'monologue']).fetch();
			emit('check', chatLogs.length, 4);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removeChatLogs', function(done, server){
		server.eval(function(){
			var v1 = 'village1';
			var v2 = 'village2';
			ChatLogs.insert({villageID: v1, sentece: 'dummy'});
			ChatLogs.insert({villageID: v1, sentece: 'dummy'});
			ChatLogs.insert({villageID: v1, sentece: 'dummy'});
			ChatLogs.insert({villageID: v2, sentece: 'dummy'});
			ChatLogs.insert({villageID: v2, sentece: 'dummy'});
			ChatLogs.insert({villageID: v2, sentece: 'dummy'});
			
			var num = ChatLogs.find({}).count();
			emit('check', num, 6);
			
			chatLogsModel.removeChatLogs(v1);
			num = ChatLogs.find({villageID: v1}).count();
			emit('check', num, 0);
			num = ChatLogs.find({villageID: v2}).count();
			emit('check', num, 3);
			
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
