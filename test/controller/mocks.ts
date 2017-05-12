import { injectable, inject } from "inversify";
import "reflect-metadata";

import { IEnvironment, IControllerSettings, IProgram, Sensors } from "../../src/controller/types";

@injectable()
export class MockEnvironment implements IEnvironment {
    getTemperature(sensor: Sensors): number {
        return 21;
    }
}

@injectable()
export class MockControllerSettings implements IControllerSettings {
}

@injectable()
export class MockProgram implements IProgram {
}
