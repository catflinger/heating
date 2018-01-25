import { ControlStateSnapshot } from "../snapshots/controlstate-snapshot";
import { EnvironmentSnapshot } from "../snapshots/environment-snapshot";
import { OverrideSnapshot } from "../snapshots/override-snapshot";
import { ProgramSnapshot } from "../snapshots/program-snapshot";
import { Snapshot } from "../snapshots/snapshot";
import { DeviceStateSnapshot } from "../types";
export declare const INJECTABLES: {
    Boiler: symbol;
    CHPump: symbol;
    Clock: symbol;
    ControlStrategy: symbol;
    ControllerSettings: symbol;
    DigitalOutput: symbol;
    Environment: symbol;
    EnvironmentSettings: symbol;
    HWPump: symbol;
    Override: symbol;
    Program: symbol;
    ProgramFactory: symbol;
    ProgramManager: symbol;
    SlotsPerDay: symbol;
    System: symbol;
};
export interface IController {
    start(): void;
    getSnapshot(): Snapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
}
export interface IControllable {
    applyControlState(state: ControlStateSnapshot): void;
    getDeviceState(): DeviceStateSnapshot;
}
export interface IControlStrategy {
    calculateControlState(currentState: Snapshot): ControlStateSnapshot;
}
export interface IControllerSettings {
    maxOverrideDuration: number;
    boilerPin: number;
    hwPumpPin: number;
    chPumpPin: number;
    programStore: string;
}
export interface IClock {
    currentSlot: number;
    tick(): void;
    isToday(date: Date): boolean;
    isYesterday(date: Date): boolean;
    getDate(): Date;
}
export interface IDigitalOutput {
    use(pin: number): void;
    read(pin: number): boolean;
    write(pin: number, state: boolean): void;
}
export interface IProgram {
    id: string;
    name: string;
    minHWTemp: number;
    maxHWTemp: number;
    setHWTemps(min: number, max: number): void;
    getSnapshot(): ProgramSnapshot;
    getValue(slot: number): boolean;
    setRange(state: boolean[], from: number, to: number): void;
    loadFromJson(json: string): void;
    toJson(): string;
    loadFrom(src: any): void;
    toStorable(): any;
}
export interface IProgramManager {
    activeProgram: IProgram;
    list(): IProgram[];
    get(id: string): IProgram;
    save(program: IProgram): string;
    remove(id: string): void;
}
export interface IOverride {
    refresh(): void;
    getSnapshot(): OverrideSnapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
}
export interface ISwitchable {
    name: string;
    state: boolean;
    init(): void;
    toggle(): void;
    switch(state: boolean): void;
}
export interface IEnvironment {
    getSnapshot(): EnvironmentSnapshot;
    refresh(): void;
}
export interface IEnvironmentSettings {
    oneWireDirectory: string;
    sensors: any[];
}
export interface ISensor {
    reading: number;
    id: string;
    read(): void;
}
