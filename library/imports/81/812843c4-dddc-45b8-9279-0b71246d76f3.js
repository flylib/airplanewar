"use strict";
cc._RF.push(module, '81284PE3dxFuJJ5C3EkbXbz', 'hero');
// script/hero.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var app_1 = require("./app");
var bullet_1 = require("./bullet");
var main_1 = require("./main");
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //子弹pfb
        _this.pfb_bullet1 = null;
        //子弹发射声音
        _this.audio_bullet = null;
        //飞机被毁声音
        _this.audio_hero_blowup = null;
        return _this;
    }
    //水平速度
    //   private hv = 0;
    //水平加速度
    //   private ahV=0.5;
    Hero.prototype.onLoad = function () {
        // cc.log("生成子弹池");
        app_1.default.Instance.AddTypePool("Bullet1", 50, this.pfb_bullet1);
    };
    Hero.prototype.start = function () {
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.dragMove, this);
    };
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
    Hero.prototype.sigleFire = function (type) {
        this.genBullet();
    };
    //连发
    Hero.prototype.autoFire = function () {
        this.schedule(this.genBullet, 0.1, cc.macro.REPEAT_FOREVER);
    };
    //停止发射
    Hero.prototype.stopFire = function () {
        this.unschedule(this.genBullet);
    };
    //生成子弹
    Hero.prototype.genBullet = function () {
        cc.audioEngine.play(this.audio_bullet, false, 1);
        // cc.log("生成子弹1");
        var bullet1 = app_1.default.Instance.GetNodeFromPool("Bullet1");
        this.node.parent.addChild(bullet1);
        bullet1.setPosition(cc.v2(this.node.x, this.node.y + 20));
        bullet1.getComponent(bullet_1.default).fly();
        // cc.log("bullet1 group=",bullet1.group);
    };
    //碰撞检测
    Hero.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        this.stopFire();
        //停止碰撞检测
        this.node.group = "default";
        this.node.targetOff(this);
        cc.log("碰撞到检测");
        cc.audioEngine.play(this.audio_hero_blowup, false, 1);
        var anim = this.node.getComponent(cc.Animation);
        // 指定播放 test 动画
        anim.play('hero_blowup');
        anim.on('finished', function () {
            _this.node.destroy();
            _this.node.parent.getComponent(main_1.default).gameOver();
        }, this);
    };
    __decorate([
        property(cc.Prefab)
    ], Hero.prototype, "pfb_bullet1", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Hero.prototype, "audio_bullet", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Hero.prototype, "audio_hero_blowup", void 0);
    Hero = __decorate([
        ccclass
    ], Hero);
    return Hero;
}(cc.Component));
exports.default = Hero;

cc._RF.pop();