/**
 * Created by Henry on 16/7/6.
 */
var OverLayer=cc.Layer.extend({
    ctor:function (score) {
        this._super();
        var bg = new Background(true);
        bg.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(bg);
        var highest = cc.sys.localStorage.getItem("highest");
        highest = highest==null?0:highest;
        // 分数存储
        if(parseInt(score)>parseInt(highest)){
            cc.sys.localStorage.setItem("highest" ,score);
            highest = score;
        }
        // 历史最高分数
        var highestFnt = new cc.LabelBMFont(highest.toString(),res.font);
        highestFnt.setPosition(250,cc.winSize.height-highestFnt.height/2-75);
        highestFnt.setAnchorPoint(0,0.5);
        this.addChild(highestFnt);
        // 分数显示
        var scoreFnt = new cc.LabelBMFont(score,res.font);
        scoreFnt.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(scoreFnt);
        this.scheduleOnce(function(){
            cc.audioEngine.playEffect("res/sound/out_porp.mp3");
            scoreFnt.runAction(cc.sequence(cc.scaleTo(0.2,1.5),cc.scaleTo(0.2,1)));
        },1);
        // 菜单按钮
        var restartBtn = new cc.MenuItemSprite(
            new cc.Sprite("res/btn_finish.png"),
            new cc.Sprite("res/btn_finish_selected.png"),
            function () {
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.runScene(new cc.TransitionFade(1, new MenuScene()));
            }, this);
        restartBtn.setPosition(scoreFnt.getPositionX(),scoreFnt.getPositionY()-scoreFnt.height/2-100);
        var menu = new cc.Menu(restartBtn);
        menu.setPosition(0,0);
        menu.setAnchorPoint(0,0);
        this.addChild(menu);
        return true;
    }
});

var OverScene=cc.Scene.extend({
    ctor:function(score){
        this._super();
        var layer=new OverLayer(score);
        this.addChild(layer);
    }
});
