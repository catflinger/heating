import { injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {

    startPolling: boolean = false;
    startLogging: boolean = false;
    
    programStoreDir: string = path.join(__dirname, "data");
    debugDir: string = path.join(__dirname, "..", "..", "..", "test", "debug");
    logDir: string = path.join(__dirname, "..", "..", "..", "test", "log");

    boilerPath: string = "";
    chPumpPath: string = "";
    hwPumpPath: string = "";

    // public slotsPerDay: number = 10;
        
    public get maxOverrideDuration(): number {
        return 10;
    }
}