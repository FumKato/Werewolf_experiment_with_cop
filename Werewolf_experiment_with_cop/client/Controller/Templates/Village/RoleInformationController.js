$(function(){
	$('#roleInformation').mouseenter(function(){
		$('#helpWindowContent').html('<b>役職情報</b>:<br>あなたの役職名が表示されます。<br>クリックで通常表示(役職名+説明文)/簡易表示(役職名のみ)を切り替えます');
	});
	
	$('#roleInformation').click(function(){
		var $this = $(this);
		$this.find('#roleDetailMessage').toggle(100);
	});
});
