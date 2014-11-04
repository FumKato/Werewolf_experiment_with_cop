TextConverter = function() {
	this.text2Html = function(text) {
       	text = text.split("\n\r").join("<br>");
        text = text.split("\n").join("<br>");
  		return text; 
	};
	
	this.html2Text = function(text) {
		text = text.split("<br>").join("\n");
		text = text.split("&gt;").join(">");
		text = text.split("&lt;").join("<");
		text = text.split(/<[^<>]*>/).join("");
		return text;
	};
	
	this.text2OneLineText = function(text){
		text = text.split("\n\r").join(" ");
        text = text.split("\n").join(" ");
        return text;
	};
};

textConverter = new TextConverter();
