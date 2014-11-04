$(function(){
	$('#playerSummary').parent('.viewOptionItem').mouseenter(function(){
		$('#helpWindowContent').html('<b>まとめ表示</b>:<br>ONにすると、プレイヤーリストが生存者・襲撃犠牲者・処刑対象者のまとめ表示に切り替わります');
	});
	
	$('#soundSwitch').parent('.viewOptionItem').mouseenter(function(){
		$('#helpWindowContent').html('<b>効果音</b>:<br>ONにすると、未投票による突然死の危険性がある場合などに効果音が鳴るようになります(ブラウザによっては正しく機能しない場合があります)');
	});
	
	$('#playerSummary').click(function(){
		var $this = $(this);
		if($this.hasClass('viewOptionSwitchClicked')){
			$this.removeClass('viewOptionSwitchClicked');
			$this.html('OFF');
			Session.set('playerSummary', false);
		} else {
			$this.addClass('viewOptionSwitchClicked');
			$this.html('ON');
			Session.set('playerSummary', true);
		}
	});
	
	$('#soundSwitch').click(function(){
		var $this = $(this);
		if(!buzz.isSupported()){
			alert('お使いのブラウザは、本機能に対応していません');
			return;
		}
		if($this.hasClass('viewOptionSwitchClicked')){
			$this.removeClass('viewOptionSwitchClicked');
			$this.html('OFF');
			Session.set('sound', false);
			soundManager.stop();
		} else {
			$this.addClass('viewOptionSwitchClicked');
			$this.html('ON');
			Session.set('sound', true);
			soundManager.load();
		}
	});
});
