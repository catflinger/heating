import { inject, injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as path from "path";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    constructor(
        @inject(INJECTABLES.AppRootDir) private appRoot: string,
        @inject(INJECTABLES.GpioRootDir) private gpioRootDir: string
    ) {}

    startPolling: boolean = false;
    startLogging: boolean = false;
    
    programStoreDir: string = this.appRoot;
    debugDir: string = path.join(this.appRoot, "debug");
    logDir: string = path.join(this.appRoot, "log");

    boilerPath: string = path.join(this.gpioRootDir, "gpio16", "value");
    chPumpPath: string = path.join(this.gpioRootDir, "gpio", "gpio20", "value");
    hwPumpPath: string = path.join(this.gpioRootDir, "gpio", "gpio21", "value");

    // public slotsPerDay: number = 10;
        
    public get maxOverrideDuration(): number {
        return 10;
    }
}