"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceStateSnapshot = (function () {
    function DeviceStateSnapshot(boiler, hwPump, chPump) {
        this._boiler = boiler;
        this._hwPump = hwPump;
        this._chPump = chPump;
    }
    Object.defineProperty(DeviceStateSnapshot.prototype, "boiler", {
        get: function () {
            return this._boiler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceStateSnapshot.prototype, "hwPump", {
        get: function () {
            return this._hwPump;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceStateSnapshot.prototype, "chPump", {
        get: function () {
            return this._chPump;
        },
        enumerable: true,
        configurable: true
    });
    return DeviceStateSnapshot;
}());
exports.DeviceStateSnapshot = DeviceStateSnapshot;
