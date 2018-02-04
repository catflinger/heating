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
var types_1 = require("../../controller/types");
var debug = Debug("app");
var dump = Debug("dump");
var ProgramApi = (function () {
    function ProgramApi() {
    }
    ProgramApi.prototype.addRoutes = function (router) {
        var _this = this;
        router.get("/program", function (req, res, next) {
            debug("GET: program");
            try {
                var programs_1 = [];
                _this.programManager.listPrograms().forEach(function (p) {
                    programs_1.push(p.toStorable());
                });
                var result = { programs: programs_1 };
                if (dump.enabled) {
                }
                res.json(result);
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
                var program = _this.programManager.getProgram(programId);
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
    __decorate([
        inversify_1.inject(types_1.INJECTABLES.ProgramManager),
        __metadata("design:type", Object)
    ], ProgramApi.prototype, "programManager", void 0);
    ProgramApi = __decorate([
        inversify_1.injectable()
    ], ProgramApi);
    return ProgramApi;
}());
exports.ProgramApi = ProgramApi;
