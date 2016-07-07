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
        // 滚动背景图1
        var menuBg1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("background.png"));
        menuBg1.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        menuBg1.setScale(750 / 480);
        menuBg1.setTag(1);
        this.addChild(menuBg1);
        // 滚动背景图2
        var menuBg2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("background.png"));
        menuBg2.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + cc.winSize.height - 4);
        menuBg2.setScale(750 / 480);
        menuBg2.setTag(2);
        this.addChild(menuBg2);
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
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
            }, this);
        var helpBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/game_help.png"),
            new cc.Sprite("res/game_help_selected.png"),
            function () {
                cc.director.runScene(new cc.TransitionFade(1, new HelpScene()));
            }, this);
        helpBtn.setPositionY(startBtn.getPositionY() - startBtn.height / 2 - 100);
        var menu = new cc.Menu(startBtn, helpBtn);
        this.addChild(menu);
        this.schedule(this.update);
        // loading动画
        var loading = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("game_loading1.png"));
        loading.setPositionX(50 + cc.winSize.width * this.loadCount / 5);
        loading.setPositionY(200);
        loading.setTag(3);
        this.addChild(loading);
        this.schedule(this.loading, 0.5);
        return true;
    },
    loading: function () {
        if (this.loadCount == 4) {
            this.loadCount = 1;
        } else {
            this.loadCount++;
        }
        this.getChildByTag(3).setPositionX(50 + cc.winSize.width * this.loadCount / 5);
    },
    update: function () {
        var menuBg1 = this.getChildByTag(1);
        var menuBg2 = this.getChildByTag(2);
        if (menuBg1.getPositionY() <= -cc.winSize.height / 2 + 20) {
            menuBg1.setPositionY(cc.winSize.height / 2 + cc.winSize.height);
        } else {
            menuBg1.setPositionY(menuBg1.getPositionY() - 1);
        }
        if (menuBg2.getPositionY() <= -cc.winSize.height / 2 + 20) {
            menuBg2.setPositionY(cc.winSize.height / 2 + cc.winSize.height);
        } else {
            menuBg2.setPositionY(menuBg2.getPositionY() - 1);
        }
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});
