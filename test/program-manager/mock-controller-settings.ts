import { inject, injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    constructor(
        @inject(INJECTABLES.AppRootDir) private appRootDir: string,
        @inject(INJECTABLES.GpioRootDir) private gpioRootDir: string,
    ) {}

    startPolling: boolean = false;
    startLogging: boolean = false;
    
    programStoreDir: string = this.appRootDir;
    debugDir: string = path.join(this.appRootDir, "debug");
    logDir: string = path.join(this.appRootDir, "log");

    boilerPath: "";
    chPumpPath: "";
    hwPumpPath:  "";

    public get maxOverrideDuration(): number {
        return 10;
    }
}