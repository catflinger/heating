import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as path from "path";

import { IEnvironmentSettings, INJECTABLES } from "../controller/types";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {

    @inject(INJECTABLES.AppRootDir)
    private appRoot: string;

    public get oneWireDirectory(): string {
        return "/mnt/1wire";
    }

    public get sensorSettings(): any {
        let result: any;

        // look for a previously saved config file
        if (fs.existsSync(this.configFile)) {
            result = JSON.parse(fs.readFileSync(this.configFile, "utf-8"));

        } else {
            // if not found use the default in the environment settings
            result = {
                sensors: [
                    {
                        description: "hot water",
                        id: "28.8284600300003A",
                        role: "hw",
                    },
                ],
            };
        }

        return result;
    }

    private get configFile(): string {
        return path.join(this.appRoot, "data", "sensor-config.json");
    }
}
