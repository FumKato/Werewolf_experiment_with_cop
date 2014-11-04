$(function(){
	$('#extendTime').mouseenter(function(){
		$('#helpWindowContent').html('<b>時間延長</b>:<br>以下の場合に押すと、残り時間を延長します<br>事件前/事件終了：<b>残り時間300秒以下、5秒以上</b><br>夕方/明け方：<b>残り時間60秒以下、5秒以上</b>');
	});
	
	$('#extendTime').click(function() {
		var phase = new PhasesModel().getPhases(Session.get('villageID'));
		var timer = timersModel.getTimers(Session.get('villageID'));
		var extendActions = actionsModel.getActionsByType(Session.get('villageID'), phase, 'extend');
		if(extendActions.length > 2){
			alert('このフェーズで時間延長できる回数を使い切りました');
			return;
		}
		switch(phase.phase) {
			case '事件前' :
		  		if(timer.remain >= 300 || timer.remain <= 5){
		  			alert('時間延長は残り300秒以下、5秒以上の場合に可能です。');
		  		} else {
		  			Meteor.call('extendTimer', Session.get('villageID'), Session.get('myPlayerID'));
		  		}
		  		break;
			case '夕方' :
			case '明け方' :
		  		if(timer.remain >= 60 || timer.remain <= 5){
		  			alert('時間延長は残り60秒以下、5秒以上の場合に可能です。');
		  		} else {
		  			Meteor.call('extendTimer', Session.get('villageID'), Session.get('myPlayerID'));
		  		}
		  		break;
		  	case '事件終了':
		  		if(timer.remain >= 300 || timer.remain <= 5){
		  			alert('時間延長は残り300秒以下、5秒以上の場合に可能です。');
		  		} else {
		  			Meteor.call('extendTimer', Session.get('villageID'), Session.get('myPlayerID'));
		  		}
		  		break;
		}
	});

	$('#startGame').click(function() {
		new GMMenuView().flushButton('startGame');
		var phase = Phases.findOne({villageID: Session.get('villageID')});
		if(phase == null || phase.phase != '事件前') return;
		Meteor.call('startGame', Session.get('villageID'), Session.get('myPlayerID'));
	});
	
	$('#audienceChat').click(function(){
		var $content = $("#content");
    	var sentence = $content.val();
    	$content.val("");
    	
		new LogSelection().reset(true);
    	
    	if(new TextChecker().checkBlankText(sentence)){
    		var quotes = new Array();
    		var quoteList = $('#quoteList').find('.quoteLabel');
    		var i = 0;
    		var textConverter = new TextConverter();
    		quoteList.each(function(){
    			var tmp = {
    				name: $(this).find('.quoteContentHeader').html(),
    				sentence: textConverter.html2Text($(this).find('.quoteContentBody').html())
    			};
    			quotes.unshift(tmp);
    		});
    		$('#quoteList').html('');
    		var options = {
    			bold: $('input[value=bold]').prop('checked'),
    			color: $('input[value=colored]').prop('checked')
    		};
    		$('input[value=bold]').attr('checked', false);
    		$('input[value=colored]').attr('checked', false);
    		Meteor.call('createAudienceChatLogs', Session.get('villageID'), Session.get('myPlayerID'), sentence, options, quotes);
    	}
    	$content.focus();
	});

	$('#ghostChat').click(function(){
		var $content = $("#content");
    	var sentence = $content.val();
    	$content.val("");
    	var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
    	var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
    	
		new LogSelection().reset(true);
    	
    	if(new TextChecker().checkBlankText(sentence)){
    		var quotes = new Array();
    		var quoteList = $('#quoteList').find('.quoteLabel');
    		var i = 0;
    		var textConverter = new TextConverter();
    		quoteList.each(function(){
    			var tmp = {
    				name: $(this).find('.quoteContentHeader').html(),
    				sentence: textConverter.html2Text($(this).find('.quoteContentBody').html())
    			};
    			quotes.unshift(tmp);
    		});
    		$('#quoteList').html('');
    		var options = {
    			bold: $('input[value=bold]').prop('checked'),
    			color: $('input[value=colored]').prop('checked')
    		};
    		$('input[value=bold]').attr('checked', false);
    		$('input[value=colored]').attr('checked', false);
    		Meteor.call('createGhostChatLogs', Session.get('villageID'), Session.get('myPlayerID'), sentence, options, quotes);
    	}
    	$content.focus();
	});
	
	$('#kick').click(function(){
		var overlaysView = new OverlaysView();
		overlaysView.flush();
		var players = new PlayersModel().getLivingPlayers(Session.get('villageID'), Session.get('myPlayerID')).fetch();
		var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
		new KickMenuOverlayView().render(role, players);
		overlaysView.render('kickMenuOverlay');
	});
	
	$('#spoilVillage').click(function(){
		var timer = timersModel.getTimers(Session.get('villageID'));
		if(timer.remain <= 5) return;
		if(Session.get('currentPhase') !='事件前' || (Session.get('myRole').roleName !='GM' && Session.get('myRole').roleName !='仮GM'))return;
		var result = confirm('本当に廃村しますか？');
		if(result){
			Meteor.call('killTimer', Session.get('villageID'), Session.get('myPlayerID'));
		}
	});
	
	$('#readyCheck').mouseenter(function(){
		$('#helpWindowContent').html('<b>「準備確認」ボタン</b>:<br>このコマンド使用後、プレイヤー全員が「準備完了」ボタンを押すとゲームを開始できます。');
	});
	
	$('#readyCheck').click(function(){
		if(Session.get('currentPhase') == '事件前' && (Session.get('myRole').roleName == 'GM' || Session.get('myRole').roleName == '仮GM')){
			var $this = $(this);
			$this.attr('disabled', true);
			new PlayersModel().resetReady();
			var sentence = '準備確認を行います。\nプレイヤーの方は「準備完了」ボタンを押して下さい';
			chatLogsModel.createSystemChatLogs(sentence);
			soundManager.playChimeSound();
			Meteor.setTimeout(function(){
				$this.removeAttr('disabled');
			}, 2000);
		}
	});
});
