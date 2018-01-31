import { injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {

    startPolling: boolean = false;
    
    programStoreDir: string = path.join(__dirname, "..", "..", "test", "data");

    boilerPath: string = path.join(__dirname, "..", "..", "test", "data", "gpio", "gpio16", "value");
    chPumpPath: string = path.join(__dirname, "..", "..", "test", "data", "gpio", "gpio20", "value");
    hwPumpPath: string = path.join(__dirname, "..", "..", "test", "data", "gpio", "gpio21", "value");

    // public slotsPerDay: number = 10;
        
    public get maxOverrideDuration(): number {
        return 10;
    }
}