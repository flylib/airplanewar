"use strict";
cc._RF.push(module, '5dc45quB2hNm6Nzw37JC7Q4', 'main');
// script/main.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 从 cc._decorator 命名空间中引入 ccclass 和 property 两个装饰器
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var hero_1 = require("./hero");
var app_1 = require("./app");
var enemy_1 = require("./enemy");
var util_1 = require("./util");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //pfbs_enemy
        _this.pfbs_enemy = [];
        //btns_row
        _this.btns = [];
        _this.hero = null;
        _this.bg_1 = null;
        _this.bg_2 = null;
        _this.label_score = null;
        _this.label_clock = null;
        _this.score = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Main.prototype.onLoad = function () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //开启物理系统
        // cc.director.getPhysicsManager().enabled = true;
        //init enmey pools
        for (var i = 0; i < this.pfbs_enemy.length; i++) {
            app_1.default.Instance.AddTypePool("enemy" + (i + 1), 20, this.pfbs_enemy[i]);
        }
        // 节点 b 的组件脚本中
        this.node.on('enemy_destory', function (event) {
            cc.log("敌机毁灭");
            var addScore = event.getUserData();
            this.score += addScore;
            this.label_score.string = this.score.toString();
            event.stopPropagationImmediate();
        }.bind(this));
        //始终显示在最前面
        this.node.getChildByName("btn_pause").zIndex = 99;
        this.label_score.node.zIndex = 100;
        this.label_clock.node.zIndex = 101;
    };
    Main.prototype.start = function () {
        //背景移动
        var t = 24;
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
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].on(cc.Node.EventType.TOUCH_START, this._dirvePlane, this);
            this.btns[i].on(cc.Node.EventType.TOUCH_CANCEL, this._stopDrivePlane, this);
            this.btns[i].on(cc.Node.EventType.TOUCH_END, this._stopDrivePlane, this);
        }
        this.clockRun();
        //test
        this.hero.getComponent(hero_1.default).autoFire();
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
    };
    //驱动飞机
    Main.prototype._dirvePlane = function (e) {
        this.hero.stopAllActions();
        var s = 0;
        if (e.currentTarget._name == "_left") {
            s = -this.node.width / 2 - this.hero.x - 10;
        }
        else {
            s = this.node.width / 2 - this.hero.x + 10;
        }
        this.hero.runAction(cc.moveBy(Math.abs(s / 120), cc.v2(s, 0)).easing(cc.easeOut(1.5)));
    };
    //驱动停止
    Main.prototype._stopDrivePlane = function (e) {
        //缓动距离
        var xS = 10;
        if (e.currentTarget._name == "_left") {
            xS = -xS;
        }
        this.hero.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(xS, 0)).easing(cc.easeOut(1.5)), cc.callFunc(function () {
            this.hero.stopAllActions();
        }, this)));
    };
    // update (dt) {}
    //敌机生成
    Main.prototype.genEnemy = function (kind) {
        var enmy = app_1.default.Instance.GetNodeFromPool("enemy" + kind);
        var randX = -this.node.width / 2 + Math.random() * this.node.width;
        enmy.setPosition(cc.v2(randX, 600));
        this.node.addChild(enmy);
        enmy.getComponent(enemy_1.default).fly();
        enmy.group = "enemy";
    };
    //游戏结束
    Main.prototype.gameOver = function () {
        //停止所有定时器
        this.unscheduleAllCallbacks();
        // cc.log("game over!");
        cc.sys.localStorage.setItem("score", this.label_score.string);
        var maxScore = Number(cc.sys.localStorage.getItem("maxScore") || 0);
        if (this.score > maxScore) {
            cc.sys.localStorage.setItem("maxScore", this.score);
        }
        var newScoreObj = {
            "time": util_1.default.TimeFormt(new Date()),
            "score": this.score,
        };
        var historyScores = JSON.parse(cc.sys.localStorage.getItem("history_scores") || "[]");
        //保留10条历史记录
        // if(historyScores.length>=11)historyScores.pop();
        while (historyScores.length >= 11) {
            historyScores.pop();
        }
        historyScores.unshift(newScoreObj);
        cc.sys.localStorage.setItem("history_scores", JSON.stringify(historyScores));
        cc.director.loadScene("end", function () {
            cc.log("loaded end scene success");
        });
    };
    //游戏暂停
    Main.prototype.gamePause = function () {
        this.node.getChildByName("btn_pause").active = false;
        this.node.getChildByName("btn_resume").active = true;
        cc.game.pause();
    };
    //游戏恢复
    Main.prototype.gameResume = function () {
        this.node.getChildByName("btn_pause").active = true;
        this.node.getChildByName("btn_resume").active = false;
        cc.game.resume();
    };
    Main.prototype.clockRun = function () {
        var _30s = 30;
        var _60s = 60;
        var tick = function () {
            //90秒结束游戏
            if (_30s <= 1) {
                _60s--;
                if (_60s <= 0) {
                    this.gameOver();
                }
                this.label_clock.string = "" + _60s;
                return;
            }
            _30s--;
            if (_30s < 10) {
                this.label_clock.string = "1:0" + _30s;
                return;
            }
            this.label_clock.string = "1:" + _30s;
        };
        this.schedule(tick.bind(this), 1, cc.macro.REPEAT_FOREVER);
    };
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "pfbs_enemy", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "btns", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "hero", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "bg_1", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "bg_2", void 0);
    __decorate([
        property(cc.Label)
    ], Main.prototype, "label_score", void 0);
    __decorate([
        property(cc.Label)
    ], Main.prototype, "label_clock", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

cc._RF.pop();