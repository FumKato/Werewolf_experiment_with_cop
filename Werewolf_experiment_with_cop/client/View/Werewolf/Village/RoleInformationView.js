RoleInformationView = function(){
	var _this = RoleInformationView;
	_this.prototype.render = function(role) {
			var $roleName = $('#roleName');
			$roleName.html('');
			$('#roleDetailMessage').html('');
			$roleName.removeClass();
			$roleName.html(role.roleName);
			$("#roleIcon").html('<img src="/roleIcon/Unknown.png">');
	};
};

roleInformationView = new RoleInformationView();
