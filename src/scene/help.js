/**
 * Created by Henry on 16/7/6.
 */
var HelpLayer=cc.Layer.extend({
    ctor:function () {
        this._super();
        var bg = new Background(false);
        bg.setPosition(0,0);
        this.addChild(bg);
        var helpLabel = new cc.LabelTTF("打飞机不会玩？还看帮助？","",50);
        helpLabel.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(helpLabel);
        // 菜单按钮
        var restartBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/btn_finish.png"),
            new cc.Sprite("res/btn_finish_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.runScene(new cc.TransitionFade(1, new MenuScene()));
            }, this);
        restartBtn.setPosition(helpLabel.getPositionX(),helpLabel.getPositionY()-helpLabel.height/2-100);
        var menu = new cc.Menu(restartBtn);
        menu.setPosition(0,0);
        menu.setAnchorPoint(0,0);
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
