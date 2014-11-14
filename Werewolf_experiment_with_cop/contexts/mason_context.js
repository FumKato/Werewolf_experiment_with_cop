if(Meteor.isClient){
	var operations = {
		roles_controller_update_roles_view: function(){
			this.proceeds.updateRolesView();
			var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
			var roles = new RolesModel().getRolesByRoleName(Session.get('villageID'), Session.get('myRole').roleName).fetch();
			if(roles.length > 1) {
				var systemWindowView = new SystemWindowView();
				var message = 'もう一人の共有者は <span class="mason">';
				var playersModel = new PlayersModel();
				message += getColleagueName(roles);
				message += '</span>です';
				systemWindowView.renderColleague(message);
			}
		},
		
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('mason');
			$('#roleDetailMessage').html('あなたはもう1人の共有者を知ることができます。2人とも生存している場合, 夜に密談をすることができます。');
			$("#roleIcon").html('<img src="/roleIcon/Mason.png">');
		}
	};

	mason_context = new Context('mason', operations);
}

if(Meteor.isServer){
	var operations = {
		chat_logs_controller_publish_chat_logs: function(villageID, playerID, phase, state){
			if(phase != '事件前' && phase != '事件終了'){
				return chatLogsModel.getChatLogs(villageID, playerID, ['wolf', 'audience', 'ghost', 'monologue']);
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
				return rolesModel.getRolesByRoleName(villageID, '共有者');
			}
		},
		
		chat_logs_model_create_chat_logs: function(villageID, playerID, role, phase, player, plainSentence, options, color, quotes){
			if(phase.phase == '夜' && player.state == '生　存'){
				var name = player.characterName;
				var sentence = checkText(villageID, plainSentence, 500);
				name = '<span class="mason">' + name + '</span>';
				sentence = '<span class="mason">' + sentence + '</span>';
				sentence = addOptions(sentence, options);
				addQuotes(quotes, sentence);
				insertChatLogs(villageID, playerID, phase, name, sentence, 'mason', 'none', false);
				return 'mason';
			} else {
				return this.proceeds.createChatLogs(villageID, playerID, role, phase, player, plainSentence, options, color, quotes);
			}
		}
	};

	mason_context = new Context('mason', operations);
};
