$(function(){
	$('#quoteForm').mouseenter(function(){
		$('#helpWindowContent').html('<b>引用リスト</b>:<br>次の発言時に挿入される引用です(最大5個)。<b>Shift+クリック</b>で引用メモに移動・<b>ダブルクリック</b>で削除・<b>×ボタン</b>でリスト上の引用を全て削除します。');
	});
	
	$(document).on('mouseenter', '.quoteDeleteButton', function(){
		var $this = $(this);
		$this.addClass('quoteDeleteButtonMouseovered');
		$this.removeClass('quoteDeleteButton');
	});
	
	$(document).on('dblclick', '.quoteListItem', function(){
		$(this).remove();
		$("#content").focus();
	});
	
	$(document).on('click', '.quoteListItem', function(event){
		if(event.shiftKey){
			var $this = $(this);
			var $clone = $this.clone(true);
			$clone.addClass('quoteMemoItem');
			$clone.removeClass('quoteListItem');
			$('#quoteMemoBody').prepend($clone);
			$this.remove();
			$("#content").focus();
		}
	});
	
	$(document).on('mouseleave', '.quoteDeleteButtonMouseovered', function(){
		var $this = $(this);
		$this.addClass('quoteDeleteButton');
		$this.removeClass('quoteDeleteButtonMouseovered');
	});
	
	$(document).on('click', '.quoteDeleteButtonMouseovered', function(){
		$('#quoteList').html('');
	});
});
