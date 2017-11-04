
import { ISensor } from "../types";

export class SensorSnapshot {
    private _id: string;
    private _reading: number;

    constructor(sensor: ISensor) {
        this._reading = sensor.reading;
        this._id = sensor.id;
    }

    public get reading(): number {
        return this._reading;
    }

    public get id(): string {
        return this._id;
    }
}
