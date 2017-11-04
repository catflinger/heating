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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var sensor_1 = require("./sensor");
var types_1 = require("./types");
var Environment = (function () {
    function Environment(settings) {
        var _this = this;
        this.settings = settings;
        this.sensors = [];
        this.settings.sensors.forEach(function (sensor) {
            _this.sensors.push(new sensor_1.Sensor(sensor.id, sensor.deviceId));
        });
    }
    Environment.prototype.getSnapshot = function () {
        return new types_1.EnvironmentSnapshot(this.sensors);
    };
    Environment.prototype.refresh = function () {
        this.sensors.forEach(function (s) { return s.read(); });
    };
    return Environment;
}());
Environment = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.INJECTABLES.EnvironmentSettings)),
    __metadata("design:paramtypes", [Object])
], Environment);
exports.Environment = Environment;
