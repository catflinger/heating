import { injectable } from "inversify";
import { IEnvironmentSettings } from "../../../src/controller/types";


@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {

    public get oneWireDirectory(): string {
        throw new Error("method not implemented");
    }

    public get sensorSettings(): any {
        return {
            sensors: [
                {description: "hw", id: "28.60418F060000", role: "hw"},
                {description: "bedroom", id: "28.68A98F060000"},
                {description: "garage", id: "28.71CE8F060000"},
                {description: "loft", id: "28.8F528F060000"},
                {description: "other1", id: "28.9F5991060000"},
                {description: "other2", id: "28.9FD18F060000"},
            ],
        };
    }
}
