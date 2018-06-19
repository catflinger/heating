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
            {id: "hw", description: "hot water", deviceId: "28.8284600300003A"},
            {id: "bedroom", description: "bedroom", deviceId: "28.8681C50300001C"},
            {id: "garage", description: "garage", deviceId: "28.615CC503000002"},
            {id: "loft", description: "loft", deviceId: "28.22BB490300006E"},
        ];
    }
}
