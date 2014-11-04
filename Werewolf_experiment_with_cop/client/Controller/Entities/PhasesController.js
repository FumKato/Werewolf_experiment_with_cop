PhasesController = function() {
	var _this = PhasesController;
	
	_this.prototype.updatePhasesView = function() {
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
			if(phase == null || role == null || player == null) return;
			var actionButtonView = new ActionButtonView();
			Session.set('currentPhase', phase.phase);
			villageView.updateBackgroundColor(phase);	
			actionButtonView.render(phase.phase, role.roleName, player);
			new VillageInformationView().renderPhaseInformation(phase);
			if(Session.get('villageID')==null || Session.get('currentPhase') == phase.phase) return;
			Session.set('currentPhase', phase.phase);
			actionButtonView.flush();
			if(Session.get('sound')){
				soundManager.stop();
			}
			new OverlaysView().flush();
			Session.set('logSelector', null);
			Session.set('selectedPlayer', null);
			Session.set('latestLogNumber', -1);
			chatLogView.flush();
			chatLogsController.updateChatLogsView();
			var logSelectorView = new LogSelectorView();
			logSelectorView.flush();
			logSelectorView.render(phase);
		};
};
