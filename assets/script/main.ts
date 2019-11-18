// 从 cc._decorator 命名空间中引入 ccclass 和 property 两个装饰器
const { ccclass, property } = cc._decorator;
import Hero from "./hero";
import App from "./app";
import Enemy from "./enemy";
import util from "./util";

@ccclass
export default class Main extends cc.Component {
    //pfbs_enemy
    @property(cc.Prefab)
    pfbs_enemy: cc.Prefab[] = [];

    //btns_row
    @property(cc.Node)
    btns: cc.Node[] = [];

    @property(cc.Node)
    hero: cc.Node = null;

    @property(cc.Node)
    bg_1: cc.Node = null;

    @property(cc.Node)
    bg_2: cc.Node = null;

    @property(cc.Label)
    label_score: cc.Label = null;

    @property(cc.Label)
    label_clock: cc.Label = null;

    score = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //开启物理系统
        // cc.director.getPhysicsManager().enabled = true;
        //init enmey pools
        for (let i = 0; i < this.pfbs_enemy.length; i++) {
            App.Instance.AddTypePool("enemy" + (i + 1), 20, this.pfbs_enemy[i]);
        }

        // 节点 b 的组件脚本中
        this.node.on('enemy_destory', function (event) {
            cc.log("敌机毁灭");
            let addScore = event.getUserData();
            this.score += addScore;
            this.label_score.string = this.score.toString();
            event.stopPropagationImmediate();
        }.bind(this));

        //始终显示在最前面
        this.node.getChildByName("btn_pause").zIndex = 99;
        this.label_score.node.zIndex = 100;
        this.label_clock.node.zIndex = 101;
    }

    start() {
        //背景移动
        let t = 24
        this.bg_1.runAction(cc.sequence(cc.moveBy(t, cc.v2(0, -this.node.height)), cc.callFunc(function () {
            this.bg_1.setPosition(cc.v2(0, this.node.height));
        }, this), cc.callFunc(function () {
            this.bg_1.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2 * t, cc.v2(0, -this.node.height * 2)), cc.callFunc(function () {
                this.bg_1.rotation += 180;
                this.bg_1.setPosition(cc.v2(0, this.node.height));
            }, this))));
        }, this)));
        this.bg_2.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2 * t, cc.v2(0, -this.node.height * 2)), cc.callFunc(function () {
            this.bg_2.setPosition(cc.v2(0, this.node.height));
        }, this))));

        //btns addlisten TOUCH_START
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].on(cc.Node.EventType.TOUCH_START, this._dirvePlane, this);
            this.btns[i].on(cc.Node.EventType.TOUCH_CANCEL, this._stopDrivePlane, this);
            this.btns[i].on(cc.Node.EventType.TOUCH_END, this._stopDrivePlane, this);
        }

        this.clockRun();

        //test
        this.hero.getComponent(Hero).autoFire();

        //gen enemy1
        this.schedule(function () {
            this.genEnemy(1);
        }.bind(this), 0.9, cc.macro.REPEAT_FOREVER);

        //delay 30s
        this.scheduleOnce(function () {
            //gen enemy2
            this.schedule(function () {
                this.genEnemy(2);
            }.bind(this), 2, cc.macro.REPEAT_FOREVER);
        }.bind(this), 30);

        //delay 50s
        this.schedule(function () {
            //gen enemy3
            this.schedule(function () {
                this.genEnemy(3);
            }.bind(this), 4, cc.macro.REPEAT_FOREVER);
        }.bind(this), 50);
    }


    //驱动飞机
    private _dirvePlane(e): void {
        this.hero.stopAllActions();
        let s = 0;
        if (e.currentTarget._name == "_left") {
            s = -this.node.width / 2 - this.hero.x-10;
        }else{
            s= this.node.width / 2 - this.hero.x+10;
        }
        this.hero.runAction(cc.moveBy(Math.abs(s / 120), cc.v2(s, 0)).easing(cc.easeOut(1.5)));
    }

    //驱动停止
    private _stopDrivePlane(e): void {
        //缓动距离
        let xS = 10;
        if (e.currentTarget._name == "_left") {
            xS = -xS;
        }
        this.hero.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(xS, 0)).easing(cc.easeOut(1.5)), cc.callFunc(function () {
            this.hero.stopAllActions();
        }, this)));
    }

    // update (dt) {}

    //敌机生成
    genEnemy(kind: number) {
        let enmy = App.Instance.GetNodeFromPool("enemy" + kind);
        let randX = -this.node.width / 2 + Math.random() * this.node.width;
        enmy.setPosition(cc.v2(randX, 600));
        this.node.addChild(enmy);
        enmy.getComponent(Enemy).fly();
        enmy.group = "enemy";
    }

    //游戏结束
    gameOver() {
        //停止所有定时器
        this.unscheduleAllCallbacks();
        // cc.log("game over!");
        cc.sys.localStorage.setItem("score", this.label_score.string);

        let maxScore = Number(cc.sys.localStorage.getItem("maxScore")||0);
        if (this.score > maxScore) {
            cc.sys.localStorage.setItem("maxScore", this.score)
        }
        let newScoreObj = {
            "time": util.TimeFormt(new Date()),
            "score": this.score,
        }
        let historyScores=JSON.parse(cc.sys.localStorage.getItem("history_scores")||"[]");
        //保留10条历史记录
        // if(historyScores.length>=11)historyScores.pop();
        while (historyScores.length >= 11) {
            historyScores.pop();
        }
        historyScores.unshift(newScoreObj);
        cc.sys.localStorage.setItem("history_scores", JSON.stringify(historyScores));

        cc.director.loadScene("end", () => {
            cc.log("loaded end scene success");
        });
    }

    //游戏暂停
    gamePause() {
        this.node.getChildByName("btn_pause").active = false;
        this.node.getChildByName("btn_resume").active = true;
        cc.game.pause();
    }

    //游戏恢复
    gameResume() {
        this.node.getChildByName("btn_pause").active = true;
        this.node.getChildByName("btn_resume").active = false;
        cc.game.resume();
    }

    clockRun() {
        let _30s = 30;
        let _60s = 60;
        let tick = function () {
            //90秒结束游戏
            if (_30s <= 1) {
                _60s--;
                if (_60s <= 0) {
                    this.gameOver();
                }
                this.label_clock.string = "" + _60s;
                return
            }
            _30s--;
            if (_30s < 10) {
                this.label_clock.string = "1:0" + _30s;
                return
            }
            this.label_clock.string = "1:" + _30s;

        }
        this.schedule(tick.bind(this), 1, cc.macro.REPEAT_FOREVER)
    }
}
