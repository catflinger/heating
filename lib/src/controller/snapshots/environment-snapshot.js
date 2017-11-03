"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnvironmentSnapshot = (function () {
    function EnvironmentSnapshot(hwTemperature) {
        this._hwTemperature = hwTemperature;
    }
    Object.defineProperty(EnvironmentSnapshot.prototype, "hwTemperature", {
        get: function () {
            return this._hwTemperature;
        },
        enumerable: true,
        configurable: true
    });
    return EnvironmentSnapshot;
}());
exports.EnvironmentSnapshot = EnvironmentSnapshot;
