import { injectable, inject } from "inversify";
import "reflect-metadata";

import { EnvironmentSnapshot, IEnvironment, IControllerSettings, IProgram, Sensors } from "../../src/controller/types";

@injectable()
export class MockEnvironment implements IEnvironment {
    public getSnapshot(): EnvironmentSnapshot {
        const result: EnvironmentSnapshot = new EnvironmentSnapshot();
        result.hwTemperature = 31;
        return result;
    }

}

@injectable()
export class MockControllerSettings implements IControllerSettings {
}

@injectable()
export class MockProgram implements IProgram {
    hwThreshold: number = 40;
}
