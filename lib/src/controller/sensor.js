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
var Sensor = (function () {
    function Sensor(settings, _id, deviceId) {
        this.settings = settings;
        this._id = _id;
        this.deviceId = deviceId;
        this.lastReading = NaN;
    }
    Sensor.prototype.read = function () {
        var result;
        try {
            debug("Reading sensor " + this.deviceId);
            var path = this.settings.oneWireDirectory + "/" + this.deviceId + "/temperature";
            debug("Reading sensor path " + path);
            var data = fs_1.readFileSync(path, "utf8");
            result = Number.parseFloat(data);
        }
        catch (exp) {
            debug("Reading sensor failed " + this.deviceId + " " + exp);
            result = NaN;
        }
        this.lastReading = result;
    };
    Object.defineProperty(Sensor.prototype, "reading", {
        get: function () {
            return this.lastReading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sensor.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Sensor = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Object, String, String])
    ], Sensor);
    return Sensor;
}());
exports.Sensor = Sensor;
