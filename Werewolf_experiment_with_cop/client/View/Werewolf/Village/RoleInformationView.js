RoleInformationView = function(){
	var _this = RoleInformationView;
	_this.prototype.render = function(role) {
			var $roleName = $('#roleName');
			$roleName.html('');
			$('#roleDetailMessage').html('');
			$roleName.removeClass();
			$roleName.html(role.roleName);
			if(role.roleName == '役職未定'){
				  $("#roleIcon").html('<img src="/roleIcon/Unknown.png">');
			}
	};
};

roleInformationView = new RoleInformationView();
