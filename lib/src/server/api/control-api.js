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
var inversify_1 = require("inversify");
var validate_1 = require("../../common/validate");
var types_1 = require("../../controller/types");
var debug = Debug("app");
var ControlApi = (function () {
    function ControlApi() {
    }
    ControlApi.prototype.addRoutes = function (router) {
        var _this = this;
        router.post("/control/override/set", function (req, res, next) {
            debug("POST: boost set");
            var duration = validate_1.Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");
            if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                throw new Error("value out of range for override duration");
            }
            _this.controller.setOverride(duration);
            var result = { result: "OK" };
            res.json(result);
        });
        router.post("/control/override/clear", function (req, res, next) {
            debug("POST: override clear");
            _this.controller.clearOverride();
            var result = { result: "OK" };
            res.json(result);
        });
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Controller),
        __metadata("design:type", Object)
    ], ControlApi.prototype, "controller", void 0);
    ControlApi = __decorate([
        inversify_1.injectable()
    ], ControlApi);
    return ControlApi;
}());
exports.ControlApi = ControlApi;
