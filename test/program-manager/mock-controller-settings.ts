import { injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {

    startPolling: boolean = false;
    
    programStoreDir: string = path.join(__dirname, "data");
    debugDir: string = path.join(__dirname, "..", "..", "..", "test", "debug");

    boilerPath: "";
    chPumpPath: "";
    hwPumpPath:  "";

    public get maxOverrideDuration(): number {
        return 10;
    }
}