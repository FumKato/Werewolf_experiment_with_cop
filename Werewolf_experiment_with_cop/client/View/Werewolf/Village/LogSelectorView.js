LogSelectorView = function(){
	return{
		render: function(phase){
			var i = phase.day;
			var $logSelectorList = $('#logSelectorList');
			var logSelectorItem = '<div class="logSelectorItem" id="';
			if(phase.phase == '事件終了'){
				$logSelectorList.prepend(logSelectorItem + 'all">ALL</div>');
			}
			if(i>2 || (i==2 && phase.phase!='昼' && phase.phase!='夕方')){
				$logSelectorList.prepend(logSelectorItem + 'vote">投票結果</div>');
			}
			for(i; i>1; i--){
				$logSelectorList.prepend(logSelectorItem + i + '">' + i + '日目</div>');
			}
		},
		
		flush: function(){
			$('#logSelectorList').html('');
		}
	};
};
