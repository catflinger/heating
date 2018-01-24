"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var ControllerSettings = (function () {
    function ControllerSettings() {
    }
    Object.defineProperty(ControllerSettings.prototype, "programStore", {
        get: function () {
            return __dirname + "/data/";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerSettings.prototype, "slotsPerDay", {
        get: function () {
            return 6 * 24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerSettings.prototype, "boilerPin", {
        get: function () {
            return 16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerSettings.prototype, "hwPumpPin", {
        get: function () {
            return 20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerSettings.prototype, "chPumpPin", {
        get: function () {
            return 21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerSettings.prototype, "maxOverrideDuration", {
        get: function () {
            return 10;
        },
        enumerable: true,
        configurable: true
    });
    ControllerSettings = __decorate([
        inversify_1.injectable()
    ], ControllerSettings);
    return ControllerSettings;
}());
exports.ControllerSettings = ControllerSettings;
