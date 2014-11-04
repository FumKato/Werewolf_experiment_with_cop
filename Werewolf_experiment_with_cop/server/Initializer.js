Meteor.startup(function() {
  /*Villages.remove({});
  Players.remove({});
  Phases.remove({});
  Timers.remove({});
  Trips.remove({});
  ChatLogs.remove({});
  Accesses.remove({});
  Schedules.remove({});*/
  
  Tickets.remove({});
  Summaries.remove({});
  Players.update({isGM: {$exists: false}}, {$set: {isGM: false}}, {multi: true});
  var villages = Villages.find({isFinished: false}).fetch();
  var i = 0;
  for(i; i<villages.length; i++){
  	Players.remove({villageID: villages[i]._id});
  	Phases.remove({villageID: villages[i]._id});
  	Timers.remove({villageID: villages[i]._id});
  	ChatLogs.remove({villageID: villages[i]._id});
  }
  Villages.remove({
  	isFinished: false
  });
  if(Accesses.find({type: 'total'}).count() == 0){
  	Accesses.insert({type: 'total', value: 0});
  }
  
  process.on('uncaughtException', function(err) {
    console.log(err);
　});
  setup(1, '事件前');
  setup(2, '夜');
  setup(2, '明け方');
});

Meteor.methods({
	getTicket: function(){
		var date = new Date();
		var rnd = Math.floor(Math.random() * 10000);
		var seed = '' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + rnd;
		var ticket = CryptoJS.MD5(seed).toString();
		return ticket;
	}
});
