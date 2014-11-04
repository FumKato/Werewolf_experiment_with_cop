TimersController = function() {
	return {
		updateTimersView: function() {
			var timer = timersModel.getTimers(Session.get('villageID'));
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
			var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
			if(phase == null || village == null || player == null) return;
			timersView.render(timer, phase, village);
			if(player.isPlayer && phase.phase == '夕方' && timer.remain <= 60 && actionsModel.checkDone(Session.get('myPlayerID'), phase, 'vote')){
				soundManager.playTicktackSound(timer, phase);
			}
			if(phase == '事件終了' && timer.remain <= 0){
				new Initializer().initialize();
				new OverlaysView().flush();
				var werewolfView = new WerewolfView();
				werewolfView.flush('village');
				werewolfView.render('lobby');
				new LobbyView().render();
			}
		}
	};
};

timersController = new TimersController();
