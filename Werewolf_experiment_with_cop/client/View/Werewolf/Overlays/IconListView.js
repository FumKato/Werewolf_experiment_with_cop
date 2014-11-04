IconListView = function(){
	return{
		render: function(iconsetName){
			$('#iconListBody').html('');
			var bottom=0;
			var top=0;
			var i;
			switch(iconsetName){
				case 'neko':
					bottom=0; top=30;
					break;
				case 'azuma':
					bottom=31; top=74;
					break;
				case 'mtmt':
					bottom=75; top=128;
					break;
				case 'shirone':
					bottom=129; top=171;
					break;
				case 'edo':
					bottom=172; top=210;
					break;
				case 'ichibangai':
					bottom=211; top=255;
					break;
				case 'kalinka':
					bottom=256; top=298;
					break;
				case 'metropolis':
					bottom=299; top=373;
					break;
				case 'xx':
					bottom=374; top=446;
					break;
				default:
					bottom=0; top=0;
					break;
			}
			
			for(i=bottom; i<=top; i++){
				$('#iconListBody').append('<img class="iconListItem" id="' + i + '" src="./icon/' + i + '.png" />');
			}
		}
	};
};
