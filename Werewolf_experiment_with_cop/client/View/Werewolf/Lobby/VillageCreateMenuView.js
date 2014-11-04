VillageCreateMenuView = function(){
	return{
		render:function(){
			$("#villageCreateMenu").find('input').removeAttr('disabled');
			if(!$('#tripLimit').prop('checked'))
				$('#recordLimit').attr('disabled', 'disabled');
			$("#villageCreateMenu").fadeIn('fast');
		},
		
		renderBaloon: function($this) {
			$this.css("background", "rgba(200, 200, 255, 1.0)");
			$this.children("div.villageCreateContentsBaloon").stop().fadeIn('fast');
		},
		
		flushBaloon: function($this) {
			$this.css("background", "rgba(200, 200, 255, 0)");
			$this.children("div.villageCreateContentsBaloon").stop().fadeOut('fast');
		},
		
		toggleRecordLimit: function($this) {
			if($this.prop('checked')) {
				$("#recordLimit").removeAttr('disabled');
			} else {
				$("#recordLimit").attr('disabled', 'disabled');
			}
		},
	};
};
