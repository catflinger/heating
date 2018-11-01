import { inject, injectable } from "inversify";
import * as path from "path";
import {IControllerSettings, INJECTABLES } from "../../../src/controller/types";

@injectable()
export class ControllerSettings implements IControllerSettings {

    constructor(
        @inject(INJECTABLES.AppRootDir) private appRootDir: string,
        @inject(INJECTABLES.GpioRootDir) private gpioRootDir: string
    ) {}
    public startPolling: boolean = false;
    public startLogging: boolean = false;

    public programStoreDir: string = this.appRootDir;

    public debugDir: string = path.join(this.appRootDir, "debug");
    public logDir: string = path.join(this.appRootDir, "log");

    public boilerPath: string = path.join(this.gpioRootDir, "gpio16", "value");
    public chPumpPath: string = path.join(this.gpioRootDir, "gpio20", "value");
    public hwPumpPath: string = path.join(this.gpioRootDir, "gpio21", "value");

    public get maxOverrideDuration(): number {
        return 10;
    }
}
