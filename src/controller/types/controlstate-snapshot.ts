
/**
 * data class to encapsulate control state
 */
export class ControlStateSnapshot {
    private _boiler: boolean;
    private _hwPump: boolean;
    private _chPump: boolean;

    constructor(boiler: boolean, hwPump: boolean, chPump: boolean) {
        this._boiler = boiler;
        this._hwPump = hwPump;
        this._chPump = chPump;
    }

    public get boiler(): boolean {
        return this._boiler;
    }

    public get hwPump(): boolean {
        return this._hwPump;
    }

    public get chPump(): boolean {
        return this._chPump;
    }
}
