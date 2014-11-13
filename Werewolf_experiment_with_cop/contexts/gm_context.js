if(Meteor.isClient){
	var operations = {
		roles_controller_update_roles_view: function(){
			this.proceeds.updateRolesView();
			var villageView = new VillageView();
			villageView.flush('systemWindow');
			villageView.render('GMMenu');
		},
		
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('wolfOrGM');
			$('#roleDetailMessage').html('村建てありがとうございます。設定変更・キック, 各種発言が可能です。誤爆にお気をつけて。');
			$("#roleIcon").html('<img src="/roleIcon/Master.png">');
		},
		
		action_button_view_render: function(phase, roleName, player){
			console.log('done');
			var gmMenuView = new GMMenuView();
			switch(phase.phase){
			case '事件前':
				villageView.flush('logSelector');
				showButton('changeSettings');
				gmMenuView.renderButton('spoilVillage');
				gmMenuView.renderButton('readyCheck');
				villageView.render('extraMenu');
				new ExtraMenuView().renderButtons(['cnChange']);
				break;
			case '事件終了':
				$('#villageBackButton').show();
				gmMenuView.flushButton('kick');
				break;			
			}
		}
	};

	gm_context = new Context('gm', operations);
}

if(Meteor.isServer){
	var operations = {
		chat_logs_controller_publish_chat_logs: function(villageID, playerID, phase, state){
			return chatLogsModel.getChatLogs(villageID, playerID, ['dummy']);
		},
		
		roles_controller_publish_roles: function(villageID, playerID, role, phase, state, role) {
			return rolesModel.getRolesByVillageID(villageID);
		},
		
		chat_logs_model_create_chat_logs: function(villageID, playerID, role, phase, player, plainSentence, options, color, quotes){
			var name = player.characterName;
			var sentence = checkText(villageID, plainSentence, 500);
			var type = 'normal';
			var enableCopy = true;
			name = '<span class="GMName">' + name + '(GM)</span>';
			sentence = addOptions(sentence, options);
			addQuotes(quotes, sentence);
			insertChatLogs(villageID, playerID, phase, name, sentence, type, color, enableCopy);
			return type;
		},
		
		chat_logs_model_create_ghost_chat_logs: function(villageID, playerID, role, phase, player, plainSentence, options, quotes){
			var type = 'ghost';
			var name = '<span class="GMName">' + player.characterName + '(GM)>>霊話</span>'; 
			var sentence = checkText(villageID, plainSentence, 500);
			sentence = addOptions(sentence, options);
			sentence = addQuotes(quotes, sentence);
			insertChatLogs(villageID, playerID, phase, name, sentence, type, 'none', true);
		}
	};

	gm_context = new Context('gm', operations);
};
