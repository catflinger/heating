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
var moment = require("moment");
var types_1 = require("./types");
var Clock = (function () {
    function Clock() {
        this.now = new Date();
    }
    Object.defineProperty(Clock.prototype, "currentSlot", {
        get: function () {
            var minutesElapsed = this.now.getHours() * 60 + this.now.getMinutes();
            return Math.floor(minutesElapsed / this.minutesPerSlot());
        },
        enumerable: true,
        configurable: true
    });
    Clock.prototype.getDate = function () {
        return new Date(this.now);
    };
    Clock.prototype.tick = function () {
        this.now = new Date();
    };
    Clock.prototype.isToday = function (date) {
        return moment(this.now).isSame(date, "day");
    };
    Clock.prototype.isYesterday = function (date) {
        var yesterday = moment(this.now).subtract(1, "day");
        return yesterday.isSame(date, "day");
    };
    Clock.prototype.minutesPerSlot = function () {
        return (24 * 60) / this.slotsPerDay;
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.SlotsPerDay),
        __metadata("design:type", Number)
    ], Clock.prototype, "slotsPerDay", void 0);
    Clock = __decorate([
        inversify_1.injectable()
    ], Clock);
    return Clock;
}());
exports.Clock = Clock;
