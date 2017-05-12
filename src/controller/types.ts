/**
 * Symbolic names for types to be used in IoC injection
 */
export const TYPES = {
    IController: Symbol("IController"),
    IControllerSettings: Symbol("IControllerSettings"),
    IEnvironment: Symbol("IEnvironment"),
    IEnvironmentSettings: Symbol("IEnvironmentSettings"),
    IProgram: Symbol("IProgram"),
    ISwitchable: Symbol("ISwitchable"),
};

/**
 * Entry point and public interface for the heating control
 */
export interface IController {

    // re-reads environment and applies current program settings to devices
    refresh(): void;

    // provides raw data on state of the heating system and environment
    getSummary(): any;
}

/**
 * Configuration for the controller.  Intended for global settings (eg file paths)
 * rather than program settings (eg hw threshold)
 */
export interface IControllerSettings {
}

/**
 *  an importable program that defines heating and hw settings for times of the day
 */
export interface IProgram {

    // the minimum acceptable HW temperature
    hwThreshold: number;
}

/**
 * Represents an on/off switchable device such as a pump or boiler
 */
export interface ISwitchable {
    name: string;
    state: boolean;
    toggle(): boolean;
    switch(state: boolean): void;
}

/**
 * Enumeration for environmental sensors, typically BS18B20 temperature sensors
 */
export enum Sensors {
    hwCylinder1,
    hwCyclinder2,
    hwCyclinder3,
}

/**
 * Enumeration for switchable devices
 */
export enum Devices {
    boiler,
    hwPump,
    chPump,
}

/**
 * Container to access environmental sensors
 */
export interface IEnvironment {
    // return the current environment readings
    getSnapshot(): EnvironmentSnapshot;
}

/**
 * Settings specific to the operation of the environmental sensors
 */
export interface IEnvironmentSettings {
    oneWireDirectory: string;

}

/**
 * data class to contain environment readings
 */
export class EnvironmentSnapshot {
    public hwTemperature: number;
}
export class ControlStateSnapshot {
    public boiler: boolean;
    public hwPump: boolean;
    public chPump: boolean;
}

/**
 * interface for control strategies
 */
export interface IControlStrategy {
    calculateControlState(
        program: IProgram,
        currentControlState: ControlStateSnapshot,
        env: EnvironmentSnapshot): ControlStateSnapshot;
}
