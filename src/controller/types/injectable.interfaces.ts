import { EnvironmentSnapshot } from "./environment-snapshot";
import { Snapshot } from "./snapshot";

/**
 * Symbolic names for types to be used in IoC injection
 */
export const INJECTABLES = {
    Boiler: Symbol("Boiler"),
    CHPump: Symbol("CHPump"),
    Controller: Symbol("Controller"),
    ControllerSettings: Symbol("ControllerSettings"),
    Environment: Symbol("Environment"),
    EnvironmentSettings: Symbol("EnvironmentSettings"),
    HWPump: Symbol("HWPump"),
    Program: Symbol("Program"),
};

/**
 * Entry point and public interface for the heating control
 */
export interface IController {

    // re-reads environment and applies current program settings to devices
    refresh(): void;

    // provides raw data on state of the heating system and environment
    getSnapshot(): Snapshot;
}

/**
 * Configuration for the controller.  Intended for global settings (eg file paths)
 * rather than program settings (eg hw threshold)
 */
export interface IControllerSettings {
    placeholder(): any;
}

/**
 *  an importable program that defines heating and hw settings for times of the day
 *  program value true = heating ON
 *  program value false = heating OFF
 */
export interface IProgram {
    slotsPerDay: number;

    // the minimum acceptable HW temperature
    minHWTemp: number;
    maxHWTemp: number;

    // gets the program value for a slot number, slot numbering starts at zero
    getValue(slot: number): boolean;

    // set the program value for slot numbers in the range
    // range values are inclusive
    setRange(state: boolean[], from: number, to: number): void;
}

/**
 * Represents an on/off switchable device such as a pump or boiler
 */
export interface ISwitchable {
    name: string;
    state: boolean;
    toggle(): void;
    switch(state: boolean): void;
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
