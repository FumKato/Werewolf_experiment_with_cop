TextChecker = function() {
	var iconset = ['ALL', 'ねこっぷ', 'azuma', 'mtmt', 'shirone', '花のお江戸', '壱番街', 'かりんか', 'メトロポリス', 'xx'];
	var fullNum2HalfNum = function(num) {
		return num.replace(/[０１２３４５６７８９]/g, function(num){
			var b = "０１２３４５６７８９".indexOf(num);
			return (b !== -1)? b:num;
		});
	};
	
	var checkNumberLimitation = function(num, bottom, top) {
		if(num < bottom) num = bottom;
		if(num > top) num = top;
		return num;
	};
	
	var checkNaturalNumber = function(num) {
		if(num.match(/^[0-9]$/)) return true;
		if(num.match(/^[1-9][0-9]*$/)) return true;
		return false;
	};
	
	return{
		checkEscape : function(text){
			if(text == null) return null;
			text = text.split('¥').join('￥');
		    text = text.split('&').join('＆');
		    text = text.split('$').join('＄');
		    text = text.split('%').join('％');
		    text = text.split('"').join('”');
		    text = text.split("'").join('’');
		    text = text.split('#').join('＃');
		    text = text.split(';').join('；');
		    text = text.split(':').join('：');
		    text = text.split("<").join("&lt;");
        	text = text.split(">").join("&gt;");
        	text = text.split('◆').join('◇');
        	return text;
		},
		
		checkTextCommand: function(villageID, text){
			var rnd = Math.floor(Math.random() * 101);
			text = text.split('[cry]').join('アオォーーン');
			
			if(text.indexOf('[dice]') != -1){
				rnd = Math.floor(Math.random() * 101);
				text = text.split('[dice]').join('<span class="wolf">【' + rnd + '】</span>');
			}
			
			if(text.indexOf('[who]') != -1){
				var players = playersModel.getPlayers(villageID);
				rnd = Math.floor(Math.random() * players.length);
				var name = '【<b>' + players[rnd].characterName + '</b>】';
				text = text.split('[who]').join(name);
			}
			
			if(text.indexOf('[werefool]') != -1){
				var cnManager = new CnManager();
				var name = '【<b>' + cnManager.getRandomCN() + '</b>】';
				text = text.split('[werefool]').join(name);
			}
			return text;
		},
		
		checkNumberLiteral : function(num, bottom, top){
			if(num == null) return -1;
			num = '' + num;
			num = fullNum2HalfNum(num);
			if(!checkNaturalNumber(num)) return -1;
			num = checkNumberLimitation(num, bottom, top);
	    	return num;
		},
		checkTextLength : function(text, limit){
			if(text == null) return null;
			if(text.length > limit) {
				return text.substr(0, limit);
		  	}
  		  	return text;
		},
		checkBlankText : function(text) {
			return text != null && text != "" && text.match(/^(\s*\n?$)+/) == null;
		},
		checkNull : function(bool) {
	    	if(bool == null) bool = false;
	    	return bool;
	    },
	    checkBoolean : function(bool) {
	    	if(bool == true || bool == false) {
	    		return true;
	    	}
	    	return false;
	    },
	    
	    checkIconset : function(iconsetValue) {
	    	if(iconsetValue == null) return false;
	    	var i = 0;
	    	var matched = false;
	    	while(i < iconset.length) {
	    		if(iconsetValue == iconset[i]) {
	    			matched = true;
	    			break;
	    		}
	    		i++;
	    	}
	    	return matched;
	    }
	};
};

textChecker = new TextChecker();
