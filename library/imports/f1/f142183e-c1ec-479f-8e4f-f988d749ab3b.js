"use strict";
cc._RF.push(module, 'f1421g+wexHn45P+YjXSas7', 'util');
// script/util.ts

Object.defineProperty(exports, "__esModule", { value: true });
var utils = /** @class */ (function () {
    function utils() {
    }
    //时间格式化 YYYY年MM月DD日 hh:mm:ss
    utils.TimeFormt = function (time) {
        cc.log("day", time.getDay().toString());
        cc.log("day num", time.getDay());
        cc.log("date ", time.getDate());
        return "YYYY年MM月DD日 hh:mm:ss"
            .replace("YYYY", time.getFullYear().toString())
            .replace("MM", time.getMonth() < 10 ? 0 + time.getMonth().toString() : time.getMonth().toString())
            .replace("DD", time.getDate() < 10 ? 0 + time.getDate().toString() : time.getDate().toString())
            .replace("hh", time.getHours() < 10 ? 0 + time.getHours().toString() : time.getHours().toString())
            .replace("mm", time.getMinutes() < 10 ? 0 + time.getMinutes().toString() : time.getMinutes().toString())
            .replace("ss", time.getSeconds() < 10 ? 0 + time.getSeconds().toString() : time.getSeconds().toString());
    };
    return utils;
}());
exports.default = utils;

cc._RF.pop();