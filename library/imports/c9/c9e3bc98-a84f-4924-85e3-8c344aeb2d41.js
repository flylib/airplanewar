"use strict";
cc._RF.push(module, 'c9e3byYqE9JJIXjjDRK6y1B', 'enemy');
// script/enemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var app_1 = require("./app");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //奖励分数
        _this.rewardScore = 1;
        //飞行速度，用时间来表示
        _this.speed = 1;
        //生命值
        _this.hp = 100;
        //爆炸音效
        _this.audio_blowup = null;
        //行程
        _this._s = 0;
        _this._hp = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS
    Enemy.prototype.onLoad = function () {
    };
    // start() { }
    // update (dt) {}
    //飞行动作
    Enemy.prototype.fly = function () {
        var _this = this;
        this._s = -this.node.parent.height;
        this._hp = this.hp;
        // this.node.setPosition(cc.v2(this.mrandX,600));
        this.node.runAction(cc.sequence(cc.moveBy(this.speed, cc.v2(0, this._s)).easing(cc.easeIn(1.0)), cc.callFunc(function () {
            //回收到对象池
            app_1.default.Instance.PutNode2Pool(_this.node.name, _this.node);
        }, this)));
    };
    //碰撞检测
    Enemy.prototype.onCollisionEnter = function (other, self) {
        cc.log(self.name, "<发生碰撞>", other.name);
        if (this._hp > 0) {
            this._hp -= 50;
            cc.log("enemy hp=", this.hp);
            return;
        }
        this._spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
        this.node.stopAllActions();
        this.node.group = 'default'; //不让动画在执行碰撞
        var anim = this.node.getComponent(cc.Animation);
        anim.play();
        anim.on('finished', this.onResume, this);
        cc.audioEngine.play(this.audio_blowup, false, 1);
        //播放音效
        // cc.audioEngine.playEffect(this.enemyDownClip, false);  
    };
    //重置节点 回收到对象池
    Enemy.prototype.onResume = function (e) {
        cc.log("动画结束后 动画节点回收");
        this.node.getComponent(cc.Sprite).spriteFrame = this._spriteFrame;
        this._hp = this.hp;
        var event = new cc.Event.EventCustom('enemy_destory', true);
        event.setUserData(this.rewardScore);
        //敌机消灭，通知奖励
        this.node.dispatchEvent(event);
        app_1.default.Instance.PutNode2Pool(this.node.name, this.node);
    };
    __decorate([
        property
    ], Enemy.prototype, "rewardScore", void 0);
    __decorate([
        property
    ], Enemy.prototype, "speed", void 0);
    __decorate([
        property
    ], Enemy.prototype, "hp", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Enemy.prototype, "audio_blowup", void 0);
    Enemy = __decorate([
        ccclass
    ], Enemy);
    return Enemy;
}(cc.Component));
exports.default = Enemy;

cc._RF.pop();