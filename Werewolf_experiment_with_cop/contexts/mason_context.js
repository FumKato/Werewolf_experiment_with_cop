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
				for(var i=0; i<roles.length; i++){
					if(roles[i].playerID == Session.get('myPlayerID')) continue;
					var player = playersModel.getPlayersByID(roles[i].playerID);
					message = message + player.characterName + ',';
				}
				message = message.slice(0, -1);
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
	
	};

	mason_context = new Context('mason', operations);
};
