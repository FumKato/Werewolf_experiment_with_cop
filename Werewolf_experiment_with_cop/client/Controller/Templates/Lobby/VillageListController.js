$(function(){
	$(document).on('mouseenter', ".villageListItem", function() {
		$(this).addClass('villageListItemMouseovered');
	});

	$(document).on('mouseleave', ".villageListItem", function() {
		$(this).removeClass('villageListItemMouseovered');
	});

	$('.villageScheduleCreateButton').mouseenter(function(){
		$(this).addClass('villageScheduleCreateButtonMouseovered');
	});

	$('.villageScheduleCreateButton').mouseleave(function(){
		$(this).removeClass('villageScheduleCreateButtonMouseovered');
	});

	$('.villageScheduleCreateButton').click(function(){
		new VillageScheduleOverlayView().render();
		new OverlaysView().render('villageScheduleOverlay');
	});
	
	$(document).on('click', '.villageScheduleDeleteButton', function(){
		var pass = prompt('パスワードを入力してください');
		var textChecker = new TextChecker();
		if(pass == null || pass == '' || !textChecker.checkBlankText(pass) || pass.length < 4) return;
		pass = textChecker.checkEscape(pass);
		pass = textChecker.checkTextLength(pass, 8);
		var id = $(this).attr('id');
		Meteor.call('removeSchedules', id, pass, function(error, result){
			Meteor.subscribe('schedules', 10);
		});
	});
});

Template.VillageListItem.events({
	'click': function() {
		Session.set('villageID', this._id);
		new LobbyView().flush();
		new LoginView().render();
	}
});
