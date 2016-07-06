/**
 * Created by Henry on 16/7/6.
 */
var GameLayer=cc.Layer.extend({
    ctor:function () {
        this._super();
        var startBtn = new cc.MenuItemFont("GameScene",function () {
            // cc.director.runScene()
        },this);
        var menu = new cc.Menu(startBtn);
        this.addChild(menu);
        return true;
    }
});

var GameScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new GameLayer();
        this.addChild(layer);
    }
});
