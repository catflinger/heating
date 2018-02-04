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
var Fs = require("fs");
var inversify_1 = require("inversify");
var Path = require("path");
var types_1 = require("../controller/types");
var dump = Debug("dump");
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.dumpTextFile = function (name, data) {
        if (dump.enabled) {
            Fs.writeFile(Path.join(this.settings.debugDir, name), JSON.stringify(data));
        }
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.ControllerSettings),
        __metadata("design:type", Object)
    ], Utils.prototype, "settings", void 0);
    Utils = __decorate([
        inversify_1.injectable()
    ], Utils);
    return Utils;
}());
exports.Utils = Utils;
