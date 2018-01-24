import { ControlStateSnapshot } from "../snapshots/controlstate-snapshot";
import { EnvironmentSnapshot } from "../snapshots/environment-snapshot";
import { OverrideSnapshot } from "../snapshots/override-snapshot";
import { ProgramSnapshot } from "../snapshots/program-snapshot";
import { Snapshot } from "../snapshots/snapshot";
import { DeviceStateSnapshot } from "../types";

/**
 * Symbolic names for types to be used in IoC injection
 */
export const INJECTABLES = {
    Boiler: Symbol("Boiler"),
    CHPump: Symbol("CHPump"),
    Clock: Symbol("Clock"),
    ControlStrategy: Symbol("ControlStrategy"),
    ControllerSettings: Symbol("ControllerSettings"),
    DigitalOutput: Symbol("DigitalOutput"),
    Environment: Symbol("Environment"),
    EnvironmentSettings: Symbol("EnvironmentSettings"),
    HWPump: Symbol("HWPump"),
    Override: Symbol("Override"),
    Program: Symbol("Program"),
    ProgramFactory: Symbol("Factory<IProgram>"),
    ProgramManager: Symbol("ProgramManager"),
    SlotsPerDay: Symbol("SlotsPerDay"),
    System: Symbol("System"),
};

/**
 * Main entry point and public interface for the heating control
 */
export interface IController {

    // initialses devices and begins polling the environment
    start(): void;

    // provides raw data on state of the heating system and environment
    getSnapshot(): Snapshot;

    // creates a new override or extends an existing override
    setOverride(duration: number): void;

    // removes any override
    clearOverride(): void;
}

/**
 * interface for control strategies
 */
export interface IControllable {
    start(): void;
    applyControlState(state: ControlStateSnapshot): void;
    getDeviceState(): DeviceStateSnapshot;
}

/**
 * interface for control strategies
 */
export interface IControlStrategy {
    calculateControlState(currentState: Snapshot): ControlStateSnapshot;
}

/**
 * Configuration for the controller.  Intended for global settings (eg file paths)
 * rather than program settings (eg hw threshold)
 */
export interface IControllerSettings {
    // slotsPerDay: number;
    maxOverrideDuration: number;
    boilerPin: number;
    hwPumpPin: number;
    chPumpPin: number;
    programStore: string;
}

/**
 * Gets the system time in 5 minute intervals, aka slot numbers.
 * The time on the clock remains constant until nudged along by calling the tick() function
 */
export interface IClock {
    currentSlot: number;
    tick(): void;
    isToday(date: Date): boolean;
    isYesterday(date: Date): boolean;
    getDate(): Date;
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
    // unique id for the program
    id: string;
    // short human readable name
    name: string;

    // the minimum acceptable HW temperature (to be implemented as get properties only)
    minHWTemp: number;
    maxHWTemp: number;

    // set the min and max water temperatures as a pair
    setHWTemps(min: number, max: number): void;

    // returns a read-only copy of this program
    getSnapshot(): ProgramSnapshot;

    // gets the value for a slot number
    getValue(slot: number): boolean;

    // set the program value for slot numbers in the range.  from and to are are inclusive
    setRange(state: boolean[], from: number, to: number): void;

    // deserialise from json
    loadFrom(src: any): void;

    // return a simple javascript object for storage
    toStorable(): any;
}

/**
 *  interface for storing programs
 */
export interface IProgramManager {
    activeProgram: IProgram;
    list(): IProgram[];
    get(id: string): IProgram;
    add(program: IProgram): string;
    update(program: IProgram): string;
    remove(id: string): void;
}

/**
 *  interface for setting overrides
 */
export interface IOverride {
    // removes any expired overrides
    refresh(): void;

    // return the current override state
    getSnapshot(): OverrideSnapshot;

    // creates a new override or extends an existing override
    setOverride(duration: number): void;

    // removes any override
    clearOverride(): void;
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

    // refresh the sensor readings
    refresh(): void;
}

/**
 * Settings specific to the operation of the environmental sensors
 */
export interface IEnvironmentSettings {
    oneWireDirectory: string;
    sensors: any[];
}

export interface ISensor {
    reading: number;
    id: string;
    read(): void;
}
