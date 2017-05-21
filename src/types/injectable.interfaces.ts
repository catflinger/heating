import { ControlStateSnapshot } from "./controlstate-snapshot";
import { EnvironmentSnapshot } from "./environment-snapshot";
import { Snapshot } from "./snapshot";

/**
 * Symbolic names for types to be used in IoC injection
 */
export const INJECTABLES = {
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
    Program: Symbol("Program"),
};

/**
 * Main entry point and public interface for the heating control
 */
export interface IController {

    // re-reads environment and applies current program settings to devices
    refresh(): void;

    // provides raw data on state of the heating system and environment
    getSnapshot(): Snapshot;
}

/**
 * interface for control strategies
 */
export interface IControlStrategy {
    calculateControlState(
        program: IProgram,
        currentState: Snapshot): ControlStateSnapshot;
}

/**
 * Configuration for the controller.  Intended for global settings (eg file paths)
 * rather than program settings (eg hw threshold)
 */
export interface IControllerSettings {
    slotsPerDay: number;
    boilerPin: number;
    hwPumpPin: number;
    chPumpPin: number;
}

/**
 * Gets the system time in 5 minute intervals, aka slot numbers
 */
export interface IClock {
    currentSlot: number;
}

/**
 * facade for digital-output interaction with the underlying General Purpose Input/Output pins
 */
export interface IDigitalOutput {
    use(pin: number): void; // enable a pin for digital output
    read(pin: number): boolean; // read the state of a pin, true is ON, false is OFF
    write(pin: number, state: boolean): void; // set the state of a pin
}
/**
 *  an importable program that defines heating and hw settings for times of the day
 *  program value true = heating ON
 *  program value false = heating OFF
 */
export interface IProgram {

    // the minimum acceptable HW temperature (to be implemented as get properties only)
    minHWTemp: number;
    maxHWTemp: number;

    // set the min and max water temperatures as a pair
    setHWTemps(min: number, max: number): void;

    // gets the program value for a slot number, slot numbering starts at zero
    getValue(slot: number): boolean;

    // set the program value for slot numbers in the range.  from and to are are inclusive
    setRange(state: boolean[], from: number, to: number): void;

    // serialise the program to json
    toJson(): string;

    // deserialise from json
    loadJson(json: string): void;
}

/**
 * Represents an on/off switchable device such as a pump or boiler
 */
export interface ISwitchable {
    name: string;
    state: boolean;
    init(): void;
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
