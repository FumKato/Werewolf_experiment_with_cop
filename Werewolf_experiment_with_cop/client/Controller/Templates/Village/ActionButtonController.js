$(function(){
	$('#changeName').click(function(){
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
		new NameChangeOverlayView().render(player);
		overlaysView.render('nameChangeOverlay');
	});
	
	$('#changeSettings').click(function(){
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		new VillageSettingsChangeOverlayView().render(village);
		overlaysView.render('villageSettingsChangeOverlay');
	});
	
	$('#participate').mouseenter(function(){
		$('#helpWindowContent').html('<b>参加ボタン</b>:<br>この村へのログイン画面を表示します');
	});
	
	$('#participate').click(function(){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var participants = new PlayersModel().getParticipantsNumber(Session.get('villageID'));
		if(village.settings.quota <= participants){
			alert('既に満員であるため、入村できません');
			return;
		}
		Session.set('latestLogNumber', -1);
		Session.set('logSelector', null);
		Session.set('myPlayerID', null);
		Session.set('selectedPlayer', null);
		Session.set('currentPhase', null);
		Session.set('currentState', null);
		Session.set('myRole', null);
		Session.set('logVillagesListNumber', -1);
		Session.set('logVillagesTrip', null);
		new OverlaysView().flush();
		var werewolfView = new WerewolfView();
		werewolfView.flush('village');
		werewolfView.render('lobby');
		new LobbyView().flush();
		new LoginView().render();
	});
	
	$('#timeSkip').mouseenter(function(){
		$('#helpWindowContent').html('<b>沈黙ボタン</b>:<br>昼に<b>生存者の半数以上</b>、または夜に<b>生存者全員</b>が押すと、すぐに次のフェーズに移ります。' +
			'<b>ボタンを押したことは他の生存者には公開されません</b>');
	});
	
	$('#timeSkip').click(function(){
		new ActionButtonView().flush();
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'skip');
		if(!check) return;
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain <= 5) return;
		new LogSelection().reset(true);
		var message = '(はやく';
		if(Session.get('currentPhase') == '昼'){
			message += '夕方';
		} else if(Session.get('currentPhase') == '夜') {
			message += '明け方';
		} else {
			return;
		}
		message += 'にならないかなぁ...)';
		actionsModel.createActions(Session.get('myPlayerID'), 'dummyID', 'skip');
		chatLogsModel.createSystemMonologue(message);
		Meteor.call('skipCheck', Session.get('villageID'));
	});
	
	$('#vote').mouseenter(function(){
		$('#helpWindowContent').html('<b>投票メニューボタン</b>:<br>投票メニューを開きます。<b>時間切れ間際(残り2秒以下程度)に投票すると、投票を受け付けない場合がある</b>ので、時間に余裕を持って投票してください');
	});
	
	$('#vote').click(function(){
		if(Session.get('currentState') == '死　亡'){
			new ActionButtonView().flush();
			return;
		}
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'vote');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain <= 2) return;
		if(village.settings.voteSkip && !check){
			alert('投票時間非固定の村では、投票先の変更はできません');
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getLivingPlayers(Session.get('villageID'), Session.get('myPlayerID')).fetch();
		new VoteMenuOverlayView().render(players);
		overlaysView.render('voteMenuOverlay');
	});
	
	$('#kill').mouseenter(function(){
		$('#helpWindowContent').html('<b>襲撃メニューボタン</b>:<br>襲撃メニューを開きます。<b>時間切れ間際(残り2秒以下程度)に襲撃先を決定すると、受け付けない場合がある</b>ので、時間に余裕を持って操作してください');
	});
	
	$('#kill').click(function(){
		if(Session.get('currentState') == '死　亡'){
			new ActionButtonView().flush();
			return;
		}
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'wolf');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain <= 2) return;
		if(village.settings.actionSkip && !check){
			alert('能力時間非固定の村では、襲撃先の変更はできません');
			return;
		}
		if(((village.settings.girl  && village.settings.quota >= 10)  || village.settings.actionSkip) && timer.remain > Math.floor(village.settings.dawn / 2)){
			alert('この村では、残り時間が半分以上経過した後から襲撃可能です。');
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		if(phase.day == 1){
			var players = [new PlayersModel().getVictim(Session.get('villageID'))];
		} else {
			var players = new PlayersModel().getWolvesTargetPlayers(Session.get('villageID'), Session.get('myPlayerID'));
		}
		new KillMenuOverlayView().render(players);
		overlaysView.render('killMenuOverlay');
	});
	
	$('#see').mouseenter(function(){
		$('#helpWindowContent').html('<b>占いメニューボタン</b>:<br>占いメニューを開きます');
	});
	
	$('#see').click(function(){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'seer');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain < 2) return;
		if(Session.get('currentState') == '死　亡' || !check){
			new ActionButtonView().flush();
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getLivingPlayers(Session.get('villageID'), Session.get('myPlayerID')).fetch();
		new SeeMenuOverlayView().render(players);
		overlaysView.render('seeMenuOverlay');
	});
	
	$('#guard').mouseenter(function(){
		$('#helpWindowContent').html('<b>護衛メニューボタン</b>:<br>護衛メニューを開きます。<b>時間切れ間際(残り2秒以下程度)に護衛先を決定すると、受け付けない場合がある</b>ので、時間に余裕を持って操作してください');
	});
	
	$('#guard').click(function(){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'guard');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain <= 2) return;
		if(phase.day == 1 || Session.get('currentState') == '死　亡' || !check){
			new ActionButtonView().flush();
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getLivingPlayers(Session.get('villageID'), Session.get('myPlayerID')).fetch();
		new GuardMenuOverlayView().render(players);
		overlaysView.render('guardMenuOverlay');
	});
	
	$('#nightWalk').mouseenter(function(){
		$('#helpWindowContent').html('<b>夜歩きメニューボタン</b>:<br>夜歩きメニューを開きます。<b>明け方の残り時間が半分以上ある場合のみ実行できます</b>');
	});
	
	$('#nightWalk').click(function(){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'nightWalk');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(phase.day == 1 || Session.get('currentState') == '死　亡' || !check){
			new ActionButtonView().flush();
			return;
		}
		if(timer.remain < Math.floor(village.settings.dawn / 2)){
			alert('残り時間が半分を切ったので、夜歩きはできません');
			new ActionButtonView().flush();
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getLivingPlayers(Session.get('villageID'), Session.get('myPlayerID')).fetch();
		new NightWalkMenuOverlayView().render(players);
		overlaysView.render('nightWalkMenuOverlay');
	});
	
	$('#magic').mouseenter(function(){
		$('#helpWindowContent').html('<b>妖術メニューボタン</b>:<br>妖術メニューを開きます。');
	});
	
	$('#magic').click(function(){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'wizard');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain < 2) return;
		if(Session.get('currentState') == '死　亡' || !check){
			new ActionButtonView().flush();
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getLivingPlayers(Session.get('villageID'), Session.get('myPlayerID')).fetch();
		new MagicMenuOverlayView().render(players);
		overlaysView.render('magicMenuOverlay');
	});
	
	$('#report').mouseenter(function(){
		$('#helpWindowContent').html('<b>通報メニューボタン</b>:<br>通報メニューを開きます。多数の参加者から通報を受けたプレイヤーには、アクセス禁止等のペナルティがあります。通報を行ったかどうかは、他のユーザーには分かりません。');
	});
	
	$('#report').click(function(){
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var check = actionsModel.checkDone(Session.get('myPlayerID'), phase, 'report');
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer != null && timer.remain <= 2) return;
		if(Session.get('currentRole') == 'GM' || Session.get('currentRole') == '観戦者' || !check){
			new ActionButtonView().flush();
			return;
		}
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getPlayersByVillageID(Session.get('villageID'), true).fetch();
		new ReportMenuOverlayView().render(players);
		overlaysView.render('reportMenuOverlay');
	});
});
