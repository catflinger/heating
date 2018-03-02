/**
 * data class to contain environment readings
 */
import { ISensor } from "../types";
import { SensorSnapshot } from "./sensor-snapshot";
import { ISnapshot } from "./snapshot";

export class EnvironmentSnapshot implements ISnapshot<EnvironmentSnapshot> {
    private _sensors: SensorSnapshot[];

    constructor(sensors: SensorSnapshot[]) {
        // keep a clone of thearray so this object
        // will not be affected by changes to the original
        this._sensors = [];
        sensors.forEach((sensor) => this._sensors.push(sensor.clone()));
    }

    public getSensor(id: string): SensorSnapshot {
        return this._sensors.find((s) => s.id === id);
    }

    public sensorsToStoreable(): any[] {
        const array: any[] = [];
        this._sensors.forEach((s) => array.push(s.toStorable()));
        return array;
    }

    public clone(): EnvironmentSnapshot {
        const sensors: SensorSnapshot[] = [];
        this._sensors.forEach((sensor) => sensors.push(sensor.clone()));
        return new EnvironmentSnapshot(sensors);
    }

    public toStorable(): any {
        return {
            sensors: this.sensorsToStoreable(),
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
