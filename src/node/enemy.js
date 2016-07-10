/**
 * Created by Henry on 16/7/6.
 */
var Enemy = cc.Sprite.extend({
	type:1,
	hp:0,
	gameLayer:null,
    ctor: function (type,gameLayer) {
    	this.type = type;
    	this.hp = Global.enemyHp(type);
    	this.gameLayer = gameLayer;
    	if(type==3){
			// 大型飞机的动画
			this._super(cc.spriteFrameCache.getSpriteFrame("enemy"+type+"_n1.png"));
	        var holdFrames = [
	            cc.spriteFrameCache.getSpriteFrame("enemy"+type+"_n1.png"),
	            cc.spriteFrameCache.getSpriteFrame("enemy"+type+"_n2.png")
	        ];
	        var holdAnimation = new cc.Animation(holdFrames, 0.1);
	        this.runAction(cc.repeatForever(cc.animate(holdAnimation)));
    	}else{
    		this._super(cc.spriteFrameCache.getSpriteFrame("enemy"+type+".png"));
    	}
		this.schedule(this.moveDown);
        if(this.type==3){
            // 大飞机每3s产生3个小飞机
            this.schedule(function(){
                this.createEnemy();
            },3);
        }
        return true;
    },
    // 创造三个小型飞机
    createEnemy:function(){
        var enemy1 = new Enemy(1,this.gameLayer);
        var enemy2 = new Enemy(1,this.gameLayer);
        var enemy3 = new Enemy(1,this.gameLayer);
        var x1 = this.getPositionX()-this.width/2+enemy1.width/2;
        var x2 = this.getPositionX();
        var x3 = this.getPositionX()+this.width/2-enemy3.width/2;
        enemy1.setPosition(x1,this.getPositionY());
        enemy2.setPosition(x2,this.getPositionY());
        enemy3.setPosition(x3,this.getPositionY());
        this.gameLayer.addChild(enemy1);
        this.gameLayer.addChild(enemy2);
        this.gameLayer.addChild(enemy3);
        this.gameLayer.enemies.push(enemy1);
        this.gameLayer.enemies.push(enemy2);
        this.gameLayer.enemies.push(enemy3);
    },
    moveDown:function(){
    	this.setPositionY(this.getPositionY() - parseInt(Global.enemySpeed(this.type)));
    	if(this.getPositionY()<=-this.height/2){
    		// 飞出屏幕删除
    		this.remove();
    	}
    },
    remove:function(){
    	var index = this.gameLayer.enemies.indexOf(this);  
	    if (index > -1) {  
	        this.gameLayer.enemies.splice(index, 1);  
	    }
	    this.removeFromParent();
    },
    // 击中
    hit:function(){
    	// 击中动画
    	this.hp -= 1;
    	if(this.hp<=0){
    		this.blowUp();
    	}else{
			var holdFrame = this.type==3?"enemy"+this.type+"_n1.png":"enemy"+this.type+".png";
    		var hitFrames = [
	            cc.spriteFrameCache.getSpriteFrame(holdFrame),
	            cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_hit.png")
	        ];
	        var hitAnimation = new cc.Animation(hitFrames, 0.1);
	        this.runAction(cc.sequence(cc.animate(hitAnimation),cc.callFunc(function(enemy){
	        	enemy.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(holdFrame));
	        },this)));
    	}
    },
    // 爆炸
    blowUp:function(){
        if(this.type==3){
            // 大飞机爆炸产生3个小飞机
            this.createEnemy();
        }
        this.unschedule(this.moveDown);
        var index = this.gameLayer.enemies.indexOf(this);  
        if (index > -1) {  
            this.gameLayer.enemies.splice(index, 1);  
        }
    	// 爆炸动画
        var blowUpFrames = [
            cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_down1.png"),
            cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_down2.png"),
            cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_down3.png"),
            cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_down4.png")
        ];
        if(this.type==3){
        	blowUpFrames = blowUpFrames.concat([
        		cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_down5.png"),
            	cc.spriteFrameCache.getSpriteFrame("enemy"+this.type+"_down6.png")
        	]);
        }
        // 播放爆炸音效
        if(this.type==3){
            cc.audioEngine.playEffect("res/sound/enemy3_down.mp3");
        }else{
            cc.audioEngine.playEffect("res/sound/enemy1_down.mp3");
        }
        var blowUpAnimation = new cc.Animation(blowUpFrames, 0.1);
        this.stopAllActions();
        this.runAction(cc.sequence(cc.animate(blowUpAnimation),cc.callFunc(function(enemy){
        	enemy.removeFromParent();
        },this,this)));
        // 加分
        this.gameLayer.addScore(this.type);
    }
});