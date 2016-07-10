/**
 * Created by Henry on 16/7/6.
 */
var Tool = cc.Sprite.extend({
	gameLayer:null,
	type:0,
    ctor: function (type,gameLayer) {
        this._super(cc.spriteFrameCache.getSpriteFrame("ufo"+type+".png"));
        this.type = type;
        this.gameLayer = gameLayer;
        // 旋转特效
        this.rotate();
        // 向下移动
        this.schedule(this.moveDown);
        return true;
    },
    moveDown:function(){
    	this.setPositionY(this.getPositionY()-Global.toolSpeed(this.type));
    	if(this.getPositionY()<=-this.height/2){
    		// 飞出屏幕删除
    		this.remove();
    	}
    },
    remove:function(){
    	var index = this.gameLayer.tools.indexOf(this);  
	    if (index > -1) {  
	        this.gameLayer.tools.splice(index, 1);  
	    }
	    this.runAction(cc.sequence(cc.scaleTo(0.1,0),cc.callFunc(function(tool){
		    tool.removeFromParent();
	    },this,this)));
    },
    rotate:function(){
    	var rotateAction = cc.repeatForever(cc.sequence(cc.rotateTo(1,30),cc.sequence(cc.rotateTo(1,-30))));
    	this.runAction(rotateAction);
    }
});