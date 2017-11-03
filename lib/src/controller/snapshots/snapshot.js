"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snapshot = (function () {
    function Snapshot(control, environment, device, override, program) {
        this._control = control;
        this._environment = environment;
        this._device = device;
        this._override = override;
        this._program = program;
    }
    Object.defineProperty(Snapshot.prototype, "control", {
        get: function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snapshot.prototype, "environment", {
        get: function () {
            return this._environment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snapshot.prototype, "device", {
        get: function () {
            return this._device;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snapshot.prototype, "override", {
        get: function () {
            return this._override;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snapshot.prototype, "program", {
        get: function () {
            return this._program;
        },
        enumerable: true,
        configurable: true
    });
    return Snapshot;
}());
exports.Snapshot = Snapshot;
