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
var Override = (function () {
    function Override() {
        this.override = null;
    }
    Override.prototype.refresh = function () {
        if (!this.override) {
            return;
        }
        else if (this.clock.isYesterday(this.override.date)) {
            var overflow = this.override.start + this.override.duration - this.setttings.slotsPerDay;
            if (overflow > 0) {
                this.override = new types_1.OverrideSnapshot(0, overflow, true, this.clock.getDate());
            }
            else {
                this.override = null;
            }
        }
        else if (this.clock.isToday(this.override.date)) {
            if (this.override.start + this.override.duration < this.clock.currentSlot) {
                this.override = null;
            }
        }
        else {
            this.override = null;
        }
    };
    Override.prototype.getSnapshot = function () {
        if (this.override) {
            return this.override.clone();
        }
        else {
            return null;
        }
    };
    Override.prototype.setOverride = function (duration) {
        if (this.override) {
            this.override = new types_1.OverrideSnapshot(this.override.start, this.override.duration + duration, true, this.override.date);
        }
        else {
            this.override = new types_1.OverrideSnapshot(this.clock.currentSlot, duration, true, this.clock.getDate());
        }
    };
    Override.prototype.clearOverride = function () {
        this.override = null;
    };
    return Override;
}());
__decorate([
    inversify_1.inject(types_1.INJECTABLES.Clock),
    __metadata("design:type", Object)
], Override.prototype, "clock", void 0);
__decorate([
    inversify_1.inject(types_1.INJECTABLES.ControllerSettings),
    __metadata("design:type", Object)
], Override.prototype, "setttings", void 0);
Override = __decorate([
    inversify_1.injectable()
], Override);
exports.Override = Override;
