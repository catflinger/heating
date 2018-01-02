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
        this.programFile = path.join(__dirname, "..", "..", "data", "program-test.json");
        this.boilerPin = 21;
        this.hwPumpPin = 22;
        this.chPumpPin = 23;
        this.slotsPerDay = 10;
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
