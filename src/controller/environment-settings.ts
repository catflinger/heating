import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as path from "path";

import { SensorSetting } from "./sensor-setting";
import { IEnvironmentSettings, INJECTABLES, ISensor } from "./types";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {

    @inject(INJECTABLES.AppRootDir)
    private appRoot: string;

    public getSensorSettings(includeDeleted?: boolean): SensorSetting[] {
        const result: SensorSetting[] = [];

        // only return non-deleted sensors unless told otherwise
        this._getSensorSettings().forEach((s) => {
            if (!s.deleted || includeDeleted) {
                result.push(s.copyOf());
            }
        });

        return result;
    }

    public getSensorSetting(id: string): SensorSetting {
        let result = null;

        const sensor: SensorSetting = this._getSensorSettings()
            .find((s: SensorSetting) => s.id === id);
        if (sensor && ! sensor.deleted) {
            result = sensor.copyOf();
        }

        return result;
    }

    // works as a combined add and update function
    public updateSensorSetting(sensor: SensorSetting): void {

        // get the existing settings
        const settings: SensorSetting[] = this._getSensorSettings();

        // find the existing sensor setting
        const sensorSetting: SensorSetting = settings.find((s: SensorSetting) => s.id === sensor.id);

        if (sensorSetting) {
            // make the change, only two fields can be changed by public
            sensorSetting.description = sensor.description;
            sensorSetting.role = sensor.role;

            // ignore any value supplied, must use removeSensorSetting to delete a sensor
            sensorSetting.deleted = false;
        } else {
            // else add a new sensor
            settings.push(new SensorSetting(sensor.id, sensor.description, sensor.role, 0, false));
        }
        this.saveSensorSettings(settings);
    }

    public removeSensorSetting(id: string): void {

        // get the existing settings
        const settings: SensorSetting[] = this._getSensorSettings();

        // see if this sensor is alread present
        const sensorSetting: SensorSetting = settings.find((s: SensorSetting) => s.id === id);

        if (sensorSetting) {
            // mark as deleted
            // NOTE: we never remove a sensor completely as even deleted still needs to be present
            // in the log, even if they no longer have a value
            sensorSetting.deleted = true;
            sensorSetting.description = "deleted";
            sensorSetting.role = "";
            this.saveSensorSettings(settings);
        }
    }

    private _getSensorSettings(): SensorSetting[] {
        const result: SensorSetting[] = [];

        // look for a previously saved config file
        if (fs.existsSync(this.configFile)) {
            const data: any = JSON.parse(fs.readFileSync(this.configFile, "utf-8"));

            data.sensors.forEach((d: any) => {
                result.push(new SensorSetting(d.id, d.description, d.role, d.position, d.deleted));
            });
        }

        return result;
    }

    private get configFile(): string {
        return path.join(this.appRoot, "settings", "sensor-config.json");
    }

    private saveSensorSettings(settings: SensorSetting[]): void {
        // number the sensors
        settings.forEach((s, i) => {
            s.position = i;
            if (s.deleted === undefined) {
                s.deleted = false;
            }
        });

        const data: any = { sensors: settings };
        fs.writeFileSync(this.configFile, JSON.stringify(data), "utf-8");
    }
}
