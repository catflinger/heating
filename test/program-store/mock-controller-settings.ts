import { inject, injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    constructor(
        @inject(INJECTABLES.AppRootDir) private appRootDir: string,
    ) {}
    startPolling: boolean = false;
    startLogging: boolean = false;
    
    programStoreDir: string = this.appRootDir;
    debugDir: string = path.join(this.appRootDir, "debug");
    logDir: string = path.join(this.appRootDir, "log");

    boilerPath: string = "";
    chPumpPath: string = "";
    hwPumpPath: string = "";

    // public slotsPerDay: number = 10;
        
    public get maxOverrideDuration(): number {
        return 10;
    }
}