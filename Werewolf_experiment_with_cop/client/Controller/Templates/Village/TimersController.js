$(function(){
	$('#timers').mouseenter(function(){
		$('#helpWindowContent').html('<b>残り時間</b>:以下の期間、赤色で表示されます<br>' +
			'昼: 〜秒ルールにより、<b>生存者が発言できない時間</b><br>' + 
			'明け方: <b>人狼が「襲撃」をできない時間</b>(=<b>少女が「夜歩き」を実行できる時間</b>)');
	});
});
