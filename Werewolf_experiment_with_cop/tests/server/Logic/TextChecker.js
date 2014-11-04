var assert = require('assert');

suite('Server: TextChecker', function() {
	test('checkEscape: success to check escape', function(done, server) {
		server.eval(function() {
			var text = "¥&$%\"'#;:<>";
			var expect = "￥＆＄％”’＃；：&lt;&gt;";
			text = textChecker.checkEscape(text);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkEscape: failed to check escape because of null text', function(done, server) {
		server.eval(function() {
			var text = null;
			var expect = null;
			text = textChecker.checkEscape(text);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNumberLiteral: success to check', function(done, server) {
		server.eval(function() {
			var num = 123;
			var expect = '123';
			
			num = textChecker.checkNumberLiteral(num, 0, 123);
			emit('check', num, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNumberLiteral: success to check with full text', function(done, server) {
		server.eval(function() {
			var num = '１２３';
			var expect = '123';
			
			num = textChecker.checkNumberLiteral(num, 0, 123);
			emit('check', num, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNumberLiteral: success to check with full text and collect bottom', function(done, server) {
		server.eval(function() {
			var num = '１２３';
			var expect = '125';
			
			num = textChecker.checkNumberLiteral(num, 125, 126);
			emit('check', num, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNumberLiteral: success to check with full text and collect top', function(done, server) {
		server.eval(function() {
			var num = '１２３';
			var expect = '120';
			
			num = textChecker.checkNumberLiteral(num, 0, 120);
			emit('check', num, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNumberLiteral: falied to check because of null', function(done, server) {
		server.eval(function() {
			var num = null;
			var expect = '-1';
			
			num = textChecker.checkNumberLiteral(num, 0, 123);
			emit('check', num, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNumberLiteral: failed to check because of non-natural number', function(done, server) {
		server.eval(function() {
			var num = '0１２３';
			var expect = '-1';
			
			num = textChecker.checkNumberLiteral(num, 0, 123);
			emit('check', num, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkTextLength: success to check', function(done, server) {
		server.eval(function() {
			var text = 'abcdefg';
			var expect = 'abcdefg';
			
			text = textChecker.checkTextLength(text, 7);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkTextLength: success to check with collect limitation', function(done, server) {
		server.eval(function() {
			var text = 'abcdefg';
			var expect = 'abcde';
			
			text = textChecker.checkTextLength(text, 5);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkTextLength: success to check', function(done, server) {
		server.eval(function() {
			var text = 'abcdefg';
			var expect = 'abcdefg';
			
			text = textChecker.checkTextLength(text, 7);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkTextLength: failed to check because of null', function(done, server) {
		server.eval(function() {
			var text = '';
			var expect = '';
			
			text = textChecker.checkTextLength(text, 7);
			emit('check', text, expect);
			
			text = null;
			expect = null;
			num = textChecker.checkTextLength(text, 7);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkBlankText: return false', function(done, server) {
		server.eval(function() {
			var text = '';
			
			var result = textChecker.checkBlankText(text);
			emit('check', result, false);
			
			text = '    \n  ';
			result = textChecker.checkBlankText(text);
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
	
	test('checkBlankText: return true', function(done, server) {
		server.eval(function() {
			var text = 'a    \n  ';
			
			var result = textChecker.checkBlankText(text);
			emit('check', result, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkNull: collect null to false', function(done, server) {
		server.eval(function() {
			var bool = null;
			
			var result = textChecker.checkNull(bool);
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
	
	test('checkNull: just return input: true', function(done, server) {
		server.eval(function() {
			var bool = true;
			
			var result = textChecker.checkNull(bool);
			emit('check', result, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkBoolean: boolean inputs: return true', function(done, server) {
		server.eval(function() {
			var bool = true;
			
			var result = textChecker.checkBoolean(bool);
			emit('check', result, true);
			
			bool = false;
			result = textChecker.checkBoolean(bool);
			emit('check', result, true);
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkBoolean: non-boolean inputs: return false', function(done, server) {
		server.eval(function() {
			var bool = null;
			
			var result = textChecker.checkBoolean(bool);
			emit('check', result, false);
			
			bool = 'not bool';
			result = textChecker.checkBoolean(bool);
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
	
	test('checkIconset: valid inputs: return true', function(done, server) {
		server.eval(function() {
			var iconset = ['ALL', 'ねこっぷ', 'azuma', 'mtmt', 'shirone', '花のお江戸'];
			
			var i = 0;
			var result;
			for(i; i < iconset.length; i++){
				result = textChecker.checkIconset(iconset[i]);
				emit('check', result, true);
			};
			
			emit('done');
		});
		
		server.on('check', function(target, expect){
			assert.equal(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
	test('checkIconset: invalid inputs: return false', function(done, server) {
		server.eval(function() {
			var iconset = 'invalid';
			
			var result = textChecker.checkIconset(iconset);
			emit('check', result, false);
			
			iconset = null;
			result = textChecker.checkIconset(iconset);
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