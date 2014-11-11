showButton = function(target){
	var targetName = '#' + target;
	var $target = $(targetName);
	$target.show();
	$target.removeAttr('disabled');
};

ActionButtonView = function(){
	var _this = ActionButtonView;
	
	_this.prototype.render = function(phase, roleName, player){
		switch(phase.phase){
			case '事件前':
				villageView.flush('logSelector');
				showButton('changeName');
				villageView.render('extraMenu');
				new ExtraMenuView().renderButtons(['suicide', 'imready']);
				break;
			case '昼':
				if(player.state == '生　存'){
					new SystemWindowView().flush('voteInformation');
					showButton('timeSkip');
				}
				break;
			case '夕方':
				if(Session.get('currentState') == '生　存'){
					new SystemWindowView().flush('actionInformation');
					showButton('vote');
				}
				break;
			case '夜' :
				if(player.state == '生　存'){
					showButton('timeSkip');
				}
				break;
			case '明け方':
				soundManager.playBellSound();
				break;
			case '事件終了':
				$('#villageBackButton').show();
				showButton('report');
				break;
		}
	};
		
	_this.prototype.flush = function(){
		var $buttons = $('.actionButtons');
		$buttons.attr('disabled', 'disabled');
		$buttons.hide();
	};
	
};
actionButtonView = new ActionButtonView();
