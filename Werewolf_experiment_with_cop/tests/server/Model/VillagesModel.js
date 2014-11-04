//To start test, 
//1. open two terminal window
//2. execute lkmongod command in one window
//3. change current directory this project and execute laika command in the other one

var assert = require('assert');

suite('Server: VillagesModel', function() {
	test('getVillages', function(done, server) {
		server.eval(function() {
			var villageID = Villages.insert({name: 'foo'});
			Villages.insert({name: 'bar'});
			
			var village = villagesModel.getVillages(villageID);
			emit('check', village.name, 'foo');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('completeGM', function(done, server) {
		server.eval(function() {
			var villageID = Villages.insert({
				name: 'foo',
				gatheringGM: true,
			});
			Villages.insert({
				name: 'bar',
				gatheringGM: true
			});
			villagesModel.completeGM(villageID);
			
			var villages = Villages.find({}).fetch();
			emit('check', villages[0].gatheringGM, false);
			emit('check', villages[0].name, 'foo');
			emit('check', villages[1].gatheringGM, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('removeVillages', function(done, server) {
		server.eval(function() {
			var villageID = Villages.insert({name: 'foo'});
			Villages.insert({name: 'bar'});
			
			var villages = Villages.find({}).fetch();
			emit('check', villages.length, 2);
			villagesModel.removeVillages(villageID);
			villages = Villages.find({}).fetch();
			emit('check', villages.length, 1);
			emit('check', villages[0].name, 'bar');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('startVillages', function(done, server) {
		server.eval(function() {
			var villageID = Villages.insert({
				name: 'foo',
				isStarted: false,
			});
			Villages.insert({
				name: 'bar',
				isStarted: false
			});
			villagesModel.startVillages(villageID);
			
			var villages = Villages.find({}).fetch();
			emit('check', villages[0].isStarted, true);
			emit('check', villages[0].name, 'foo');
			emit('check', villages[1].isStarted, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('finishVillages', function(done, server) {
		server.eval(function() {
			var villageID = Villages.insert({
				name: 'foo',
				isFinished: false,
			});
			Villages.insert({
				name: 'bar',
				isFinished: false
			});
			villagesModel.finishVillages(villageID);
			
			var villages = Villages.find({}).fetch();
			emit('check', villages[0].isFinished, true);
			emit('check', villages[0].name, 'foo');
			emit('check', villages[1].isFinished, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: success to create', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '0',
				cat: false,
				girl: false,
				iconset: 'ねこっぷ',
				randomCN: true,
				audienceUtter: true,
				silenceRule: '10',
				listSort: false,
				voteSkip: true,
				actionSkip: true
			};
			
			var villageID = villagesModel.createVillages(data);
			var num = Villages.find({}).count();
			emit('check', num, 1);
			var village = Villages.findOne({_id: villageID});
			emit('check', village.number, 1);
			emit('check', village.settings.villageName, 'village1');
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of villageName', function(done, server){
		server.eval(function(){
			var data = {
				villageName : null,
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of quota', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : null,
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of roleset', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : null,
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			data.roleset = 'D';
			villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of villagePR', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : null,
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of GM', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : 'hoge',
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of daytime', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : null,
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of afternoon', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : 300,
				afternoon : null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of night', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of dawn', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of tripLimit', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: null,
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of recordLimit', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: 'hoge',
				recordLimit: null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of recordLimit', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of cat', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of girl', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of iconset', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			data.iconset = 'hoge';
			villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of randomCN', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of audienceUtter', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of silenceRule', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : null
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of listSort', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : '10',
				listSort: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of voteSkip', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : '10',
				listSort: false,
				voteSkip: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('createVillages: failed to create because of actionSkip', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : '10',
				listSort: false,
				voteSkip: true,
				actionSkip: 'hoge'
			};
			
			var villageID = villagesModel.createVillages(data);
			emit('check', villageID, null);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	//---------------------------------
	test('updateVillages: success to update', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '0',
				cat: false,
				girl: false,
				iconset: 'ねこっぷ',
				randomCN: true,
				audienceUtter: true,
				silenceRule: '10',
				listSort: false,
				voteSkip: true,
				actionSkip: true
			};
			
			var villageID = villagesModel.createVillages(data);
			var village = Villages.findOne({_id: villageID});
			emit('check', village.settings.villageName, 'village1');
			emit('check', village.settings.daytime, 300);
			
			data.villageName = 'fooVillage';
			data.daytime = 200;
			villagesModel.updateVillages(villageID, data);
			
			village = Villages.findOne({_id: villageID});
			emit('check', village.settings.villageName, 'fooVillage');
			emit('check', village.settings.daytime, 200);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of villageName', function(done, server){
		server.eval(function(){
			var data = {
				villageName : null,
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			data.villageName = '';
			result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of quota', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : null,
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of roleset', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : null,
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			data.roleset = 'D';
			result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of villagePR', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : null,
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of GM', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : 'hoge',
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of daytime', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : null,
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of afternoon', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : 300,
				afternoon : null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of night', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of dawn', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of tripLimit', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: null,
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of recordLimit', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: 'hoge',
				recordLimit: null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of recordLimit', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of cat', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of girl', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of iconset', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			data.iconset = 'hoge';
			result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of randomCN', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of audienceUtter', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of silenceRule', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : null
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of listSort', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : '10',
				listSort: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of voteSkip', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : '10',
				listSort: false,
				voteSkip: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('updateVillages: failed to update because of actionSkip', function(done, server){
		server.eval(function(){
			var data = {
				villageName : 'village1',
				quota : '17',
				roleset : 'A',
				villagePR : 'testVillagePR',
				GM : true,
				daytime : '300',
				afternoon : '120',
				night : '180',
				dawn : '120',
				tripLimit: false,
				recordLimit: '10',
				cat: false,
				girl: false,
				iconset: 'neko',
				randomCN: true,
				audienceUtter: true,
				silenceRule : '10',
				listSort: false,
				voteSkip: true,
				actionSkip: 'hoge'
			};
			
			var villageID = Villages.insert({});
			var result = villagesModel.updateVillages(villageID, data);
			emit('check', result, false);
			
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