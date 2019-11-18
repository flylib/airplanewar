// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label_score: cc.Label = null;
    @property(cc.Label)
    label_history_score: cc.Label = null;

    
    @property(cc.AudioClip)
    audio_reStart: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.label_score.string=cc.sys.localStorage.getItem("score")||0;
        this.label_history_score.string=cc.sys.localStorage.getItem("maxScore")||0;
    }

    start () {

    }

    //重新挑战
    restart(){
        var audioID=cc.audioEngine.play(this.audio_reStart,false,1);
        cc.audioEngine.setFinishCallback(audioID,()=>{
            cc.director.loadScene("main",()=>{
                cc.log("challenge again");
            });
        })
    }

    //退出游戏
    exit(){
    cc.director.loadScene("start",()=>{
        cc.log("return start scene");
    });
    }

    //查看历史得分
    viewHistoryScores(){
        cc.director.loadScene("history",()=>{
            cc.log("return start scene");
        });
    }
    // update (dt) {}
}
