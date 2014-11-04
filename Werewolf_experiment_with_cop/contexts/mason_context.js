if(Meteor.isClient){
	var operations = {
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
