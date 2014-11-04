VillageSettingsChangeOverlayView = function(){
	return {
		render: function(village){
			var $form = $('#villageSettingsChangeForm');
			$form.find('#villageName').val(village.settings.villageName);
			$form.find('#quotaForm').val(village.settings.quota);
			$form.find('#rolesetForm').val(village.settings.roleset);
			$form.find('#villagePR').val(village.settings.villagePR);
			$form.find('#enableGM').attr('checked', village.settings.GM);
			$form.find('#daytimeForm').val(village.settings.daytime);
			$form.find('#nightForm').val(village.settings.night);
			$form.find('#afternoonForm').val(village.settings.afternoon);
			$form.find('#dawnForm').val(village.settings.dawn);
			$form.find('#enableCat').attr('checked', village.settings.cat);
			$form.find('#enableGirl').attr('checked', village.settings.girl);
			$form.find('#enableWizard').attr('checked', village.settings.wizard);
			$form.find('#iconsetForm').val(village.settings.iconset);
			$form.find('#randomCN').attr('checked', village.settings.randomCN);
			$form.find('#audienceUtter').attr('checked', village.settings.audienceUtter);
			$form.find('#silenceRuleValue').val(village.settings.silenceRule);
			$form.find('#listSort').attr('checked', village.settings.listSort);
			$form.find('#voteSkip').attr('checked', village.settings.voteSkip);
			$form.find('#actionSkip').attr('checked', village.settings.actionSkip);
		}
	};
};

