import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { EnvironmentSnapshot, IEnvironment, IEnvironmentSettings, INJECTABLES } from "./types";

@injectable()
export class Environment implements IEnvironment {

    @inject(INJECTABLES.EnvironmentSettings)
    private settings: IEnvironmentSettings;

    public getSnapshot(): EnvironmentSnapshot {
        return new EnvironmentSnapshot(this.readSensor("DS18B20-1"));
    }

    private readSensor(deviceId: string): number {
        let result: number;

        try {
            const path: string = this.settings.oneWireDirectory + "/" + deviceId;
                    console.log("1-wire path is " + path);
            const data: string = readFileSync(path, "utf8");
            result = Number.parseInt(data);

        } catch (exp) {
            result = NaN;
        }

        return result;
    }
}
