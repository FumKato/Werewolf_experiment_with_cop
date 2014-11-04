TextChecker = function() {
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
        	return text;
		},
		checkNumberLiteral : function(num, bottom, top){
			num = fullNum2HalfNum(num);
			if(!checkNaturalNumber(num)) return -1;
			num = checkNumberLimitation(num, bottom, top);
	    	return num;
		},
		checkTextLength : function(text, limit){
			if(text.length > limit) {
				return text.substr(0, limit);
		  	}
  		  	return text;
		},
		checkBlankText : function(text) {
			return text != null && text != "" && text.match(/^(\s*\n?$)+/) == null;
		}
	};
};
