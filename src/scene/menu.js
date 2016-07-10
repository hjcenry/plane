/**
 * Created by Henry on 16/7/6.
 */
var MenuLayer = cc.Layer.extend({
    loadCount: 1,
    ctor: function () {
        this._super();
        this.loadCount = 1;
        // 加载plist
        cc.spriteFrameCache.addSpriteFrames(res.shoot_background_plist);
        // 添加背景图
        var bg = new Background(false);
        bg.setPosition(0,0);
        this.addChild(bg);
        // logo
        var copyright = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("shoot_copyright.png"));
        copyright.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 270);
        copyright.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.5), cc.scaleTo(1, 1))));
        this.addChild(copyright);
        // 游戏按钮
        var startBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/game_start.png"),
            new cc.Sprite("res/game_start_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
            }, this);
        var helpBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/game_help.png"),
            new cc.Sprite("res/game_help_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.runScene(new cc.TransitionFade(1, new HelpScene()));
            }, this);
        helpBtn.setPositionY(startBtn.getPositionY() - startBtn.height / 2 - 100);
        var menu = new cc.Menu(startBtn, helpBtn);
        this.addChild(menu);
        // loading动画
        var loading = new Loading();
        loading.setPosition(cc.winSize.width/2,200);
        this.addChild(loading);
        return true;
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});
