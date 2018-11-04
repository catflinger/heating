import * as fs from "fs";
import { inject, injectable } from "inversify";

import { Sensor } from "./sensor";
import { IEnvironment, IEnvironmentSettings, INJECTABLES, IOneWireListCallback, ISensor, SensorSnapshot } from "./types";

@injectable()
export class Environment implements IEnvironment {

    private sensors: ISensor[] = [];

    constructor(
        @inject(INJECTABLES.OneWireDir) private oneWireDir: string,
        @inject(INJECTABLES.EnvironmentSettings) private settings: IEnvironmentSettings) {
        this.settings.sensorSettings.sensors.forEach((sensor: any) => {
            this.sensors.push(new Sensor(oneWireDir, sensor.id, sensor.description, sensor.role));
        });
    }

    public getSnapshot(): SensorSnapshot[] {
        const snaps: SensorSnapshot[] = [];
        this.sensors.forEach((s: Sensor) =>
            snaps.push(new SensorSnapshot(s.id, s.description, s.reading, s.role)));

        return snaps;
    }

    public findOneWireDevices(callback: IOneWireListCallback): void {
        fs.readdir(this.oneWireDir, (err, files) => {
            if (err) {
                throw new Error("Could not read 1-wire directory");
            }
            const devices: string[] = [];
            files.forEach((f: string) => {
                // temperature sensor device files are named 28.xxxxxxxxxxx
                if (f.startsWith("28.")) {
                    devices.push(f);
                }
            });
            callback(null, devices);
        });
    }

    public refresh(): void {
        this.sensors.forEach((s) => s.read());
    }
}
