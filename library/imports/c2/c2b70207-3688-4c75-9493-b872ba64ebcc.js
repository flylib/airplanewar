"use strict";
cc._RF.push(module, 'c2b70IHNohMdZSTuHK6ZOvM', 'bullet');
// script/bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var app_1 = require("./app");
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //速度,用时间来表示
        _this._flyTime = 1;
        //射程
        _this._s = 1136;
        //伤害值
        _this._hp = 50;
        return _this;
    }
    // use this for initialization
    Bullet.prototype.onLoad = function () {
        this._s = this.node.parent.height;
        cc.director.getCollisionManager().enabled = true;
    };
    // start () {}
    //碰撞检测
    Bullet.prototype.onCollisionEnter = function (other, self) {
        cc.log("子弹射中了");
        //回收到对象池
        app_1.default.Instance.PutNode2Pool("Bullet1", this.node);
    };
    //子弹飞行
    Bullet.prototype.fly = function () {
        var _this = this;
        this.node.runAction(cc.sequence(cc.moveBy(this._flyTime, cc.v2(0, this._s)).easing(cc.easeIn(1.0)), cc.callFunc(function () {
            _this.node.stopAllActions();
            //回收到对象池
            app_1.default.Instance.PutNode2Pool("Bullet1", _this.node);
        }, this)));
    };
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

cc._RF.pop();