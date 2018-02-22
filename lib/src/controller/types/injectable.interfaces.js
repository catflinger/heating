"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INJECTABLES = {
    Boiler: Symbol("Boiler"),
    CHPump: Symbol("CHPump"),
    Clock: Symbol("Clock"),
    ControlApi: Symbol("controlApi"),
    ControlStrategy: Symbol("ControlStrategy"),
    Controller: Symbol("Controller"),
    ControllerSettings: Symbol("ControllerSettings"),
    DigitalOutput: Symbol("DigitalOutput"),
    Environment: Symbol("Environment"),
    EnvironmentSettings: Symbol("EnvironmentSettings"),
    HWPump: Symbol("HWPump"),
    Override: Symbol("Override"),
    Program: Symbol("Program"),
    ProgramApi: Symbol("programApi"),
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
        this.activeProgramIds = [];
    }
    return ProgramConfig;
}());
exports.ProgramConfig = ProgramConfig;
