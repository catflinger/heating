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
                var result = {
                    control: {
                        heating: snapshot.control.heating,
                        water: snapshot.control.hotWater,
                    },
                    device: {
                        boiler: snapshot.device.boiler,
                        chPump: snapshot.device.chPump,
                        hwPump: snapshot.device.hwPump,
                    },
                    env: {
                        sensors: snapshot.environment.sensors,
                    },
                    override: snapshot.override ? {
                        date: snapshot.override.date,
                        duration: snapshot.override.duration,
                        start: snapshot.override.start,
                        state: snapshot.override.state,
                    } : null,
                    program: {
                        hwmax: snapshot.program.maxHwTemp,
                        hwmin: snapshot.program.minHwTemp,
                        slots: snapshot.program.slots,
                        slotsPerDay: snapshot.program.slotsPerDay,
                    },
                };
                _this.utils.dumpTextFile("status.json", result);
                res.json(result);
            }
            catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });
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
