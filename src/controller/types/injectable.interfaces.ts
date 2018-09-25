import { Router } from "express";
import { ControlStateSnapshot, DeviceStateSnapshot, OverrideSnapshot, ProgramSnapshot, SensorSnapshot } from "../types";

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
    SensorApi: Symbol("SensorApi"),
    SlotsPerDay: Symbol("SlotsPerDay"),
    StatusApi: Symbol("StatusApi"),
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

    // stores and retrieves programs
    programManager: IProgramManager;

    // initialses devices and begins polling the environment
    start(): void;

    getSnapshot(): ControlStateSnapshot;

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
    calculateControlState(
        env: SensorSnapshot[],
        program: ProgramSnapshot,
        current: ControlStateSnapshot,
        overrides: OverrideSnapshot[],
    ): ControlStateSnapshot;
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

    // returns a read-only copy of this program
    getSnapshot(): ProgramSnapshot;

    // gets the value for a slot number
    getValue(slot: number): boolean;

    // set the program value for slot numbers in the range.  from and to are are inclusive
    setRange(state: boolean[], from: number, to: number): void;

    // load default values
    loadDefaults(): void;

    // deserialise from json
    // loadFromJson(json: string): void;

    // serialise to json
    // toJson(): string;

    // load form a data object
    loadFromSnapshot(src: ProgramSnapshot): void;

    // return a simple javascript object for storage
    // toStorable(): string;
}

/**
 *  interface for storing programs
 */
export interface IProgramManager {

    // saturdayProgram: IProgram;
    // sundayProgram: IProgram;
    // weekdayProgram: IProgram;
    currentProgram: ProgramSnapshot;

    configIsValid(config: ProgramConfig): boolean;
    createProgram(src: any): ProgramSnapshot;
    getProgram(id: string): ProgramSnapshot;
    getConfig(): ProgramConfig;
    init(): void;
    listPrograms(): ProgramSnapshot[];
    removeProgram(id: string): void;
    setConfig(config: ProgramConfig): void;
    updateProgram(program: ProgramSnapshot): void;
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
    getName(): string;
    getState(): boolean;
    switch(state: boolean): void;
}

/**
 * Container to access environmental sensors
 */
export interface IEnvironment {
    // return the current environment readings
    getSnapshot(): SensorSnapshot[];

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
    description: string;
    read(): void;
}
