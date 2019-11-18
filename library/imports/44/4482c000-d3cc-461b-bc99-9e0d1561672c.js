"use strict";
cc._RF.push(module, '4482cAA08xGG7yZng0VYWcs', 'start');
// script/start.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Start = /** @class */ (function (_super) {
    __extends(Start, _super);
    function Start() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio_btn_pressed = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Start.prototype.start = function () {
    };
    //开始游戏
    Start.prototype.startGame = function (e) {
        var audioId = cc.audioEngine.play(this.audio_btn_pressed, false, 1);
        cc.audioEngine.setFinishCallback(audioId, function () {
            cc.director.loadScene("main", function () {
                cc.log("loaded main scene successed");
            });
        });
    };
    __decorate([
        property(cc.AudioClip)
    ], Start.prototype, "audio_btn_pressed", void 0);
    Start = __decorate([
        ccclass
    ], Start);
    return Start;
}(cc.Component));
exports.default = Start;

cc._RF.pop();