Initializer = function(){
	return{
		initialize: function(){
			Session.set('latestLogNumber', -1);
			Session.set('logSelector', null);
			Session.set('villageID', null);
			Session.set('myPlayerID', null);
			Session.set('selectedPlayer', null);
			Session.set('currentPhase', null);
			Session.set('currentState', null);
			Session.set('myRole', null);
			Session.set('timerOptions', null);
			Session.set('logVillagesListNumber', -1);
			Session.set('logVillagesTrip', null);
			Session.set('playerSummary', false);
			Session.set('sound', false);
			Session.set('readyState', true);
			if(Cookie.get('ticket') == null){
				Meteor.call('getTicket', function(error, result){
					if(result != null){
						Cookie.set('ticket', result);
					}
				});
			}
		}
	};
};

Meteor.startup(function() {
	new Initializer().initialize();
	Meteor.call('setAccesses', function(error, result){
		if(result != null){
			new LobbyView().renderAccessCounter(result);
		}
	});
	Meteor.subscribe('schedules', 10);
});

Tracker.autorun(function() {
	Meteor.subscribe('villages', Session.get('villageID'), new VillagesController().updateVillagesView());
});

Tracker.autorun(function(){
	Meteor.subscribe('players', Session.get('villageID'), new PlayersController().updatePlayersView());
});

Tracker.autorun(function(){
	Meteor.subscribe('phases', Session.get('villageID'), new PhasesController().updatePhasesView());
});

Tracker.autorun(function(){
	if(Session.get('villageID') != null) {
		Meteor.subscribe('timers', Session.get('villageID'), timersController.updateTimersView());
	}
});


Tracker.autorun(function(){
	if(Session.get('villageID') != null) {
		Meteor.subscribe('summaries', Session.get('villageID'));
	}
});

Tracker.autorun(function(){
	if(Session.get('myPlayerID') != null) {
		Meteor.subscribe('chatLogs', Session.get('villageID'), Session.get('myPlayerID'), Session.get('currentPhase'), Session.get('currentState'), chatLogsController.updateChatLogsView());
	}
});

Tracker.autorun(function(){
	if(Session.get('myPlayerID') != null) {
		Meteor.subscribe('roles', Session.get('villageID'), Session.get('myPlayerID'), Session.get('currentPhase'), Session.get('currentState'), Session.get('myRole'), new RolesController().updateRolesView());
	}
});

Tracker.autorun(function(){
	if(Session.get('myPlayerID') != null) {
		Meteor.subscribe('actions', Session.get('villageID'), Session.get('myPlayerID'), Session.get('currentPhase'), Session.get('currentState'), new ActionsController().updateActionsView());
	}
});