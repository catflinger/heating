import { inject, injectable } from "inversify";
// import { INJECT_TAG } from "inversify/dts/constants/metadata_keys";
import * as path from "path";
import { IControllerSettings, INJECTABLES } from "../controller/types";

@injectable()
export class ControllerSettings implements IControllerSettings {

    @inject(INJECTABLES.AppRootDir)
    private appRoot: string;

    @inject(INJECTABLES.GpioRootDir)
    private gpioRootDir: string;

    public get startPolling(): boolean {
        return true;
    }

    public get startLogging(): boolean {
        return true;
    }

    public get programStoreDir(): string {
        return path.join(this.appRoot, "data");
    }

    public get debugDir(): string {
        return path.join(this.appRoot, "debug");
    }

    public get logDir(): string {
        return path.join(this.appRoot, "log");
    }

    public get boilerPath(): string {
        return path.join(this.gpioRootDir, "gpio16", "value");
    }

    public get hwPumpPath(): string {
        return path.join(this.gpioRootDir, "gpio20", "value");
    }

    public get chPumpPath(): string {
        return path.join(this.gpioRootDir, "gpio21", "value");
    }

    public get slotsPerDay(): number {
        return 6 * 24;
    }

    public get maxOverrideDuration(): number {
        return 10;
    }
}
