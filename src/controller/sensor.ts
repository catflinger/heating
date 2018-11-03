import * as Debug from "debug";
import { readFileSync } from "fs";
import { inject, injectable } from "inversify";
import * as path from "path";

import { IEnvironmentSettings, INJECTABLES, ISensor } from "./types";

const debug = Debug("env");

@injectable()
export class Sensor implements ISensor {

    private lastReading: number;

    constructor(private _oneWireDir: string,
                private _id: string,
                private _description: string,
                private _role: string) {

        this.lastReading = NaN;
    }

    public read(): void {
        let result: number;

        try {
            debug("Reading sensor " + this.id);

            const deviceFile: string = path.join(this._oneWireDir, this.id, "temperature");

            debug("Reading sensor path " + deviceFile);
            const data: string = readFileSync(deviceFile, "utf8");

            result = Number.parseFloat(data);

        } catch (exp) {
            debug("Reading sensor failed " + this.id + " " + exp);
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

    public get description(): string {
        return this._description;
    }

    public get role(): string {
        return this._role;
    }
}
