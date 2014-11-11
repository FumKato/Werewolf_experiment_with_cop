if(Meteor.isClient){
	var operations = {
		roles_controller_update_roles_view: function(){
			this.proceeds.updateRolesView();
			var roles = new RolesModel().getRolesByRoleName(Session.get('villageID'), Session.get('myRole').roleName).fetch();
			if(roles.length > 1) {
				var systemWindowView = new SystemWindowView();
				var message = 'あなたの仲間は <span class="wolfOrGM">';
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
			$('#roleName').addClass('wolfOrGM');
			$('#roleDetailMessage').html('あなたは毎晩, 仲間と相談して1人を殺害することができます。村人を欺き, 勝利をつかむのです。');
			$("#roleIcon").html('<img src="/roleIcon/Werewolf.png">');
		}
	};

	wolf_context = new Context('wolf', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	wolf_context = new Context('wolf', operations);
};
