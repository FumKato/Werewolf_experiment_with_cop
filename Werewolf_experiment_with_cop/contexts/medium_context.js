if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('medium');
			$('#roleDetailMessage').html('あなたは毎晩, その日に処刑された人が人狼であるかを知ることができます。');
			$("#roleIcon").html('<img src="/roleIcon/Medium.png">');
		}
	};

	medium_context = new Context('medium', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	medium_context = new Context('medium', operations);
};
