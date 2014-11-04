LobbyView = function(){
	return{
		render: function(){
			$('.lobbyContent').hide();
			$('#information').show();
			$('#villageList').show();
		},
		
		flush: function(){
			$('input[type=textarea]').val('');
			$('input').attr('disabled', 'disabled');
			$(".lobbyContent").hide();
		},
		
		renderAccessCounter: function(accesses){
			$('#totalAccessNum').html(accesses.total);
			$('#latestAccessNum').html(accesses.latest);
		}
	};
};
