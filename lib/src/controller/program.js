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
var Debug = require("debug");
var inversify_1 = require("inversify");
var uuid_1 = require("uuid");
var validate_1 = require("../common/validate");
var program_snapshot_1 = require("./snapshots/program-snapshot");
var types_1 = require("./types");
var debug = Debug("prog");
var Program = (function () {
    function Program(slotsPerDay) {
        this.slotsPerDay = slotsPerDay;
        this._slots = [];
    }
    Program.prototype.getValue = function (slot) {
        validate_1.Validate.isInteger(slot, "slot number not numeric");
        if (slot < 0 || slot >= this.slotsPerDay) {
            throw new Error("Method not implemented.");
        }
        return this._slots[slot];
    };
    Program.prototype.getSnapshot = function () {
        return new program_snapshot_1.ProgramSnapshot(this._minHwTemp, this._maxHwTemp, this._slots, this.slotsPerDay);
    };
    Object.defineProperty(Program.prototype, "minHWTemp", {
        get: function () {
            return this._minHwTemp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "maxHWTemp", {
        get: function () {
            return this._maxHwTemp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "slots", {
        get: function () {
            return this._slots;
        },
        enumerable: true,
        configurable: true
    });
    Program.prototype.setHWTemps = function (min, max) {
        if (min > 10 && max > 10 && min < 60 && max < 60 && max - min > 5) {
            this._minHwTemp = min;
            this._maxHwTemp = max;
        }
        else {
            throw new Error("HW temperature value out of range");
        }
    };
    Program.prototype.setRange = function (state, from, to) {
        this.validateSlotNumber(from, to);
        if (!state || from > to || state.length < to - from + 1) {
            throw new Error("invalid parameters for setRange");
        }
        for (var i = 0; i <= to - from; i++) {
            this._slots[from + i] = state[i];
        }
    };
    Program.prototype.loadDefaults = function () {
        this._maxHwTemp = 50;
        this._minHwTemp = 40;
        this._name = "default";
        this._id = uuid_1.v4();
        for (var i = 0; i < this.slotsPerDay; i++) {
            this._slots.push(false);
        }
    };
    Program.prototype.loadFromJson = function (json) {
        if (!json || typeof json !== "string") {
            throw new Error("Missing source string loading json.");
        }
        var data = JSON.parse(json);
        this.loadFrom(data);
    };
    Program.prototype.loadFrom = function (src) {
        if (typeof src !== "object") {
            throw new Error("Missing source string loading json.");
        }
        if (!src) {
            throw new Error("Missing source data loading program.");
        }
        if ((typeof src.hwmax !== "number") ||
            (typeof src.hwmin !== "number")) {
            throw new Error("hwmax or hwmin not numeric loading program. [" + typeof src.hwmax + "] [" + typeof src.hwmin + "]");
        }
        if (!Array.isArray(src.slots)) {
            throw new Error("slot array missing from source data loading program.");
        }
        if (src.slots.length !== this.slotsPerDay) {
            throw new Error("slot array wrong length in source data loading program.");
        }
        for (var _i = 0, _a = src.slots; _i < _a.length; _i++) {
            var slot = _a[_i];
            if (typeof slot !== "boolean") {
                throw new Error("slot array must contain booleans in source data loading program.");
            }
        }
        this.setHWTemps(src.hwmin, src.hwmax);
        this._id = src.id && typeof src.id === "string" ? src.id : uuid_1.v4();
        this._name = (src.name && typeof src.name === "string") ? src.name : "not named";
        for (var i = 0; i < src.slots.length; i++) {
            this._slots[i] = src.slots[i];
        }
    };
    Program.prototype.toStorable = function () {
        return {
            hwmax: this.maxHWTemp,
            hwmin: this.minHWTemp,
            id: this._id,
            name: this._name,
            slots: this._slots,
        };
    };
    Program.prototype.toJson = function () {
        return JSON.stringify(this.toStorable());
    };
    Program.prototype.validateSlotNumber = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (arg) {
            if (isNaN(arg) || arg < 0 || arg >= _this.slotsPerDay) {
                throw new Error("Slots per day out of range");
            }
        });
    };
    Program = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.SlotsPerDay)),
        __metadata("design:paramtypes", [Number])
    ], Program);
    return Program;
}());
exports.Program = Program;
