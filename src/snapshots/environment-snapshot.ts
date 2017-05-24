/**
 * data class to contain environment readings
 */
export class EnvironmentSnapshot {
    private _hwTemperature: number;

    constructor(hwTemperature: number) {
        this._hwTemperature = hwTemperature;
    }

    public get hwTemperature(): number {
        return this._hwTemperature;
    }
}
