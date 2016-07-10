/**
 * Created by Henry on 16/7/6.
 */
var PauseLayer=cc.LayerColor.extend({
    ctor:function (pauseBtn) {
        // 初始化为黑色
        this._super(cc.color(0,0,0,100));
        this.width = cc.winSize.width;
        this.height = cc.winSize.height;
        // 继续按钮
        var resumeBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/game_continue.png"),
            new cc.Sprite("res/game_continue_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.audioEngine.resumeMusic();
                cc.director.resume();
                pauseBtn.setEnabled(true);
                this.removeFromParent();
            }, this);
        resumeBtn.setPosition(0,100);
        // 结束游戏按钮
        var overBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/game_over.png"),
            new cc.Sprite("res/game_over_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.audioEngine.stopMusic("res/sound/game_music.mp3");
                cc.director.resume();
                cc.director.runScene(new cc.TransitionFade(1, new MenuScene()));
            }, this);
        overBtn.setPosition(0,0);
        // 重新开始按钮
        var reagainBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/game_Reagain.png"),
            new cc.Sprite("res/game_Reagain_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.audioEngine.stopMusic("res/sound/game_music.mp3");
                cc.director.resume();
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
            }, this);
        reagainBtn.setPosition(0,-100);
        var menu = new cc.Menu(resumeBtn,overBtn,reagainBtn);
        this.addChild(menu);
        return true;
    }
});
