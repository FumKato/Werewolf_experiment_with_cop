if(Meteor.isClient){
	Tracker.autorun(function(){
		if(Session.get('myRole') == null) return;
		switch(Session.get('myRole').roleName){
			case '村　人':
				villager_context.deactivate('RoleInformationView', 'render');
				villager_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '人　狼':
				wolf_context.deactivate('RolesController', 'updateRolesView');
				wolf_context.deactivate('RoleInformationView', 'render');
				wolf_context.adapt('RolesController', 'updateRolesView', 'roles_controller_update_roles_view');
				wolf_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '占い師':
				seer_context.deactivate('RoleInformationView', 'render');
				seer_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '霊能者':
				medium_context.deactivate('RoleInformationView', 'render');
				medium_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '狂　人':
				fanatic_context.deactivate('RoleInformationView', 'render');
				fanatic_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '狩　人':
				hunter_context.deactivate('RoleInformationView', 'render');
				hunter_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '共有者':
				mason_context.deactivate('RolesController', 'updateRolesView');
				mason_context.deactivate('RoleInformationView', 'render');
				mason_context.adapt('RolesController', 'updateRolesView', 'roles_controller_update_roles_view');
				mason_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '妖　狐':
				fox_context.deactivate('RoleInformationView', 'render');
				fox_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '猫　又':
				cat_context.deactivate('RoleInformationView', 'render');
				cat_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '妖術師':
				wizard_context.deactivate('RoleInformationView', 'render');
				wizard_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '少　女':
				girl_context.deactivate('RoleInformationView', 'render');
				girl_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case 'GM':
				gm_context.deactivate('RolesController', 'updateRolesView');
				gm_context.deactivate('RoleInformationView', 'render');
				gm_context.adapt('RolesController', 'updateRolesView', 'roles_controller_update_roles_view');
				gm_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '仮GM':
				gm_context.deactivate('RolesController', 'updateRolesView');
				gm_context.deactivate('RoleInformationView', 'render');
				gm_context.adapt('RolesController', 'updateRolesView', 'roles_controller_update_roles_view');
				gm_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '観戦者':
				audience_context.deactivate('RoleInformationView', 'render');
				audience_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
		}
		new ChatLogsController().updateChatLogsView();
		new PhasesController().updatePhasesView();
		new PlayersController().updatePlayersView();
		rolesController.updateRolesView();
	});
}

if(Meteor.isServer) {
	adapt_context = function(){

	};
	
	deactivate_context = function(){
		
	};
	
	applyContext = function(){
		
	};
}
