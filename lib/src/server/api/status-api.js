"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var debug = Debug("app");
var StatusApi = (function () {
    function StatusApi() {
    }
    StatusApi.addRoutes = function (router, controller) {
        router.get("/status", function (req, res, next) {
            debug("GET: system status");
            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");
            try {
                var snapshot = controller.getSnapshot();
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
                res.json(result);
            }
            catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });
    };
    return StatusApi;
}());
exports.StatusApi = StatusApi;
