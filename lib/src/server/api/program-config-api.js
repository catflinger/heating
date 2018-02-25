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
var api_response_1 = require("./api-response");
var api_response_item_1 = require("./api-response-item");
var debug = Debug("app");
var ProgramConfigApi = (function () {
    function ProgramConfigApi() {
    }
    ProgramConfigApi.prototype.addRoutes = function (router) {
        var _this = this;
        router.get("/program-config", function (req, res, next) {
            debug("GET: program-config");
            try {
                var result = new api_response_1.ApiResponse();
                var item = new api_response_item_1.ApiResponseItem();
                item.name = "control";
                item.value = {
                    config: _this.controller.programManager.getConfig(),
                };
                result.items.push(item);
                return res.json(result);
            }
            catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
        router.put("/program-config", function (req, res, next) {
            debug("PUT: program-config");
            var config = new types_1.ProgramConfig();
            try {
                config.saturdayProgramId = req.body.saturdayProgramId;
                config.sundayProgramId = req.body.sundayProgramId;
                config.weekdayProgramId = req.body.weekdayProgramId;
                if (!_this.controller.programManager.configIsValid(config)) {
                    return res.status(401).send("invalid request");
                }
            }
            catch (e) {
                return res.status(401).send("invalid request " + e);
            }
            try {
                _this.controller.programManager.setConfig(config);
                var result = { result: "OK" };
                _this.utils.dumpTextFile("override-set.json", JSON.stringify(result));
                return res.json(result);
            }
            catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    };
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Controller),
        __metadata("design:type", Object)
    ], ProgramConfigApi.prototype, "controller", void 0);
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.Utils),
        __metadata("design:type", utils_1.Utils)
    ], ProgramConfigApi.prototype, "utils", void 0);
    ProgramConfigApi = __decorate([
        inversify_1.injectable()
    ], ProgramConfigApi);
    return ProgramConfigApi;
}());
exports.ProgramConfigApi = ProgramConfigApi;
