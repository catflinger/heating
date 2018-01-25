"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Debug = require("debug");
var inversify_1 = require("inversify");
var switchable_1 = require("../switchable");
var types_1 = require("../types");
var debug = Debug("app");
var Boiler = (function (_super) {
    __extends(Boiler, _super);
    function Boiler(settings) {
        var _this = _super.call(this, "boiler", settings.boilerPin) || this;
        _this.settings = settings;
        return _this;
    }
    Boiler = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.ControllerSettings)),
        __metadata("design:paramtypes", [Object])
    ], Boiler);
    return Boiler;
}(switchable_1.Switchable));
exports.Boiler = Boiler;
