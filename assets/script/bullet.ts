const { ccclass, property } = cc._decorator;
import App from "./app";

@ccclass
export default class Bullet extends cc.Component {
    
    //速度,用时间来表示
    private _flyTime: number = 1;

    //射程
    private _s: number = 1136;

    //伤害值
    private _hp: number = 50;

    // use this for initialization
    onLoad() {
        this._s=this.node.parent.height;
        cc.director.getCollisionManager().enabled = true;
    }
    // start () {}

    //碰撞检测
    onCollisionEnter(other, self) {
      cc.log("子弹射中了");
      //回收到对象池
      App.Instance.PutNode2Pool("Bullet1",this.node);
    }

    //子弹飞行
    fly(){
      this.node.runAction(cc.sequence(cc.moveBy(this._flyTime,cc.v2(0,this._s)).easing(cc.easeIn(1.0)),cc.callFunc(()=>{
        this.node.stopAllActions();
        //回收到对象池
        App.Instance.PutNode2Pool("Bullet1",this.node);
      },this)));
    }
}
