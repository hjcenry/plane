/**
 * Created by Henry on 16/7/6.
 */
var Player = cc.Sprite.extend({
    lock:true,
    touchOffset:null,
    ctor: function () {
        this._super(cc.spriteFrameCache.getSpriteFrame("hero1.png"));
        this.lock = true;
        this.touchOffset = {
            offsetX:0,
            offsetY:0
        }
        // 飞行动画
        var heroHoldFrames = [
            cc.spriteFrameCache.getSpriteFrame("hero1.png"),
            cc.spriteFrameCache.getSpriteFrame("hero2.png")
        ];
        var holdAnimation = new cc.Animation(heroHoldFrames, 0.1);
        this.runAction(cc.repeatForever(cc.animate(holdAnimation)));
        this.moveIn();
        return true;
    },
    setTouchOffset:function(touchX,touchY){
        this.touchOffset.offsetX = touchX-this.getPositionX();
        this.touchOffset.offsetY = touchY-this.getPositionY();
        cc.log(this.touchOffset.offsetX);
        cc.log(this.touchOffset.offsetY);
    },
    moveIn:function(){
        this.runAction(cc.sequence(
            cc.moveTo(1, cc.p(cc.winSize.width/2, cc.winSize.height/2)),
            cc.moveBy(2, cc.p(0, -400)),
            cc.callFunc(function(player){
                // 播完动画解锁操作
                player.lock = false;
            },this,this)
        ));
    },
    moveTo(x,y){
        if(!this.lock){
            this.stopActionByTag(1);
            var time = 1;
            var moveAction = cc.moveTo(time,cc.p(x,y));
            this.runAction(moveAction);
            moveAction.setTag(1);
        }
    }
});