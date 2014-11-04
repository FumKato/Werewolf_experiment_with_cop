if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('wolfOrGM');
			$('#roleDetailMessage').html('村建てありがとうございます。設定変更・キック, 各種発言が可能です。誤爆にお気をつけて。');
			$("#roleIcon").html('<img src="/roleIcon/Master.png">');
		}
	};

	gm_context = new Context('gm', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	gm_context = new Context('gm', operations);
};
