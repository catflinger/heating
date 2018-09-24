
/**
 * data class to encapsulate control state
 */
export class ControlStateSnapshot {
    private _heating: boolean;
    private _hotWater: boolean;

    constructor(heating: boolean, hotWater: boolean) {
        this._heating = heating;
        this._hotWater = hotWater;
    }

    public clone(): ControlStateSnapshot {
        return new ControlStateSnapshot(
            this._heating,
            this._hotWater);
    }

    public get heating(): boolean {
        return this._heating;
    }

    public get hotWater(): boolean {
        return this._hotWater;
    }

    public toStorable(): any {
        return {
            heating: this._heating,
            hotWater: this._hotWater,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
