"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sensor_snapshot_1 = require("./sensor-snapshot");
var EnvironmentSnapshot = (function () {
    function EnvironmentSnapshot(sensors) {
        var _this = this;
        this.snapshots = [];
        sensors.forEach(function (sensor) {
            return _this.snapshots.push(new sensor_snapshot_1.SensorSnapshot(sensor));
        });
    }
    Object.defineProperty(EnvironmentSnapshot.prototype, "sensors", {
        get: function () {
            return this.snapshots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnvironmentSnapshot.prototype, "hwTemperature", {
        get: function () {
            var result;
            try {
                result = this.sensors.find(function (s) { return s.id === "hw"; }).reading;
            }
            catch (_a) {
                result = NaN;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return EnvironmentSnapshot;
}());
exports.EnvironmentSnapshot = EnvironmentSnapshot;
