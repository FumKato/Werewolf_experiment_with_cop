$(function() {
	$(".villageCreateContents").mouseenter(function() {
		new VillageCreateMenuView().renderBaloon($(this));
	});
	
	$(".villageCreateContents").mouseleave(function() {
		new VillageCreateMenuView().flushBaloon($(this));
	});
	
	$("#tripLimit").click(function() {
		new VillageCreateMenuView().toggleRecordLimit($(this));
	});
	
	$("#villageCreateBackButton").click(function() {
		new LobbyView().flush();
		new InformationView().render();
		new VillageListView().render();
	});
	
	$("#villageCreateButton").click(function() {
		$("input").attr('disabled', 'disabled');
		var textChecker = new TextChecker();
		var checkResult = true;
		$("#villageCreateMenu").find("input[type=text]").each(function() {
			if(!textChecker.checkBlankText($(this).val())) {
				alert('未入力の項目があります');
				new VillageCreateMenuView().render();
				checkResult = false;
				return false;
			}
		});
		if(!checkResult) return;
		var $villageCreateMenu = $('#villageCreateMenu');
		var data = {
			villageName : $villageCreateMenu.find("#villageName").val(),
			quota : $villageCreateMenu.find("#quotaForm").val(),
			roleset : $villageCreateMenu.find("#rolesetForm").val(),
			villagePR : $villageCreateMenu.find("#villagePR").val(),
			GM : $villageCreateMenu.find("#enableGM").prop('checked'),
			daytime : $villageCreateMenu.find("#daytimeForm").val(),
			afternoon : $villageCreateMenu.find("#afternoonForm").val(),
			night : $villageCreateMenu.find("#nightForm").val(),
			dawn : $villageCreateMenu.find("#dawnForm").val(),
			tripLimit: $villageCreateMenu.find("#tripLimit").prop('checked'),
			recordLimit: $villageCreateMenu.find("#recordLimit").val(),
			cat: $villageCreateMenu.find("#enableCat").prop('checked'),
			girl: $villageCreateMenu.find("#enableGirl").prop('checked'),
			wizard: $villageCreateMenu.find("#enableWizard").prop('checked'),
			iconset: $villageCreateMenu.find("#iconsetForm").val(),
			randomCN: $villageCreateMenu.find("#randomCN").prop('checked'),
			hideRole: $villageCreateMenu.find("#hideRole").prop('checked'),
			audienceUtter: $villageCreateMenu.find("#audienceUtter").prop('checked'),
			silenceRule: $villageCreateMenu.find("#silenceRuleValue").val(),
			listSort: $villageCreateMenu.find("#listSort").prop('checked'),
			voteSkip: $villageCreateMenu.find("#voteSkip").prop('checked'),
			actionSkip: $villageCreateMenu.find("#actionSkip").prop('checked'),
			noTweet: $villageCreateMenu.find('#noTweet').prop('checked')
		};
		new VillagesModel().createVillages(data, function(error, result) {
			if(result == false){
				alert('村の作成数が上限に達しています');
				new LobbyView().flush();
				new InformationView().render();
				new VillageListView().render();	
				return;
			} else if(result == 'tickets'){
				alert('一人で同時に2つ以上の村を建てることはできません');
				new LobbyView().flush();
				new InformationView().render();
				new VillageListView().render();	
				return;
			} else if(result == 'participant'){
				alert('他に参加している村があるため、村を建てることはできません');
				new LobbyView().flush();
				new InformationView().render();
				new VillageListView().render();	
				return;
			}
			Session.set('villageID', result);
			if(Session.get('villageID') == null) {
				alert('村の作成に失敗しました');
				new LobbyView().flush();
				new InformationView().render();
				new VillageListView().render();	
			} else {
				new LobbyView().flush();
				new LoginView().render();
			}
		});
	});
});