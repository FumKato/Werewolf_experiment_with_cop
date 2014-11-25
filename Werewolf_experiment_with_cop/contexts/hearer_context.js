if(Meteor.isClient){
	var operations = {
		roles_controller_update_roles_view: function(){
			this.proceeds.updateRolesView();
			var roles = new RolesModel().getRolesByRoleName(Session.get('villageID'), '人　狼').fetch();
			if(roles.length > 1) {
				var systemWindowView = new SystemWindowView();
				var message = 'あなたが崇拝する人狼の血を引く者は <span class="wolfOrGM">';
				var playersModel = new PlayersModel();
				message += getColleagueName(roles);
				message += '</span>です';
				systemWindowView.renderColleague(message);
			}
		},
		
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('fanatic');
			$('#roleDetailMessage').html('あなたは人狼の仲間です。夜に人狼の会話を聴く事ができます。');
			$("#roleIcon").html('<img src="/roleIcon/Hearer.png">');
		}
	};

	hearer_context = new Context('hearer', operations);
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
				return rolesModel.getRolesByRoleName(villageID, '聴狂人');
			}
		}
	};

	hearer_context = new Context('hearer', operations);
};
