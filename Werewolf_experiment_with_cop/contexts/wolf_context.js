if(Meteor.isClient){
	var operations = {
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
