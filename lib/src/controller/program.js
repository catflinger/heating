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
var validate_1 = require("../common/validate");
var program_snapshot_1 = require("./snapshots/program-snapshot");
var types_1 = require("./types");
var Program = (function () {
    function Program(slotsPerDay) {
        this.slotsPerDay = slotsPerDay;
        this._slots = [];
        this._maxHwTemp = 0;
        this._minHwTemp = 0;
        for (var i = 0; i < this.slotsPerDay; i++) {
            this._slots.push(false);
        }
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
    Program.prototype.loadFrom = function (src) {
        var valid = true;
        if (!src ||
            (typeof src.hwmax !== "number") ||
            (typeof src.hwmin !== "number") ||
            !Array.isArray(src.slots) ||
            src.slots.length !== this.slotsPerDay) {
            valid = false;
        }
        else {
            for (var _i = 0, _a = src.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                if (typeof slot !== "boolean") {
                    valid = false;
                    break;
                }
            }
        }
        if (valid) {
            this.setHWTemps(src.hwmin, src.hwmax);
            for (var i = 0; i < src.slots.length; i++) {
                this._slots[i] = src.slots[i];
            }
        }
        else {
            throw new Error("Invalid or missing values in json.");
        }
    };
    Program.prototype.toStorable = function () {
        return {
            _id: this.id,
            maxHwTemp: this.maxHWTemp,
            minHwTemp: this.minHWTemp,
            name: this.name,
            slots: this._slots,
        };
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
