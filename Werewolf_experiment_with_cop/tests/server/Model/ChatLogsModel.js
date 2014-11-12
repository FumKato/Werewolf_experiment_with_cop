//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: ChatLogsModel', function() {
	test('createChatLogs: set normal type chat logs because of 昼 phase', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: IDs.villagerID});
			var player = Players.findOne({_id: IDs.villagerID});
			adapt_context(IDs.villagerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, IDs.villagerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'normal');
			result = ChatLogs.find({type: 'normal'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createChatLogs: set audience type chat logs', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var playerID = IDs.audienceID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			adapt_context(playerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'audience');
			result = ChatLogs.find({type: 'audience'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createChatLogs: set normal type chat logs because of GM role', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夜');
			var playerID = IDs.GMID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			adapt_context(playerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'normal');
			result = ChatLogs.find({type: 'normal'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createChatLogs: set ghost type chat logs because of dead player', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var playerID = IDs.fox1ID;
			Players.update({_id: playerID}, {$set: {state: '死　亡'}});
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			adapt_context(playerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'ghost');
			result = ChatLogs.find({type: 'ghost'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createChatLogs: set mason type chat logs because of role', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夜');
			var playerID = IDs.mason1ID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			adapt_context(playerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'mason');
			result = ChatLogs.find({type: 'mason'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createChatLogs: set wolf and dummy type chat logs', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夜');
			var playerID = IDs.wolf1ID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			adapt_context(playerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'wolf');
			result = ChatLogs.find({type: 'wolf'}).count();
			emit('check', result, 1);
			result = ChatLogs.find({type: 'dummy'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createChatLogs: set monologue type chat logs', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '夜');
			var playerID = IDs.girlID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			adapt_context(playerID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, player.color, quotes);
			emit('check', result, 'monologue');
			result = ChatLogs.find({type: 'monologue'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createGhostChatLogs: success to create with GM role', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var playerID = IDs.GMID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			var result = ChatLogs.find({}).count();
			emit('check', result, 0);
			adapt_context(playerID);
			chatLogsModel.createGhostChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, quotes);
			result = ChatLogs.find({type: 'ghost'}).count();
			emit('check', result, 1);
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createGhostChatLogs: fail to create because of role', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var playerID = IDs.villagerID;
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: playerID});
			var player = Players.findOne({_id: playerID});
			var result = ChatLogs.find({}).count();
			emit('check', result, 0);
			adapt_context(playerID);
			chatLogsModel.createGhostChatLogs(IDs.villageID, playerID, role, phase, player, 'test', options, quotes);
			result = ChatLogs.find({type: 'ghost'}).count();
			emit('check', result, 0);
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