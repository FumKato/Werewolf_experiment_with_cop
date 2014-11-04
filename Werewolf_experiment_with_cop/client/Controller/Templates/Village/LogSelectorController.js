$(function() {
	$('#logSelector').mouseenter(function(){
		$('#helpWindowContent').html('<b>ログセレクター</b>:<br>二日目の昼以降に表示されます。クリックして<b>選択した日の昼のログや投票結果</b>がログ欄に表示されます' +
			'(<b>選択したものをもう一度クリックで解除</b>)');
	});
	
	$(document).on('mouseenter', '.logSelectorItem', function(){
		var $this = $(this);
		$this.addClass('logSelectorItemMouseovered');
	});
	
	$(document).on('mouseleave', '.logSelectorItem', function(){
		var $this = $(this);
		$this.removeClass('logSelectorItemMouseovered');
	});
	
	$(document).on('click', '.logSelectorItem', function(){
		var $this = $(this);
		Session.set('logSelector', null);
		Session.set('latestLogNumber', -1);
		var hasClass = $this.hasClass('logSelectorItemClicked'); 
		$('.logSelectorItem').removeClass('logSelectorItemClicked');
		if(!hasClass){
			$this.addClass('logSelectorItemClicked');
			Session.set('logSelector', $this.attr('id'));
			new LogSelection().select('');
		} else {
			new LogSelection().reset(false);
		}
	});
});
