"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var fs_1 = require("fs");
var inversify_1 = require("inversify");
var debug = Debug("app");
var Switchable = (function () {
    function Switchable() {
    }
    Object.defineProperty(Switchable.prototype, "state", {
        get: function () {
            var val = fs_1.readFileSync(this.gpioPath, "utf8");
            return (val.charCodeAt(0) === 49);
        },
        enumerable: true,
        configurable: true
    });
    Switchable.prototype.toggle = function () {
        var currentState = this.state;
        this.switch(!currentState);
    };
    Switchable.prototype.switch = function (state) {
        var val = state ? "1" : "0";
        fs_1.writeFileSync(this.gpioPath, val, "utf8");
    };
    Switchable = __decorate([
        inversify_1.injectable()
    ], Switchable);
    return Switchable;
}());
exports.Switchable = Switchable;
