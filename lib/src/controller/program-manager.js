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
var db = require("diskdb");
var ProgramManager = (function () {
    function ProgramManager(settings, programFactory) {
        this.settings = settings;
        this.programFactory = programFactory;
        this._activeProgram = undefined;
    }
    Object.defineProperty(ProgramManager.prototype, "activeProgram", {
        get: function () {
            return this._activeProgram;
        },
        enumerable: true,
        configurable: true
    });
    ProgramManager.prototype.list = function () {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.find();
    };
    ProgramManager.prototype.get = function (id) {
        var result = null;
        db.connect(this.settings.programStore, ["programs"]);
        var storable = db.programs.findOne({ _id: id });
        if (storable) {
            result = this.programFactory();
            result.loadFrom(storable);
        }
        return result;
    };
    ProgramManager.prototype.add = function (program) {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.save(program.toStorable());
    };
    ProgramManager.prototype.update = function (program) {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.update(program.toStorable());
    };
    ProgramManager.prototype.remove = function (id) {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.remove({ _id: id });
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
