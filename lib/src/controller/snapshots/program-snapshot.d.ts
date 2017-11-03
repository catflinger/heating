export declare class ProgramSnapshot {
    private _slots;
    private _minHwTemp;
    private _maxHwTemp;
    private _slotsPerDay;
    constructor(minHwTemp: number, maxHwTemp: number, slots: boolean[], slotsPerDay: number);
    readonly minHwTemp: number;
    readonly maxHwTemp: number;
    readonly slots: boolean[];
    readonly slotsPerDay: number;
}
