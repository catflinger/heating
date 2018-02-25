"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var types_1 = require("../../src/controller/types");
var mocks_1 = require("./mocks");
var mock_clock_1 = require("../common/mock-clock");
var program_1 = require("../../src/controller/program");
var override_manager_1 = require("../../src/controller/override-manager");
var system_1 = require("../../src/controller/system");
var mock_controller_settings_1 = require("./mock-controller-settings");
var program_manager_1 = require("../../src/controller/program-manager");
var controller_1 = require("../../src/controller/controller");
var program_store_1 = require("../../src/controller/program-store");
exports.container = new inversify_1.Container();
exports.container.bind(types_1.INJECTABLES.SlotsPerDay).toConstantValue(10);
exports.container.bind(types_1.INJECTABLES.OverrideManager).to(override_manager_1.OverrideManager).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ControlStrategy).to(mocks_1.MockControlStrategy).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ControllerSettings).to(mock_controller_settings_1.MockControllerSettings).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Environment).to(mocks_1.MockEnvironment).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ProgramManager).to(program_manager_1.ProgramManager).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Boiler).to(mocks_1.MockDevice).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.HWPump).to(mocks_1.MockDevice).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.CHPump).to(mocks_1.MockDevice).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Clock).to(mock_clock_1.MockClock).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.System).to(system_1.System);
exports.container.bind(types_1.INJECTABLES.Controller).to(controller_1.Controller).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ProgramStore).to(program_store_1.ProgramStore);
exports.container.bind(types_1.INJECTABLES.Program).to(program_1.Program);
exports.container.bind(types_1.INJECTABLES.ProgramFactory)
    .toFactory(function (context) {
    return function () {
        return context.container.get(types_1.INJECTABLES.Program);
    };
});
