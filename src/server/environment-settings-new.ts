import { injectable } from "inversify";
import { IEnvironmentSettings } from "../controller/types";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {

    public get oneWireDirectory(): string {
        // return __dirname +  "/../../../test/environment/data";
        return "/mnt/1wire";
    }

    public get sensors(): any[] {
        return [
            {id: "hw", description: "hot water", deviceId: "28.60418F060000"},
            {id: "bedroom", description: "bedroom", deviceId: "28.68A98F060000"},
            {id: "garage", description: "garage", deviceId: "28.71CE8F060000"},
            {id: "loft", description: "loft", deviceId: "28.8F528F060000"},
            {id: "other1", description: "unknown", deviceId: "28.9F5991060000"},
            {id: "other2", description: "unknown", deviceId: "28.9FD18F060000"},
        ];
    }
}