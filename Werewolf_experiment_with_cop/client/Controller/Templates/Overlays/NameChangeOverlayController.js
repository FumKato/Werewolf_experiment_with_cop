$(function() {
	$('select[name=nameChangeColorForm]').change(function(){
		var colorName = $(this).val();
		if(colorName == 'random') colorName = 'none';
		var $sample = $('.colorSample');
		$sample.removeClass();
		$sample.addClass('colorSample');
		$sample.addClass(colorName + 'Icon');
	});
	
	$('input[name=nameChangeOverlayEnterButton]').click(function(){
		$('#nameChangeOverlay').find('input').attr('disabled', true);
		var $name = $('input[name=changedCharacterName]');
		var textChecker = new TextChecker();
		var cn = $name.val();
		var icon = $('.selectedIcon').find('img').attr('id');
		var color = $('select[name=nameChangeColorForm]').val();
		
		Meteor.call('changePlayers', Session.get('villageID'), Session.get('myPlayerID'), cn, icon, color);
		$name.val('');
		new LogSelection().reset(true);
		new OverlaysView().flush();
	});
	
	$('input[name=openIconListWithOverlay]').click(function(){
		new OverlaysView().renderLayeredOverlay('loginOverlay');
		new IconListView().render('neko');
	});
});
