$(function(){
	$('#chatLog').mouseenter(function(){
		$('#helpWindowContent').html('<b>ログ欄</b>:<br><b>Shift+クリック</b>or<b>ダブルクリック</b>すると、その発言を引用リストに追加します。<b>Alt+ダブルクリック</b>で平文で引用します。<b>Ctrl+クリック</b>で引用メモに追加します。');
	});
	
	$(document).on("mouseover", "tr", function() {
		var $this = $(this);
		if($this.hasClass('unableCopy')) return;
		$(this).addClass('mouseovered');
	});
	
	$(document).on("mouseout", "tr", function() {
		$(this).removeClass('mouseovered');
	});
	
	$(document).on("click", ".logItem", function(event) {
		if(event.metaKey == null || event.metaKey == false){
			var ctrlKey = event.ctrlKey;
		} else {
			var ctrlKey = event.metaKey;
		}
		if(!event.shiftKey && !ctrlKey) return;
		var textConverter = new TextConverter();
		var $this = $(this);
		if($this.hasClass('unableCopy')) return;
		var $logSentence = $this.find('.logSentence').clone(true);
	    var name = $this.find('.logName').text() + ' の発言';
	    var quoteNames = $logSentence.find('.quoteTag');
	    $logSentence.find('.quoteLabel').remove();
	    var plainText = textConverter.html2Text($logSentence.html());
	    var quoteNamesSentence = '';
	    plainText = textConverter.text2Html(plainText);
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
	    	$("#content").focus();
	    
			new LogSelection().reset(true);
	    
		    $("html,body").animate({ scrollTop: 0 }, 200);
	    }
	});
	
	$(document).on("dblclick", ".logItem", function(event){
		var textConverter = new TextConverter();
		var $this = $(this);
		if($this.hasClass('unableCopy')) return;
		var $logSentence = $this.find('.logSentence').clone(true);
	    var name = $this.find('.logName').text() + ' の発言';
	    var quoteNames = $logSentence.find('.quoteTag');
	    $logSentence.find('.quoteLabel').remove();
	    var plainText = textConverter.html2Text($logSentence.html());
	    var quoteNamesSentence = '';
	    plainText = textConverter.text2Html(plainText);
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
	
	$(document).on('mouseenter', '.quoteLabel', function(e){
		var $this = $(this);
		var $content = $(this).find('.quoteContent');
		$content.css({
			top: e.pageY - 20,
			left: e.pageX - 35,
			display: 'block'
		});
	});
	
	$(document).on('mouseleave', '.quoteContent', function(){
		$(this).css({
			display: 'none'
		});
	});
});
