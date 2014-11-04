LogVillageListView = function(){
	return{
		render:function(number){
			$('.logVillageListTable').hide();
			$('#logVillageListLoading').fadeIn('fast');
			$('.logVillageListTableItem').remove();
			var $logVillageList = $('#logVillageListTable');
			if(Session.get('logVillagesTrip') != null){
				Meteor.call('getLogVillagesByTrip', Session.get('logVillagesTrip'), number, function(error, result){
					var $searchResult = $('#tripSearchResult');
					var message =  '♦' + Session.get('logVillagesTrip') + ': ';
					if(result == null) {
						message += '0件該当';
						$searchResult.html(message);
					} else {
						message += result.hit + '件該当';
					}
					$searchResult.html(message);
					if(result == null || result.hit == 0) return;
					
					var i = 0;
					for(i; i<result.result.length; i++){
						var listItem = '<tr class="logVillageListTableItem"><td class="logVillageListItemNumber noColorIcon">' + result.result[i].number + '</td><td class="noColorIcon">' +
							result.result[i].settings.villageName + ' 村</td><td class="noColorIcon">' +
							result.result[i].settings.quota + '人</td><td class="noColorIcon">';
						if(result.result[i].settings.wizard != null && result.result[i].settings.wizard && new RoleSet().checkWizard(result.result[i].settings)){
							listItem += '[術]';
						}
						if(result.result[i].settings.quota >= 10 && result.result[i].settings.cat){
							listItem += '[猫]';
						}
						listItem += result.result[i].settings.roleset;
						if(result.result[i].settings.quota >= 10 && result.result[i].settings.girl){
							listItem += '[女]';
						}
						listItem += '</td></tr>';
						$logVillageList.append(listItem);
					}
				});
			} else {
				Meteor.subscribe('logVillagesWithNumber', number, function(){
					$('#tripSearchResult').html('');
					var logVillages = new VillagesModel().getLogVillages(number);
					var i = 0;
					if(logVillages.length != 0){
						Session.set('logVillagesListNumber', logVillages[0].number);
					}
					for(i; i<logVillages.length; i++){
						var listItem = '<tr class="logVillageListTableItem"><td class="logVillageListItemNumber noColorIcon">' + logVillages[i].number + '</td><td class="noColorIcon">' +
							logVillages[i].settings.villageName + ' 村</td><td class="noColorIcon">' +
							logVillages[i].settings.quota + '人</td><td class="noColorIcon">';
						if(logVillages[i].settings.wizard != null && logVillages[i].settings.wizard && new RoleSet().checkWizard(logVillages[i].settings)){
							listItem += '[術]';
						}
						if(logVillages[i].settings.quota >= 10 && logVillages[i].settings.cat){
							listItem += '[猫]';
						}
						listItem += logVillages[i].settings.roleset;
						if(logVillages[i].settings.quota >= 10 && logVillages[i].settings.girl){
							listItem += '[女]';
						}
						listItem += '</td></tr>';
						$logVillageList.append(listItem);
					}
				});
			}
			$('#logVillageListLoading').hide();
			$('.logVillageListTable').show();
			$('#logVillageList').find('input').removeAttr('disabled');
			$('#logVillageList').fadeIn('fast');
		},
		
		flush:function(){}
	};
};
