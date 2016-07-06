/**
 * Created by Henry on 16/7/6.
 */
var HelpLayer=cc.Layer.extend({
    ctor:function () {
        this._super();
        var startBtn = new cc.MenuItemFont("HelpScene",function () {
            // cc.director.runScene()
        },this);
        var menu = new cc.Menu(startBtn);
        this.addChild(menu);
        return true;
    }
});

var HelpScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new HelpLayer();
        this.addChild(layer);
    }
});
