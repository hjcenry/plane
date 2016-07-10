/**
 * Created by Henry on 16/7/6.
 */
var Global = {
	bulletSpeed:10,
	enemySpeed:function(type){
		switch(type){
			case 1:
				return 5;
			break;
			case 2:
				return 3;
			break;
			case 3:
				return 2;
			break;
		};
	},
	createEnemySpeed:function(type){
		switch(type){
			case 1:
				return 1;
			break;
			case 2:
				return 3;
			break;
			case 3:
				return 5;
			break;
		};
	},
	enemyHp:function(type){
		switch(type){
			case 1:
				return 1;
			break;
			case 2:
				return 5;
			break;
			case 3:
				return 10;
			break;
		};
	},
	toolSpeed:function(type){
		switch(type){
			case 1:
				return 2;
			break;
			case 2:
				return 3;
			break;
		};
	},
	createToolSpeed:function(type){
		switch(type){
			case 1:
				return 30;
			break;
			case 2:
				return 50;
			break;
		};
	},
	shootSpeed:0.2,
	doubleShootTimes:100
};