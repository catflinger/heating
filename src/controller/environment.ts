import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { Sensor } from "./sensor";
import { EnvironmentSnapshot, IEnvironment, IEnvironmentSettings, INJECTABLES, ISensor, SensorSnapshot } from "./types";

@injectable()
export class Environment implements IEnvironment {

    private sensors: ISensor[] = [];

    constructor(@inject(INJECTABLES.EnvironmentSettings) private settings: IEnvironmentSettings) {
        this.settings.sensors.forEach((sensor) => {
            this.sensors.push(new Sensor(settings, sensor.id, sensor.description, sensor.deviceId));
        });
    }

    public getSnapshot(): EnvironmentSnapshot {
        const snaps: SensorSnapshot[] = [];
        this.sensors.forEach((s) =>
            snaps.push(new SensorSnapshot(s.id, s.description, s.reading)));

        return new EnvironmentSnapshot(snaps);
    }

    public refresh(): void {
        this.sensors.forEach((s) => s.read());
    }
}
