"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgramSnapshot = (function () {
    function ProgramSnapshot(minHwTemp, maxHwTemp, slots, slotsPerDay) {
        var _this = this;
        this._slots = [];
        this._maxHwTemp = maxHwTemp;
        this._minHwTemp = minHwTemp;
        slots.forEach(function (slot) { return _this._slots.push(slot); });
        this._slotsPerDay = slotsPerDay;
    }
    Object.defineProperty(ProgramSnapshot.prototype, "minHwTemp", {
        get: function () {
            return this._minHwTemp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgramSnapshot.prototype, "maxHwTemp", {
        get: function () {
            return this._maxHwTemp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgramSnapshot.prototype, "slots", {
        get: function () {
            return this._slots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgramSnapshot.prototype, "slotsPerDay", {
        get: function () {
            return this._slotsPerDay;
        },
        enumerable: true,
        configurable: true
    });
    return ProgramSnapshot;
}());
exports.ProgramSnapshot = ProgramSnapshot;
