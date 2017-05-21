import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { EnvironmentSnapshot, IEnvironment, IEnvironmentSettings, INJECTABLES } from "./types";

@injectable()
export class Environment implements IEnvironment {

    @inject(INJECTABLES.EnvironmentSettings)
    private settings: IEnvironmentSettings;

    public getSnapshot(): EnvironmentSnapshot {
        const result: EnvironmentSnapshot = new EnvironmentSnapshot();

        result.hwTemperature = this.readSensor("DS18B20-1");

        return result;
    }

    private readSensor(deviceId: string): number {
        let result: number;

        try {
            const data: string = readFileSync(this.settings.oneWireDirectory + "/" + deviceId, "utf8");
            result = Number.parseInt(data);

        } catch (exp) {
            result = NaN;
        }

        return result;
    }
}
