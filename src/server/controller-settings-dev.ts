import { inject, injectable } from "inversify";
import * as path from "path";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";

@injectable()
export class ControllerSettingsDev implements IControllerSettings {

    public startPolling: boolean = true;
    public startLogging: boolean = false;

    public programStoreDir: string = path.join(this.appRootDir, "data");
    public debugDir: string = path.join(this.appRootDir, "debug");
    public logDir: string = path.join(this.appRootDir, "log");

    public boilerPath: string = path.join(this.gpioRootDir, "gpio16", "value");
    public chPumpPath: string = path.join(this.gpioRootDir, "gpio20", "value");
    public hwPumpPath: string = path.join(this.gpioRootDir, "gpio21", "value");

    constructor(
        @inject(INJECTABLES.GpioRootDir) private gpioRootDir: string,
        @inject(INJECTABLES.AppRootDir) private appRootDir: string,
    ) {}

    public get maxOverrideDuration(): number {
        return 10;
    }
}
