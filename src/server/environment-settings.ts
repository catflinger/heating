import { injectable } from "inversify";
import { IEnvironmentSettings } from "../controller/types";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {
    public get oneWireDirectory(): string {
        return __dirname +  "/../../../test/environment/data";
    }
}
