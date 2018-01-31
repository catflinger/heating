"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var path = require("path");
var MockControllerSettings = (function () {
    function MockControllerSettings() {
        this.startPolling = false;
        this.programStoreDir = path.join(__dirname, "..", "..", "test", "data");
        this.boilerPath = path.join(__dirname, "..", "..", "test", "data", "gpio", "gpio16", "value");
        this.chPumpPath = path.join(__dirname, "..", "..", "test", "data", "gpio", "gpio20", "value");
        this.hwPumpPath = path.join(__dirname, "..", "..", "test", "data", "gpio", "gpio21", "value");
    }
    Object.defineProperty(MockControllerSettings.prototype, "maxOverrideDuration", {
        get: function () {
            return 10;
        },
        enumerable: true,
        configurable: true
    });
    MockControllerSettings = __decorate([
        inversify_1.injectable()
    ], MockControllerSettings);
    return MockControllerSettings;
}());
exports.MockControllerSettings = MockControllerSettings;
