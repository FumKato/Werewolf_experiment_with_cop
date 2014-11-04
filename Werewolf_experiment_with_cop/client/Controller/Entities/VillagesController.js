VillagesController = function() {
	return {
		updateVillagesView : function() {
			if(Session.get('villageID') == null) return;
			var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
			if(village == null) return;
			
			var options = {
				silenceRule : village.settings.silenceRule,
				actionSkip : village.settings.actionSkip
			};
			Session.set('timerOptions', options);
			var villageInformationView = new VillageInformationView();
			villageInformationView.renderVillageInformation(village);
			
		}
	};
};
