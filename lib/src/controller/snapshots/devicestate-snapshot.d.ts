export declare class DeviceStateSnapshot {
    private _boiler;
    private _hwPump;
    private _chPump;
    constructor(boiler: boolean, hwPump: boolean, chPump: boolean);
    readonly boiler: boolean;
    readonly hwPump: boolean;
    readonly chPump: boolean;
}
