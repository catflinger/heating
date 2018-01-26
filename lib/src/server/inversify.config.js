"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var controller_settings_1 = require("./controller-settings");
var environment_settings_1 = require("./environment-settings");
var types_1 = require("../controller/types");
var basic_control_strategy_1 = require("../controller/basic-control-strategy");
var clock_1 = require("../controller/clock");
var environment_1 = require("../controller/environment");
var override_1 = require("../controller/override");
var program_1 = require("../controller/program");
var program_manager_1 = require("../controller/program-manager");
var system_1 = require("../controller/system");
exports.container = new inversify_1.Container();
exports.container.bind(types_1.INJECTABLES.SlotsPerDay).toConstantValue(10);
exports.container.bind(types_1.INJECTABLES.ControlStrategy).to(basic_control_strategy_1.BasicControlStrategy).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ControllerSettings).to(controller_settings_1.ControllerSettings).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Environment).to(environment_1.Environment).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.EnvironmentSettings).to(environment_settings_1.EnvironmentSettings).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.ProgramManager).to(program_manager_1.ProgramManager).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Clock).to(clock_1.Clock).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.System).to(system_1.System).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Override).to(override_1.Override).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Program).to(program_1.Program);
exports.container.bind(types_1.INJECTABLES.ProgramFactory)
    .toFactory(function (context) {
    return function () {
        return context.container.get(types_1.INJECTABLES.Program);
    };
});
