VillageView = function(){
	return{
		render: function(target){
			var targetName = '#' + target;
			var $target = $(targetName);
			$target.find('input').removeAttr('disabled');
			$target.show();
		},
		
		flush:function(target){
			var targetName = '#' + target;
			var $target = $(targetName);
			$target.find('input').attr('disabled', 'disabled');
			$target.hide();
		},
		
		enableInputs: function(){
			$('#textForm').find('input').removeAttr('disabled');
		},
		
		updateBackgroundColor: function(phase){
			if(phase == null || $('#lobby').is(':visible')){
				$(document.body).css("background-color", "#FFF");
				$(document.body).css("color", "#000");
				return;
			}
			switch(phase.phase) {
				case '事件前日':
				case '昼':
				case '事件終了':
			  		$(document.body).css("background-color", "#FFF");
			  		$(document.body).css("color", "#000");
			  		break;
				case  '夕方':
			  		$(document.body).css("background-color", "#FFCCCC");
			  		$(document.body).css("color", "#000");
			  		break;			  
				case '夜':
			  		$(document.body).css("background-color", "#000");
			  		$(document.body).css("color", "#FFF");
			  		break;
				case '明け方':
			  		$(document.body).css("background-color", "#000033");
			  		$(document.body).css("color", "#FFF");
			  		break;
			}
		}
	};
};

villageView = new VillageView();
