/**
 * Created by Henry on 16/7/6.
 */
var Player = cc.Sprite.extend({
    lock:true,
    gameLayer:null,
    doubleCount:0,
    ctor: function (gameLayer) {
        this._super(cc.spriteFrameCache.getSpriteFrame("hero1.png"));
        this.gameLayer = gameLayer;
        this.doubleCount = 0;
        this.lock = true;
        // 飞行动画
        var heroHoldFrames = [
            cc.spriteFrameCache.getSpriteFrame("hero1.png"),
            cc.spriteFrameCache.getSpriteFrame("hero2.png")
        ];
        var holdAnimation = new cc.Animation(heroHoldFrames, 0.1);
        this.runAction(cc.repeatForever(cc.animate(holdAnimation)));
        this.moveIn();
        this.schedule(this.shootSingleBullet,Global.shootSpeed);
        return true;
    },
    shootSingleBullet:function(){
        if (!this.lock) {
            var bullet = new Bullet(2,true,this.gameLayer);
            bullet.setPosition(this.getPositionX(),this.getPositionY()+this.height/2);
            this.gameLayer.addChild(bullet);
            this.gameLayer.bullets.push(bullet);
            // 发射子弹音效
            cc.audioEngine.playEffect("res/sound/bullet.mp3");
        }
    },
    shootDoubleBegin:function(){
        this.unschedule(this.shootSingleBullet);
        this.schedule(this.shootDoubleBullet,Global.shootSpeed-0.1);
        this.doubleCount = 0;
    },
    shootDoubleBullet:function(){
        if (!this.lock) {
            if(this.doubleCount>=Global.doubleShootTimes){
                this.unschedule(this.shootDoubleBullet);
                this.schedule(this.shootSingleBullet,Global.shootSpeed);
            }else{
                this.doubleCount += 1;
                var bulletLeft = new Bullet(2,true,this.gameLayer);
                var bulletRight = new Bullet(2,true,this.gameLayer);
                bulletLeft.setPosition(this.getPositionX()-35,this.getPositionY()+5);
                bulletRight.setPosition(this.getPositionX()+35,this.getPositionY()+5);
                this.gameLayer.addChild(bulletLeft);
                this.gameLayer.addChild(bulletRight);
                this.gameLayer.bullets.push(bulletLeft);
                this.gameLayer.bullets.push(bulletRight);
                // 发射子弹音效
                cc.audioEngine.playEffect("res/sound/bullet.mp3");
            }
        }
    },
    moveIn:function(){
        this.runAction(cc.sequence(
            cc.moveTo(1, cc.p(cc.winSize.width/2, cc.winSize.height/2)),
            cc.moveBy(2, cc.p(0, -400)),
            cc.callFunc(function(player){
                // 播完动画解锁操作
                player.lock = false;
            },this,this)
        ));
    },
    moveBy:function(x,y) {
        if (!this.lock) {
            this.setPosition(this.getPositionX() + x, this.getPositionY() + y);
        }
    },
    blowUp:function(){
        this.lock = true;
        // 爆炸动画
        var blowUpFrames = [
            cc.spriteFrameCache.getSpriteFrame("hero_blowup_n1.png"),
            cc.spriteFrameCache.getSpriteFrame("hero_blowup_n2.png"),
            cc.spriteFrameCache.getSpriteFrame("hero_blowup_n3.png"),
            cc.spriteFrameCache.getSpriteFrame("hero_blowup_n4.png")
        ];
        var blowUpAnimation = new cc.Animation(blowUpFrames, 0.1);
        this.stopAllActions();
        this.runAction(cc.sequence(cc.animate(blowUpAnimation),cc.callFunc(function(hero){
            hero.removeFromParent();
        },this,this)));
    }
});