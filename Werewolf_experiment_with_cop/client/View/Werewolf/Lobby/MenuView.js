MenuView = function(){
	return{
		setMouseovered: function($this) {
			$this.addClass("menuContentMouseovered");
		},
		
		removeMouseovered: function($this) {
			$this.removeClass("menuContentMouseovered");
		}
	};
};
