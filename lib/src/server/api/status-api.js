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
var types_1 = require("../../controller/types");
var debug = Debug("app");
var StatusApi = (function () {
    function StatusApi() {
    }
    StatusApi.prototype.addRoutes = function (router) {
        var _this = this;
        router.get("/status", function (req, res, next) {
            debug("GET: system status");
            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");
            try {
                var snapshot = _this.controller.getSnapshot();
                var result = { items: [] };
                result.items.push(_this.controlResponse(snapshot));
                result.items.push(_this.deviceResponse(snapshot));
                result.items.push(_this.envResponse(snapshot));
                result.items.push(_this.overrideResponse(snapshot));
                result.items.push(_this.programResponse(snapshot));
                _this.utils.dumpTextFile("status.json", result);
                return res.json(result);
            }
            catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
        router.get("/status/control", function (req, res, next) {
            _this.sendGetResponse(_this.controlResponse, req, res, next);
        });
        router.get("/status/env", function (req, res, next) {
            _this.sendGetResponse(_this.envResponse, req, res, next);
        });
        router.get("/status/device", function (req, res, next) {
            _this.sendGetResponse(_this.deviceResponse, req, res, next);
        });
        router.get("/status/override", function (req, res, next) {
            _this.sendGetResponse(_this.overrideResponse, req, res, next);
        });
        router.get("/status/program", function (req, res, next) {
            _this.sendGetResponse(_this.programResponse, req, res, next);
        });
    };
    StatusApi.prototype.sendGetResponse = function (write, req, res, next) {
        debug("GET: system status");
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        try {
            var snapshot = this.controller.getSnapshot();
            var result = write(snapshot);
            this.utils.dumpTextFile("status.json", result);
            return res.json(result);
        }
        catch (e) {
            return res.status(500).send("could not process this request " + e);
        }
    };
    StatusApi.prototype.controlResponse = function (snapshot) {
        return {
            id: "control",
            snapshot: {
                heating: snapshot.control.heating,
                water: snapshot.control.hotWater,
            },
        };
    };
    StatusApi.prototype.deviceResponse = function (snapshot) {
        return {
            id: "device",
            snapshot: {
                boiler: snapshot.device.boiler,
                chPump: snapshot.device.chPump,
                hwPump: snapshot.device.hwPump,
            },
        };
    };
    StatusApi.prototype.envResponse = function (snapshot) {
        return {
            id: "env",
            snapshot: {
                sensors: snapshot.environment.sensors,
            },
        };
    };
    StatusApi.prototype.overrideResponse = function (snapshot) {
        return {
            id: "override",
            snapshot: snapshot.override ? {
                date: snapshot.override.date,
                duration: snapshot.override.duration,
                start: snapshot.override.start,
                state: snapshot.override.state,
            } : null,
        };
    };
    StatusApi.prototype.programResponse = function (snapshot) {
        return {
            id: "program",
            snapshot: {
                hwmax: snapshot.program.maxHwTemp,
                hwmin: snapshot.program.minHwTemp,
                slots: snapshot.program.slots,
                slotsPerDay: snapshot.program.slotsPerDay,
            },
        };
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Controller),
        __metadata("design:type", Object)
    ], StatusApi.prototype, "controller", void 0);
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Utils),
        __metadata("design:type", utils_1.Utils)
    ], StatusApi.prototype, "utils", void 0);
    StatusApi = __decorate([
        inversify_1.injectable()
    ], StatusApi);
    return StatusApi;
}());
exports.StatusApi = StatusApi;
