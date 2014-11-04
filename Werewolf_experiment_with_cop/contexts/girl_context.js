if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('girl');
			$('#roleDetailMessage').html('毎晩, 誰か1人が人狼であるか知る事ができます。人狼を見つけた時, あなたの正体は人狼にばれてしまいます。');
			$("#roleIcon").html('<img src="/roleIcon/Girl.png">');
		}
	};

	girl_context = new Context('girl', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	girl_context = new Context('girl', operations);
};
