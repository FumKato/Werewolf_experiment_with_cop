if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleDetailMessage').html('あなたは何の能力も持っていません。しかしあなたの推理が村を勝利に導くのです。');
			$("#roleIcon").html('<img src="/roleIcon/Villager.png">'); 
		}
	};

	villager_context = new Context('villager', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	villager_context = new Context('villager', operations);
};
