//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Delete tmpGM role', function() {
	test('RolesController.updateRolesView: render system window with tmpGM role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.tmpGMID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			//rolesController.updateRolesView();
			adapt_context();
			var result = $('#GMMenu').is(':visible');
			emit('check', result, false);
			result = $('#systemWindow').is(':visible');
			emit('check', result, true);
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('RoleInformationView.render: render default Icon and message with tmpGM role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.tmpGMID);
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
	
	test('ActionButtonView.render: render buttons on 事件前 phase with tmpGM role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.tmpGMID);
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
	
	test('ActionButtonView.render: render default Icon and message with tmpGM role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			var tmpGMID = Players.insert({
				villageID: IDs.villageID,
				characterName: 'unknown',
				handleName: 'unknown',
				password: 'unknown',
				tripKey: 'トリなし',
				isPlayer: true,
				state: '生　存',
				icon: '0',
				color: 'blue',
				num: 30,
				logCount: 0,
				isReady: true,
				isGM: false
			});
			Roles.insert({
				villageID: IDs.villageID,
				playerID: tmpGMID,
				roleName: '仮GM'
			});
			Session.set('myPlayerID', tmpGMID);
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
	
	test('ChatLogsModel.publishChatLogs: tmpGM role recieves appropriate chat logs', function(done, server) {
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
			
			adapt_context(IDs.tmpGMID);
			var results = chatLogsController.publishChatLogs(IDs.villageID, IDs.tmpGMID, phase, '生　存').fetch();
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
	
	test('ChatLogsModel.createGhostChatLogs: fail to create with tmpGM role', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '昼');
			var playerID = IDs.tmpGMID;
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
