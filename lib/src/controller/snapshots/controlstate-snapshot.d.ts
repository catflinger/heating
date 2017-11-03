export declare class ControlStateSnapshot {
    private _heating;
    private _hotWater;
    constructor(heating: boolean, hotWater: boolean);
    readonly heating: boolean;
    readonly hotWater: boolean;
    clone(): ControlStateSnapshot;
}
