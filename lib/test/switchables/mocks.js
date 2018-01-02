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
var MockDigitalOutput = (function () {
    function MockDigitalOutput() {
        this.pins = [];
        this.pins.push(undefined);
        this.pins.push(undefined);
        this.pins.push(undefined);
    }
    MockDigitalOutput.prototype.use = function (pin) {
        this.pins[this.getPinIndex(pin)] = false;
    };
    MockDigitalOutput.prototype.read = function (pin) {
        var val = this.pins[this.getPinIndex(pin)];
        if (typeof val === "undefined") {
            throw new Error("Attempt to use uninitialised pin");
        }
        return val;
    };
    MockDigitalOutput.prototype.write = function (pin, state) {
        var val = this.pins[this.getPinIndex(pin)];
        if (typeof val === "undefined") {
            throw new Error("Attempt to use uninitialised pin");
        }
        this.pins[this.getPinIndex(pin)] = state;
    };
    MockDigitalOutput.prototype.getPinIndex = function (pin) {
        switch (pin) {
            case 21:
                return 0;
            case 22:
                return 1;
            case 23:
                return 2;
            default:
                throw new Error("MockDigitalOutput:read - invalid pin number");
        }
    };
    MockDigitalOutput = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], MockDigitalOutput);
    return MockDigitalOutput;
}());
exports.MockDigitalOutput = MockDigitalOutput;
