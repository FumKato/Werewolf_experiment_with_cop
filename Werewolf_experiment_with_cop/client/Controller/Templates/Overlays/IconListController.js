$(function() {
	$('.iconListMenuItem').mouseover(function(){
		$(this).addClass('iconListMenuItemMouseovered');
	});
	
	$('.iconListMenuItem').mouseout(function(){
		$(this).removeClass('iconListMenuItemMouseovered');
	});
	
	$('.iconListMenuItem').click(function(){
		$('.iconListMenuItem').removeClass('iconListMenuItemClicked');
		var $this = $(this);
		$this.addClass('iconListMenuItemClicked');
		new IconListView().render($this.attr('id'));
	});
	
	$(document).on('mouseover', '.iconListItem', function(){
		$(this).addClass('iconListItemMouseovered');
	});
	
	$(document).on('mouseout', '.iconListItem', function(){
		$(this).removeClass('iconListItemMouseovered');
	});
	
	$(document).on('click', '.iconListItem', function(){
		$('.iconListItem').removeClass('iconListItemClicked');
		$(this).addClass('iconListItemClicked');
	});
});
