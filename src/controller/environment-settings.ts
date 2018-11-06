import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as path from "path";

import { IEnvironmentSettings, INJECTABLES, ISensor } from "./types";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {

    @inject(INJECTABLES.AppRootDir)
    private appRoot: string;

    public getSensorSettings(): any {
        let result: any;

        // look for a previously saved config file
        if (fs.existsSync(this.configFile)) {
            result = JSON.parse(fs.readFileSync(this.configFile, "utf-8"));

        } else {
            // if no saved data found supply an empty config
            result = {
                sensors: [],
            };
        }

        return result;
    }

    public getSensorSetting(id: string): any {
        let result: any;

        // look for a previously saved config file
        if (fs.existsSync(this.configFile)) {
            result = JSON.parse(fs.readFileSync(this.configFile, "utf-8"));

        } else {
            // if no saved data found supply an empty config
            result = {
                sensors: [],
            };
        }

        return result.sensors.find((s: any) => s.id === id);
    }

    public updateSensorSetting(sensor: ISensor): void {

        // get the existing settings
        const settings: any = this.getSensorSettings();

        // find the existing sensor setting
        const sensorSetting: any = settings.sensors.find((s: any) => s.id === sensor.id);

        if (sensorSetting) {
            // make the change
            sensorSetting.description = sensor.description;
            sensorSetting.role = sensor.role;
        } else {
            // else add a new sensor
            settings.sensors.push({
                description: sensor.description,
                id: sensor.id,
                role: sensor.role,
            });
        }
        this.saveSensorSettings(settings);
    }

    public removeSensorSetting(id: string): void {

        const settings: any = this.getSensorSettings();
        const newSettings: any = {
            sensors: [],
        };

        settings.sensors.forEach((s: any) => {
            if (s.id !== id) {
                newSettings.sensors.push(s);
            }
        });

        this.saveSensorSettings(newSettings);
    }

    private get configFile(): string {
        return path.join(this.appRoot, "settings", "sensor-config.json");
    }

    private saveSensorSettings(data: any): void {
        fs.writeFileSync(this.configFile, JSON.stringify(data), "utf-8");
    }
}
