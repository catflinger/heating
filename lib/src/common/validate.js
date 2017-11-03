"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validate = (function () {
    function Validate() {
    }
    Validate.isBoolean = function (val, msg) {
        if (typeof val !== "boolean") {
            throw new Error("invalid boolean data " + msg);
        }
        return val;
    };
    Validate.isNumber = function (val, msg) {
        if (typeof val !== "number") {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    };
    Validate.isInteger = function (val, msg) {
        if (typeof val !== "number" ||
            !isFinite(val) ||
            Math.floor(val) !== val) {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    };
    return Validate;
}());
exports.Validate = Validate;
