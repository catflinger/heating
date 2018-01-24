/**
 * data class to contain environment readings
 */
import { ISensor } from "../types";
import { SensorSnapshot } from "./sensor-snapshot";

export class EnvironmentSnapshot {
    private snapshots: SensorSnapshot[] = [];

    constructor(sensors: ISensor[]) {
        sensors.forEach((sensor) =>
        this.snapshots.push(new SensorSnapshot(sensor)));
    }

    public get sensors(): SensorSnapshot[] {
        return this.snapshots;
    }

    public get hwTemperature(): number {
        return this.sensors.find(s => s.id === "hw").reading;
    }
}
