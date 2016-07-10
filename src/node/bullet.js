/**
 * Created by Henry on 16/7/6.
 */
var Bullet = cc.Sprite.extend({
	gameLayer:null,
    ctor: function (type,isUp,gameLayer) {
    	this.gameLayer = gameLayer;
    	this._super(cc.spriteFrameCache.getSpriteFrame("bullet"+type+".png"));
    	if(isUp){
			this.schedule(this.moveUp);
    	}else{
    		this.schedule(this.moveDown);
    	}
        return true;
    },
    moveUp:function(){
    	this.setPositionY(this.getPositionY() + Global.bulletSpeed);
    	if(this.getPositionY()>=cc.winSize.height+this.height/2){
    		// 飞出屏幕删除
    		this.remove();
    	}
    },
    moveDown:function(){
    	this.setPositionY(this.getPositionY() - Global.bulletSpeed);
    	if(this.getPositionY()<=-this.height/2){
    		// 飞出屏幕删除
    		this.remove();
    	}
    },
    remove:function(){
    	var index = this.gameLayer.bullets.indexOf(this);  
	    if (index > -1) {  
	        this.gameLayer.bullets.splice(index, 1);  
	    }
	    this.removeFromParent();
    }
});