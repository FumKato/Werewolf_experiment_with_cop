$(function(){
	$(document).on('click', '.logVillageListTableItem', function(){
		var $this = $(this);
		var number = $this.find('.logVillageListItemNumber').text();
		window.open('/logs/log_' + number + '.html');
	});
	
	$('.logVillageListControlItem').mouseenter(function(){
		$(this).addClass('logVillageListControlItemMouseovered');
	});
	
	$('.logVillageListControlItem').mouseleave(function(){
		$(this).removeClass('logVillageListControlItemMouseovered');
	});
	
	$('.logVillageListBack').click(function(){
		Session.set('logVillagesTrip', null);
		new LobbyView().flush();
		new InformationView().render();
		new VillageListView().render();
	});
	
	$('.logVillageListForward').click(function(){
		if(Session.get('logVillagesTrip') != null) return;
		new LogVillageListView().render(Session.get('logVillagesListNumber') + 50);
	});
	
	$('.logVillageListBackward').click(function(){
		if(Session.get('logVillagesTrip') != null) return;
		if(Session.get('logVillagesListNumber') <= 50) return;
		new LogVillageListView().render(Session.get('logVillagesListNumber') - 49);
	});
	
	$('input[name=executeNumberSearch]').click(function(){
		Session.set('logVillagesTrip', null);
		var number = $('input[name=logVillageNumber]').val();
		number = parseInt(number);
		Session.set('logVillagesListNumber', number + 1);
		$('input[name=logVillageNumber]').val('');
		new LogVillageListView().render(Session.get('logVillagesListNumber'));
	});
	
	$('input[name=executeTripSearch]').click(function(){
		var trip = $('input[name=logVillageTrip]').val();
		Session.set('logVillagesTrip', trip);
		$('input[name=logVillageTrip]').val('');
		new LogVillageListView().render(-1);
	});
});
