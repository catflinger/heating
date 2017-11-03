"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var validate_1 = require("../../common/validate");
var debug = Debug("app");
var ControlApi = (function () {
    function ControlApi() {
    }
    ControlApi.addRoutes = function (router, controller) {
        router.post("/control/boost", function (req, res, next) {
            debug("POST: boost set");
            var duration = validate_1.Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");
            if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                throw new Error("value out of range for override duration");
            }
            controller.setOverride(duration);
            var result = { result: "OK" };
            res.json(result);
        });
        router.post("/control/override/clear", function (req, res, next) {
            debug("POST: override clear");
            controller.clearOverride();
            var result = { result: "OK" };
            res.json(result);
        });
    };
    return ControlApi;
}());
exports.ControlApi = ControlApi;
