TripGenerator = function() {
	var textChecker = new TextChecker();
	
	return {
		getTrip : function(handle) {
		  var handleAndTrip = handle.split('#');
		  if(handleAndTrip.length == 2) {
		  	var trip = handleAndTrip[1];
		    if(trip.length < 3) {
			  trip = des.crypt(trip, 'ws');
		    } else if(trip.length < 10){
			  trip = des.crypt(trip, trip.substr(1, 2));
	  	    } else {
			  trip = des.crypt(trip.substr(0, 10), trip.substr(1, 2));
		    }
		    handleAndTrip[1] = textChecker.checkEscape(trip.substr(2, 8));
	     } else {
	     	handleAndTrip[1] = 'トリなし';
	     }
	      handleAndTrip[0] = textChecker.checkTextLength(handleAndTrip[0], 8);
	      handleAndTrip[0] = textChecker.checkEscape(handleAndTrip[0]);
	      return handleAndTrip;
	    }
    };
};
