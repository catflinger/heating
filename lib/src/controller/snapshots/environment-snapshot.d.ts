import { ISensor } from "../types";
import { SensorSnapshot } from "./sensor-snapshot";
export declare class EnvironmentSnapshot {
    private snapshots;
    constructor(sensors: ISensor[]);
    readonly sensors: SensorSnapshot[];
}
