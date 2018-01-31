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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var inversify_1 = require("inversify");
var path = require("path");
var types_1 = require("./types");
var ProgramManager = (function () {
    function ProgramManager(settings, programFactory) {
        this.settings = settings;
        this.programFactory = programFactory;
        this._ext = ".json";
        this._activeProgram = undefined;
        var latestId = this.getLatestProgamId();
        if (latestId) {
            var prog = this.getProgram(latestId);
            if (prog) {
                this._activeProgram = prog;
                this.setLatestProgamId(this._activeProgram.id);
            }
        }
        if (!this._activeProgram) {
            this._activeProgram = this.programFactory();
            this._activeProgram.loadDefaults();
            this.saveProgram(this._activeProgram);
            this.setLatestProgamId(this._activeProgram.id);
        }
    }
    Object.defineProperty(ProgramManager.prototype, "activeProgram", {
        get: function () {
            return this._activeProgram;
        },
        enumerable: true,
        configurable: true
    });
    ProgramManager.prototype.setActiveProgram = function (id) {
        var program = this.getProgram(id);
        if (program) {
            this._activeProgram = program;
            this.setLatestProgamId(id);
        }
    };
    ProgramManager.prototype.listPrograms = function () {
        var _this = this;
        var results = [];
        var files = fs.readdirSync(path.join(this.settings.programStoreDir, "programs"));
        var ids = [];
        files.forEach(function (f) {
            if (f.endsWith(_this._ext)) {
                ids.push(f.substr(0, f.length - _this._ext.length));
            }
        });
        ids.forEach(function (id) {
            results.push(_this.getProgram(id));
        });
        return results;
    };
    ProgramManager.prototype.getProgram = function (id) {
        var result = null;
        try {
            var json = fs.readFileSync(this.makeProgramPath(id), "utf8");
            result = this.programFactory();
            result.loadFromJson(json);
        }
        catch (e) {
            result = null;
        }
        return result;
    };
    ProgramManager.prototype.createProgram = function (src) {
        if (src && src.id) {
            throw new Error("cannot create new  program specifying specific id value");
        }
        var program = this.programFactory();
        program.loadFrom(src);
        this.saveProgram(program);
        return program;
    };
    ProgramManager.prototype.saveProgram = function (program) {
        fs.writeFileSync(this.makeProgramPath(program.id), program.toJson());
    };
    ProgramManager.prototype.removeProgram = function (id) {
        if (this._activeProgram != null && this._activeProgram.id !== id) {
            var filepath = this.makeProgramPath(id);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        else {
        }
    };
    ProgramManager.prototype.makeProgramPath = function (id) {
        return path.join(this.settings.programStoreDir, "programs", id + this._ext);
    };
    ProgramManager.prototype.makeLatestIdPath = function () {
        return path.join(this.settings.programStoreDir, "latest-program.json");
    };
    ProgramManager.prototype.setLatestProgamId = function (id) {
        fs.writeFileSync(this.makeLatestIdPath(), JSON.stringify({ latest: id }));
    };
    ProgramManager.prototype.getLatestProgamId = function () {
        var result = null;
        if (fs.existsSync(this.makeLatestIdPath())) {
            var config = JSON.parse(fs.readFileSync(this.makeLatestIdPath(), "utf8"));
            result = config.latest;
        }
        return result;
    };
    ProgramManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.ControllerSettings)),
        __param(1, inversify_1.inject(types_1.INJECTABLES.ProgramFactory)),
        __metadata("design:paramtypes", [Object, Function])
    ], ProgramManager);
    return ProgramManager;
}());
exports.ProgramManager = ProgramManager;
