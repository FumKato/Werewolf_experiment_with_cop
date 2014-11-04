if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('fanatic');
			$('#roleDetailMessage').html('占いでは村人と判定されますが, あなたは人狼の仲間です。その立場を利用して, 人狼の勝利へ導くのです。');
			$("#roleIcon").html('<img src="/roleIcon/Fanatic.png">');
		}
	};

	fanatic_context = new Context('fanatic', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	fanatic_context = new Context('fanatic', operations);
};
