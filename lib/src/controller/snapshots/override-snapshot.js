"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OverrideSnapshot = (function () {
    function OverrideSnapshot(start, duration, state, date) {
        this._startSlot = Math.floor(start);
        this._duration = Math.floor(duration);
        this._state = state;
        this._date = new Date(date);
    }
    OverrideSnapshot.prototype.clone = function () {
        var result = new OverrideSnapshot(this._startSlot, this._duration, this._state, this.date);
        result._date = this.date;
        return result;
    };
    Object.defineProperty(OverrideSnapshot.prototype, "start", {
        get: function () {
            return this._startSlot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverrideSnapshot.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverrideSnapshot.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverrideSnapshot.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: true,
        configurable: true
    });
    return OverrideSnapshot;
}());
exports.OverrideSnapshot = OverrideSnapshot;
