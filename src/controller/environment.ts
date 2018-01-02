import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { Sensor } from "./sensor";
import { EnvironmentSnapshot, IEnvironment, IEnvironmentSettings, INJECTABLES, ISensor } from "./types";

@injectable()
export class Environment implements IEnvironment {

    private sensors: ISensor[] = [];

    constructor(@inject(INJECTABLES.EnvironmentSettings) private settings: IEnvironmentSettings) {
        this.settings.sensors.forEach((sensor) => {
            this.sensors.push(new Sensor(settings, sensor.id, sensor.deviceId));
        });
    }

    public getSnapshot(): EnvironmentSnapshot {
        return new EnvironmentSnapshot(this.sensors);
    }

    public refresh(): void {
        this.sensors.forEach((s) => s.read());
    }
}
