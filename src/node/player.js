/**
 * Created by Henry on 16/7/6.
 */
var Player = cc.Sprite.extend({
    ctor: function () {
        this._super(cc.spriteFrameCache.getSpriteFrame("hero1.png"));
        var heroHoldFrames = [
            cc.spriteFrameCache.getSpriteFrame("hero1.png"),
            cc.spriteFrameCache.getSpriteFrame("hero2.png")
        ];
        var holdAnimation = new cc.Animation(heroHoldFrames, 0.1);
        this.runAction(cc.repeatForever(cc.animate(holdAnimation)));
        return true;
    }
});