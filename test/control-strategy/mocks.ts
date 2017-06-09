import { injectable } from "inversify";

import {IControllerSettings, } from "../../src/controller/types";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    boilerPin: number;
    hwPumpPin: number;
    chPumpPin: number;

    public slotsPerDay: number = 10;
    
    public get maxOverrideDuration(): number {
        return 10;    
    }
}
