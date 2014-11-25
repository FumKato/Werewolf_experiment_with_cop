//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Client: RolesController', function() {	
	test('updateRolesView: render wolf colleague on system window', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.wolf1ID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var result = $('#myColleague').html();
			var expect = '人狼の血を引くあなたの仲間は <span class="wolfOrGM">wolf2</span>です';
			emit('check', result, expect);
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: render attack button on 明け方 phase with living wolf roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.wolf1ID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#attack';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: render wolf Icon and message', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '昼');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.wolf1ID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			
			var roleName = role.roleName;
			var className = 'GMName';
			var message = 'あなたは毎晩, 仲間と相談して人狼以外のプレイヤー1人を殺害することができます。';
			var icon = '<img src="/roleIcon/Werewolf.png">';
			
			var result = $('#roleName').html();
			var expect = role.roleName;
			emit('check', result, expect);
			
			if(className != ''){
				result = $('#roleName').hasClass(className);
				expect = true;
				emit('check', result, expect);
			}
			
			result = $('#roleDetailMessage').html();
			expect = message;
			emit('check', result, expect);
			
			result = $("#roleIcon").html();
			expect = icon;
			emit('check', result, expect);
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('publishChatLogs: Wolf recieves appropriate chat logs', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var chatLogs = ChatLogs.find({}).fetch();
			emit('check', chatLogs.length, 0);
			ChatLogs.insert({villageID: IDs.villageID, playerID: IDs.wolf1ID, type: 'wolf'});
			ChatLogs.insert({villageID: IDs.villageID, playerID: IDs.villagerID, type: 'monologue'});
			ChatLogs.insert({villageID: IDs.villageID, playerID: IDs.GMID, type: 'normal'});
			ChatLogs.insert({villageID: IDs.villageID, playerID: IDs.victimID, type: 'ghost'});
			ChatLogs.insert({villageID: IDs.villageID, playerID: IDs.audienceID, type: 'audience'});
			ChatLogs.insert({villageID: IDs.villageID, playerID: IDs.mason1ID, type: 'mason'});
			ChatLogs.insert({villageID: IDs.villageID, playerID: 'dummyID', type: 'dummy'});
			
			adapt_context(IDs.wolf2ID);
			var results = chatLogsController.publishChatLogs(IDs.villageID, IDs.wolf2ID, phase, '生　存').fetch();
			emit('check', results.length, 3);
			for(var i=0; i<results.length; i++){
				emit('isOK', results[i].type=='wolf'||results[i].type=='normal'||results[i].type=='dummy');
			}
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.on('isOK', function(target){
			assert.ok(target);
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
			result = ChatLogs.findOne({type: 'wolf'});
			emit('check', result.name, '<span class="wolf">wolf1(遠吠え)</span>');
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
});
