import { injectable } from "inversify";
import { IEnvironmentSettings } from "../controller/types";

@injectable()
export class EnvironmentSettingsDev implements IEnvironmentSettings {

    public get oneWireDirectory(): string {
        return __dirname +  "/../../../test/data/1wire";
    }

    public get sensors(): any[] {
        return [
            {id: "hw", description: "hot water", deviceId: "28.1"},
            {id: "bedroom", description: "bedroom", deviceId: "28.1"},
            {id: "garage", description: "garage", deviceId: "28.1"},
            {id: "loft", description: "loft", deviceId: "28.1"},
            {id: "other1", description: "unknown", deviceId: "28.1"},
            {id: "other2", description: "unknown", deviceId: "28.1"},
        ];
    }
}
