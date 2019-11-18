"use strict";
cc._RF.push(module, 'e2015vJNAhCipNCGVOP6Pc2', 'history');
// script/history.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var History = /** @class */ (function (_super) {
    __extends(History, _super);
    function History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pfb_item = null;
        _this.layout_rank = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    History.prototype.onLoad = function () {
        var historyScores = JSON.parse(cc.sys.localStorage.getItem("history_scores")) || [];
        cc.log(historyScores);
        for (var i = 0; i < historyScores.length; i++) {
            var item = cc.instantiate(this.pfb_item);
            item.getChildByName("time").getComponent(cc.Label).string = historyScores[i].time;
            item.getChildByName("score").getComponent(cc.Label).string = historyScores[i].score.toString();
            this.layout_rank.addChild(item);
        }
    };
    History.prototype.start = function () {
    };
    //返回结束场景
    History.prototype.backToEndScene = function () {
        cc.director.loadScene("end");
    };
    __decorate([
        property(cc.Prefab)
    ], History.prototype, "pfb_item", void 0);
    __decorate([
        property(cc.Node)
    ], History.prototype, "layout_rank", void 0);
    History = __decorate([
        ccclass
    ], History);
    return History;
}(cc.Component));
exports.default = History;

cc._RF.pop();