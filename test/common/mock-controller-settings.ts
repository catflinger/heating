import { injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    programStore: string = path.join(__dirname, "..", "..", "data");
    
    boilerPin: number = 21;
    hwPumpPin: number = 22;
    chPumpPin: number = 23;

    public slotsPerDay: number = 10;
        
    public get maxOverrideDuration(): number {
        return 10;    
    }
}