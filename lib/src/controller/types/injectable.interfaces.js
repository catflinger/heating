"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INJECTABLES = {
    App: Symbol("App"),
    Boiler: Symbol("Boiler"),
    CHPump: Symbol("CHPump"),
    Clock: Symbol("Clock"),
    ControlStrategy: Symbol("ControlStrategy"),
    Controller: Symbol("Controller"),
    ControllerSettings: Symbol("ControllerSettings"),
    DigitalOutput: Symbol("DigitalOutput"),
    Environment: Symbol("Environment"),
    EnvironmentSettings: Symbol("EnvironmentSettings"),
    HWPump: Symbol("HWPump"),
    OverrideApi: Symbol("OverrideApi"),
    OverrideManager: Symbol("OverrideManager"),
    Program: Symbol("Program"),
    ProgramApi: Symbol("programApi"),
    ProgramConfigApi: Symbol("ProgramConfigApi"),
    ProgramFactory: Symbol("ProgramFactory"),
    ProgramManager: Symbol("ProgramManager"),
    ProgramStore: Symbol("ProgramStore"),
    SlotsPerDay: Symbol("SlotsPerDay"),
    StatusApi: Symbol("statusApi"),
    System: Symbol("System"),
    Utils: Symbol("Utils"),
};
var ProgramMode;
(function (ProgramMode) {
    ProgramMode[ProgramMode["Weekday"] = 0] = "Weekday";
    ProgramMode[ProgramMode["Saturday"] = 1] = "Saturday";
    ProgramMode[ProgramMode["Sunday"] = 2] = "Sunday";
})(ProgramMode = exports.ProgramMode || (exports.ProgramMode = {}));
var ProgramConfig = (function () {
    function ProgramConfig() {
    }
    return ProgramConfig;
}());
exports.ProgramConfig = ProgramConfig;
