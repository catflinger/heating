"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var types_1 = require("../../src/controller/types");
var program_1 = require("../../src/controller/program");
var mock_controller_settings_1 = require("../common/mock-controller-settings");
var program_manager_1 = require("../../src/controller/program-manager");
var mock_clock_1 = require("../common/mock-clock");
var program_store_1 = require("../../src/controller/program-store");
exports.container = new inversify_1.Container();
exports.container.bind(types_1.INJECTABLES.SlotsPerDay).toConstantValue(10);
exports.container.bind(types_1.INJECTABLES.ControllerSettings).to(mock_controller_settings_1.MockControllerSettings).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Clock).to(mock_clock_1.MockClock).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ProgramManager).to(program_manager_1.ProgramManager);
exports.container.bind(types_1.INJECTABLES.ProgramStore).to(program_store_1.ProgramStore).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Program).to(program_1.Program);
exports.container.bind(types_1.INJECTABLES.ProgramFactory)
    .toFactory(function (context) {
    return function () {
        return context.container.get(types_1.INJECTABLES.Program);
    };
});
