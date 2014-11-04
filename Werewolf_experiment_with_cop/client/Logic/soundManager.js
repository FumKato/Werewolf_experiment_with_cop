bellSound = new buzz.sound('/sounds/bell05', {
	formats: ['ogg', 'mp3', 'wav'],
	loop: false
});

ticktackSound = new buzz.sound('/sounds/ticktack', {
	formats: ['ogg', 'mp3', 'wav'],
	loop: true
});

chimeSound = new buzz.sound('/sounds/chime13', {
	formats: ['ogg', 'mp3', 'wav'],
	loop: false
});

SoundManager = function(){
	return {
		load: function(){
			bellSound.load();
			ticktackSound.load();
			chimeSound.load();
		},
		
		stop: function(){
			bellSound.stop();
			ticktackSound.stop();
			chimeSound.stop();
		},
		
		playTicktackSound: function(timer, phase){
			if(Session.get('sound')){
				ticktackSound.load();
				ticktackSound.play();
			}
		},
		
		playBellSound: function(){
			if(Session.get('sound')){
				bellSound.load();
				bellSound.play();
			}
		},
		
		playChimeSound: function(){
			if(Session.get('sound')){
				chimeSound.load();
				chimeSound.play();
			}
		}
	};
};

soundManager = new SoundManager();
