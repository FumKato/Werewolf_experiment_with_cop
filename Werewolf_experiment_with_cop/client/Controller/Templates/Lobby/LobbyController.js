$(function() {
	jQuery.preloadImages = function(){
        for(var i = 0; i<arguments.length; i++){
            jQuery("<img>").attr("src", arguments[i]);
        }
    };
    
    $.preloadImages("images/head004_02.gif");
	
	$("#logo").click(function() {
		Session.set('villageID', null);
		new LobbyView().flush();
		new InformationView().render();
		new VillageListView().render();
	});
});
