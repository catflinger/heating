"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var debug = Debug("app");
var ProgramApi = (function () {
    function ProgramApi() {
    }
    ProgramApi.addRoutes = function (router, programManager) {
        router.get("/program", function (req, res, next) {
            debug("GET: program");
            try {
                var programs_1 = [];
                programManager.listPrograms().forEach(function (p) {
                    programs_1.push(p.toStorable());
                });
                res.json({
                    programs: programs_1,
                });
            }
            catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });
        router.get("/program/:program_id", function (req, res, next) {
            debug("GET: program:program_id");
            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");
            var programId = req.params.program_id;
            try {
                var program = programManager.getProgram(programId);
                if (program) {
                    res.json({
                        program: program.toStorable(),
                    });
                }
                else {
                    res.status(404).send("program not found");
                }
            }
            catch (e) {
                res.status(500).send("could not process this request " + e);
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
