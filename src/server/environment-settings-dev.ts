import { injectable } from "inversify";
import { IEnvironmentSettings } from "../controller/types";

@injectable()
export class EnvironmentSettingsDev implements IEnvironmentSettings {

    public get oneWireDirectory(): string {
        return __dirname +  "/../../../test/data/gpio";
    }

    public get sensors(): any[] {
        return [
            {id: "hw", deviceId: "28.60418F060000"},
            {id: "bedroom", deviceId: "28.68A98F060000"},
            {id: "garage", deviceId: "28.71CE8F060000"},
            {id: "loft", deviceId: "28.8F528F060000"},
            {id: "other1", deviceId: "28.9F5991060000"},
            {id: "other2", deviceId: "28.9FD18F060000"},
        ];
    }
}
