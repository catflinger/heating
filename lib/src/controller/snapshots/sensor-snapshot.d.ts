import { ISensor } from "../types";
export declare class SensorSnapshot {
    private _id;
    private _reading;
    constructor(sensor: ISensor);
    readonly reading: number;
    readonly id: string;
}
