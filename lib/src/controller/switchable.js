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
var types_1 = require("./types");
var Switchable = (function () {
    function Switchable(name, pin) {
        this._name = name;
        this._pin = pin;
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
            return this.gpio.read(this._pin);
        },
        enumerable: true,
        configurable: true
    });
    Switchable.prototype.init = function () {
        return this.gpio.use(this._pin);
    };
    Switchable.prototype.toggle = function () {
        var currentState = this.gpio.read(this._pin);
        this.gpio.write(this._pin, !currentState);
    };
    Switchable.prototype.switch = function (state) {
        this.gpio.write(this._pin, state);
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.DigitalOutput),
        __metadata("design:type", Object)
    ], Switchable.prototype, "gpio", void 0);
    Switchable = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [String, Number])
    ], Switchable);
    return Switchable;
}());
exports.Switchable = Switchable;
