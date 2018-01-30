"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var types_1 = require("../../src/controller/types");
var MockControlStrategy = (function () {
    function MockControlStrategy() {
        this.water = false;
        this.heating = false;
    }
    MockControlStrategy.prototype.calculateControlState = function (currentState) {
        return new types_1.ControlStateSnapshot(this.heating, this.water);
    };
    MockControlStrategy = __decorate([
        inversify_1.injectable()
    ], MockControlStrategy);
    return MockControlStrategy;
}());
exports.MockControlStrategy = MockControlStrategy;
var MockSensor = (function () {
    function MockSensor() {
        this.reading = 45;
        this.id = "hw";
    }
    MockSensor.prototype.read = function () {
        throw new Error("Method not implemented.");
    };
    return MockSensor;
}());
var MockEnvironment = (function () {
    function MockEnvironment() {
        this.hwSensor = new MockSensor();
    }
    MockEnvironment.prototype.refresh = function () {
    };
    MockEnvironment.prototype.getSnapshot = function () {
        return new types_1.EnvironmentSnapshot([this.hwSensor]);
    };
    MockEnvironment.prototype.setHWTemperature = function (temp) {
        this.hwSensor.reading = temp;
    };
    MockEnvironment = __decorate([
        inversify_1.injectable()
    ], MockEnvironment);
    return MockEnvironment;
}());
exports.MockEnvironment = MockEnvironment;
var MockProgram = (function () {
    function MockProgram() {
        this.id = "abc";
        this.name = "mock program";
    }
    MockProgram.prototype.save = function () {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.getValue = function (slot) {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.getSnapshot = function () {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.setHWTemps = function (min, max) {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.toStorable = function () {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.toJson = function () {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.loadDefaults = function () {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.loadFrom = function () {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.loadFromJson = function (json) {
        throw new Error("Method not implemented.");
    };
    MockProgram.prototype.setRange = function (state, from, to) {
        throw new Error("Method not implemented.");
    };
    Object.defineProperty(MockProgram.prototype, "slotsPerDay", {
        get: function () {
            throw new Error("Method not implemented.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockProgram.prototype, "minHWTemp", {
        get: function () {
            return 40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockProgram.prototype, "maxHWTemp", {
        get: function () {
            return 50;
        },
        enumerable: true,
        configurable: true
    });
    MockProgram = __decorate([
        inversify_1.injectable()
    ], MockProgram);
    return MockProgram;
}());
exports.MockProgram = MockProgram;
var MockDevice = (function () {
    function MockDevice() {
        this._name = "un-named device";
        this._state = false;
    }
    MockDevice.prototype.init = function () {
    };
    Object.defineProperty(MockDevice.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (str) {
            this._name = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockDevice.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    MockDevice.prototype.toggle = function () {
        this._state = !this.state;
    };
    MockDevice.prototype.switch = function (state) {
        this._state = state;
    };
    MockDevice = __decorate([
        inversify_1.injectable()
    ], MockDevice);
    return MockDevice;
}());
exports.MockDevice = MockDevice;
