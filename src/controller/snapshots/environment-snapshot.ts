/**
 * data class to contain environment readings
 */
import { ISensor } from "../types";
import { SensorSnapshot } from "./sensor-snapshot";

export class EnvironmentSnapshot {

    constructor(public sensors: SensorSnapshot[]) {
    }

    public clone(): EnvironmentSnapshot {
        const sensors: SensorSnapshot[] = [];
        this.sensors.forEach((sensor) => sensors.push(sensor.clone()));
        return new EnvironmentSnapshot(sensors);
    }
}
