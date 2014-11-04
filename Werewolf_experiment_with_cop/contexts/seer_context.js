if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('seer');
			$('#roleDetailMessage').html('あなたは毎晩, 1人を人狼であるか占うことができます。妖狐を占った場合, 呪い殺すことができます。');
			$("#roleIcon").html('<img src="/roleIcon/Seer.png">'); 
		}
	};

	seer_context = new Context('seer', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	seer_context = new Context('seer', operations);
};
