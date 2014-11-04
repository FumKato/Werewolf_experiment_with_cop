$(function(){
	$('.logSelectorItem').mouseenter(function(){
		$(this).addClass('logSelectorItemMouseovered');
	});
	
	$('.logSelectorItem').mouseleave(function(){
		$(this).removeClass('logSelectorItemMouseovered');
	});
	
	$('.logSelectorItem').click(function(){
		var $this = $(this);
		if($this.hasClass('logSelectorItemClicked')){
			$this.addClass('logSelectorItem');
			$this.removeClass('logSelectorItemClicked');
			$('tr').show();
		} else {
			$('.logSelectorItem').removeClass('logSelectorItemClicked');
			$this.removeClass('logSelectorItemMouseovered');
			$this.addClass('logSelectorItemClicked');
			$('tr').hide();
			$('tr').hide();
			$('tr').has('th').show();
			if($this.attr('id') == 'all'){
				$('tr').has('.logName').show();
				$('tr').find('.logSentence').show();
			} else if($this.attr('id') == 'before'){
				$('tr').has('.beforePhase').show();
			} else if($this.attr('id') == 'after'){
				$('tr').has('.afterPhase').show();
			} else {
				var className = '.' + $this.attr('id');
				$('tr').has(className).show();
			}
		}
	});
	
	$('#reverse').click(function(){
		var $this = $(this);
		if($this.hasClass('subSelectorItemClicked')){
			$this.html('OFF');
			$this.addClass('subSelectorItem');
			$this.removeClass('subSelectorItemClicked');
		} else {
			$this.html('ON');
			$this.addClass('subSelectorItemClicked');
			$this.removeClass('subSelectorItem');
		}
		var chatLogs = $('#log').find('tr');
		var $log = $('#log');
		$log.html('');
		var i = chatLogs.length - 1;
		for(i; i>=0; i--){
			$log.append(chatLogs[i]);
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

