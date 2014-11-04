$(function() {
	$(".loginFormContents").mouseenter(function() {
		new LoginView().renderBaloon($(this));
	});
	
	$(".loginFormContents").mouseleave(function() {
		new LoginView().flushBaloon($(this));
	});
	
	$('select[name=loginColorForm]').change(function(){
		var colorName = $(this).val();
		if(colorName == 'random') colorName = 'none';
		var $sample = $('.colorSample');
		$sample.removeClass();
		$sample.addClass('colorSample');
		$sample.addClass(colorName + 'Icon');
	});
	
	$(".loginFormButton[name=enter]").click(function() {
		var loginView = new LoginView();
		loginView.disableInputs();
		var textChecker = new TextChecker();
		
		var cn = $("input[name=characterName]").val();
		var hn = $("input[name=handleName]").val();
		var pass = $("input[name=password]").val();
		var icon = $('.selectedIcon').find('img').attr('id');
		var color = $('#login').find('select[name=loginColorForm]').val();
		
		Cookie.set('characterName', cn);
		Cookie.set('handleName', hn);
		Cookie.set('password', pass);
		
		if(textChecker.checkBlankText(cn) && textChecker.checkBlankText(hn) && textChecker.checkBlankText(pass)) {
		  hn = new TripGenerator().getTrip(hn);
		  Meteor.call('createPlayers', Session.get('villageID'), cn, hn[0], hn[1], pass, icon, color, Cookie.get('ticket'), function(error, result) {
		  	if(result == null) {
		  		alert('入村に失敗しました。\nHN,トリップキー,PASSの組み合わせが正しいかを確認してください');
		  		loginView.render();
		  	} else if(result == false) {
		  		alert('無効なトリップです');
		  		loginView.render();
		  	} else if(result == 'tripLimit'){
		  		alert('トリップ無しでは入村できない村です');
		  		loginView.render();
		  	} else if(result == 'recordLimit'){
		  		alert('トリップの戦績が足りていないため入村できません');
		  		loginView.render();
		  	} else if(result == 'gm') {
		  		alert('まだGMが入村していません');
		  		loginView.render();
		  	} else if(result == 'tickets'){
		  		alert('他の村に参加中のため、入村できません');
		  		loginView.render();
		  	} else {
		  		Session.set('myPlayerID', result);
		  		var werewolfView = new WerewolfView();
		  		werewolfView.flush('lobby');
		  		werewolfView.render('village');
		  		new ActionButtonView().flush();
		  		new VillageView().enableInputs();
		  	}
		  });
		} else {
			alert('未入力の項目があります');
			loginView.render();
		}
	});
	
	$('input[name=openIconList]').click(function(){
		new OverlaysView().render('loginOverlay');
		new IconListView().render('neko');
	});
	
	$('input[name=randomIcon]').click(function(){
		var iconNum = Math.floor( Math.random() * 447);
		new LoginView().updateSelectedIcon(iconNum);
	});
	
	$(".loginFormButton[name=enterAsAudience]").click(function() {
		Meteor.call('createAudience', Session.get('villageID'), Cookie.get('ticket'), function(error, result) {
			if(result == null) {
				alert('入村可能な観戦者数を超えています。');
				loginView.render();
			} else if(result == 'tickets'){
				alert('参加者として入村している村があります');
				loginView.render();
			} else {
				new LoginView().disableInputs();
				Session.set('myPlayerID', result);
				var werewolfView = new WerewolfView();
				werewolfView.flush('lobby');
		  		werewolfView.render('village');
		  		new VillageView().enableInputs();
			}
		});
	});
	
	$("#loginFormBackButton").click(function() {
		new LobbyView().flush();
		Session.set('villageID', null);
		new InformationView().render();
		new VillageListView().render();
	});
});
