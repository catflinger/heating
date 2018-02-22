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
var ProgramStore = (function () {
    function ProgramStore(settings, programFactory) {
        this.settings = settings;
        this.programFactory = programFactory;
        this._ext = ".json";
    }
    ProgramStore.prototype.init = function () {
        if (!fs.existsSync(this.configPath)) {
            throw new Error("Cannot find program store configuration file at " + this.configPath);
        }
    };
    ProgramStore.prototype.reset = function () {
        var _this = this;
        if (this.configPath && fs.existsSync(this.configPath)) {
            fs.unlinkSync(this.configPath);
        }
        var files = fs.readdirSync(path.join(this.settings.programStoreDir, "programs"));
        files.forEach(function (f) {
            if (f.endsWith(_this._ext)) {
                fs.unlinkSync(path.join(_this.settings.programStoreDir, "programs", f));
            }
        });
    };
    ProgramStore.prototype.getConfig = function () {
        var data = JSON.parse(fs.readFileSync(this.configPath, "utf8"));
        if (!data.activeProgramIds.saturdayId ||
            !data.activeProgramIds.sundayId ||
            !data.activeProgramIds.weekdayId) {
            throw new Error("Invalid program config " + JSON.stringify(data));
        }
        var result = new types_1.ProgramConfig();
        result.activeProgramIds[types_1.ProgramMode.Saturday] = data.activeProgramIds.saturdayId;
        result.activeProgramIds[types_1.ProgramMode.Sunday] = data.activeProgramIds.sundayId;
        result.activeProgramIds[types_1.ProgramMode.Weekday] = data.activeProgramIds.weekdayId;
        return result;
    };
    ProgramStore.prototype.getPrograms = function () {
        var _this = this;
        var result = [];
        var files = fs.readdirSync(path.join(this.settings.programStoreDir, "programs"));
        files.forEach(function (f) {
            if (f.endsWith(_this._ext)) {
                var id = f.substr(0, f.length - _this._ext.length);
                var program = _this.programFactory();
                program.loadFromJson(fs.readFileSync(_this.makeProgramPath(id), "utf-8"));
                result.push(program);
            }
        });
        return result;
    };
    ProgramStore.prototype.saveConfig = function (config) {
        var data = {
            activeProgramIds: {
                saturdayId: config.activeProgramIds[types_1.ProgramMode.Saturday],
                sundayId: config.activeProgramIds[types_1.ProgramMode.Sunday],
                weekdayId: config.activeProgramIds[types_1.ProgramMode.Weekday],
            },
        };
        fs.writeFileSync(this.configPath, JSON.stringify(data));
    };
    ProgramStore.prototype.savePrograms = function (programs) {
        var _this = this;
        fs.readdirSync(path.join(this.settings.programStoreDir, "programs"))
            .forEach(function (f) {
            if (f.endsWith(_this._ext)) {
                fs.unlink(path.join(_this.settings.programStoreDir, f));
            }
        });
        programs.forEach(function (p) {
            fs.writeFileSync(_this.makeProgramPath(p.id), p.toJson());
        });
    };
    ProgramStore.prototype.makeProgramPath = function (id) {
        return path.join(this.settings.programStoreDir, "programs", id + this._ext);
    };
    Object.defineProperty(ProgramStore.prototype, "configPath", {
        get: function () {
            return path.join(this.settings.programStoreDir, "programs.json");
        },
        enumerable: true,
        configurable: true
    });
    ProgramStore = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.ControllerSettings)),
        __param(1, inversify_1.inject(types_1.INJECTABLES.ProgramFactory)),
        __metadata("design:paramtypes", [Object, Function])
    ], ProgramStore);
    return ProgramStore;
}());
exports.ProgramStore = ProgramStore;
