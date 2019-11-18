"use strict";
cc._RF.push(module, '897adYZaSpBD5TznYS4JCsr', 'end');
// script/end.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label_score = null;
        _this.label_history_score = null;
        _this.audio_reStart = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.label_score.string = cc.sys.localStorage.getItem("score") || 0;
        this.label_history_score.string = cc.sys.localStorage.getItem("maxScore") || 0;
    };
    NewClass.prototype.start = function () {
    };
    //重新挑战
    NewClass.prototype.restart = function () {
        var audioID = cc.audioEngine.play(this.audio_reStart, false, 1);
        cc.audioEngine.setFinishCallback(audioID, function () {
            cc.director.loadScene("main", function () {
                cc.log("challenge again");
            });
        });
    };
    //退出游戏
    NewClass.prototype.exit = function () {
        cc.director.loadScene("start", function () {
            cc.log("return start scene");
        });
    };
    //查看历史得分
    NewClass.prototype.viewHistoryScores = function () {
        cc.director.loadScene("history", function () {
            cc.log("return start scene");
        });
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_score", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_history_score", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "audio_reStart", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();