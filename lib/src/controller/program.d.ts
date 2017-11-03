import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, IProgram } from "./types";
export declare class Program implements IProgram {
    private settings;
    private slots;
    private _minHwTemp;
    private _maxHwTemp;
    constructor(settings: IControllerSettings);
    save(): void;
    getValue(slot: number): boolean;
    getSnapshot(): ProgramSnapshot;
    readonly minHWTemp: number;
    readonly maxHWTemp: number;
    setHWTemps(min: number, max: number): void;
    setRange(state: boolean[], from: number, to: number): void;
    toJson(): string;
    loadJson(json: string): void;
    private validateSlotNumber(...args);
}
