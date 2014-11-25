if(Meteor.isClient){
	adapt_context = function(role){
		if(Session.get('myRole') == null) return;
		switch(Session.get('myRole').roleName){
			case '村　人':
				villager_context.deactivate('RoleInformationView', 'render');
				villager_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				break;
			case '人　狼':
				wolf_context.deactivate('RolesController', 'updateRolesView');
				wolf_context.deactivate('RoleInformationView', 'render');
				wolf_context.deactivate('ActionButtonView', 'render');
				wolf_context.adapt('RolesController', 'updateRolesView', 'roles_controller_update_roles_view');
				wolf_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				wolf_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
				break;
			case '占い師':
				seer_context.deactivate('RoleInformationView', 'render');
				seer_context.deactivate('ActionButtonView', 'render');
				seer_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				seer_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
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
				hunter_context.deactivate('ActionButtonView', 'render');
				hunter_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				hunter_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
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
				wizard_context.deactivate('ActionButtonView', 'render');
				wizard_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				wizard_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
				break;
			case '少　女':
				girl_context.deactivate('RoleInformationView', 'render');
				girl_context.deactivate('ActionButtonView', 'render');
				girl_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				girl_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
				break;
			case 'GM':
			case '仮GM':
				gm_context.deactivate('RolesController', 'updateRolesView');
				gm_context.deactivate('RoleInformationView', 'render');
				gm_context.deactivate('ActionButtonView', 'render');
				gm_context.adapt('RolesController', 'updateRolesView', 'roles_controller_update_roles_view');
				gm_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				gm_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
				break;
			case '観戦者':
				audience_context.deactivate('RoleInformationView', 'render');
				audience_context.deactivate('ActionButtonView', 'render');
				audience_context.adapt('RoleInformationView', 'render', 'role_information_view_render');
				audience_context.adapt('ActionButtonView', 'render', 'action_button_view_render');
				break;
		}
		new ChatLogsController().updateChatLogsView();
		new PhasesController().updatePhasesView();
		new PlayersController().updatePlayersView();
		rolesController.updateRolesView();
	};
		
	Tracker.autorun(function(){
		adapt_context(Session.get('myRole'));
	});
}

if(Meteor.isServer) {
	adapt_context = function(playerID){
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		switch(role.roleName){
			case '村　人':
				break;
			case '人　狼':
				wolf_context.adapt('ChatLogsController', 'publishChatLogs', 'chat_logs_controller_publish_chat_logs');
				wolf_context.adapt('RolesController', 'publishRoles', 'roles_controller_publish_roles');
				wolf_context.adapt('ChatLogsModel', 'createChatLogs', 'chat_logs_model_create_chat_logs');
				break;
			case '占い師':
				seer_context.adapt('RolesController', 'getRoleName', 'roles_controller_get_role_name');
				break;
			case '霊能者':
				seer_context.adapt('RolesController', 'getRoleName', 'roles_controller_get_role_name');
				break;
			case '狂　人':
				break;
			case '狩　人':
				break;
			case '共有者':
				mason_context.adapt('ChatLogsController', 'publishChatLogs', 'chat_logs_controller_publish_chat_logs');
				mason_context.adapt('RolesController', 'publishRoles', 'roles_controller_publish_roles');
				mason_context.adapt('ChatLogsModel', 'createChatLogs', 'chat_logs_model_create_chat_logs');
				break;
			case '妖　狐':
				break;
			case '猫　又':
				break;
			case '妖術師':
				seer_context.adapt('RolesController', 'getRoleName', 'roles_controller_get_role_name');
				break;
			case '少　女':
				seer_context.adapt('RolesController', 'getRoleName', 'roles_controller_get_role_name');
				break;
			case 'GM':
			case '仮GM':
				gm_context.adapt('ChatLogsController', 'publishChatLogs', 'chat_logs_controller_publish_chat_logs');
				gm_context.adapt('RolesController', 'publishRoles', 'roles_controller_publish_roles');
				gm_context.adapt('ChatLogsModel', 'createChatLogs', 'chat_logs_model_create_chat_logs');
				gm_context.adapt('ChatLogsModel', 'createGhostChatLogs', 'chat_logs_model_create_ghost_chat_logs');
				break;
			case '観戦者':
				audience_context.adapt('ChatLogsController', 'publishChatLogs', 'chat_logs_controller_publish_chat_logs');
				audience_context.adapt('ChatLogsModel', 'createChatLogs', 'chat_logs_model_create_chat_logs');
				break;
		}
	};
	
	deactivate_context = function(playerID){
		var role = rolesModel.getRolesByPlayerID(playerID).fetch()[0];
		switch(role.roleName){
			case '村　人':
				break;
			case '人　狼':
				wolf_context.deactivate('ChatLogsController', 'publishChatLogs');
				wolf_context.deactivate('RolesController', 'publishRoles');
				wolf_context.deactivate('ChatLogsModel', 'createChatLogs');
				break;
			case '占い師':
				seer_context.deactivate('RolesController', 'getRoleName');
				break;
			case '霊能者':
				seer_context.deactivate('RolesController', 'getRoleName');
				break;
			case '狂　人':
				break;
			case '狩　人':
				break;
			case '共有者':
				mason_context.deactivate('ChatLogsController', 'publishChatLogs');
				mason_context.deactivate('RolesController', 'publishRoles');
				mason_context.deactivate('ChatLogsModel', 'createChatLogs');
				break;
			case '妖　狐':
				break;
			case '猫　又':
				break;
			case '妖術師':
				seer_context.deactivate('RolesController', 'getRoleName');
				break;
			case '少　女':
				seer_context.deactivate('RolesController', 'getRoleName');
				break;
			case 'GM':
			case '仮GM':
				gm_context.deactivate('ChatLogsController', 'publishChatLogs');
				gm_context.deactivate('RolesController', 'publishRoles');
				gm_context.deactivate('ChatLogsModel', 'createChatLogs');
				gm_context.deactivate('ChatLogsModel', 'createGhostChatLogs');
				break;
			case '観戦者':
				audience_context.deactivate('ChatLogsController', 'publishChatLogs');
				audience_context.deactivate('ChatLogsModel', 'createChatLogs');
				break;
		}
	};
	
	applyContext = function(playerID, f, context, objectName, functionName, operationName){
		
	};
}
