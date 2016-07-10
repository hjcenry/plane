/**
 * Created by Henry on 16/7/6.
 */
var Loading = cc.Sprite.extend({
    ctor: function () {
        this._super(cc.spriteFrameCache.getSpriteFrame("game_loading1.png"));
        var loadingFrames = [
            cc.spriteFrameCache.getSpriteFrame("game_loading1.png"),
            cc.spriteFrameCache.getSpriteFrame("game_loading2.png"),
            cc.spriteFrameCache.getSpriteFrame("game_loading3.png"),
            cc.spriteFrameCache.getSpriteFrame("game_loading4.png")
        ];
        var loadingAnimation = new cc.Animation(loadingFrames, 0.5);
        this.runAction(cc.repeatForever(cc.animate(loadingAnimation)));
        return true;
    }
});