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
var utils_1 = require("../../common/utils");
var validate_1 = require("../../common/validate");
var types_1 = require("../../controller/types");
var debug = Debug("app");
var OverrideApi = (function () {
    function OverrideApi() {
    }
    OverrideApi.prototype.addRoutes = function (router) {
        var _this = this;
        router.get("/override/:id", function (req, res, next) {
            debug("GET/id: override");
            res.json(_this.controller.getSnapshot().override);
        });
        router.get("/override", function (req, res, next) {
            debug("GET: override");
            res.json({ overrides: [_this.controller.getSnapshot().override] });
        });
        router.post("/override/:id", function (req, res, next) {
            debug("POST: boost set");
            var duration = validate_1.Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");
            if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                res.status(400).send("value out of range for override duration");
            }
            else {
                _this.controller.setOverride(duration);
                var result = { result: "OK" };
                _this.utils.dumpTextFile("override-set.json", JSON.stringify(result));
                res.json(result);
            }
        });
        router.post("/override/*", function (req, res, next) {
            res.status(405).send("method not allowed");
        });
        router.put("/override/*", function (req, res, next) {
            res.status(405).send("method not allowed");
        });
        router.delete("/override/*", function (req, res, next) {
            res.status(405).send("method not allowed");
        });
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Controller),
        __metadata("design:type", Object)
    ], OverrideApi.prototype, "controller", void 0);
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Utils),
        __metadata("design:type", utils_1.Utils)
    ], OverrideApi.prototype, "utils", void 0);
    OverrideApi = __decorate([
        inversify_1.injectable()
    ], OverrideApi);
    return OverrideApi;
}());
exports.OverrideApi = OverrideApi;
