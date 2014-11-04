ActionButtonView = function(){
	var _this = ActionButtonView;
	
	_this.prototype.render = function(phase, roleName, player){
		var showButton = function(target){
			var targetName = '#' + target;
			var $target = $(targetName);
			$target.show();
			$target.removeAttr('disabled');
		};
		
		switch(phase){
			case '事件前':
				villageView.flush('logSelector');
				switch(roleName){
					case 'GM':
					case '仮GM':
						showButton('changeSettings');
						new GMMenuView().renderButton('spoilVillage');
						new GMMenuView().renderButton('readyCheck');
						villageView.render('extraMenu');
						new ExtraMenuView().renderButtons(['cnChange']);
						break;
					case '役職未定':
						showButton('changeName');
						villageView.render('extraMenu');
						new ExtraMenuView().renderButtons(['suicide', 'imready']);
						break;
					case '観戦者':
						showButton('participate');
						villageView.flush('extraMenu');
						break;
				}
				break;
			case '昼':
				if(roleName != 'GM' && roleName != '観戦者' && player.state == '生　存'){
					new SystemWindowView().flush('voteInformation');
					showButton('timeSkip');
				}
				break;
			case '夕方':
				if(Session.get('currentState') == '生　存'){
					new SystemWindowView().flush('actionInformation');
				}
				if(roleName != 'GM' && roleName != '観戦者' && player.state == '生　存'){
					showButton('vote');
				}
				break;
			case '夜' :
				if(roleName != 'GM' && roleName != '観戦者' && player.state == '生　存'){
					showButton('timeSkip');
				}
				break;
			case '明け方':
				soundManager.playBellSound();
				if(player.state == '死　亡') break;
				switch(roleName){
					case '占い師':
						showButton('see');
						break;
					case '人　狼':							
						showButton('kill');
						break;
					case '狩　人':
						if(phase.day != 1)
						showButton('guard');
						break;
					case '少　女':
						if(phase.day != 1)							
						showButton('nightWalk');
						break;
					case '妖術師':
						showButton('magic');
						break;
				}
				break;
			case '事件終了':
				$('#villageBackButton').show();
				if(roleName != '観戦者' && roleName != 'GM'){
					showButton('report');
				} else if(roleName == 'GM'){
					new GMMenuView().flushButton('kick');
				}
				break;
			default:
				new GMMenuView().flushButton('spoilVillage');
				new GMMenuView().flushButton('readyCheck');
				villageView.flush('extraMenu');
				villageView.render('logSelector');
				break;
			
		}
	};
		
	_this.prototype.flush = function(){
		var $buttons = $('.actionButtons');
		$buttons.attr('disabled', 'disabled');
		$buttons.hide();
	};
	
};
