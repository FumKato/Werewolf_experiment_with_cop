$(function(){
	$('input[name=loginOverlayBackButton]').click(function(){
		new OverlaysView().flushLayeredOverlay('loginOverlay');
	});
	
	$('input[name=back]').click(function(){
		new OverlaysView().flush();
	});
	
	$('#loginOverlayEnterButton').click(function(){
		var iconNum = $('#iconListBody').find('.iconListItemClicked').attr('id');
		if(iconNum != null){
			new LoginView().updateSelectedIcon(iconNum);
		}
		new OverlaysView().flushLayeredOverlay('loginOverlay');
	});
	
});
