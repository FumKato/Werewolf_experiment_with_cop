$(function(){
	$('#suicide').mouseenter(function(){
		$('#helpWindowContent').html('<b>「出て行く」ボタン</b>:<br>この村に登録したプレイヤー情報を削除し、退出します。');
	});
	
	$('#suicide').click(function(){
		var result = confirm('村から退出します。よろしいですか？');
		if(!result) return;
		if(Session.get('currentPhase') == '事件前' && Session.get('myRole').roleName == '役職未定'){
			var targetPlayer = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
			var sentence = targetPlayer.characterName + ' は村から出てゆきました';
			chatLogsModel.createSystemChatLogs(sentence);
			new PlayersModel().removePlayers(Session.get('myPlayerID'));
		}
	});
	
	$('#imready').mouseenter(function(){
		$('#helpWindowContent').html('<b>「準備完了」ボタン</b>:<br>GM/仮GMが「準備確認」コマンドを使用した時に押します。');
	});
	
	$('#imready').click(function(){
		var myself = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
		if(Session.get('currentPhase') == '事件前' && Session.get('myRole').roleName == '役職未定' && !myself.isReady){
			new PlayersModel().setReady();
			var sentence = myself.characterName + ' の準備ができました';
			chatLogsModel.createSystemChatLogs(sentence);
			
		}
	});
	
	$('#cnChange').click(function(){
		$('#changeName').trigger('click');
	});
});
