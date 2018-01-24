import * as Debug from "debug";
import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { IEnvironmentSettings, INJECTABLES, ISensor } from "./types";

const debug = Debug("env");

@injectable()
export class Sensor implements ISensor {

    private lastReading: number;

    constructor(private settings: IEnvironmentSettings,
                private _id: string,
                private deviceId: string) {

        this.lastReading = NaN;
    }

    public read(): void {
        let result: number;

        try {
            debug("Reading sensor " + this.deviceId);

            const path: string = this.settings.oneWireDirectory + "/" + this.deviceId + "/temperature";

            debug("Reading sensor path " + path);
            const data: string = readFileSync(path, "utf8");

            result = Number.parseFloat(data);

        } catch (exp) {
            debug("Reading sensor failed " + this.deviceId + " " + exp);
            result = NaN;
        }
        this.lastReading = result;
    }

    public get reading(): number {
        return this.lastReading;
    }

    public get id(): string {
        return this._id;
    }
}
