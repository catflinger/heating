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
var Debug = require("debug");
var fs_1 = require("fs");
var inversify_1 = require("inversify");
var debug = Debug("app");
var Switchable = (function () {
    function Switchable(name, pin) {
        this._name = name;
        this._pin = pin;
        this._gpioPath = "/sys/class/gpio/gpio" + this._pin + "/value";
    }
    Object.defineProperty(Switchable.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Switchable.prototype, "state", {
        get: function () {
            var result = false;
            try {
                var val = fs_1.readFileSync(this._gpioPath, "utf8");
                result = (val.charCodeAt(0) === 49);
            }
            catch (e) {
                debug("failed to read device state " + e.message);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Switchable.prototype.init = function () {
    };
    Switchable.prototype.toggle = function () {
        var currentState = this.state;
        this.switch(!currentState);
    };
    Switchable.prototype.switch = function (state) {
        var val = state ? "1" : "0";
        try {
            fs_1.writeFileSync(this._gpioPath, val, "utf8");
        }
        catch (e) {
            debug("failed to write device state " + e.message);
        }
    };
    Switchable = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [String, Number])
    ], Switchable);
    return Switchable;
}());
exports.Switchable = Switchable;
