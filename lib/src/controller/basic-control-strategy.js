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
var BasicControlStrategy = (function () {
    function BasicControlStrategy() {
    }
    BasicControlStrategy.prototype.calculateControlState = function (currentState) {
        var heating = false;
        var water = false;
        var currentSlot = this.clock.currentSlot;
        var hwTemperature = currentState.environment.sensors.find(function (s) { return s.id === "hw"; }).reading;
        if (hwTemperature < currentState.program.minHwTemp ||
            (hwTemperature < currentState.program.maxHwTemp &&
                currentState.control.hotWater)) {
            water = true;
        }
        heating = currentState.program.slots[currentSlot];
        var ov = currentState.override;
        if (ov && currentSlot >= ov.start && currentSlot < ov.start + ov.duration) {
            heating = ov.state;
        }
        return new types_1.ControlStateSnapshot(heating, water);
    };
    return BasicControlStrategy;
}());
__decorate([
    inversify_1.inject(types_1.INJECTABLES.Clock),
    __metadata("design:type", Object)
], BasicControlStrategy.prototype, "clock", void 0);
BasicControlStrategy = __decorate([
    inversify_1.injectable()
], BasicControlStrategy);
exports.BasicControlStrategy = BasicControlStrategy;
