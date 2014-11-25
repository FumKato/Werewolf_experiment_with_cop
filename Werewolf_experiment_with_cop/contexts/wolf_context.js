if(Meteor.isClient){
	var operations = {
		roles_controller_update_roles_view: function(){
			this.proceeds.updateRolesView();
			var roles = new RolesModel().getRolesByRoleName(Session.get('villageID'), Session.get('myRole').roleName).fetch();
			if(roles.length > 1) {
				var systemWindowView = new SystemWindowView();
				var message = 'あなたの仲間は <span class="wolfOrGM">';
				var playersModel = new PlayersModel();
				message += getColleagueName(roles);
				message += '</span>です';
				systemWindowView.renderColleague(message);
			}
		},
		
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('wolfOrGM');
			$('#roleDetailMessage').html('あなたは毎晩, 仲間と相談して1人を殺害することができます。村人を欺き, 勝利をつかむのです。');
			$("#roleIcon").html('<img src="/roleIcon/Werewolf.png">');
		},
		
		action_button_view_render: function(phase, roleName, player){
			this.proceeds.render(phase, roleName, player);
			if(phase.phase =='明け方'){
				soundManager.playBellSound();
				if(player.state != '死　亡')
				showButton('kill');
			}
		}
	};

	wolf_context = new Context('wolf', operations);
}

if(Meteor.isServer){
	var operations = {
		chat_logs_controller_publish_chat_logs: function(villageID, playerID, phase, state){
			if(phase != '事件前' && phase != '事件終了' && state == '生　存'){
				return chatLogsModel.getChatLogs(villageID, playerID, ['dummy', 'audience', 'mason', 'ghost', 'monologue']);
			} else {
				return this.proceeds.publishChatLogs(villageID, playerID, phase, state);
			}
		},
		
		roles_controller_publish_roles: function(villageID, playerID, role, phase, state, role) {
			var player = playersModel.getPlayersByID(playerID);
			if(player == null) return;
			if(phase.phase == '事件終了' || (player.isPlayer && player.state == '死　亡')){
				return this.proceeds.publishRoles(villageID, playerID, role, phase, state, role);
			} else {
				return rolesModel.getRolesByRoleName(villageID, '人　狼');
			}
		},
		
		chat_logs_model_create_chat_logs: function(villageID, playerID, role, phase, player, plainSentence, options, color, quotes){
			if(phase.phase == '夜' && player.state == '生　存'){
				var name = player.characterName;
				var sentence = checkText(villageID, plainSentence, 500);
				name = '<span class="wolf">' + name + '</span>';
				sentence = '<span class="wolf">' + sentence + '</span>';
				sentence = addOptions(sentence, options);
				addQuotes(quotes, sentence);
				insertChatLogs(villageID, playerID, phase, name, sentence, 'wolf', 'none', false);
				insertChatLogs(villageID, 'dummyID', phase, '遠吠え', 'アオォーーン', 'dummy', 'none', false);
				return 'wolf';
			} else {
				return this.proceeds.createChatLogs(villageID, playerID, role, phase, player, plainSentence, options, color, quotes);
			}
		}
	};

	wolf_context = new Context('wolf', operations);
};
