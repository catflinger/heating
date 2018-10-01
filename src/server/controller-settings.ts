import { injectable } from "inversify";
import * as path from "path";
import { IControllerSettings } from "../controller/types";

@injectable()
export class ControllerSettings implements IControllerSettings {

    public get startPolling(): boolean {
        return true;
    }

    public get startLogging(): boolean {
        return true;
    }

    public get programStoreDir(): string {
        return path.join(__dirname, "../../../data");
    }

    public get debugDir(): string {
        return path.join(__dirname, "../../../debug");
    }

    public get logDir(): string {
        return path.join(__dirname, "../../../log");
    }

    public get boilerPath(): string {
        return "/sys/class/gpio/gpio16/value";
    }

    public get hwPumpPath(): string {
        return "/sys/class/gpio/gpio20/value";
    }

    public get chPumpPath(): string {
        return "/sys/class/gpio/gpio21/value";
    }

    public get slotsPerDay(): number {
        return 6 * 24;
    }

    public get maxOverrideDuration(): number {
        return 10;
    }
}
