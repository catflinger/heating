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
var OverrideManager = (function () {
    function OverrideManager() {
        this.overrides = [];
    }
    OverrideManager.prototype.refresh = function () {
        if (this.overrides.length === 0) {
            return;
        }
        var override = this.overrides[0];
        if (this.clock.isYesterday(override.date)) {
            this.overrides = [];
            var overflow = override.start + override.duration - this.slotsPerDay;
            if (overflow > 0) {
                this.overrides.push(new types_1.OverrideSnapshot(0, overflow, true, this.clock.getDate()));
            }
        }
        else if (this.clock.isToday(override.date)) {
            if (override.start + override.duration < this.clock.currentSlot) {
                this.overrides = [];
            }
        }
        else {
            this.overrides = [];
        }
    };
    OverrideManager.prototype.getSnapshot = function () {
        if (this.overrides.length > 0) {
            return this.overrides[0].clone();
        }
        else {
            return null;
        }
    };
    OverrideManager.prototype.setOverride = function (duration) {
        this.overrides = [];
        this.overrides.push(new types_1.OverrideSnapshot(this.clock.currentSlot, duration, true, this.clock.getDate()));
    };
    OverrideManager.prototype.clearOverride = function () {
        this.overrides = [];
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.SlotsPerDay),
        __metadata("design:type", Number)
    ], OverrideManager.prototype, "slotsPerDay", void 0);
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Clock),
        __metadata("design:type", Object)
    ], OverrideManager.prototype, "clock", void 0);
    OverrideManager = __decorate([
        inversify_1.injectable()
    ], OverrideManager);
    return OverrideManager;
}());
exports.OverrideManager = OverrideManager;
