"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SensorSnapshot = (function () {
    function SensorSnapshot(sensor) {
        this._reading = sensor.reading;
        this._id = sensor.id;
    }
    Object.defineProperty(SensorSnapshot.prototype, "reading", {
        get: function () {
            return this._reading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SensorSnapshot.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return SensorSnapshot;
}());
exports.SensorSnapshot = SensorSnapshot;
