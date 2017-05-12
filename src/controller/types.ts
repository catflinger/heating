export const TYPES = {
    IController: Symbol("IController"),
    IControllerSettings: Symbol("IControllerSettings"),
    IEnvironment: Symbol("IEnvironment"),
    IEnvironmentSettings: Symbol("IEnvironmentSettings"),
    IProgram: Symbol("IProgram"),
    ISwitchable: Symbol("ISwitchable"),
};

export interface IController {
    getSummary(): any;
}

export interface IControllerSettings {
}

export interface IProgram {

}

export interface ISwitchable {
    name: string;
    state: boolean;
    toggle(): boolean;
    switch(state: boolean): void;
}

export enum Sensors {
    hwCylinder1,
    hwCyclinder2,
    hwCyclinder3,
}

export enum Devices {
    boiler,
    hwPump,
    chPump,
}

export interface IEnvironment {
    getTemperature(sensor: Sensors): number;
}

export interface IEnvironmentSettings {
    oneWireDirectory: string;
}
