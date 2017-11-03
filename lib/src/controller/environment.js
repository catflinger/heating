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
var fs_1 = require("fs");
var inversify_1 = require("inversify");
var types_1 = require("./types");
var Environment = (function () {
    function Environment() {
    }
    Environment.prototype.getSnapshot = function () {
        return new types_1.EnvironmentSnapshot(this.readSensor("DS18B20-1"));
    };
    Environment.prototype.readSensor = function (deviceId) {
        var result;
        try {
            var path = this.settings.oneWireDirectory + "/" + deviceId;
            var data = fs_1.readFileSync(path, "utf8");
            result = Number.parseInt(data);
        }
        catch (exp) {
            result = NaN;
        }
        return result;
    };
    return Environment;
}());
__decorate([
    inversify_1.inject(types_1.INJECTABLES.EnvironmentSettings),
    __metadata("design:type", Object)
], Environment.prototype, "settings", void 0);
Environment = __decorate([
    inversify_1.injectable()
], Environment);
exports.Environment = Environment;
