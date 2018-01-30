"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
require("reflect-metadata");
var types_1 = require("./types");
var debug = Debug("app");
var Controller = (function () {
    function Controller(container) {
        this.currentControlState = new types_1.ControlStateSnapshot(false, false);
        this.strategy = container.get(types_1.INJECTABLES.ControlStrategy);
        this.settings = container.get(types_1.INJECTABLES.ControllerSettings);
        this.environment = container.get(types_1.INJECTABLES.Environment);
        this.programManager = container.get(types_1.INJECTABLES.ProgramManager);
        this.clock = container.get(types_1.INJECTABLES.Clock);
        this.override = container.get(types_1.INJECTABLES.Override);
        this.system = container.get(types_1.INJECTABLES.System);
    }
    Controller.prototype.start = function () {
        var _this = this;
        this.environment.refresh();
        if (this.settings.startPolling) {
            debug("starting environment polling...");
            setInterval(function () {
                _this.environment.refresh();
            }, 10000);
        }
    };
    Controller.prototype.getSnapshot = function () {
        debug("getting control state snapshot");
        var cs = this.currentControlState.clone();
        debug("getting environment state snapshot");
        var env = this.environment.getSnapshot();
        debug("getting device state snapshot");
        var dev = this.system.getDeviceState();
        debug("getting override state snapshot");
        var ov = this.override.getSnapshot();
        debug("getting program state snapshot");
        var prog = this.programManager.activeProgram.getSnapshot();
        return new types_1.Snapshot(cs, env, dev, ov, prog);
    };
    Controller.prototype.setOverride = function (duration) {
        this.override.setOverride(duration);
        this.refresh();
    };
    Controller.prototype.clearOverride = function () {
        this.override.clearOverride();
        this.refresh();
    };
    Controller.prototype.refresh = function () {
        this.clock.tick();
        this.override.refresh();
        this.environment.refresh();
        this.currentControlState = this.strategy.calculateControlState(this.getSnapshot());
        this.system.applyControlState(this.currentControlState.clone());
    };
    return Controller;
}());
exports.Controller = Controller;
