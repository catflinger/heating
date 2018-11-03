import { injectable } from "inversify";
import { IEnvironmentSettings } from "../controller/types";

@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {

    public get sensorSettings(): any {
        return {
            sensors: [
                {id: "28.60418F060000", description: "hot water", role: "hw"},
                {id: "28.68A98F060000", description: "bedroom"},
                {id: "28.71CE8F060000", description: "garage"},
                {id: "28.8F528F060000", description: "loft"},
                {id: "28.9F5991060000", description: "unknown"},
                {id: "28.9FD18F060000", description: "unknown"},
            ],
        };
    }
}
