// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {

     @property(cc.AudioClip)
     audio_btn_pressed: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    //开始游戏
    startGame(e) {

        var audioId=cc.audioEngine.play(this.audio_btn_pressed,false,1);
        cc.audioEngine.setFinishCallback(audioId,()=>{
            cc.director.loadScene("main", () => {
                cc.log("loaded main scene successed");
            })
        })
      
    }
    // update (dt) {}
}
