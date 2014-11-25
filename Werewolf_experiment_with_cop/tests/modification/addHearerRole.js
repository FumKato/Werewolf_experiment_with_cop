//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Add hearer role', function() {
	test('RoleInformationView.render: render hearer Icon and message', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '昼');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.hearerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			
			var roleName = role.roleName;
			var className = 'fanatic';
			var message = 'あなたは人狼の仲間です。夜に人狼の会話を聴く事ができます。';
			var icon = '<img src="/roleIcon/Hearer.png">';
			
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
	
	test('updateRolesView: render wolf colleague on system window', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.hearerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var result = $('#myColleague').html();
			var expect = 'あなたが崇拝する人狼の血を引く者は <span class="wolfOrGM">wolf1 wolf2</span>です';
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
	
	test('publishRoles: hearer can get wolf roles', function(done, server) {
		server.eval(function() {
			var IDs = setup(2, '明け方');
			var phase = Phases.findOne({_id: IDs.phaseID});
			adapt_context(IDs.hearerID);
			var results = rolesController.publishRoles(IDs.villageID, IDs.hearerID, phase, '生　存', '聴狂人').fetch();
			emit('check', results.length, 3);
			for(var i=0; i<results.length; i++){
				var result = results[i].roleName == '人　狼' || results[i].roleName == '聴狂人'; 
				emit('check', result, true);
			}
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('publishChatLogs: Hearer receives appropriate chat logs', function(done, server) {
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
			
			adapt_context(IDs.hearerID);
			var results = chatLogsController.publishChatLogs(IDs.villageID, IDs.hearerID, phase, '生　存').fetch();
			emit('check', results.length, 2);
			for(var i=0; i<results.length; i++){
				emit('isOK', results[i].type=='wolf'||results[i].type=='normal');
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
});
