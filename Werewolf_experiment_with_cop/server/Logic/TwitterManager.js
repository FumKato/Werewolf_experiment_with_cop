TwitterManager = function(){
	var twitter = Npm.require('twitter');
	var util = Npm.require('util');
	var bot = new twitter({
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret : ''
	});
	
	return {
		tweetVillage: function(text){
			/*bot.updateStatus(text, function (data) {
				
			});*/
		},
		
		getTweet: function(){
			bot.get('/statuses/user_timeline.json', {include_entities:false}, function(data) {
   				 console.log(util.inspect(data));
			});
		}
	};
};

twitterManager = new TwitterManager();
