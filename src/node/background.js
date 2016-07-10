/**
 * Created by Henry on 16/7/6.
 */
 var Background = cc.Sprite.extend({
     ctor: function (isOver) {
        if(isOver){
            this._super();
            var bg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("gameover.png"));
            bg.setScale(750/480);
            this.addChild(bg);
        }else{
            this._super();
            this.setScale(750/480);
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
            this.schedule(this.update);
        }
        return true;
     },
     stopMove:function(){
        this.unschedule(this.update);
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