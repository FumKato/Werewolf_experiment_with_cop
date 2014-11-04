ChatLogView = function(){
	var renderLogElement = function(name, sentence, option, color, copyFlag){
		if(option == null) option = '';
		$("#log").prepend('<tr class="logItem ' + copyFlag + '"><td class="logName ' + option + ' ' + color + 'Icon"><div class="logElement">' + name +
		'</div></td><td class="logSentence ' + option + ' noColorIcon"><div class="logElement">' + sentence + '</div></td></tr>');
	};
	
	return{
		
		renderWithAnimation: function(logs){
			if(Session.get('selectedPlayer')==null){
				var className = '';
				for(i=0; i<logs.length; i++){
					var copyFlag = '';
					if(logs[i].type == 'ghost') {
						className = 'ghostChatLog';
					} else if(logs[i].type == 'audience'){
						className = 'audienceChatLog';
					} else {
						className = '';
					}
					if(!logs[i].enableCopy){
						copyFlag = 'unableCopy';
					}
					renderLogElement(logs[i].name, logs[i].sentence, className, logs[i].color, copyFlag);
	      			Session.set('latestLogNumber', logs[i].number);
	    		}
			} else {
				for(i=0; i<logs.length; i++){
					var copyFlag = '';
					if(!logs[i].enableCopy){
						copyFlag = 'unableCopy';
					}
					renderLogElement(logs[i].name +'('+logs[i].day+'日目)', logs[i].sentence, '', logs[i].color, copyFlag);
	      			Session.set('latestLogNumber', logs[i].number);
	    		}
			}
	  		$("div.logElement").slideDown("fast");
		},
		
		render: function(logs){
			$("#log").hide();
			$("#chatLogLoading").show();
			if(Session.get('selectedPlayer')==null){
				var className = '';
				for(i=0; i<logs.length; i++){
					var copyFlag = '';
					if(logs[i].type == 'ghost') {
						className = 'ghostChatLog';
					} else if(logs[i].type == "audience"){
						className = 'audienceChatLog';
					} else {
						className = '';
					}
					if(!logs[i].enableCopy){
						copyFlag = 'unableCopy';
					}
					renderLogElement(logs[i].name, logs[i].sentence, className, logs[i].color, copyFlag);
	      			Session.set('latestLogNumber', logs[i].number);
	    		}
			} else {
				for(i=0; i<logs.length; i++){
					var copyFlag = '';
					if(!logs[i].enableCopy){
						copyFlag = 'unableCopy';
					}
					renderLogElement(logs[i].name +'('+logs[i].day+'日目)', logs[i].sentence, '', logs[i].color, copyFlag);
	      			Session.set('latestLogNumber', logs[i].number);
	    		}
			}
	    	$('div.logElement').show();
	    	$('#chatLogLoading').hide();
	    	$('#log').fadeIn('fast');
		},
		
		flush: function(){
			$("#log").html('');
		}
	};
};

chatLogView = new ChatLogView();
