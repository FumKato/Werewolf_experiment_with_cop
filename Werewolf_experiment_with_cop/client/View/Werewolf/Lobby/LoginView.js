LoginView = function(){
	return{
		render:function(){
			if(Cookie.get('characterName') != null){
				$('input[name=characterName]').val(Cookie.get('characterName'));
				$('input[name=handleName]').val(Cookie.get('handleName'));
				$('input[name=password]').val(Cookie.get('password'));
			}
			$("#login").find('input').removeAttr('disabled');
			$("#login").fadeIn('fast');
		},
		
		renderBaloon: function($this) {
			$this.css("background", "rgba(200, 200, 255, 1.0)");
			$this.children("div.loginFormContentsBaloon").stop().fadeIn('fast');
		},
		
		flushBaloon: function($this){
			$this.css("background", "rgba(200, 200, 255, 0)");
			$this.children("div.loginFormContentsBaloon").stop().fadeOut('fast');
		},
		
		updateSelectedIcon: function(iconNum){
			$('.selectedIcon').html('<img id="' + iconNum + '" src="./icon/' + iconNum + '.png" />');
		},
		
		disableInputs: function(){
			$("#login").find('input').attr('disabled', true);
		},
		
		flush:function(){}
	};
};

Template.Login.getLoginVillage = function() {
	return new VillagesModel().getLoginVillage(Session.get('villageID'));
};
