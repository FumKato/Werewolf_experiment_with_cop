RegionMapper = function(){
	var mapping = function(number){
		switch(number){
			case '0': return '樺太';
			case '1': return '北海道';
			case '2': return '青森県';
			case '3': return '岩手県';
			case '4': return '宮城県';
			case '5': return '秋田県';
			case '6': return '山形県';
			case '7': return '福島県';
			case '8': return '茨城県';
			case '9': return '栃木県';
			case '10': return '群馬県';
			case '11': return '埼玉県';
			case '12': return '千葉県';
			case '13': return '東京都';
			case '14': return '神奈川県';
			case '15': return '新潟県';
			case '16': return '富山県';
			case '17': return '石川県';
			case '18': return '福井県';
			case '19': return '山梨県';
			case '20': return '長野県';
			case '21': return '岐阜県';
			case '22': return '静岡県';
			case '23': return '愛知県';
			case '24': return '三重県';
			case '25': return '滋賀県';
			case '26': return '京都府';
			case '27': return '大阪府';
			case '28': return '兵庫県';
			case '29': return '奈良県';
			case '30': return '和歌山県';
			case '31': return '鳥取県';
			case '32': return '島根県';
			case '33': return '岡山県';
			case '34': return '広島県';
			case '35': return '山口県';
			case '36': return '徳島県';
			case '37': return '香川県';
			case '38': return '愛媛県';
			case '39': return '高知県';
			case '40': return '福岡県';
			case '41': return '佐賀県';
			case '42': return '長崎県';
			case '43': return '熊本県';
			case '44': return '大分県';
			case '45': return '宮崎県';
			case '46': return '鹿児島県';
			case '47': return '沖縄県';
			case '101': return '東北地方';
			case '102': return '関東地方';
			case '103': return '中部地方';
			case '104': return '東海地方';
			case '105': return '信越地方';
			case '106': return '北陸地方';
			case '107': return '関西地方';
			case '108': return '中国地方';
			case '109': return '四国地方';
			case '110': return '山陽地方';
			case '111': return '山陰地方';
			case '112': return '九州地方';
			case '120': return '新潟・東北';
			case '121': return '関東・甲信越';
			case '122': return '関東・東海';
			case '123': return '関西・東海';
			case '124': return '関西・北陸';
			case '125': return '中国・四国';
			case '130': return '東日本';
			case '131': return '西日本';
			case '301':
			case '150': return '広西チワン族自治区';
			case '302':
			case '151': return '内モンゴル自治区';
			case '305':
			case '152': return '茸';
			case '309':
			case '153': return '庭';
			case '306':
			case '154': return 'SB-iPhone';
			case '155': return 'やわらか銀行';
			case '303':
			case '156': return 'WiMAX';
			case '300':
			case '157': return '家';
			case '200': return 'やわらか銀行';
			case '201': return '公衆';
			case '202': return '空';
			case '203': return '糸';
			case '204': return '会社';
			case '205': return '志摩';
			case '206': return '学校';
			case '207': return 'dion軍';
			case '208': return '田舎おでん';
			case '209': return 'catv?';
			case '210': return '長屋';
			case '211': return 'チベット自治区';
			case '216': return '鳥羽';
			case '225': return '伊勢';
			case '226': return '地底';
			case '227': return '新疆ウイグル自治区';
			case '228': return '・ω・';
			case '229': return '秋';
			case '230': return '千代田';
			case '304': return '芋';
			case '308': return '禿';
			case '1000': return 'アラビア';
			case '1001': return '踊';
			case '1002': return '鰓';
			default: return '異世界';
		}
	};
	
	return{
		number2String : function(number){
			return mapping(number);
		}
	};
};

regionMapper = new RegionMapper();
