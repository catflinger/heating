export declare class OverrideSnapshot {
    private _startSlot;
    private _duration;
    private _state;
    private _date;
    constructor(start: number, duration: number, state: boolean, date: Date);
    clone(): OverrideSnapshot;
    readonly start: number;
    readonly duration: number;
    readonly state: boolean;
    readonly date: Date;
}
