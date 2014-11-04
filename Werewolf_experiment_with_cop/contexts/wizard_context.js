if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('fanatic');
			$('#roleDetailMessage').html('あなたは人狼の仲間です。毎晩, 誰か1人の役職が「村人」であるかを知ることができます。');
			$("#roleIcon").html('<img src="/roleIcon/Wizard.png">');
		}
	};

	wizard_context = new Context('wizard', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	wizard_context = new Context('wizard', operations);
};
