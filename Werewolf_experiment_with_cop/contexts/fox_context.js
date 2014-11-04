if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleName').addClass('fox');
			$('#roleDetailMessage').html('人狼に襲撃されても平気ですが, 占われると死んでしまいます。生き残ること, それがあなたの勝利です。');
			$("#roleIcon").html('<img src="/roleIcon/Fox.png">');
		}
	};

	fox_context = new Context('fox', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	fox_context = new Context('fox', operations);
};
