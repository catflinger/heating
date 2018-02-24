"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var inversify_1 = require("inversify");
require("reflect-metadata");
var types_1 = require("./types");
var debug = Debug("app");
var Controller = (function () {
    function Controller(strategy, settings, environment, _programManager, clock, override, system) {
        this.strategy = strategy;
        this.settings = settings;
        this.environment = environment;
        this._programManager = _programManager;
        this.clock = clock;
        this.override = override;
        this.system = system;
        this.programManager.init();
        this.currentControlState = new types_1.ControlStateSnapshot(false, false);
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
        var prog = this.programManager.currentProgram.getSnapshot();
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
    Object.defineProperty(Controller.prototype, "programManager", {
        get: function () {
            return this._programManager;
        },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.refresh = function () {
        this.clock.tick();
        this.override.refresh();
        this.environment.refresh();
        this.currentControlState = this.strategy.calculateControlState(this.getSnapshot());
        this.system.applyControlState(this.currentControlState.clone());
    };
    Controller = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.ControlStrategy)),
        __param(1, inversify_1.inject(types_1.INJECTABLES.ControllerSettings)),
        __param(2, inversify_1.inject(types_1.INJECTABLES.Environment)),
        __param(3, inversify_1.inject(types_1.INJECTABLES.ProgramManager)),
        __param(4, inversify_1.inject(types_1.INJECTABLES.Clock)),
        __param(5, inversify_1.inject(types_1.INJECTABLES.Override)),
        __param(6, inversify_1.inject(types_1.INJECTABLES.System)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
    ], Controller);
    return Controller;
}());
exports.Controller = Controller;
