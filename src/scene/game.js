/**
 * Created by Henry on 16/7/6.
 */
var GameLayer = cc.Layer.extend({
    touchStartX:0,
    touchStartY:0,
    ctor: function () {
        this._super();
        this.touchStartX = 0;
        this.touchStartY = 0;
        // 加载plist
        cc.spriteFrameCache.addSpriteFrames(res.shoot_background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.shoot_plist);
        // 添加背景图
        var bg = new Background();
        bg.setPosition(0,0);
        this.addChild(bg);
        // 添加飞机
        var player = new Player();
        player.setPosition(cc.winSize.width / 2, -player.height / 2);
        this.addChild(player);
        player.setTag(1);
        return true;
    },
    onEnter:function(){
        this._super();
        // 添加触摸事件
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:this.touchbegan,
            onTouchMoved:this.touchmoved,
            onTouchEnded:this.touchended
        },this);
        return true;
    },
    touchbegan:function(touch,event){
        var player = event.getCurrentTarget().getChildByTag(1);
        event.getCurrentTarget().touchStartX = touch.getLocation().x;
        event.getCurrentTarget().touchStartY = touch.getLocation().y;
        player.setTouchOffset(event.getCurrentTarget().touchStartX,event.getCurrentTarget().touchStartY);
        return true;
    },
    touchmoved:function(touch,event){
        var touchX = touch.getLocation().x
        var touchY = touch.getLocation().y
        var player = event.getCurrentTarget().getChildByTag(1);
        player.moveTo(touch.getLocation().x,touch.getLocation().y);
        return true;
    },
    touchended:function(touch,event){
        return true;
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
