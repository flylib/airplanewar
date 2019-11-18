"use strict";
cc._RF.push(module, 'ce38cBY2J9Mbbc4YjWoTMTt', 'app');
// script/app.ts

Object.defineProperty(exports, "__esModule", { value: true });
//游戏状态
var GameState;
(function (GameState) {
    GameState[GameState["gameNone"] = 0] = "gameNone";
    GameState[GameState["gameStart"] = 1] = "gameStart";
    GameState[GameState["gamePuse"] = 2] = "gamePuse";
    GameState[GameState["gameEnd"] = 3] = "gameEnd";
})(GameState = exports.GameState || (exports.GameState = {}));
var App = /** @class */ (function () {
    function App() {
        this._nodePools = {};
        this._nodePfb = {};
    }
    Object.defineProperty(App, "Instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new App();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 添加对象池
    * @param    type    `类型`
    * @param    size    `大小`
    * @param    pfb     `预制体`
    */
    App.prototype.AddTypePool = function (type, size, pfb) {
        this._nodePools[type] = new cc.NodePool();
        this._nodePfb[type] = pfb;
        for (var ii = 0; ii < size; ++ii) {
            this._nodePools[type].put(cc.instantiate(pfb));
        }
    };
    /**
     * 添加对象到池
     * @param    type    `类型`
     * @param    node     `cc.node`
     */
    App.prototype.PutNode2Pool = function (type, node) {
        this._nodePools[type].put(node);
    };
    /**
     * 从对象池生成对象
     * @param    type    `类型`
     * return   cc.Node
     */
    App.prototype.GetNodeFromPool = function (type) {
        // cc.log(type, ":pool size=", this._nodePools[type].size())
        if (this._nodePools[type].size() <= 0)
            return cc.instantiate(this._nodePfb[type]);
        return this._nodePools[type].get();
    };
    return App;
}());
exports.default = App;

cc._RF.pop();