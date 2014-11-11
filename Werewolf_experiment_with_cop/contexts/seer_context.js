if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('seer');
			$('#roleDetailMessage').html('あなたは毎晩, 1人を人狼であるか占うことができます。妖狐を占った場合, 呪い殺すことができます。');
			$("#roleIcon").html('<img src="/roleIcon/Seer.png">'); 
		},
		
		action_button_view_render: function(phase, roleName, player){
			this.proceeds.render(phase, roleName, player);
			if(phase.phase =='明け方'){
				soundManager.playBellSound();
				if(player.state != '死　亡')
				showButton('see');
			}
		}
	};

	seer_context = new Context('seer', operations);
}

if(Meteor.isServer){
	var operations = {
		roles_controller_get_role_name: function(playerID, targetID){
			var player = playersModel.getPlayersByID(playerID);
			if(player != null && player.state == '生　存'){
				var role = rolesModel.getRolesByPlayerID(targetID).fetch()[0];
				if(role != null) {
					return role.roleName;
				}
			}
		}
	};

	seer_context = new Context('seer', operations);
};
