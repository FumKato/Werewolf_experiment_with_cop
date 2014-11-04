$(function() {
	$(".menuContent").mouseenter(function() {
		new MenuView().setMouseovered($(this));
	});
	
	$(".menuContent").mouseleave(function() {
		new MenuView().removeMouseovered($(this));
	});
	
	$("#createVillage").click(function() {
		Session.set('villageID', null);
		new LobbyView().flush();
		new VillageCreateMenuView().render();
	});
	
	$('#getLogVillage').click(function(){
		Session.set('logVillagesTrip', null);
		new LobbyView().flush();
		new LogVillageListView().render(-1);
	});
	
	$('#dashbord').click(function(){
		window.open('http://jbbs.shitaraba.net/netgame/12259/');
	});
	
	$('#iconlist').click(function(){
		window.open('/iconlist/iconlist.html');
	});
	
	$('#rolesetTable').click(function(){
		window.open('/rolesets/roleset.html');
	});
	
	$('#howto').click(function(){
		window.open('/howto/howto_rule_top.html');
	});
	
	$('#history').click(function(){
		window.open('/histories/history.html');
	});
	
	$('#twitter').click(function(){
		window.open('https://twitter.com/meteorajinro');
	});
});
