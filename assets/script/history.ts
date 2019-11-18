
const { ccclass, property } = cc._decorator;

@ccclass
export default class History extends cc.Component {

    @property(cc.Prefab)
    pfb_item: cc.Prefab = null;

    @property(cc.Node)
    layout_rank: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        let historyScores = JSON.parse(cc.sys.localStorage.getItem("history_scores")) || [];
        cc.log(historyScores);
        for (let i = 0; i < historyScores.length; i++) {
            let item = cc.instantiate(this.pfb_item);
            item.getChildByName("time").getComponent(cc.Label).string = historyScores[i].time;
            item.getChildByName("score").getComponent(cc.Label).string = historyScores[i].score.toString();
            this.layout_rank.addChild(item);
        }
    }

    start() {
    }

    //返回结束场景
    backToEndScene() {
        cc.director.loadScene("end");
    }

    // update (dt) {}
}
