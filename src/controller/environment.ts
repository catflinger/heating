import { readFileSync } from "fs";
import { inject, injectable } from "inversify";

import { Sensor } from "./sensor";
import { IEnvironment, IEnvironmentSettings, INJECTABLES, ISensor, SensorSnapshot } from "./types";

@injectable()
export class Environment implements IEnvironment {

    private sensors: ISensor[] = [];

    constructor(@inject(INJECTABLES.EnvironmentSettings) private settings: IEnvironmentSettings) {
        this.settings.sensorSettings.sensors.forEach((sensor: any) => {
            this.sensors.push(new Sensor(settings, sensor.id, sensor.description, sensor.role));
        });
    }

    public getSnapshot(): SensorSnapshot[] {
        const snaps: SensorSnapshot[] = [];
        this.sensors.forEach((s: Sensor) =>
            snaps.push(new SensorSnapshot(s.id, s.description, s.reading, s.role)));

        return snaps;
    }

    public refresh(): void {
        this.sensors.forEach((s) => s.read());
    }
}
