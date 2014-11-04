Context = function(name, operations){
		var name = name;
		var operations = operations;
		var proceeds = new Array();
		var proceed = function(functionName){
			return this.proceeds[functionName]();
		};
		
		return {
			adapt: function(object, functionName, operationName) {
				var command = 'var tmp = {' +
					'proceed: proceed,' +
					functionName + ': operations.' + operationName + ',' +
				'};' +
				'if(' + object + '.prototype.proceeds == null){' +
					object + '.prototype.proceeds = {};' +
				'}' +
				object + '.prototype.proceeds.' + functionName + ' = ' + object + '.prototype.' + functionName + ';' +
				'_.extend(' + object + '.prototype, tmp);';	
				eval(command);
			},
			
			deactivate: function(object, functionName) {
				var command = 'if(' + object + '.prototype.proceeds != null){' +
					'var tmp = {' +
					functionName + ': ' + object + '.prototype.proceeds.' + functionName +
				'};' +
				'_.extend(' + object + '.prototype, tmp);};';
				eval(command);
			}
		};
};
