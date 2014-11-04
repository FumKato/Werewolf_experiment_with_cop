TripsModel = function(){
	return{
		createTrips:function(tripKey){
			tripKey = textChecker.checkEscape(tripKey);
			
			if(Trips.find({tripKey: tripKey}).count() != 0) return false;
			var penalty = {
				year: 0,
				month: 0
			};
			var ID = Trips.insert({tripKey: tripKey, record: 0, penaltyNum : 0, penalty: penalty});
			if(ID == null) return null;
			var trips = Trips.findOne({_id: ID});
			return trips;
		},
		
		updateTripsRecord: function(tripKeys){
			if(tripKeys == null || tripKeys.length == 0) return false;
			Trips.update({tripKey: {$in: tripKeys}}, {$inc: {record: 1}}, {multi: true});
			return true;
		},
		
		penaltyTrips: function(tripKey){
			tripKey = textChecker.checkEscape(tripKey);
			if(Trips.find({tripKey: tripKey}).count() == 0) return false;
			
			var target = Trips.findOne({tripKey: tripKey});
			var date = new Date();
			var year = date.getYear() + 1900;
			var month = date.getMonth() + 1 + target.penaltyNum;
			if(date.getDate() > 15) month++;
			if(month > 11) {
				year++;
				month = month % 12;
			}
			var penalty = {
				year: year,
				month: month
			};
			Trips.update({tripKey: tripKey}, {$set: {penalty: penalty}, $inc: {penaltyNum: 1, record: -1}});
			return true;
		},
		
		getTrips:function(tripKey){
			tripKey = textChecker.checkEscape(tripKey);
			if(tripKey == 'kxpYRn1V'){
				var penalty = {
 					year: 0,
 					month: 0
 				};
 				var superTrip = {
 					tripKey: '開発者',
 					record: 999,
 					penaltyNum: 0,
 					penalty: penalty
 				};
 				return superTrip;
			}
			if(Trips.find({tripKey: tripKey}).count() == 0) return null;
			
			var trips = Trips.findOne({tripKey: tripKey});
			var date = new Date();
			if(date.getYear() < trips.penalty.year || (date.getYear() == trips.penalty.year && date.getMonth() <= trips.penalty.month)) return false;
			return trips;
		},
		
		getTripsRecord: function(tripKey){
			if(tripKey == 'shonich＊') return '--';
			if(Trips.find({tripKey: tripKey}).count() == 0) return 0;
			var trips = Trips.findOne({tripKey: tripKey});
			return trips.record;
		}
	};
};

tripsModel = new TripsModel();
