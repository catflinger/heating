import { Router } from "express";
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

export enum ProgramMode {
    Weekday = 0,
    Saturday = 1,
    Sunday = 2,
}

export interface IApi {
    addRoutes(router: Router): void;
}

/**
 * Main entry point and public interface for the heating control
 */
export interface IController {

    // TO DO: get rid of this we shouldn't need it
    programManager: IProgramManager;

    // initialses devices and begins polling the environment
    start(): void;

    // provides raw data on state of the heating system and environment
    getSnapshot(): Snapshot;

    // creates a new override or extends an existing override
    setOverride(duration: number): void;

    // removes any override
    clearOverride(): void;

    refresh(): void;
}

/**
 * interface for control strategies
 */
export interface IControllable {
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
    boilerPath: string;
    debugDir: string;
    hwPumpPath: string;
    chPumpPath: string;
    programStoreDir: string;
    startPolling: boolean;
}

/**
 * Gets the system time in 5 minute intervals, aka slot numbers.
 * The time on the clock remains constant until nudged along by calling the tick() function
 */
export interface IClock {
    currentSlot: number;
    dayOfWeek: number;
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

    // load default values
    loadDefaults(): void;

    // deserialise from json
    loadFromJson(json: string): void;

    // serialise to json
    toJson(): string;

    // load form a data object
    loadFrom(src: any): void;

    // return a simple javascript object for storage
    toStorable(): any;
}

/**
 *  interface for storing programs
 */
export interface IProgramManager {

    // saturdayProgram: IProgram;
    // sundayProgram: IProgram;
    // weekdayProgram: IProgram;
    currentProgram: IProgram;

    configIsValid(config: ProgramConfig): boolean;
    createProgram(src: any): IProgram;
    getProgram(id: string): IProgram;
    getConfig(): ProgramConfig;
    init(): void;
    listPrograms(): IProgram[];
    removeProgram(id: string): void;
    setConfig(config: ProgramConfig): void;
    updateProgram(program: IProgram): void;
}

export class ProgramConfig {
    public saturdayProgramId: string;
    public sundayProgramId: string;
    public weekdayProgramId: string;
}

export interface IProgramStore {

    // attempts to load from existing config
    init(): void;

    // clears store and resets to defaults
    reset(): void;

    // get and set progrm store items
    getConfig(): ProgramConfig;
    saveConfig(config: ProgramConfig): void;
    getPrograms(): IProgram[];
    savePrograms(programs: IProgram[]): void;
}

/**
 *  interface for setting overrides
 */
export interface IOverrideManager {
    // removes any expired overrides
    refresh(): void;

    // return the current override state
    getSnapshot(): OverrideSnapshot[];

    // creates a new override
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
