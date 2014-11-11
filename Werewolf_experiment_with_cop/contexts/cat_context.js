if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('cat');
			$('#roleDetailMessage').html('あなたは村人の仲間です。処刑されるとランダムに1人を、人狼に殺害されると人狼1人を道連れにします。');
			$("#roleIcon").html('<img src="/roleIcon/Cat.png">');
		},

	};

	cat_context = new Context('cat', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	cat_context = new Context('cat', operations);
};
