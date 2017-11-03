"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var debug = Debug("app");
var ProgramApi = (function () {
    function ProgramApi() {
    }
    ProgramApi.addRoutes = function (router, controller) {
        router.get("/program", function (req, res, next) {
            debug("GET: program");
            res.status(500).send("Program listing API not implemented yet. ");
        });
        router.get("/program/:program_id", function (req, res, next) {
            debug("GET: program:program_id");
            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");
            var programId = req.params.program_id;
            if (programId === "0") {
                try {
                    var snapshot = controller.getSnapshot();
                    var result = {
                        hwmax: snapshot.program.maxHwTemp,
                        hwmin: snapshot.program.minHwTemp,
                        id: 0,
                        name: "curernt program",
                        slots: snapshot.program.slots,
                        slotsPerDay: snapshot.program.slotsPerDay,
                    };
                    res.json(result);
                }
                catch (e) {
                    res.status(500).send("could not process this request " + e);
                }
            }
            else {
                res.status(404).send("Program not found.");
            }
        });
        router.post("/program", function (req, res, next) {
            debug("POST: program");
            res.status(500).send("Not implemented yet. ");
        });
        router.put("/program/:program_id", function (req, res, next) {
            debug("PUT: program");
            res.status(500).send("Not implemented yet. ");
        });
        router.post("/program/:program_id", function (req, res, next) {
            debug("POST: program");
            res.status(500).send("Not implemented yet. ");
        });
        router.delete("/program/:program_id", function (req, res, next) {
            debug("DELETE: program");
            res.status(500).send("Not implemented yet. ");
        });
    };
    return ProgramApi;
}());
exports.ProgramApi = ProgramApi;
