var assert = require('assert');

suite('Server: TextConverter', function() {
	test('text2Html', function(done, server) {
		server.eval(function() {
			var text = "test\r\ntest\n";
			var expect = "test<br>test<br>";
			text = new TextConverter().text2Html(text);
			emit('check', text, expect);
			
			emit('done');
		});
		
		server.on('checkRoleSet', function(target, expect){
			check(target, expect);
		});
		
		server.once('done', function(){
			done();
		});
	});
	
});