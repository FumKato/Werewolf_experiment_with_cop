TicketsModel = function(){
	return{
		setTickets: function(villageID, tickets, playerID, type){
			Tickets.insert({
				villageID: villageID,
				tickets: tickets,
				playerID: playerID,
				type: type
			});
		},
		
		checkGMTickets: function(villageID, tickets){
			var tickets = Tickets.find({
				villageID: villageID,
				tickets: tickets,
				type: 'gm'
			}).fetch();
			if(tickets.length == 0) {
				return false;
			} else {
				return true;
			}
		},
		
		checkExistence: function(villageID, tickets, type){
			if(villageID != null && villageID != 'dummyID'){
				var phase = phasesModel.getPhasesByVillageID(villageID);
				if(phase != null && phase.phase == '事件終了'){
					return null;
				}
			}
			
			if(type == 'gm'){
				var tickets = Tickets.find({
					tickets: tickets,
					type: type
				}).fetch();
				
				if(tickets.length != 0){
					var isOver = false;
					for(var i=0; i<tickets.length; i++){
						var phase = phasesModel.getPhasesByVillageID(tickets[i].villageID);
						try{
							if(phase.phase != '事件終了'){
								return tickets[0].playerID;
							}
						} catch(e){
							console.log('Errored tickets: ' + tickets);
							console.log('Errored phase: ' + phase);
							console.log(e);
						}
					}
					return null;
				}
					
			} else if(type == 'participant'){
				var tickets = Tickets.find({
					villageID: {$ne: villageID},
					tickets: tickets,
					type: 'participant',
				}).fetch();
				
				if(tickets.length != 0){
					var i = 0;
					for(i; i<tickets.length; i++){
						var player = playersModel.getPlayersByID(tickets[i].playerID);
						var phase = phasesModel.getPhasesByVillageID(player.villageID);
						try{
							if(phase.phase != '事件終了' && player.state == '生　存'){
								return player._id;
							}
						} catch(e){
							console.log('Errored ticets: ' + tickets);
							console.log('Errored phase: ' + phase);
							console.log('Errored player: ' + player);
							console.log(e);
						}
					}
					return null;
				}
			} else {
				var tickets = Tickets.find({
					villageID: villageID,
					tickets: tickets,
					type: type
				}).fetch();
			}
			if(tickets.length == 0) return null;
			return tickets[0].playerID;
		},
		
		checkParticipantExistenceWithTickets: function(tickets){
			var tickets = Tickets.find({
					tickets: tickets,
					type: 'participant'
				}).fetch();
				
			if(tickets.length != 0){
				var i = 0;
				for(i; i<tickets.length; i++){
					var player = playersModel.getPlayersByID(tickets[i].playerID);
					var phase = phasesModel.getPhasesByVillageID(player.villageID);
					try {
						if(phase.phase != '事件終了' && player.state == '生　存'){
							return true;
						}
					} catch (e) {
						console.log('Errored phase: ' + phase);
						console.log('Errored player: ' + player);
						console.log(e);
					}
				}
			}
			return false;
		},
		
		checkParticipantExistenceWithVillageID: function(tickets, villageID){
			var tickets = Tickets.find({
					villageID: villageID,
					tickets: tickets,
					type: 'participant',
				}).fetch();
				
			if(tickets.length != 0){
				return true;
			}
			return false;
		},
		
		removeTicketsByVillageID: function(villageID){
			Tickets.remove({villageID: villageID});
		},
		
		removeTicketsByPlayerID: function(playerID){
			Tickets.remove({playerID: playerID});
		}
	};
};

ticketsModel = new TicketsModel();
