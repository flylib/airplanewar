const { ccclass, property } = cc._decorator;
import App from "./app";
import Bullet from "./bullet";
import Main from "./main";

@ccclass
export default class Hero extends cc.Component {
    //子弹pfb
    @property(cc.Prefab)
    pfb_bullet1: cc.Prefab = null;

    //子弹发射声音
    @property(cc.AudioClip)
    audio_bullet: cc.AudioClip = null;

     //飞机被毁声音
     @property(cc.AudioClip)
     audio_hero_blowup: cc.AudioClip = null;

    //水平速度
    //   private hv = 0;
    //水平加速度
    //   private ahV=0.5;
    onLoad() {
        // cc.log("生成子弹池");
        App.Instance.AddTypePool("Bullet1", 50, this.pfb_bullet1);
    }

    start() {
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.dragMove, this);
    }

    //移动处理
    // private dragMove(e): void {
    //     var locationv = e.getLocation();
    //     var location = this.node.parent.convertToNodeSpaceAR(locationv);
    //     //飞机不移出屏幕 
    //     var minX = -this.node.parent.width / 2 + this.node.width / 2;
    //     var maxX = -minX;
    //     var minY = -this.node.parent.height / 2 + this.node.height / 2;
    //     var maxY = -minY;
    //     if (location.x < minX) {
    //         location.x = minX;
    //     }
    //     if (location.x > maxX) {
    //         location.x = maxX;
    //     }
    //     if (location.y < minY) {
    //         location.y = minY;
    //     }
    //     if (location.y > maxY) {
    //         location.y = maxY;
    //     }
    //     this.node.setPosition(location);
    // }

    //单发
    sigleFire(type: number) {
        this.genBullet();
    }
    //连发
    autoFire() {
        this.schedule(this.genBullet, 0.1, cc.macro.REPEAT_FOREVER);
    }
    //停止发射
    stopFire() {
        this.unschedule(this.genBullet);
    }

    //生成子弹
    genBullet() {
        cc.audioEngine.play(this.audio_bullet,false,1);
        // cc.log("生成子弹1");
        let bullet1 = App.Instance.GetNodeFromPool("Bullet1");
        this.node.parent.addChild(bullet1);
        bullet1.setPosition(cc.v2(this.node.x, this.node.y + 20));
        bullet1.getComponent(Bullet).fly();
        // cc.log("bullet1 group=",bullet1.group);
    }

    

    //碰撞检测
    onCollisionEnter(other, self) {
        this.stopFire();
        //停止碰撞检测
        this.node.group="default";
        this.node.targetOff(this);

        cc.log("碰撞到检测");
        cc.audioEngine.play(this.audio_hero_blowup,false,1);
        var anim = this.node.getComponent(cc.Animation);
        // 指定播放 test 动画
        anim.play('hero_blowup');
        anim.on('finished', ()=>{
            this.node.destroy();
            this.node.parent.getComponent(Main).gameOver();
        }, this);

        
    }

}
