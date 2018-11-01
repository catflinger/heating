import { inject, injectable } from "inversify";
import * as path from "path";
import { IEnvironmentSettings, INJECTABLES } from "../controller/types";

@injectable()
export class EnvironmentSettingsDev implements IEnvironmentSettings {
    @inject(INJECTABLES.AppRootDir)
    private appRootDir: string;

    public get oneWireDirectory(): string {
        return path.join(this.appRootDir, "1wire");
    }

    public get sensorSettings(): any {
        return {
            sensors: [
                {id: "hw", description: "hot water", deviceId: "28.0", role: "hw"},
                {id: "bedroom", description: "bedroom", deviceId: "28.1"},
                {id: "garage", description: "garage", deviceId: "28.2"},
                {id: "loft", description: "loft", deviceId: "28.3"},
                {id: "other1", description: "unknown", deviceId: "28.4"},
                {id: "other2", description: "unknown", deviceId: "28.5"},
            ],
        };
    }
}
