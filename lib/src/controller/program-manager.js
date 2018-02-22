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
var inversify_1 = require("inversify");
var types_1 = require("./types");
var ProgramManager = (function () {
    function ProgramManager(settings, programFactory, store, clock) {
        this.settings = settings;
        this.programFactory = programFactory;
        this.store = store;
        this.clock = clock;
        this._programs = [];
    }
    ProgramManager.prototype.init = function () {
        try {
            this.store.init();
            this._config = this.store.getConfig();
            this._programs = this.store.getPrograms();
        }
        catch (_a) {
            var program = this.programFactory();
            var config = new types_1.ProgramConfig();
            config.activeProgramIds[types_1.ProgramMode.Saturday] = program.id;
            config.activeProgramIds[types_1.ProgramMode.Sunday] = program.id;
            config.activeProgramIds[types_1.ProgramMode.Weekday] = program.id;
            this.store.reset();
            this._programs.push(program);
            this._config = config;
            this.save();
        }
    };
    Object.defineProperty(ProgramManager.prototype, "weekdayProgram", {
        get: function () {
            return this._programs[types_1.ProgramMode.Weekday];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgramManager.prototype, "saturdayProgram", {
        get: function () {
            return this._programs[types_1.ProgramMode.Saturday];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgramManager.prototype, "sundayProgram", {
        get: function () {
            return this._programs[types_1.ProgramMode.Sunday];
        },
        enumerable: true,
        configurable: true
    });
    ProgramManager.prototype.listPrograms = function () {
        return this._programs;
    };
    Object.defineProperty(ProgramManager.prototype, "activeProgram", {
        get: function () {
            var id;
            switch (this.clock.dayOfWeek) {
                case 6:
                    id = this._config.activeProgramIds[types_1.ProgramMode.Saturday];
                    break;
                case 7:
                    id = this._config.activeProgramIds[types_1.ProgramMode.Sunday];
                    break;
                default:
                    id = this._config.activeProgramIds[types_1.ProgramMode.Weekday];
                    break;
            }
            return this.getProgram(id);
        },
        enumerable: true,
        configurable: true
    });
    ProgramManager.prototype.setActiveProgram = function (mode, id) {
        if (!this.getProgram(id)) {
            throw new Error("program not found");
        }
        this._config.activeProgramIds[mode] = id;
        this.save();
    };
    ProgramManager.prototype.getProgram = function (id) {
        return this._programs.find(function (p) { return p.id === id; });
    };
    ProgramManager.prototype.createProgram = function (src) {
        if (src && src.id) {
            throw new Error("cannot create new  program specifying specific id value");
        }
        var program = this.programFactory();
        program.loadFrom(src);
        this._programs.push(program);
        this.save();
        return program;
    };
    ProgramManager.prototype.updateProgram = function (data) {
        var program = this.programFactory();
        program.loadFrom(data);
        var idx = this._programs.findIndex(function (p) { return p.id === program.id; });
        if (idx >= 0) {
            this._programs = this._programs.splice(idx, 1);
            this._programs.push(program);
            this.save();
        }
        else {
            throw new Error("Cannot find program to update");
        }
    };
    ProgramManager.prototype.removeProgram = function (id) {
        this._config.activeProgramIds.forEach(function (progId) {
            if (progId === id) {
                throw new Error("Cannot remove program as it is still in use");
            }
        });
        var idx = this._programs.findIndex(function (p) { return p.id === id; });
        if (idx >= 0) {
            this._programs = this._programs.splice(idx, 1);
        }
        this.save();
    };
    ProgramManager.prototype.save = function () {
        this.store.saveConfig(this._config);
        this.store.savePrograms(this._programs);
    };
    ProgramManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.ControllerSettings)),
        __param(1, inversify_1.inject(types_1.INJECTABLES.ProgramFactory)),
        __param(2, inversify_1.inject(types_1.INJECTABLES.ProgramStore)),
        __param(3, inversify_1.inject(types_1.INJECTABLES.Clock)),
        __metadata("design:paramtypes", [Object, Function, Object, Object])
    ], ProgramManager);
    return ProgramManager;
}());
exports.ProgramManager = ProgramManager;
