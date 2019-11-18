const { ccclass, property } = cc._decorator;
import App from "./app";

@ccclass
export default class Enemy extends cc.Component {
    //奖励分数
    @property
    rewardScore: number = 1;

    //飞行速度，用时间来表示
    @property
    speed: number = 1;

    //生命值
    @property
    hp: number = 100;

     //爆炸音效
     @property(cc.AudioClip)
     audio_blowup: cc.AudioClip = null;

    //行程
    private _s=0;
    private _hp=0;

    //default sprite
    private _spriteFrame:cc.SpriteFrame;

    // LIFE-CYCLE CALLBACKS
    onLoad () {
    }

    // start() { }
    // update (dt) {}
    //飞行动作
    fly() {
        this._s=-this.node.parent.height;
        this._hp=this.hp;
        // this.node.setPosition(cc.v2(this.mrandX,600));
        this.node.runAction(cc.sequence(cc.moveBy(this.speed, cc.v2(0, this._s)).easing(cc.easeIn(1.0)), cc.callFunc( () =>{
            //回收到对象池
            App.Instance.PutNode2Pool(this.node.name, this.node);
        }, this)));
    }

    //碰撞检测
    onCollisionEnter(other, self) {
        cc.log(self.name, "<发生碰撞>", other.name);
        if (this._hp > 0) {
            this._hp -= 50;
            cc.log("enemy hp=",this.hp);
            return;
        } 
        this._spriteFrame=this.node.getComponent(cc.Sprite).spriteFrame;
        this.node.stopAllActions();
        this.node.group = 'default'; //不让动画在执行碰撞
        let anim = this.node.getComponent(cc.Animation);
        anim.play();
        anim.on('finished', this.onResume, this);
        cc.audioEngine.play(this.audio_blowup,false,1);
        //播放音效
        // cc.audioEngine.playEffect(this.enemyDownClip, false);  
    }

    //重置节点 回收到对象池
    onResume(e) {
        cc.log("动画结束后 动画节点回收");
        
        this.node.getComponent(cc.Sprite).spriteFrame=this._spriteFrame;
        this._hp=this.hp;

        let event=new cc.Event.EventCustom('enemy_destory', true);
        event.setUserData(this.rewardScore);
    
        //敌机消灭，通知奖励
       this.node.dispatchEvent(event);
        
        App.Instance.PutNode2Pool(this.node.name, this.node);
    }
}
