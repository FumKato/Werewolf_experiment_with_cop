$(function(){
	$('#quoteMemo').mouseenter(function(){
		$('#helpWindowContent').html('<b>引用メモ</b>:<br>メモとして引用(<b>Ctrl+クリック</b>)した発言を確認できます。<b>Shift+クリック</b>で引用リストに移動、<b>ダブルクリック</b>で単体削除、<b>×ボタン</b>でメモを全削除します。');
	});
	
	$(document).on('mouseenter', '.quoteMemoItem', function(){
		$(this).addClass('quoteMemoItemMouseovered');
	});
	
	$(document).on('mouseleave', '.quoteMemoItem', function(){
		$(this).removeClass('quoteMemoItemMouseovered');
	});
	
	$(document).on('dblclick', '.quoteMemoItem', function(){
		$(this).remove();
		$("#content").focus();
	});
	
	$(document).on('click', '.quoteMemoItem', function(event){
		if(!event.shiftKey) return;
		var $quoteList = $('#quoteList');
		if($quoteList.find('.quoteLabel').length >= 5){
			alert('一回の発言で引用できる数は5個までです');
			return;
		}
		var $this = $(this);
		var $clone = $this.clone(true);
		$clone.removeClass('quoteMemoItem');
		$clone.removeClass('quoteMemoItemMouseovered');
		$clone.addClass('quoteListItem');
		$quoteList.append($clone);
		$this.remove();
		$("#content").focus();
	});
	
	$(document).on('mouseenter', '.quoteMemoDeleteButton', function(){
		var $this = $(this);
		$this.addClass('quoteMemoDeleteButtonMouseovered');
		$this.removeClass('quoteMemoDeleteButton');
	});
	
	$(document).on('mouseleave', '.quoteMemoDeleteButtonMouseovered', function(){
		var $this = $(this);
		$this.addClass('quoteMemoDeleteButton');
		$this.removeClass('quoteMemoDeleteButtonMouseovered');
	});
	
	$(document).on('click', '.quoteMemoDeleteButtonMouseovered', function(){
		$('#quoteMemoBody').html('');
	});
});
