import "reflect-metadata";
import { EnvironmentSnapshot, IEnvironment, IControlStrategy, IProgram, ISwitchable, Snapshot, ControlStateSnapshot } from "../../src/controller/types";
import { ProgramSnapshot } from "../../src/controller/snapshots/program-snapshot";
export declare class MockControlStrategy implements IControlStrategy {
    water: boolean;
    heating: boolean;
    calculateControlState(currentState: Snapshot): ControlStateSnapshot;
}
export declare class MockEnvironment implements IEnvironment {
    private hwSensor;
    refresh(): void;
    getSnapshot(): EnvironmentSnapshot;
    setHWTemperature(temp: number): void;
}
export declare class MockProgram implements IProgram {
    id: string;
    name: string;
    save(): void;
    getValue(slot: number): boolean;
    getSnapshot(): ProgramSnapshot;
    setHWTemps(min: number, max: number): void;
    toStorable(): any;
    toJson(): string;
    loadDefaults(): void;
    loadFrom(): void;
    loadFromJson(json: string): void;
    setRange(state: boolean[], from: number, to: number): void;
    readonly slotsPerDay: number;
    readonly minHWTemp: number;
    readonly maxHWTemp: number;
}
export declare class MockDevice implements ISwitchable {
    private _name;
    private _state;
    init(): void;
    name: string;
    readonly state: boolean;
    toggle(): void;
    switch(state: boolean): void;
}
