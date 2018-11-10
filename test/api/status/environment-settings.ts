import { injectable } from "inversify";
import { IEnvironmentSettings, SensorSetting } from "../../../src/controller/types";


@injectable()
export class EnvironmentSettings implements IEnvironmentSettings {
    getSensorSetting(id: string): SensorSetting {
        throw new Error("Method not implemented.");
    }

    updateSensorSetting(sensor: SensorSetting): void {
        throw new Error("Method not implemented.");
    }
    removeSensorSetting(id: string): void {
        throw new Error("Method not implemented.");
    }

    public getSensorSettings(): SensorSetting[] {
        const result: SensorSetting[] = [];
        const data = [
                {description: "hw", id: "28.60418F060000", role: "hw"},
                {description: "bedroom", id: "28.68A98F060000"},
                {description: "garage", id: "28.71CE8F060000"},
                {description: "loft", id: "28.8F528F060000"},
                {description: "other1", id: "28.9F5991060000"},
                {description: "other2", id: "28.9FD18F060000"},
            ];

        data.forEach((d) => { new SensorSetting(d.id, d.description, d.role)});

        return result;
    }
}
