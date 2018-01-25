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
var boiler_1 = require("./devices/boiler");
var ch_pump_1 = require("./devices/ch-pump");
var hw_pump_1 = require("./devices/hw-pump");
var types_1 = require("./types");
var System = (function () {
    function System() {
    }
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
        inversify_1.inject(types_1.INJECTABLES.Boiler),
        __metadata("design:type", boiler_1.Boiler)
    ], System.prototype, "boiler", void 0);
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.CHPump),
        __metadata("design:type", ch_pump_1.CHPump)
    ], System.prototype, "hwPump", void 0);
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.HWPump),
        __metadata("design:type", hw_pump_1.HWPump)
    ], System.prototype, "chPump", void 0);
    System = __decorate([
        inversify_1.injectable()
    ], System);
    return System;
}());
exports.System = System;
