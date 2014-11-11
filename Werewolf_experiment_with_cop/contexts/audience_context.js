if(Meteor.isClient){
	var operations = {		
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleDetailMessage').html('いらっしゃいませ。プレイヤーと一緒に推理をお楽しみください。');
			$("#roleIcon").html('<img src="/roleIcon/Audience.png">');
		},
		
		action_button_view_render: function(phase, roleName, player){
			if(phase.phase == '事件前'){
				villageView.flush('logSelector');
				showButton('participate');
				villageView.flush('extraMenu');
			} else if(phase.pahse == '明け方'){
				soundManager.playBellSound();
			}
		}
	};

	audience_context = new Context('audience', operations);
}

if(Meteor.isServer){
	var operations = {
		chat_logs_controller_publish_chat_logs: function(villageID, playerID, phase, state){
			if(phase != '事件前' && phase != '事件終了'){
				return chatLogsModel.getChatLogs(villageID, playerID, ['wolf', 'mason', 'ghost', 'monologue']);
			} else {
				return this.proceeds.publishChatLogs(villageID, playerID, phase, state);
			}
		},
		
		chat_logs_model_create_chat_logs: function(villageID, playerID, role, phase, player, plainSentence, options, color, quotes){
			var name = player.characterName;
			var sentence = checkText(villageID, plainSentence, 500);
			var type = 'audience';
			var color = 'none';
			var enableCopy = true;
			addQuotes(quotes, sentence);
			insertChatLogs(villageID, playerID, phase, name, sentence, type, color, enableCopy);
		}
	};

	audience_context = new Context('audiecne', operations);
};
