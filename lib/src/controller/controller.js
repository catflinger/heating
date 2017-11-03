"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var types_1 = require("./types");
var Controller = (function () {
    function Controller(container) {
        this.currentControlState = new types_1.ControlStateSnapshot(false, false);
        this.strategy = container.get(types_1.INJECTABLES.ControlStrategy);
        this.settings = container.get(types_1.INJECTABLES.ControllerSettings);
        this.environment = container.get(types_1.INJECTABLES.Environment);
        this.program = container.get(types_1.INJECTABLES.Program);
        this.clock = container.get(types_1.INJECTABLES.Clock);
        this.override = container.get(types_1.INJECTABLES.Override);
        this.system = container.get(types_1.INJECTABLES.System);
    }
    Controller.prototype.start = function () {
        this.system.start();
    };
    Controller.prototype.getSnapshot = function () {
        return new types_1.Snapshot(this.currentControlState.clone(), this.environment.getSnapshot(), this.system.getDevicelState(), this.override.getSnapshot(), this.program.getSnapshot());
    };
    Controller.prototype.setOverride = function (duration) {
        this.override.setOverride(duration);
    };
    Controller.prototype.clearOverride = function () {
        this.override.clearOverride();
    };
    Controller.prototype.refresh = function () {
        this.clock.tick();
        this.override.refresh();
        this.currentControlState = this.strategy.calculateControlState(this.getSnapshot());
        this.system.applyControlState(this.currentControlState.clone());
    };
    return Controller;
}());
exports.Controller = Controller;
