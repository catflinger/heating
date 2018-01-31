"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var types_1 = require("../../src/controller/types");
var mock_clock_1 = require("../common/mock-clock");
exports.container = new inversify_1.Container();
exports.container.bind(types_1.INJECTABLES.SlotsPerDay).toConstantValue(10);
exports.container.bind(types_1.INJECTABLES.Clock).to(mock_clock_1.MockClock).inSingletonScope();
