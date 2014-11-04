$(function(){
	var keyDownCode;
	var shiftKey;
	
	$('#textForm').mouseenter(function(){
		$('#helpWindowContent').html('<b>「一発」オプション</b>:<br>チェックしている間、<b>Enterキー押下で即発言できるようになります</b>。<b>Shift + Enter で、発言せずに改行します。</b>');
	});
	
	$("#sendButton").click(function() {
  		var $content = $("#content");
    	var sentence = $content.val();
    	$content.val("");
    	var role = new RolesModel().getRolesByPlayerID(Session.get('myPlayerID'));
    	var village = new VillagesModel().getVillagesByID(Session.get('villageID'));
    	var player = new PlayersModel().getPlayersByID(Session.get('myPlayerID'));
    	
    	new LogSelection().reset(true);
    	
    	if(role.roleName == '観戦者' && (!village.settings.audienceUtter || player.bloked)){
    		alert('この村では、観戦者は発言できません。');
    		return;
    	}
    	var timer = timersModel.getTimers(Session.get('villageID'));
    	var flag = timer.remain > (village.settings.daytime - Session.get('timerOptions').silenceRule);
    	if(player.isPlayer && player.state == '生　存' && Session.get('currentPhase') == '昼' && flag){
    		alert('まだ発言できません。');
    		return;
    	}
    	if(new TextChecker().checkBlankText(sentence)){
    		var quotes = new Array();
    		var quoteList = $('#quoteList').find('.quoteLabel');
    		var i = 0;
    		var textConverter = new TextConverter();
    		quoteList.each(function(){
    			var tmp = {
    				name: $(this).find('.quoteContentHeader').html(),
    				sentence: textConverter.html2Text($(this).find('.quoteContentBody').html())
    			};
    			quotes.unshift(tmp);
    		});
    		$('#quoteList').html('');
    		var options = {
    			bold: $('input[value=bold]').prop('checked'),
    			color: $('input[value=colored]').prop('checked')
    		};
    		$('input[value=bold]').attr('checked', false);
    		$('input[value=colored]').attr('checked', false);
    		var phase = new PhasesModel().getPhases(Session.get('villageID'));
    		Meteor.call('createChatLogs', Session.get('villageID'), Session.get('myPlayerID'), sentence, options, quotes, phase);
    	}
    	$content.focus();
  	});
  	
  	$('form[name=chatInput]').keydown(function(e) {
  		shiftKey = e.shiftKey;
  		keyDownCode = e.which;
  		if($('input[name=onebutton]').prop('checked') && !shiftKey && keyDownCode == 13){
  			return false;
  		}
  	});
  	
  	$('form[name=chatInput]').keyup(function(e) {
  		if(!shiftKey && e.keyCode == 13 && e.keyCode == keyDownCode){
  			if($('input[name=onebutton]').prop('checked')){
  				$('#sendButton').trigger('click');
  			}
  		}
  	});
});
