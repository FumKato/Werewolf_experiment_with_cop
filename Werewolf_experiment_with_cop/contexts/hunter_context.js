if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('hunter');
			$('#roleDetailMessage').html('あなたは毎晩自分以外の1人を人狼の襲撃から守ることができます。人狼の心を読むのです。');
			$("#roleIcon").html('<img src="/roleIcon/Hunter.png">');
		}
	};

	hunter_context = new Context('hunter', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	hunter_context = new Context('hunter', operations);
};
