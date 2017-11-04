import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { IEnvironmentSettings, INJECTABLES, ISensor } from "./types";

@injectable()
export class Sensor implements ISensor {

    @inject(INJECTABLES.EnvironmentSettings)
    private settings: IEnvironmentSettings;
    private lastReading: number;

    constructor(private _id: string, private _deviceId: string) {
        this.lastReading = NaN;
    }

    public read(): void {
        let result: number;

        try {
            const path: string = this.settings.oneWireDirectory + "/" + this._deviceId + "/temperature";
            const data: string = readFileSync(path, "utf8");
            result = Number.parseFloat(data);

        } catch (exp) {
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
