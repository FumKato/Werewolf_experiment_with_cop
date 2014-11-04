$(function() {
	
	$('#villageBaseInformation').mouseenter(function(){
		new VillageInformationView().renderVillageOptionInformation(new VillagesModel().getVillagesByID(Session.get('villageID')));
	});
	
	$('#villageBaseInformation').mouseleave(function(){
		new VillageInformationView().flushVillageOptionInformation();
	});
	
	$('#rolesetBaseInformation').mouseenter(function(){
		new VillageInformationView().renderRolesetOptionInformation(new RoleSet().createRoles(Session.get('villageID')));
	});
	
	$('#rolesetBaseInformation').mouseleave(function(){
		new VillageInformationView().flushRolesetOptionInformation();
	});
	
	$('#helpWindowSwitch').mouseenter(function(){
		$('#helpWindowContent').html('<b>切り替えスイッチ</b>:<br>本ウィンドウの表示/非表示を切り替えます');
	});
	
	$('#helpWindowState').click(function(){
		$helpWindowState = $(this); 
		if($helpWindowState.hasClass('helpWindowOn')){
			$helpWindowState.removeClass('helpWindowOn');
			$helpWindowState.addClass('helpWindowOff');
			$helpWindowState.html('OFF');
			$('#helpWindow').hide();
		} else {
			$helpWindowState.removeClass('helpWindowOff');
			$helpWindowState.addClass('helpWindowOn');
			$helpWindowState.html('ON');
			$('#helpWindow').show();
		}
	});
});
