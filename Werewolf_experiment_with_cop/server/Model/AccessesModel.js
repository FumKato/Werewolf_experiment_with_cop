AccessesModel = function(){
	return {
		setAccesses: function(){
			var date = new Date();
			var maxMin = date.getMinutes();
			var minMin = maxMin - 5;
			if(minMin < 0){
				minMin = 60 + minMin;
			}
			
			if(maxMin < minMin){
				Accesses.remove({$and: [{minutes: {$gt: maxMin}}, {minutes: {$lt: minMin}}]});
			} else {
				Accesses.remove({$or: [{minutes: {$gt: maxMin}}, {minutes: {$lt: minMin}}]});
			}
			
			Accesses.update({type: 'total'}, {$inc: {value: 1}});
			Accesses.insert({minutes: maxMin, type: 'latest'});
		},
		
		getAccesses: function(){
			var accesses = {
				total : 0,
				latest: 0,
			};
			
			accesses.total = Accesses.findOne({type: 'total'}).value;
			accesses.latest = Accesses.find({type: 'latest'}).count();
			
			return accesses;
		}
	};
};

accessesModel = new AccessesModel();
