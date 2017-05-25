import { injectable } from "inversify";
import { IEnvironmentSettings } from "../controller/index";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {
    public get oneWireDirectory(): string {
        return "X";
    }
}
