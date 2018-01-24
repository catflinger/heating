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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var switchable_1 = require("./switchable");
var types_1 = require("./types");
var System = (function () {
    function System() {
    }
    System.prototype.start = function () {
        this.boiler = new switchable_1.Switchable("boiler", this.settings.boilerPin);
        this.chPump = new switchable_1.Switchable("heating pump", this.settings.chPumpPin);
        this.hwPump = new switchable_1.Switchable("hot water pump", this.settings.hwPumpPin);
    };
    System.prototype.applyControlState = function (state) {
        var boilerState = (state.heating || state.hotWater);
        var hwPumpState = state.hotWater;
        var chPumpState = state.heating;
        this.boiler.switch(boilerState);
        this.hwPump.switch(hwPumpState);
        this.chPump.switch(chPumpState);
    };
    System.prototype.getDeviceState = function () {
        return new types_1.DeviceStateSnapshot(this.boiler.state, this.hwPump.state, this.chPump.state);
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.ControllerSettings),
        __metadata("design:type", Object)
    ], System.prototype, "settings", void 0);
    System = __decorate([
        inversify_1.injectable()
    ], System);
    return System;
}());
exports.System = System;
