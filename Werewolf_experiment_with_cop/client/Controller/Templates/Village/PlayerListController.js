$(function(){
	$('#playerList').mouseenter(function(){
		$('#helpWindowContent').html('<b>プレイヤーリスト</b>:<br>クリックすると、そのプレイヤーの<b>これまでの昼の発言</b>がログ欄に表示されます' + 
			'(<b>もう一度クリックで解除</b>)。<b>Shift+クリック</b>でサブウィンドウを表示します。');
	});
	
	$('#playerLogWindow').mouseenter(function(){
		$('#helpWindowContent').html('<b>サブウィンドウ</b>:<br>選択したプレイヤーの<b>これまでの昼の発言</b>が表示されます。' + 
			'<b>Shift+クリック</b>or<b>ダブルクリック</b>で引用リストに追加します。');
	});
	
	$(document).on('mouseenter', '.playerListItem', function(){
		new PlayerListView().renderColor($(this), 'playerListMouseovered');
	});
	
	$(document).on('mouseenter', '.gmPlayerListItem', function(){
		new PlayerListView().renderColor($(this), 'gmPlayerListMouseovered');
	});
	
	$(document).on('mouseenter', '.deadPlayerList', function(){
		new PlayerListView().renderColor($(this), 'deadPlayerListMouseovered');
	});
	
	$(document).on('mouseleave', '.playerListItem', function(){
		new PlayerListView().flushColor($(this), 'playerListMouseovered');
	});
	
	$(document).on('mouseleave', '.gmPlayerListItem', function(){
		new PlayerListView().flushColor($(this), 'gmPlayerListMouseovered');
	});
	
	$(document).on('mouseleave', '.deadPlayerList', function(){
		new PlayerListView().flushColor($(this), 'deadPlayerListMouseovered');
	});
	
	$(document).on('click', '#playerList .playerListItem', function(event){
		var $this = $(this);
		var playerID = $this.attr('id');
		if(event.shiftKey){
			new PlayerListView().renderPlayerLogWindow(playerID, event);
		} else {
			new PlayerListView().flushColor($this, 'playerListMouseovered');
			Session.set('latestLogNumber', -1);
			Session.set('selectedPlayer', playerID);
			new LogSelection().select('');
			$("#content").focus();
		}
	});
	
	$(document).on('click', '#playerList .gmPlayerListItem', function(event){
		var $this = $(this);
		var playerID = $this.attr('id');
		if(event.shiftKey){
			new PlayerListView().renderPlayerLogWindow(playerID, event);
		} else {
			new PlayerListView().flushColor($this, 'gmPlayerListMouseovered');
			Session.set('latestLogNumber', -1);
			Session.set('selectedPlayer', $this.attr('id'));
			new LogSelection().select('gm');
		}
	});
	
		
	$(document).on('click', '#playerList .deadPlayerList', function(event){
		var $this = $(this);
		var playerID = $this.attr('id');
		if(event.shiftKey){
			new PlayerListView().renderPlayerLogWindow(playerID, event);
		} else {
			new PlayerListView().flushColor($this, 'deadPlayerListMouseovered');
			Session.set('latestLogNumber', -1);
			Session.set('selectedPlayer', $this.attr('id'));
			new LogSelection().select('dead');
		}
	});
	
	$(document).on('click', '.playerListClicked', function(event){
		new LogSelection().reset(false);
		var playerID = $(this).attr('id');
		if(event.shiftKey){
			new PlayerListView().renderPlayerLogWindow(playerID, event);
		}
	});
	
	$(document).on('click', '.gmPlayerListClicked', function(){
		new LogSelection().reset(false);
		var playerID = $(this).attr('id');
		if(event.shiftKey){
			new PlayerListView().renderPlayerLogWindow(playerID, event);
		}
	});
	
	$(document).on('click', '.deadPlayerListClicked', function(){
		new LogSelection().reset(false);
		var playerID = $(this).attr('id');
		if(event.shiftKey){
			new PlayerListView().renderPlayerLogWindow(playerID, event);
		}
	});
	
	$(document).on('mouseenter', '.playerLogWindowBodyItem', function(){
		var $this = $(this);
		$this.addClass('playerLogWindowBodyItemMouseovered');
	});
	
	$(document).on('mouseleave', '.playerLogWindowBodyItem', function(){
		var $this = $(this);
		$this.removeClass('playerLogWindowBodyItemMouseovered');
	});
	
	$(document).on('click', '.playerLogWindowBodyItem', function(event){
		if(event.metaKey == null || event.metaKey == false){
			var ctrlKey = event.ctrlKey;
		} else {
			var ctrlKey = event.metaKey;
		}
		if(!event.shiftKey && !ctrlKey) return;
		var textConverter = new TextConverter();
		var $this = $(this).clone(true);
		var name = $('#playerLogWindowHeader').html();
		var quoteNames = $this.find('.quoteTag');
		$this.find('.quoteLabel').remove();
		var plainText = textConverter.html2Text($this.html());
		plainText = textConverter.text2Html(plainText);
		var quoteNamesSentence = '';
		quoteNames.each(function(){
	    	quoteNamesSentence += $(this).html() + '<br>';
	    	plainText = plainText.replace('<br>', '');
	    });
	    plainText = quoteNamesSentence + plainText;
		if(ctrlKey){
	    	var sentence = '<div class="quoteLabel quoteMemoItem"><span class="quoteTag">>>' + name + '</span><div class="quoteContent"><div class="quoteContentHeader">' +
	  			name + '</div><div class="quoteContentBody">' + plainText + '</div></div></div>';
	  		$('#quoteMemoBody').prepend(sentence);
	    } else {
	    	var sentence = '<div class="quoteLabel quoteListItem"><span class="quoteTag">>>' + name + '</span><div class="quoteContent"><div class="quoteContentHeader">' +
	  			name + '</div><div class="quoteContentBody">' + plainText + '</div></div></div>';
	  		var $quoteList = $('#quoteList');
			if($quoteList.find('.quoteLabel').length >= 5){
				alert('一回の発言で引用できる数は5個までです');
				return;
			}
	  		$quoteList.append(sentence);
	  		$('#playerLogWindow').css({
	  			display: 'none'
	  		});
	    	$("#content").focus();
	    
		    $("html,body").animate({ scrollTop: 0 }, 200);
	    }
	});
	
	$(document).on('dblclick', '.playerLogWindowBodyItem', function(event){
		var textConverter = new TextConverter();
		var $this = $(this).clone(true);
		var name = $('#playerLogWindowHeader').html();
		var quoteNames = $this.find('.quoteTag');
		$this.find('.quoteLabel').remove();
		var plainText = textConverter.html2Text($this.html());
		plainText = textConverter.text2Html(plainText);
		var quoteNamesSentence = '';
		quoteNames.each(function(){
	    	quoteNamesSentence += $(this).html() + '<br>';
	    	plainText = plainText.replace('<br>', '');
	    });
	    plainText = quoteNamesSentence + plainText;
	    if(event.altKey){
	    	plainText = textConverter.html2Text(plainText);
	    	var sentence = $('#content').val() + name + ':\n『' + plainText + '』\n';
	    	$('#content').val(sentence);
	    	$("#content").focus();
	    } else {
	    	var $quoteList = $('#quoteList');
			if($quoteList.find('.quoteLabel').length >= 5){
				alert('一回の発言で引用できる数は5個までです');
				return;
			}
	    	var sentence = '<div class="quoteLabel quoteListItem"><span class="quoteTag">>>' + name + '</span><div class="quoteContent"><div class="quoteContentHeader">' +
	  			name + '</div><div class="quoteContentBody">' + plainText + '</div></div></div>';
	  		$quoteList.append(sentence);
	  		$('#content').focus();
	    }
	});
	
	$(document).on('click', '.playerLogWindowSelectorItem', function(){
		var $playerLogWindowSelectorItemClicked = $('.playerLogWindowSelectorItemClicked'); 
		$playerLogWindowSelectorItemClicked.addClass('playerLogWindowSelectorItem');
		$playerLogWindowSelectorItemClicked.removeClass('playerLogWindowSelectorItemClicked');
		
		var $this = $(this);
		$this.addClass('playerLogWindowSelectorItemClicked');
		$this.removeClass('playerLogWindowSelectorItem');
		var day = $this.attr('id');
		var playerID = $('#playerLogWindowHeader').attr('class');
		new PlayerListView().updatePlayerLogWindow(playerID, day);
	});
	
	$('#playerLogWindowCloseButton').click(function(){
		$('#playerLogWindow').css({
			display: 'none'
		});
	});
	
	$('#playerList').mouseleave(function(){
		$('#playerLogWindow').css({
			display: 'none'
		});
	});
});
