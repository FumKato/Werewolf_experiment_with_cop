$(function() {
	$('input[name=villageSettingsChangeOverlayEnterButton]').click(function(){
		var $form = $('#villageSettingsChangeForm');
		$form.find('input').attr('disabled', 'disabled');
		var textChecker = new TextChecker();
		var checkResult = true;
		var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
		$form.find("input[type=text]").each(function() {
			if(!textChecker.checkBlankText($(this).val())) {
				alert('未入力の項目があります');
				var overlaysView = new OverlaysView();
				new VillageSettingsChangeOverlayView().render(village);
				overlaysView.render('villageSettingsChangeOverlay');
				
				checkResult = false;
				return false;
			}
		});
		if(!checkResult) return;
		var data = {
			villageName : $form.find("#villageName").val(),
			quota : $form.find("#quotaForm").val(),
			roleset : $form.find("#rolesetForm").val(),
			villagePR : $form.find("#villagePR").val(),
			GM : village.settings.GM,
			daytime : $form.find("#daytimeForm").val(),
			afternoon : $form.find("#afternoonForm").val(),
			night : $form.find("#nightForm").val(),
			dawn : $form.find("#dawnForm").val(),
			tripLimit: village.settings.tripLimit,
			recordLimit: village.settings.recordLimit,
			cat: $form.find("#enableCat").prop('checked'),
			girl: $form.find("#enableGirl").prop('checked'),
			wizard: $form.find("#enableWizard").prop('checked'),
			iconset: $form.find("#iconsetForm").val(),
			randomCN: $form.find("#randomCN").prop('checked'),
			hideRole: $form.find("#hideRole").prop('checked'),
			audienceUtter: $form.find("#audienceUtter").prop('checked'),
			silenceRule: $form.find("#silenceRuleValue").val(),
			listSort: $form.find("#listSort").prop('checked'),
			voteSkip: $form.find("#voteSkip").prop('checked'),
			actionSkip: $form.find("#actionSkip").prop('checked')
		};
		Meteor.call('updateVillageSettings', Session.get('villageID'), Session.get('myPlayerID'), data);
		new LogSelection().reset(true);
		new OverlaysView().flush();
	});
});
