import { ISensor } from "./types";
export declare class Sensor implements ISensor {
    private _id;
    private _deviceId;
    private settings;
    private lastReading;
    constructor(_id: string, _deviceId: string);
    read(): void;
    readonly reading: number;
    readonly id: string;
}
