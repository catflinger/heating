import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IProgram } from "./types";
export declare class Program implements IProgram {
    protected slotsPerDay: number;
    private _id;
    private _name;
    private _slots;
    private _minHwTemp;
    private _maxHwTemp;
    constructor(slotsPerDay: number);
    getValue(slot: number): boolean;
    getSnapshot(): ProgramSnapshot;
    readonly minHWTemp: number;
    readonly maxHWTemp: number;
    id: string;
    name: string;
    readonly slots: boolean[];
    setHWTemps(min: number, max: number): void;
    setRange(state: boolean[], from: number, to: number): void;
    loadDefaults(): void;
    loadFromJson(json: string): void;
    loadFrom(src: any): void;
    toStorable(): any;
    toJson(): string;
    private validateSlotNumber(...args);
}
