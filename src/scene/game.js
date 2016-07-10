/**
 * Created by Henry on 16/7/6.
 */
var GameLayer = cc.Layer.extend({
    touchStartX:0,
    touchStartY:0,
    bullets:[],
    enemies:[],
    tools:[],
    ctor: function () {
        this._super();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.bullets = [];
        this.enemies = [];
        this.tools = [];
        // 播放背景音乐
        cc.audioEngine.playMusic("res/sound/game_music.mp3",true);
        // 加载plist
        cc.spriteFrameCache.addSpriteFrames(res.shoot_background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.shoot_plist);
        // 添加背景图
        var bg = new Background(false);
        bg.setPosition(0,0);
        this.addChild(bg);
        // 添加飞机
        var player = new Player(this);
        player.setPosition(cc.winSize.width / 2, -player.height / 2);
        this.addChild(player);
        player.setTag(1);
        // 产生敌机
        this.schedule(function(){
            this.createEnemy(1);
        },Global.createEnemySpeed(1));
        this.schedule(function(){
            this.createEnemy(2);
        },Global.createEnemySpeed(2));
        this.schedule(function(){
            this.createEnemy(3);
        },Global.createEnemySpeed(3));
        // 产生道具
        this.schedule(function(){
            this.createTool(1);
        },Global.createToolSpeed(1));
        this.schedule(function(){
            this.createTool(2);
        },Global.createToolSpeed(2));
        // 添加爆炸道具
        var bombNor = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bomb.png"));
        var bombSelected = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bomb.png"));
        bombSelected.setPosition(-bombSelected.width/4,-bombSelected.height/4);
        bombSelected.setScale(1.5);
        var bombBtn = new cc.MenuItemSprite(
            bombNor,
            bombSelected,
            function () {
                var bombNum = this.getChildByTag(3);
                if(parseInt(bombNum.getString().slice(1))==0){
                    return;
                }
                // 全屏爆炸
                var blowEnemy = [];
                for(var i in this.enemies){
                    var enemy = this.enemies[i];
                    blowEnemy.push(enemy);
                }
                for(var j in blowEnemy){
                    blowEnemy[j].blowUp();
                }
                // 数量减一
                bombNum.setString("X"+(parseInt(bombNum.getString().slice(1))-1));
            }, this);
        bombBtn.setPosition(50+bombBtn.width/2,50+bombBtn.height/2);
        var bombMenu = new cc.Menu(bombBtn);
        bombMenu.setPosition(0,0);
        bombMenu.setAnchorPoint(0,0);
        this.addChild(bombMenu);
        // 爆炸道具数量
        var bombNum = new cc.LabelBMFont("X2",res.font);
        bombNum.setAnchorPoint(0,0.5);
        bombNum.setPosition(bombBtn.getPositionX()+bombBtn.width/2+50,bombBtn.getPositionY());
        bombNum.setTag(3);
        this.addChild(bombNum);
        // 暂停开始按钮
        var pauseBtn = new cc.MenuItemSprite(
            new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("game_pause_nor.png")),
            new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("game_pause_pressed.png")),
            function () {
                // 暂停音乐音效
                cc.audioEngine.pauseAllEffects();
                cc.audioEngine.pauseMusic();
                pauseBtn.setEnabled(false);
                cc.director.pause();
                this.addChild(new PauseLayer(pauseBtn),10);
            }, this);
        var pauseMenu = new cc.Menu(pauseBtn);
        pauseMenu.setPosition(20+pauseBtn.width/2,cc.winSize.height-pauseBtn.height/2-20);
        pauseMenu.setAnchorPoint(0,0);
        this.addChild(pauseMenu);
        // 分数
        var score = new cc.LabelBMFont("0",res.font);
        score.setAnchorPoint(0,0.5);
        score.setPosition(pauseMenu.getPositionX()+pauseBtn.width/2+50,pauseMenu.getPositionY());
        score.setTag(2);
        this.addChild(score);
        // 碰撞检测
        this.schedule(this.collision);
        return true;
    },
    collision:function(){
        var bullets = this.bullets;
        var enemies = this.enemies;
        var tools = this.tools;
        var score = parseInt(this.getChildByTag(2).getString());
        for(var i in enemies){
            var enemy = enemies[i];
            // 检测是否与玩家碰撞
            var player = this.getChildByTag(1);
            if(cc.rectIntersectsRect(enemy.getBoundingBox(),player.getBoundingBox())){
                // 游戏结束
                this.unschedule(this.collision);
                player.blowUp();
                // 停止背景音乐
                cc.audioEngine.stopMusic("res/sound/game_music.mp3");
                cc.audioEngine.playEffect("res/sound/game_over.mp3");
                this.scheduleOnce(function() {
                    cc.director.runScene(new cc.TransitionFade(1,new OverScene(score)));
                },2);
            }
            // 检测是否吃到道具
            for(var m in tools){
                var tool = tools[m];
                if(cc.rectIntersectsRect(tool.getBoundingBox(),player.getBoundingBox())){
                    switch(tool.type){
                        case 1:
                            // 双排子弹道具
                            cc.audioEngine.playEffect("res/sound/get_double_laser.mp3");
                            player.shootDoubleBegin();
                            break;
                        case 2:
                            // 清屏道具
                            cc.audioEngine.playEffect("res/sound/get_bomb.mp3");
                            var bomb = this.getChildByTag(3);
                            bomb.setString("X"+(parseInt(bomb.getString().slice(1))+1));
                            bomb.runAction(cc.sequence(cc.scaleTo(0.1,1.2),cc.scaleTo(0.1,1)));
                            break;
                    }                  
                    tool.remove();
                }
            }
            for(var j in bullets){
                var bullet = bullets[j];
                // 检测是否与子弹碰撞
                if(cc.rectIntersectsRect(enemy.getBoundingBox(),bullet.getBoundingBox())){
                    enemy.hit();
                    bullet.remove();
                }
            }
        }
    },
    addScore:function(type){
        var score = this.getChildByTag(2);
        var addScore = 0;
        var curScore = parseInt(score.getString());
        switch(type){
            case 1:
                addScore = 100 + Math.ceil(Math.random()*(curScore/1000));
            break;
            case 2:
                addScore = 200 + Math.ceil(Math.random()*(curScore/1000));
            break;
            case 3:
                addScore = 500 + Math.ceil(Math.random()*(curScore/1000));
            break;
        }
        score.setString(curScore+addScore);
    },
    createEnemy:function(type){
        var enemy = new Enemy(type,this);
        var randomX = Math.random()*(cc.winSize.width-enemy.width/2-enemy.width/2)+enemy.width/2;
        enemy.setPosition(randomX,cc.winSize.height+enemy.height/2);
        this.addChild(enemy);
        this.enemies.push(enemy);
    },
    createTool:function(type){
        var tool = new Tool(type,this);
        var randomX = Math.random()*(cc.winSize.width-tool.width/2-tool.width/2)+tool.width/2;
        tool.setPosition(randomX,cc.winSize.height+tool.height/2);
        this.addChild(tool);
        this.tools.push(tool);
    },
    onEnter:function(){
        this._super();
        // 添加触摸事件
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:this.touchbegan,
            onTouchMoved:this.touchmoved,
            onTouchEnded:this.touchended
        },this);
        return true;
    },
    touchbegan:function(touch,event){
        event.getCurrentTarget().touchStartX = touch.getLocation().x;
        event.getCurrentTarget().touchStartY = touch.getLocation().y;
        return true;
    },
    touchmoved:function(touch,event){
        var touchX = touch.getLocation().x;
        var touchY = touch.getLocation().y;
        var touchStartX = event.getCurrentTarget().touchStartX;
        var touchStartY = event.getCurrentTarget().touchStartY;
        var player = event.getCurrentTarget().getChildByTag(1);
        if(player!=null){
            player.moveBy(touchX-touchStartX,touchY-touchStartY);
            event.getCurrentTarget().touchStartX = touchX;
            event.getCurrentTarget().touchStartY = touchY;
        }
        return true;
    },
    touchended:function(touch,event){
        return true;
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
