import { IEnvironmentSettings, ISensor } from "./types";
export declare class Sensor implements ISensor {
    private settings;
    private _id;
    private deviceId;
    private lastReading;
    constructor(settings: IEnvironmentSettings, _id: string, deviceId: string);
    read(): void;
    readonly reading: number;
    readonly id: string;
}
