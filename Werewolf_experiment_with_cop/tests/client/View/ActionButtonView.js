//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Client: ActionButtonView', function() {
	test('render: render buttons on 事件前 phase with audience role', function(done, server, client) {
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
			var targetName = '#participate';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#extraMenu';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'false';
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
	
	test('render: render GM buttons on 事件前 phase with GM role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.GMID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#changeSettings';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#extraMenu';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#readyCheck';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#cnChange';
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
	
	test('render: render GM buttons on 事件前 phase with tmpGM role', function(done, server, client) {
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
			var targetName = '#changeSettings';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#extraMenu';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#readyCheck';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'true';
			emit('check', result, expect);
			
			targetName = '#cnChange';
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
	
	test('render: render buttons on 事件前 phase with other roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '事件前');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.villagerID);
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
	
	test('render: render timeSkip button and flush voteInformation on 昼 phase with living non-GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '昼');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.villagerID);
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
	
	test('render: hide timeSkip button on 昼 phase with dead non-GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '昼');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.villagerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	$('#voteInformation').html('test');
		  	
			adapt_context();
			var targetName = '#timeSkip';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			emit('check', $('#voteInformation').html(), 'test');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: hide timeSkip button on 昼 phase with GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '昼');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.GMID);
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
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			emit('check', $('#voteInformation').html(), 'test');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: hide timeSkip button on 昼 phase with audience roles', function(done, server, client) {
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
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			emit('check', $('#voteInformation').html(), 'test');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: render vote button and flush actionInformation on 夕方 phase with living players', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夕方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.fox1ID);
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
	
	test('render: hide vote button and remain actionInformation on 夕方 phase with dead players', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夕方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.villagerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	$('#actionInformation').html('test');
		  	
			adapt_context();
			var targetName = '#timeSkip';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			emit('check', $('#actionInformation').html(), 'あなたは息絶えました...');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: hide vote button and remain actionInformation on 夕方 phase with GM role', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夕方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.GMID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	$('#actionInformation').html('test');
		  	
			adapt_context();
			var targetName = '#timeSkip';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			emit('check', $('#actionInformation').html(), 'test');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: hide vote button and remain actionInformation on 夕方 phase with audience role', function(done, server, client) {
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
			var targetName = '#timeSkip';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			emit('check', $('#actionInformation').html(), 'test');
			
			emit('done');
		});
		
		client.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		client.once('done', function(){
			done();
		});
	});
	
	test('render: render timeSkip button and flush voteInformation on 夜 phase with living non-GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夜');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.villagerID);
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
	
	test('render: hide timeSkip button on 夜 phase with dead non-GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夜');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.villagerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			Players.update({_id: IDs.villagerID}, {$set: {state: '死　亡'}});
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#timeSkip';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
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
	
	test('render: hide timeSkip button on 夜 phase with GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '夜');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.GMID);
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
			var expect = targetName + ': ' + 'false';
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
	
	test('render: hide timeSkip button on 夜 phase with audience roles', function(done, server, client) {
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
			var expect = targetName + ': ' + 'false';
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
	
	test('render: render see button on 明け方 phase with living seer roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.seerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#see';
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
	
	test('render: hide see button on 明け方 phase with dead seer roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.seerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			Players.update({_id: IDs.seerID}, {$set: {state: '死　亡'}});
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#see';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
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
	
	test('render: render kill button on 明け方 phase with living wolf roles', function(done, server, client) {
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
			var targetName = '#kill';
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
	
	test('render: render guard button on 明け方 phase with living hunter roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.hunterID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#guard';
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
	
	test('render: hide gurad button on 明け方 phase with living hunter roles because of the first day', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.seerID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#guard';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
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
	
	test('render: render nightWalk button on 明け方 phase with living girl roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.girlID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#nightWalk';
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
	
	test('render: hide nightWalk button on 明け方 phase with living girl roles because of the first day', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(1, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.girlID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#nightWalk';
			var result = targetName + ': ' + $(targetName).is(':visible');
			var expect = targetName + ': ' + 'false';
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
	
	test('render: render magic button on 明け方 phase with living wizard roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '明け方');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.wizardID);
			Session.set('villageID', IDs.villageID);
			role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			Session.set('myRole', role);
			
		  	werewolfView.flush('lobby');
		  	werewolfView.render('village');
		  	new ActionButtonView().flush();
		  	new VillageView().enableInputs();
		  	
			adapt_context();
			var targetName = '#magic';
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
	
	test('render: render report and villageBack buttons on 事件終了 phase with non-GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '事件終了');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.wizardID);
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
	
	test('render: hide report and villageBack buttons on 事件終了 phase with audience roles', function(done, server, client) {
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
			var expect = targetName + ': ' + 'false';
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
	
	test('render: hide report, kick and villageBack buttons on 事件終了 phase with GM roles', function(done, server, client) {
		client.eval(function() {
			var IDs = setup(2, '事件終了');
			var werewolfView = new WerewolfView();
			Session.set('myPlayerID', IDs.GMID);
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
			var expect = targetName + ': ' + 'false';
			emit('check', result, expect);
			
			targetName = '#kick';
			result = targetName + ': ' + $(targetName).is(':visible');
			expect = targetName + ': ' + 'false';
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
});
