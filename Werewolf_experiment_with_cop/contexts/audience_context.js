if(Meteor.isClient){
	var operations = {
		role_information_view_render: function(role){
			this.proceeds.render(role);
			$('#roleDetailMessage').html('いらっしゃいませ。プレイヤーと一緒に推理をお楽しみください。');
			$("#roleIcon").html('<img src="/roleIcon/Audience.png">');
		}
	};

	audience_context = new Context('audience', operations);
}

if(Meteor.isServer){
	var operations = {
	
	};

	audiecne_context = new Context('audiecne', operations);
};
