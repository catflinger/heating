"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var EnvironmentSettings = (function () {
    function EnvironmentSettings() {
    }
    Object.defineProperty(EnvironmentSettings.prototype, "oneWireDirectory", {
        get: function () {
            return "/mnt/1wire";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnvironmentSettings.prototype, "sensors", {
        get: function () {
            return [
                { id: "hw", deviceId: "28.60418F060000" },
                { id: "bedroom", deviceId: "28.68A98F060000" },
                { id: "garage", deviceId: "28.71CE8F060000" },
                { id: "loft", deviceId: "28.8F528F060000" },
                { id: "other1", deviceId: "28.9F5991060000" },
                { id: "other2", deviceId: "28.9FD18F060000" },
            ];
        },
        enumerable: true,
        configurable: true
    });
    EnvironmentSettings = __decorate([
        inversify_1.injectable()
    ], EnvironmentSettings);
    return EnvironmentSettings;
}());
exports.EnvironmentSettings = EnvironmentSettings;
