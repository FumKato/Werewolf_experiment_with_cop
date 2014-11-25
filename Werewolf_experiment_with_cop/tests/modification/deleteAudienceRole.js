//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Delete audience role', function() {
	test('ActionButtonView.render: render buttons on 事件前 phase with audience role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.audienceID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#changeName';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#extraMenu';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#suicide';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#imready';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
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
	
	test('ActionButtonView.render: render timeSkip button and flush voteInformation on 昼 phase with audience roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '昼');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.audienceID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	$('#voteInformation').html('test');
		  	
			adapt_context();
			var targetName = '#timeSkip';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			emit('check', $('#voteInformation').html(), '');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('ActionButtonView.render: render vote button and flush actionInformation on 夕方 phase with audience role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夕方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.audienceID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	$('#actionInformation').html('test');
		  	
			adapt_context();
			var targetName = '#vote';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			emit('check', $('#actionInformation').html(), '');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('ActionButtonView.render: render timeSkip button on 夜 phase with audience roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夜');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.audienceID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#timeSkip';
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
	
	test('ActionButtonView.render: render report and villageBack buttons on 事件終了 phase with audience roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '事件終了');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.audienceID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#report';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#villageBackButton';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
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
	
	test('RoleInformationView.render: render default Icon and message with audience role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.audienceID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			
			var roleName = role.roleName;
			var className = '';
			var message = '';
			var icon = '<img src="/roleIcon/Unknown.png">';
			
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
	
	test('publishChatLogs: Audience role recieves appropriate chat logs', function(done, server) {
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
			
			adapt_context(IDs.audienceID);
			var results = chatLogsController.publishChatLogs(IDs.villageID, IDs.audienceID, phase, '生　存').fetch();
			emit('check', results.length, 2);
			for(var i=0; i<results.length; i++){
				emit('isOK', results[i].type=='normal'||results[i].type=='monologue'||results[i].type=='dummy');
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
	
	test('createChatLogs: set normal type chat logs because of 昼 phase with audience role', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var phase = Phases.findOne({_id: IDs.phaseID});
			var options = {bold: false, color: false};
			var quotes = [];
			var role = Roles.findOne({playerID: IDs.audienceID});
			var player = Players.findOne({_id: IDs.audienceID});
			adapt_context(IDs.audienceID);
			var result = chatLogsModel.createChatLogs(IDs.villageID, IDs.audienceID, role, phase, player, 'test', options, player.color, quotes);
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
});
