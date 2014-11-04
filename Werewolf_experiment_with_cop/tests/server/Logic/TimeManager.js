var assert = require('assert');

suite('Server: TimeManager', function() {
	test('startTimer', function(done, server) {
		server.eval(function() {
			
			
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