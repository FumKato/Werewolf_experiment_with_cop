PlayersController = function() {
	return {
		updatePlayersView: function() {
			var myPlayer = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
			var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
			var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			var phase = new PhasesModel().getPhases(Session.get('villageID'));
			
			if($('#village').is(':visible') && myPlayer == null){
				new Initializer().initialize();
				new OverlaysView().flush();
				Session.set('playerSummary', false);
				var werewolfView = new WerewolfView();
				werewolfView.flush('village');
				werewolfView.render('lobby');
				new LobbyView().render();
			}
			
			if(myPlayer != null && myPlayer.isPlayer && myPlayer.state != Session.get('currentState')){
				Session.set('currentState', myPlayer.state);
				if(myPlayer.state == '死　亡'){
					var message = 'あなたは息絶えました...';
					new SystemWindowView().renderActionInformation(message);
				}
			}
			if(Session.get('villageID')==null || village == null)return;
			new VillageInformationView().updateParticipantsNumber(village.settings.quota, new PlayersModel().getParticipantsNumber(Session.get('villageID')));
			if(myPlayer!=null){
				new SystemWindowView().renderMyCharacterName(myPlayer.characterName);
			}
			
			if(phase != null && phase.phase == '事件前' && role != null && (role.roleName == '仮GM' || role.roleName == 'GM')){
				var playerCount = new PlayersModel().getParticipantsNumber(Session.get('villageID'));
				var isReady = new PlayersModel().checkReady(Session.get('villageID'));
				if(village != null && playerCount == village.settings.quota && isReady) {
					new GMMenuView().renderButton('startGame');
				} else {
					new GMMenuView().flushButton('startGame');
				}
			} else {
				new GMMenuView().flushButton('startGame');
			}
			
			if(phase != null && phase.phase == '事件前'){
				var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
				if(player != null && player.isPlayer && player.isReady != Session.get('readyState')){
					if(!player.isReady){
						soundManager.playChimeSound();
					}
					Session.set('readyState', player.isReady);
				}
			}
		}
	};
};
