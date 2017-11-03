"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlStateSnapshot = (function () {
    function ControlStateSnapshot(heating, hotWater) {
        this._heating = heating;
        this._hotWater = hotWater;
    }
    Object.defineProperty(ControlStateSnapshot.prototype, "heating", {
        get: function () {
            return this._heating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlStateSnapshot.prototype, "hotWater", {
        get: function () {
            return this._hotWater;
        },
        enumerable: true,
        configurable: true
    });
    ControlStateSnapshot.prototype.clone = function () {
        return new ControlStateSnapshot(this._heating, this._hotWater);
    };
    return ControlStateSnapshot;
}());
exports.ControlStateSnapshot = ControlStateSnapshot;
